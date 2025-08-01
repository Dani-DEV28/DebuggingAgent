# goodfire_ember_agent.py

from goodfire import Ember, Intent, Field, Response, ConversationState

# --- Helper Functions for Symptom Matching ---
def match_any(symptoms, keywords):
    return any(kw.lower() in symptoms for kw in keywords)

def match_all(symptoms, keywords):
    return all(kw.lower() in symptoms for kw in keywords)

def match_set(symptoms, keywords):
    return set(kw.lower() for kw in keywords).issubset(set(symptoms))

# --- Clinical Pathways Knowledge Base ---
PATHWAYS = [
    # Abdominal Distention
    {
        "name": "Irritable Bowel Syndrome",
        "criteria": [
            "intermittent lower abdominal pain", "cramping", "pain relieved by defecation",
            "alternating constipation diarrhea", "urgency", "incomplete evacuation", "mucus stools"
        ],
        "diagnosis": "Irritable Bowel Syndrome (IBS)",
        "tests": ["Sigmoidoscopy", "Colonoscopy", "Barium enema", "Rectal biopsy", "Stool exam"],
        "treatment": ["Symptomatic relief", "Diet adjustment", "Stress reduction"],
        "followup": ["As needed"]
    },
    {
        "name": "Peritonitis",
        "criteria": [
            "sudden severe pain worsens with movement", "projectile vomiting", "high fever", "fluid wave",
            "shifting dullness", "positive psoas obturator", "rebound tenderness", "signs of shock"
        ],
        "diagnosis": "Peritonitis",
        "tests": ["Peritoneal fluid culture", "CBC", "Abdominal X-ray", "CT scan", "Abdominal sonography"],
        "treatment": ["Bowel decompression", "Antibiotics", "Surgery"],
        "followup": ["One week post discharge", "Then as needed"]
    },
    {
        "name": "Large-Bowel Obstruction",
        "criteria": [
            "dramatic abdominal distention", "tympany", "fecal vomiting",
            "high pitched then absent bowel sounds", "colicky lower abdominal pain"
        ],
        "diagnosis": "Large-bowel Obstruction",
        "shared_protocol": "BowelObstructionProtocol"
    },
    {
        "name": "Small-Bowel Obstruction",
        "criteria": [
            "hypoactive or hyperactive bowel sounds", "colicky periumbilical pain", "tympany on percussion"
        ],
        "diagnosis": "Small-bowel Obstruction",
        "shared_protocol": "BowelObstructionProtocol"
    },
    # Shared protocol for bowel obstruction
    {
        "name": "BowelObstructionProtocol",
        "criteria": [],
        "diagnosis": "Bowel Obstruction",
        "tests": ["Serum chemistry", "BUN", "Creatinine", "CBC", "UA", "Abdominal X-ray", "CT scan", "Contrast studies"],
        "treatment": ["Bowel decompression", "Surgery", "Prophylactic antibiotics"],
        "followup": ["Weekly visits for 2-8 weeks"]
    },
    # ... (Add more pathways for each symptom cluster as in your pseudo-code)
]

# --- Main Ember Agent ---
class GeneralPracticeSymptomAgent(Ember):
    intent = Intent(
        name="general_practice_symptom_checker",
        description="Analyze symptoms, follow clinical pathways, ask follow-ups, and suggest diagnosis, tests, treatments, and follow-up."
    )
    fields = [
        Field("symptoms", str, required=True, description="Describe the symptoms the user is experiencing."),
        Field("followup_answers", dict, required=False, description="Dictionary of answers to follow-up questions.")
    ]

    def handle(self, symptoms, followup_answers=None, state: ConversationState = None):
        s = symptoms.lower()
        followup_answers = followup_answers or {}
        state = state or {}

        # --- Pathway Matching ---
        for pathway in PATHWAYS:
            if pathway.get("criteria") and match_all(s, pathway["criteria"]):
                # If shared protocol, find and use it
                if "shared_protocol" in pathway:
                    protocol = next((p for p in PATHWAYS if p["name"] == pathway["shared_protocol"]), None)
                    if protocol:
                        return Response(text=self.format_response(protocol))
                else:
                    return Response(text=self.format_response(pathway))

        # --- Follow-up Questions (Example for Abdominal Distention) ---
        followup_questions = []
        if "abdominal pain" in s or "distention" in s or "bloating" in s:
            if not followup_answers.get("pain_location"):
                followup_questions.append("Where is the pain located? (e.g., upper, lower, right, left, central)")
            if not followup_answers.get("pain_character"):
                followup_questions.append("Can you describe the pain? (e.g., sharp, dull, cramping, constant, intermittent)")
            if not followup_answers.get("pain_severity"):
                followup_questions.append("How severe is the pain on a scale of 1-10?")
            if not followup_answers.get("pain_duration"):
                followup_questions.append("How long have you had this pain?")
            if not followup_answers.get("associated_symptoms"):
                followup_questions.append("Are there any associated symptoms? (e.g., fever, vomiting, diarrhea, constipation, blood in stool, urinary symptoms, vaginal bleeding)")
        # (Add more follow-up logic for other clusters as needed)

        if followup_questions:
            state["awaiting_followups"] = True
            return Response(
                text="To help narrow down the diagnosis, please answer the following questions:\n" + "\n".join(followup_questions),
                state=state
            )

        # --- Default Response ---
        return Response(text=(
            "Unable to determine a specific diagnosis based on the provided symptoms. "
            "Consider further evaluation for other causes as per clinical protocols. "
            "Please consult a healthcare professional for further assessment."
        ))

    def format_response(self, pathway):
        response = f"Tentative Diagnosis: {pathway['diagnosis']}\n"
        if "tests" in pathway:
            response += "Order: " + ", ".join(pathway["tests"]) + "\n"
        if "treatment" in pathway:
            response += "Treatment: " + ", ".join(pathway["treatment"]) + "\n"
        if "followup" in pathway:
            response += "Follow-up: " + ", ".join(pathway["followup"])
        return response