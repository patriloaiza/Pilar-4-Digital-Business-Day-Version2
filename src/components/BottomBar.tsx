import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  CircleCheckBig,
  FolderOpen,
  RotateCcw,
  Save,
  Sparkles,
  Terminal
} from 'lucide-react';

interface BottomBarProps {
  onPrevious: () => void;
  onNext: () => void;
  canPrevious: boolean;
  canNext: boolean;
  isLastQuestion: boolean;
  onSave: () => void;
  onLoad: () => void;
  onOpenEvaluation: () => void;
  onFinish: () => void;
  onReset: () => void;
  onToggleTestMode: () => void;
  isTestModeOpen: boolean;
  pendingCount: number;
  activeView?: 'survey' | 'completion' | 'results';
  onReturnToSurvey?: () => void;
}

export const BottomBar: React.FC<BottomBarProps> = ({
  onPrevious,
  onNext,
  canPrevious,
  isLastQuestion,
  onSave,
  onLoad,
  onOpenEvaluation,
  onFinish,
  onReset,
  onToggleTestMode,
  isTestModeOpen,
  pendingCount,
  activeView = 'survey',
  onReturnToSurvey
}) => {
  return (
    <div
      id="bottom-action-bar"
      className="fixed left-0 right-0 bottom-0 z-40 bg-[#171717] border-t-2 border-[#D7192B] p-2.5 sm:p-3 shadow-lg"
    >
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          {activeView !== 'survey' && onReturnToSurvey ? (
            <button
              onClick={onReturnToSurvey}
              className="px-3.5 py-1.5 rounded-lg bg-[#D7192B] hover:bg-[#b91222] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Volver al cuestionario</span>
            </button>
          ) : (
            <>
              <button
                id="previousButton"
                onClick={onPrevious}
                disabled={!canPrevious}
                className="px-3 py-1.5 rounded-lg border border-gray-600 bg-[#262626] hover:bg-[#333333] text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Anterior</span>
              </button>
              <button
                id="nextButton"
                onClick={onNext}
                className="px-4 py-1.5 rounded-lg bg-[#D7192B] hover:bg-[#b91222] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1"
              >
                <span>{isLastQuestion ? 'Revisar sesión' : 'Siguiente'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            onClick={onSave}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg border border-gray-700 bg-[#262626] hover:bg-[#333333] text-gray-200 text-xs font-semibold transition-all flex items-center gap-1"
            title="Guardar sesión actual en este navegador"
          >
            <Save className="w-3.5 h-3.5 text-gray-400" />
            <span className="hidden md:inline">Guardar</span>
          </button>

          <button
            onClick={onLoad}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg border border-gray-700 bg-[#262626] hover:bg-[#333333] text-gray-200 text-xs font-semibold transition-all flex items-center gap-1"
            title="Cargar sesión guardada previamente"
          >
            <FolderOpen className="w-3.5 h-3.5 text-gray-400" />
            <span className="hidden md:inline">Cargar</span>
          </button>

          <button
            id="btn-realizar-evaluacion"
            onClick={onOpenEvaluation}
            className="px-3.5 py-1.5 rounded-lg bg-[#D7192B] hover:bg-[#b91222] text-white text-xs font-black shadow-sm transition-all flex items-center gap-1.5 ring-1 ring-white/20"
            title="Realizar evaluación para auditar el estado de los reactivos antes de finalizar"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Realizar evaluación</span>
            <span
              className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] ${
                pendingCount === 0
                  ? 'bg-emerald-500 text-white font-bold'
                  : 'bg-black/40 text-rose-200'
              }`}
            >
              {pendingCount === 0 ? '✓' : pendingCount}
            </span>
          </button>

          <button
            onClick={onFinish}
            className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1"
            title="Finalizar sesión y generar reporte"
          >
            <CircleCheckBig className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Finalizar</span>
          </button>

          <button
            onClick={onReset}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg border border-gray-700 bg-[#262626] hover:bg-rose-950/40 text-gray-300 hover:text-rose-300 text-xs font-semibold transition-all flex items-center gap-1"
            title="Reiniciar y borrar respuestas para prueba manual"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Prueba manual</span>
          </button>

          <button
            onClick={onToggleTestMode}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg border text-xs font-bold transition-all flex items-center gap-1 ${
              isTestModeOpen
                ? 'bg-amber-400 text-black border-amber-400'
                : 'border-gray-700 bg-[#262626] text-amber-300 hover:bg-[#333333]'
            }`}
            title="Modo técnico de prueba automática (37 tests)"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Modo prueba</span>
          </button>
        </div>
      </div>
    </div>
  );
};
