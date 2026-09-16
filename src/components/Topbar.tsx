import React from 'react';
import {
  ArrowLeft,
  CircleCheck,
  RotateCcw,
  Sparkles,
  Compass
} from 'lucide-react';

interface TopbarProps {
  currentIndex: number;
  totalActive: number;
  answeredCount: number;
  pendingCount: number;
  percentage: number;
  coreAnswered: number;
  coreTotal: number;
  conditionalActiveCount: number;
  onOpenEvaluation: () => void;
  activeView?: 'survey' | 'completion' | 'results';
  onReturnToSurvey?: () => void;
  onStartManualTest?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  currentIndex,
  totalActive,
  answeredCount,
  pendingCount,
  percentage,
  onOpenEvaluation,
  activeView = 'survey',
  onReturnToSurvey,
  onStartManualTest
}) => {
  return (
    <header
      id="topbar-main"
      className="sticky top-0 z-40 bg-[#111111] text-white border-b-4 border-[#D7192B] shadow-md"
    >
      <div className="max-w-6xl mx-auto px-4 py-2.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D7192B] animate-pulse" />
            <div>
              <span className="font-extrabold text-sm tracking-wide text-white">
                Digital Business Day · Negocios Digitales
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs text-gray-400 font-medium">
                · Pilar 4 CREA Y MONETIZA™
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {activeView !== 'survey' && onReturnToSurvey && (
              <button
                onClick={onReturnToSurvey}
                className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver al formulario</span>
              </button>
            )}

            {activeView === 'survey' && onStartManualTest && (
              <button
                onClick={onStartManualTest}
                className="hidden md:flex px-2.5 py-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-300 text-xs font-medium items-center gap-1.5 transition-all"
                title="Cargar respuestas de prueba para verificar reportes y señales"
              >
                <RotateCcw className="w-3.5 h-3.5 text-gray-400" />
                <span>Cargar prueba</span>
              </button>
            )}

            <button
              onClick={onOpenEvaluation}
              className="px-3.5 py-1.5 rounded-lg bg-[#D7192B] hover:bg-[#b91222] text-white text-xs font-extrabold transition-all flex items-center gap-2 shadow-sm"
              title="Abrir auditoría de avance, alertas y alineación de fases"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Auditoría de Calidad</span>
              <span className="bg-black/40 text-white px-1.5 py-0.5 rounded text-[11px] font-mono">
                {percentage}%
              </span>
            </button>
          </div>
        </div>

        {/* Barra de progreso visual integrada */}
        <div className="mt-2.5 pt-2 border-t border-gray-800 flex items-center justify-between gap-3 text-xs text-gray-400">
          <div className="flex items-center gap-2 sm:gap-4 text-[11px]">
            <span>
              Pregunta <strong className="text-white font-bold">{currentIndex + 1}</strong> de{' '}
              <strong className="text-white font-bold">{totalActive}</strong>
            </span>
            <span className="text-gray-600">|</span>
            <span>
              Respondidas: <strong className="text-emerald-400 font-bold">{answeredCount}</strong>
            </span>
            <span className="text-gray-600">|</span>
            <span>
              Pendientes: <strong className="text-amber-400 font-bold">{pendingCount}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 w-32 sm:w-48">
            <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#D7192B] h-full transition-all duration-300 rounded-full"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-gray-300 w-8 text-right font-bold">
              {percentage}%
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
