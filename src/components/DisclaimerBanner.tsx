import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800">
          <p className="font-medium mb-1">Medical Disclaimer</p>
          <p>
            This AI assistant provides general information only and is not a substitute for professional medical advice, 
            diagnosis, or treatment. Always consult with qualified healthcare professionals for medical concerns.
          </p>
        </div>
      </div>
    </div>
  );
};