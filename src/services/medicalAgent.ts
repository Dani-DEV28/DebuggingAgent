interface AnalysisResponse {
  success: boolean;
  analysis: string;
  followupQuestions?: string[];
  requiresFollowup?: boolean;
  error?: string;
  message?: string;
}

// Medical Agent service that communicates with the backend
export class MedicalAgent {
  private static readonly API_BASE_URL = 'http://localhost:3001/api';

  static async analyzeSymptoms(symptoms: string, followupAnswers?: Record<string, string>): Promise<AnalysisResponse> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/analyze-symptoms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symptoms,
          followupAnswers: followupAnswers || {}
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: AnalysisResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
      return {
        success: false,
        analysis: "I'm sorry, I'm having trouble connecting to the medical analysis service. Please try again later or consult a healthcare professional directly.",
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  static async submitFollowup(symptoms: string, answers: Record<string, string>): Promise<AnalysisResponse> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/followup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symptoms,
          answers
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: AnalysisResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error submitting follow-up:', error);
      return {
        success: false,
        analysis: "I'm sorry, I'm having trouble processing your follow-up responses. Please try again later.",
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}