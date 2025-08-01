# goodfire_ember_agent.py

from goodfire import Ember, Intent, Field, Response

class AbdominalSymptomChecker(Ember):
    intent = Intent(
        name="abdominal_symptom_checker",
        description="Analyze abdominal symptoms and suggest possible diagnoses, tests, treatments, and follow-up based on clinical flowcharts."
    )
    fields = [
        Field("symptoms", str, required=True, description="Describe the symptoms the user is experiencing.")
    ]

    def handle(self, symptoms):
        s = symptoms.lower()

        # ABDOMINAL DISTENTION
        if (
            "intermittent lower abdominal pain" in s and
            "pain relieved by defecation" in s and
            "alternating constipation and diarrhea" in s
        ):
            return Response(text=(
                "Tentative Diagnosis: Irritable Bowel Syndrome\n"
                "Order: Sigmoidoscopy, Colonoscopy, Barium enema, Stool examination\n"
                "Treatment: Symptomatic care, Diet adjustment\n"
                "Follow-up: As needed"
            ))
        elif (
            "sudden, severe pain worsening with movement" in s and
            "high-grade fever" in s and
            "rebound tenderness" in s
        ):
            return Response(text=(
                "Tentative Diagnosis: Peritonitis\n"
                "Order: Peritoneal fluid culture, CBC, Imaging studies\n"
                "Treatment: Bowel decompression, Antibiotics, Surgery\n"
                "Follow-up: 1 week after discharge"
            ))
        elif (
            "dramatic abdominal distention" in s and
            "fecal vomiting" in s and
            "high-pitched bowel sounds" in s
        ):
            return Response(text=(
                "Tentative Diagnosis: Large-bowel Obstruction\n"
                "Order: Serum chemistry, BUN, Creatinine, CBC, Imaging studies\n"
                "Treatment: Bowel decompression, Surgery, Prophylactic antibiotics\n"
                "Follow-up: Weekly visits for 2-8 weeks"
            ))
        elif (
            ("hypoactive bowel sounds" in s or "hyperactive bowel sounds" in s) and
            "colicky periumbilical pain" in s
        ):
            return Response(text=(
                "Tentative Diagnosis: Small-bowel Obstruction\n"
                "Order: Serum chemistry, BUN, Creatinine, CBC, Imaging studies\n"
                "Treatment: Bowel decompression, Surgery, Prophylactic antibiotics\n"
                "Follow-up: Weekly visits for 2-8 weeks"
            ))

        # ABDOMINAL MASS
        elif (
            "pulsating periumbilical mass" in s and
            "systolic bruit over aorta" in s
        ):
            return Response(text=(
                "Tentative Diagnosis: Abdominal Aortic Aneurysm\n"
                "Order: Ultrasonography, CT scan, MRI, Angiography\n"
                "Treatment: BP control, Atherosclerotic risk reduction, Surgery\n"
                "Follow-up: BP monitoring, Serial ultrasounds"
            ))
        elif (
            "smooth, sausage-shaped mass below liver" in s and
            "severe ruq pain" in s and
            "murphy's sign" in s
        ):
            if "chills" in s and "low-grade fever" in s:
                diagnosis = "Cholecystitis"
            else:
                diagnosis = "Cholelithiasis"
            return Response(text=(
                f"Tentative Diagnosis: {diagnosis}\n"
                "Order: CBC, LFT, Bilirubin, Ultrasound, CT scan, ERCP\n"
                "Treatment: Low-fat diet, Gallstone solubilizing agent, Surgery\n"
                "Follow-up: Liver enzyme tests, Return visit 1 week after procedure"
            ))
        elif (
            ("palpable mass in rlq" in s or "palpable mass in llq" in s) and
            ("occult bleeding" in s or "rectal bleeding" in s) and
            "change in bowel habits" in s
        ):
            return Response(text=(
                "Tentative Diagnosis: Colon Cancer\n"
                "Order: CT scan, Stool for occult blood, Colonoscopy\n"
                "Treatment: Chemotherapy, Analgesics, Radiation therapy, Surgery\n"
                "Follow-up: Referrals to gastroenterologist and oncologist"
            ))

        # ACUTE ABDOMINAL PAIN
        elif (
            "pulsating periumbilical mass" in s and
            "systolic bruit over aorta" in s
        ):
            return Response(text=(
                "Tentative Diagnosis: Abdominal Aortic Aneurysm\n"
                "Order: Ultrasonography, CT scan, MRI, Angiography\n"
                "Treatment: BP control, Atherosclerotic risk reduction, Surgery\n"
                "Follow-up: BP monitoring, Serial ultrasounds"
            ))
        elif (
            "dull discomfort in epigastric region" in s and
            "localized pain at mcburney's point" in s and
            "rebound tenderness" in s
        ):
            return Response(text=(
                "Tentative Diagnosis: Appendicitis\n"
                "Order: CBC, UA, Amylase, Imaging studies\n"
                "Treatment: Surgery, Antibiotics\n"
                "Follow-up: Return visits at 2 and 6 weeks"
            ))
        elif (
            "llq pain" in s and
            "abdominal rigidity" in s and
            "high-grade fever" in s
        ):
            return Response(text=(
                "Tentative Diagnosis: Diverticulitis (Acute)\n"
                "Order: CBC, UA, Chemistry panel, Imaging studies\n"
                "Treatment: Dietary fiber, Antibiotics, Surgery\n"
                "Follow-up: Barium enema after episode subsides"
            ))
        elif (
            "fulminating, continuous upper abdominal pain" in s and
            "nausea and vomiting" in s and
            "abdominal rigidity" in s
        ):
            return Response(text=(
                "Tentative Diagnosis: Pancreatitis\n"
                "Order: Amylase, Lipase, CBC, LFT, Imaging studies\n"
                "Treatment: NPO, IV fluids, Bed rest, Medication\n"
                "Follow-up: Monitoring of amylase levels"
            ))
        elif (
            ("sharp lower abdominal pain" in s or "dull lower abdominal pain" in s or "cramping lower abdominal pain" in s) and
            "vaginal bleeding" in s and
            "history of amenorrhea" in s
        ):
            return Response(text=(
                "Tentative Diagnosis: Ectopic Pregnancy\n"
                "Order: Urine pregnancy test, Serum HCG, CBC, Imaging studies\n"
                "Treatment: Surgery\n"
                "Follow-up: Serial HCG levels"
            ))
        elif (
            ("severe abdominal pain" in s or "severe back pain" in s) and
            "severe colicky pain" in s and
            "hematuria" in s
        ):
            return Response(text=(
                "Tentative Diagnosis: Renal Calculi\n"
                "Order: CBC, BUN, Creatinine, UA, Imaging studies\n"
                "Treatment: Pain relief, Increased fluid intake, Various extraction procedures\n"
                "Follow-up: Urologic referral if chronic"
            ))

        # If no match, suggest further evaluation
        else:
            return Response(text=(
                "Unable to determine a specific diagnosis based on the provided symptoms. "
                "Consider also: abdominal cancer, abdominal trauma, cirrhosis, heart failure, paralytic ileus, ascites, Crohn's disease, diverticulitis, gallbladder cancer, hepatic cancer, hydronephrosis, ovarian cyst, acute cholecystitis, diabetic ketoacidosis, intestinal obstruction, perforated ulcer. "
                "Please consult a healthcare professional for further evaluation."
            ))