// Simulated GoodFire agent responses based on the backend logic
export class MedicalAgent {
  static async analyzeSymptoms(symptoms: string): Promise<string> {
    const s = symptoms.toLowerCase();

    // Simulate network/API delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Simulate random error (for demonstration)
    if (Math.random() < 0.07) {
      throw new Error('Network error: Unable to reach AI agent. Please try again.');
    }

    // ABDOMINAL DISTENTION
    if (
      s.includes("intermittent lower abdominal pain") &&
      s.includes("pain relieved by defecation") &&
      s.includes("alternating constipation and diarrhea")
    ) {
      return `**Tentative Diagnosis:** Irritable Bowel Syndrome\n\n**Recommended Tests:**\n• Sigmoidoscopy\n• Colonoscopy\n• Barium enema\n• Stool examination\n\n**Treatment Options:**\n• Symptomatic care\n• Diet adjustment\n\n**Follow-up:** As needed`;
    }

    if (
      s.includes("sudden, severe pain worsening with movement") &&
      s.includes("high-grade fever") &&
      s.includes("rebound tenderness")
    ) {
      return `**Tentative Diagnosis:** Peritonitis\n\n**Recommended Tests:**\n• Peritoneal fluid culture\n• Complete Blood Count (CBC)\n• Imaging studies\n\n**Treatment Options:**\n• Bowel decompression\n• Antibiotics\n• Surgery\n\n**Follow-up:** 1 week after discharge`;
    }

    if (
      s.includes("dramatic abdominal distention") &&
      s.includes("fecal vomiting") &&
      s.includes("high-pitched bowel sounds")
    ) {
      return `**Tentative Diagnosis:** Large-bowel Obstruction\n\n**Recommended Tests:**\n• Serum chemistry\n• BUN, Creatinine\n• Complete Blood Count (CBC)\n• Imaging studies\n\n**Treatment Options:**\n• Bowel decompression\n• Surgery\n• Prophylactic antibiotics\n\n**Follow-up:** Weekly visits for 2-8 weeks`;
    }

    if (
      (s.includes("hypoactive bowel sounds") || s.includes("hyperactive bowel sounds")) &&
      s.includes("colicky periumbilical pain")
    ) {
      return `**Tentative Diagnosis:** Small-bowel Obstruction\n\n**Recommended Tests:**\n• Serum chemistry\n• BUN, Creatinine\n• Complete Blood Count (CBC)\n• Imaging studies\n\n**Treatment Options:**\n• Bowel decompression\n• Surgery\n• Prophylactic antibiotics\n\n**Follow-up:** Weekly visits for 2-8 weeks`;
    }

    // ABDOMINAL MASS
    if (
      s.includes("pulsating periumbilical mass") &&
      s.includes("systolic bruit over aorta")
    ) {
      return `**Tentative Diagnosis:** Abdominal Aortic Aneurysm\n\n**Recommended Tests:**\n• Ultrasoundography\n• CT scan\n• MRI\n• Angiography\n\n**Treatment Options:**\n• Blood pressure control\n• Atherosclerotic risk reduction\n• Surgery\n\n**Follow-up:** BP monitoring, Serial ultrasounds`;
    }

    if (
      s.includes("smooth, sausage-shaped mass below liver") &&
      s.includes("severe RUQ pain") &&
      s.includes("murphy's sign")
    ) {
      const diagnosis = (s.includes("chills") && s.includes("low-grade fever"))
        ? "Cholecystitis"
        : "Cholelithiasis";

      return `**Tentative Diagnosis:** ${diagnosis}\n\n**Recommended Tests:**\n• Complete Blood Count (CBC)\n• Liver Function Tests (LFT)\n• Bilirubin\n• Ultrasound\n\n**Treatment Options:**\n• Bowel decompression\n• Surgery\n• Prophylactic antibiotics\n\n**Follow-up:** Liver enzyme tests, Return visit 1 week after procedure`;
    }

    if (
      (s.includes("palpable mass in rlq") || s.includes("palpable mass in llq")) &&
      (s.includes("occult bleeding") || s.includes("rectal bleeding")) &&
      s.includes("change in bowel habits")
    ) {
      return `**Tentative Diagnosis:** Colon Cancer\n\n**Recommended Tests:**\n• CT scan\n• Stool for occult blood\n• Colonoscopy\n\n**Treatment Options:**\n• Chemotherapy\n• Analgesics\n• Radiation therapy\n• Surgery\n\n**Follow-up:** Referrals to gastroenterologist and oncologist`;
    }

    // ACUTE ABDOMINAL PAIN
    if (
      s.includes("dull discomfort in epigastric region") &&
      s.includes("localized pain at mcburney's point") &&
      s.includes("rebound tenderness")
    ) {
      return `**Tentative Diagnosis:** Appendicitis\n\n**Recommended Tests:**\n• Complete Blood Count (CBC)\n• Urinalysis (UA)\n• Amylase\n• Imaging studies\n\n**Treatment Options:**\n• Surgery\n• Antibiotics\n\n**Follow-up:** Return visits at 2 and 6 weeks`;
    }

    if (
      s.includes("llq pain") &&
      s.includes("abdominal rigidity") &&
      s.includes("high-grade fever")
    ) {
      return `**Tentative Diagnosis:** Diverticulitis (Acute)\n\n**Recommended Tests:**\n• Complete Blood Count (CBC)\n• Urinalysis (UA)\n• Chemistry panel\n• Imaging studies\n\n**Treatment Options:**\n• Dietary fiber\n• Antibiotics\n• Surgery\n\n**Follow-up:** Barium enema after episode subsides`;
    }

    if (
      s.includes("fulminating, continuous upper abdominal pain") &&
      s.includes("nausea and vomiting") &&
      s.includes("abdominal rigidity")
    ) {
      return `**Tentative Diagnosis:** Pancreatitis\n\n**Recommended Tests:**\n• Amylase\n• Lipase\n• Complete Blood Count (CBC)\n• Liver Function Tests (LFT)\n• Imaging studies\n\n**Treatment Options:**\n• NPO (nothing by mouth)\n• IV fluids\n• Bed rest\n\n**Follow-up:** Monitoring of amylase levels`;
    }

    if (
      s.includes("sharp lower abdominal pain") || s.includes("dull lower abdominal pain") || s.includes("cramping lower abdominal pain") &&
      s.includes("vaginal bleeding") &&
      s.includes("history of amenorrhea")
    ) {
      return `**Tentative Diagnosis:** Ectopic Pregnancy\n\n**Recommended Tests:**\n• Urine pregnancy test\n• Serum HCG\n• Complete Blood Count (CBC)\n• Imaging studies\n\n**Treatment Options:**\n• Surgery\n\n**Follow-up:** Serial HCG levels`;
    }

    if (
      (s.includes("severe abdominal pain") || s.includes("severe back pain")) &&
      s.includes("severe colicky pain") &&
      s.includes("hematuria")
    ) {
      return `**Tentative Diagnosis:** Renal Calculi\n\n**Recommended Tests:**\n• Complete Blood Count (CBC)\n• BUN, Creatinine\n• Urinalysis (UA)\n• Imaging studies\n\n**Treatment Options:**\n• Pain relief\n• Increased fluid intake\n• Various extraction procedures\n\n**Follow-up:** Urologic referral if chronic`;
    }

    // Default response
    return `I'm unable to determine a specific diagnosis based on the provided symptoms.\n\n**Consider also:** Abdominal cancer, abdominal trauma, cirrhosis, heart failure, paralytic ileus, ascites, Crohn's disease, diverticulitis, gallbladder cancer, hepatic cancer, hydronephrosis, ovarian cyst, acute cholecystitis, diabetic ketoacidosis, intestinal obstruction, perforated ulcer.\n\n**Recommendation:** Please consult a healthcare professional for further evaluation and proper diagnosis.`;
  }
}
