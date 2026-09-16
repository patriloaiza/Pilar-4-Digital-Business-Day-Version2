import React from 'react';
import { ArrowRight, CircleAlert } from 'lucide-react';
import { Question } from '../types';

interface PendingQuestionsBannerProps {
  pendingQuestions: Question[];
  onJumpToQuestion: (qId: string) => void;
}

export const PendingQuestionsBanner: React.FC<PendingQuestionsBannerProps> = ({
  pendingQuestions = [],
  onJumpToQuestion
}) => {
  if (!pendingQuestions || !pendingQuestions.length) return null;

  return (
    <div
      id="pendingPanel"
      className="bg-rose-50 border border-rose-200 rounded-xl p-4 sm:p-5 mb-6 text-xs text-rose-950"
    >
      <div className="flex items-center gap-2 font-black text-rose-900 text-sm mb-2">
        <CircleAlert className="w-4 h-4 text-[#D7192B]" />
        <span>Preguntas pendientes de respuesta ({pendingQuestions.length})</span>
      </div>
      <p className="text-gray-700 text-[11px] mb-3">
        Para completar el diagnóstico estratégico BMS, responde o marca como N/A los siguientes
        reactivos:
      </p>

      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
        {pendingQuestions.map((q) => (
          <div
            key={q.id}
            className="flex items-center justify-between gap-3 p-2.5 bg-white border border-rose-100 rounded-lg"
          >
            <div>
              <span className="font-bold text-[#D7192B] mr-2 font-mono">{q.id}</span>
              <span className="text-gray-800 font-medium">{q.text}</span>
            </div>
            <button
              onClick={() => onJumpToQuestion(q.id)}
              className="px-2.5 py-1 rounded bg-[#D7192B] hover:bg-[#b91222] text-white text-[11px] font-bold transition-all shrink-0 flex items-center gap-1"
            >
              <span>Ir</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
