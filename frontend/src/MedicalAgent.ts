import type { AnalysisResponse } from './types';

export class MedicalAgent {
  private static readonly API_BASE_URL = 'http://localhost:3001';

  static async analyzeSymptoms(
    symptoms: string,
    followupAnswers?: Record<string, string>
  ): Promise<AnalysisResponse> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/analyze-symptoms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptoms,
          followupAnswers: followupAnswers || {}
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      return {
        success: false,
        analysis: "I'm sorry, I'm having trouble connecting to the medical analysis service. Please try again later or consult a healthcare professional directly.",
      };
    }
  }
}
