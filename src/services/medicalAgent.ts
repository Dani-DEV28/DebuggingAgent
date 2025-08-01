// Simulated GoodFire agent responses based on the backend logic
export class MedicalAgent {
  static analyzeSymptoms(symptoms: string): string {
    const s = symptoms.toLowerCase();

    // ABDOMINAL DISTENTION
    if (
      s.includes("intermittent lower abdominal pain") &&
      s.includes("pain relieved by defecation") &&
      s.includes("alternating constipation and diarrhea")
    ) {
      return `**Tentative Diagnosis:** Irritable Bowel Syndrome

**Recommended Tests:**
• Sigmoidoscopy
• Colonoscopy  
• Barium enema
• Stool examination

**Treatment Options:**
• Symptomatic care
• Diet adjustment

**Follow-up:** As needed`;
    }

    if (
      s.includes("sudden, severe pain worsening with movement") &&
      s.includes("high-grade fever") &&
      s.includes("rebound tenderness")
    ) {
      return `**Tentative Diagnosis:** Peritonitis

**Recommended Tests:**
• Peritoneal fluid culture
• Complete Blood Count (CBC)
• Imaging studies

**Treatment Options:**
• Bowel decompression
• Antibiotics
• Surgery

**Follow-up:** 1 week after discharge`;
    }

    if (
      s.includes("dramatic abdominal distention") &&
      s.includes("fecal vomiting") &&
      s.includes("high-pitched bowel sounds")
    ) {
      return `**Tentative Diagnosis:** Large-bowel Obstruction

**Recommended Tests:**
• Serum chemistry
• BUN, Creatinine
• Complete Blood Count (CBC)
• Imaging studies

**Treatment Options:**
• Bowel decompression
• Surgery
• Prophylactic antibiotics

**Follow-up:** Weekly visits for 2-8 weeks`;
    }

    if (
      (s.includes("hypoactive bowel sounds") || s.includes("hyperactive bowel sounds")) &&
      s.includes("colicky periumbilical pain")
    ) {
      return `**Tentative Diagnosis:** Small-bowel Obstruction

**Recommended Tests:**
• Serum chemistry
• BUN, Creatinine
• Complete Blood Count (CBC)
• Imaging studies

**Treatment Options:**
• Bowel decompression
• Surgery
• Prophylactic antibiotics

**Follow-up:** Weekly visits for 2-8 weeks`;
    }

    // ABDOMINAL MASS
    if (
      s.includes("pulsating periumbilical mass") &&
      s.includes("systolic bruit over aorta")
    ) {
      return `**Tentative Diagnosis:** Abdominal Aortic Aneurysm

**Recommended Tests:**
• Ultrasonography
• CT scan
• MRI
• Angiography

**Treatment Options:**
• Blood pressure control
• Atherosclerotic risk reduction
• Surgery

**Follow-up:** BP monitoring, Serial ultrasounds`;
    }

    if (
      s.includes("smooth, sausage-shaped mass below liver") &&
      s.includes("severe ruq pain") &&
      s.includes("murphy's sign")
    ) {
      const diagnosis = (s.includes("chills") && s.includes("low-grade fever")) 
        ? "Cholecystitis" 
        : "Cholelithiasis";
      
      return `**Tentative Diagnosis:** ${diagnosis}

**Recommended Tests:**
• Complete Blood Count (CBC)
• Liver Function Tests (LFT)
• Bilirubin
• Ultrasound
• CT scan
• ERCP

**Treatment Options:**
• Low-fat diet
• Gallstone solubilizing agent
• Surgery

**Follow-up:** Liver enzyme tests, Return visit 1 week after procedure`;
    }

    if (
      (s.includes("palpable mass in rlq") || s.includes("palpable mass in llq")) &&
      (s.includes("occult bleeding") || s.includes("rectal bleeding")) &&
      s.includes("change in bowel habits")
    ) {
      return `**Tentative Diagnosis:** Colon Cancer

**Recommended Tests:**
• CT scan
• Stool for occult blood
• Colonoscopy

**Treatment Options:**
• Chemotherapy
• Analgesics
• Radiation therapy
• Surgery

**Follow-up:** Referrals to gastroenterologist and oncologist`;
    }

    // ACUTE ABDOMINAL PAIN
    if (
      s.includes("dull discomfort in epigastric region") &&
      s.includes("localized pain at mcburney's point") &&
      s.includes("rebound tenderness")
    ) {
      return `**Tentative Diagnosis:** Appendicitis

**Recommended Tests:**
• Complete Blood Count (CBC)
• Urinalysis (UA)
• Amylase
• Imaging studies

**Treatment Options:**
• Surgery
• Antibiotics

**Follow-up:** Return visits at 2 and 6 weeks`;
    }

    if (
      s.includes("llq pain") &&
      s.includes("abdominal rigidity") &&
      s.includes("high-grade fever")
    ) {
      return `**Tentative Diagnosis:** Diverticulitis (Acute)

**Recommended Tests:**
• Complete Blood Count (CBC)
• Urinalysis (UA)
• Chemistry panel
• Imaging studies

**Treatment Options:**
• Dietary fiber
• Antibiotics
• Surgery

**Follow-up:** Barium enema after episode subsides`;
    }

    if (
      s.includes("fulminating, continuous upper abdominal pain") &&
      s.includes("nausea and vomiting") &&
      s.includes("abdominal rigidity")
    ) {
      return `**Tentative Diagnosis:** Pancreatitis

**Recommended Tests:**
• Amylase
• Lipase
• Complete Blood Count (CBC)
• Liver Function Tests (LFT)
• Imaging studies

**Treatment Options:**
• NPO (nothing by mouth)
• IV fluids
• Bed rest
• Medication

**Follow-up:** Monitoring of amylase levels`;
    }

    if (
      (s.includes("sharp lower abdominal pain") || s.includes("dull lower abdominal pain") || s.includes("cramping lower abdominal pain")) &&
      s.includes("vaginal bleeding") &&
      s.includes("history of amenorrhea")
    ) {
      return `**Tentative Diagnosis:** Ectopic Pregnancy

**Recommended Tests:**
• Urine pregnancy test
• Serum HCG
• Complete Blood Count (CBC)
• Imaging studies

**Treatment Options:**
• Surgery

**Follow-up:** Serial HCG levels`;
    }

    if (
      (s.includes("severe abdominal pain") || s.includes("severe back pain")) &&
      s.includes("severe colicky pain") &&
      s.includes("hematuria")
    ) {
      return `**Tentative Diagnosis:** Renal Calculi

**Recommended Tests:**
• Complete Blood Count (CBC)
• BUN, Creatinine
• Urinalysis (UA)
• Imaging studies

**Treatment Options:**
• Pain relief
• Increased fluid intake
• Various extraction procedures

**Follow-up:** Urologic referral if chronic`;
    }

    // Default response
    return `I'm unable to determine a specific diagnosis based on the provided symptoms. 

**Consider also:** Abdominal cancer, abdominal trauma, cirrhosis, heart failure, paralytic ileus, ascites, Crohn's disease, diverticulitis, gallbladder cancer, hepatic cancer, hydronephrosis, ovarian cyst, acute cholecystitis, diabetic ketoacidosis, intestinal obstruction, perforated ulcer.

**Recommendation:** Please consult a healthcare professional for further evaluation and proper diagnosis.`;
  }
}