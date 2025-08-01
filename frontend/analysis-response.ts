export interface AnalysisResponse {
  success: boolean;
  analysis: string;
  followupQuestions?: string[];
  requiresFollowup?: boolean;
}
