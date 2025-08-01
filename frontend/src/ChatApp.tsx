import React, { useState, useRef, useEffect } from 'react';
import { MedicalAgent } from './MedicalAgent';
import type { AnalysisResponse } from './types';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: 'Hello! I am your medical AI assistant. Please describe your symptoms.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [followup, setFollowup] = useState<string[]>([]);
  const [followupAnswers, setFollowupAnswers] = useState<Record<string, string>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (msg: string) => {
    setMessages((prev) => [...prev, { sender: 'user', text: msg }]);
    setLoading(true);
    let response: AnalysisResponse;
    if (followup.length > 0) {
      // Send followup answers
      response = await MedicalAgent.analyzeSymptoms(
        messages.find((m) => m.sender === 'user')?.text || '',
        { ...followupAnswers, [followup[0]]: msg }
      );
      setFollowupAnswers((prev) => ({ ...prev, [followup[0]]: msg }));
    } else {
      response = await MedicalAgent.analyzeSymptoms(msg);
    }
    setLoading(false);
    setMessages((prev) => [...prev, { sender: 'ai', text: response.analysis }]);
    setFollowup(response.followupQuestions || []);
    if (!(response.followupQuestions && response.followupQuestions.length)) {
      setFollowupAnswers({});
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-8">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`px-4 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>{msg.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={followup[0] || 'Describe your symptoms...'}
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading || !input.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
};
