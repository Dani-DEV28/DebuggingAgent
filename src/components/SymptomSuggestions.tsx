import React from 'react';

interface SymptomSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

export const SymptomSuggestions: React.FC<SymptomSuggestionsProps> = ({ onSuggestionClick }) => {
  const suggestions = [
    "I have intermittent lower abdominal pain that's relieved by defecation, with alternating constipation and diarrhea",
    "I'm experiencing sudden, severe pain that worsens with movement, high-grade fever, and rebound tenderness",
    "I have dramatic abdominal distention, fecal vomiting, and high-pitched bowel sounds",
    "I feel a pulsating periumbilical mass and hear a systolic bruit over my aorta",
    "I have dull discomfort in my epigastric region, localized pain at McBurney's point, and rebound tenderness",
    "I'm experiencing sharp lower abdominal pain, vaginal bleeding, and have a history of amenorrhea",
    "I have severe abdominal and back pain with severe colicky pain and blood in my urine"
  ];

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Common symptom patterns:</h3>
      <div className="grid gap-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="text-left p-3 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 border border-gray-200 hover:border-gray-300"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};