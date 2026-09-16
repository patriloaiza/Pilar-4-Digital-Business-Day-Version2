import React from 'react';
import {
  ArrowRight,
  CircleAlert,
  CircleCheck,
  FileCheck2,
  ShieldAlert,
  Sparkles,
  X,
  Compass,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { AuditReport } from '../types';
import { CONSULTING_PHASES } from '../data/phases';

interface EvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  audit: AuditReport;
  onJumpToQuestion: (qId: string) => void;
  onFinishSession: () => void;
  onFillTestData: () => void;
}

export const EvaluationModal: React.FC<EvaluationModalProps> = ({
  isOpen,
  onClose,
  audit,
  onJumpToQuestion,
  onFinishSession,
  onFillTestData
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-4 pt-12 sm:pt-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden my-auto max-h-[85vh] sm:max-h-[90vh] flex flex-col">
        {/* Header Modal */}
        <div className="bg-[#171717] text-white p-5 border-b-4 border-[#D7192B] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D7192B] flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-black tracking-widest text-[#f55364]">
                Auditoría Metodológica · Pilar 4 Digital Business Day
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white leading-tight">
                Evaluación del Diagnóstico y Alertas Estratégicas
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido Modal */}
        <div className="p-6 overflow-y-auto space-y-6 text-gray-800">
          {/* Métricas Principales */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-center">
              <div className="text-2xl font-black text-gray-900">{audit.percentage}%</div>
              <div className="text-[11px] font-semibold text-gray-500">Progreso Global</div>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-center">
              <div className="text-2xl font-black text-emerald-600">{audit.answeredCount} / {audit.totalActive}</div>
              <div className="text-[11px] font-semibold text-gray-500">Respondidas</div>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-center">
              <div className="text-2xl font-black text-blue-600">{audit.consistencyScore}%</div>
              <div className="text-[11px] font-semibold text-gray-500">Índice Consistencia</div>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-center">
              <div className="text-2xl font-black text-[#D7192B]">{audit.signals.length}</div>
              <div className="text-[11px] font-semibold text-gray-500">Alertas Detectadas</div>
            </div>
          </div>

          {/* MADUREZ POR FASE DE CONSULTORÍA */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#D7192B]" />
              Alineación y Madurez por Fases de Digital Business Day (0 a 8)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {CONSULTING_PHASES.map((ph) => {
                const readiness = audit.phaseReadiness[ph.code] || { total: 0, answered: 0, percentage: 0 };
                return (
                  <div key={ph.code} className="p-3 bg-gray-50 border border-gray-200 rounded-lg space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900">{ph.code}: {ph.name}</span>
                      <span className="font-mono text-xs font-bold text-[#D7192B]">{readiness.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#D7192B] h-full transition-all"
                        style={{ width: `${readiness.percentage}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-gray-500 flex justify-between">
                      <span>{readiness.answered} de {readiness.total} preguntas</span>
                      <span>{ph.exerciseCount} {ph.exerciseCount === 1 ? 'ejercicio' : 'ejercicios'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SEÑALES DE CONTRASTE: DISCURSO VS EVIDENCIA */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-[#D7192B]" />
              Contraste de Necesidades Reales vs Discurso del Cliente
            </h3>

            {audit.signals.length === 0 ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Excelente coherencia. No se han detectado contradicciones críticas en las respuestas actuales.</span>
              </div>
            ) : (
              <div className="space-y-2.5">
                {audit.signals.map((sig, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                      sig.type === 'red'
                        ? 'bg-rose-50 border-rose-200 text-rose-950'
                        : sig.type === 'yellow'
                        ? 'bg-amber-50 border-amber-200 text-amber-950'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    }`}
                  >
                    <div className="flex items-center justify-between font-black">
                      <span className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${sig.type === 'red' ? 'bg-rose-600' : sig.type === 'yellow' ? 'bg-amber-600' : 'bg-emerald-600'}`} />
                        {sig.title}
                      </span>
                      {sig.area && (
                        <span className="text-[10px] uppercase font-bold tracking-wider opacity-70">
                          {sig.area}
                        </span>
                      )}
                    </div>

                    <p className="text-gray-700 leading-relaxed">{sig.text}</p>

                    {sig.clientClaim && (
                      <div className="p-2 bg-white/80 rounded border border-gray-200/60 text-[11px] space-y-1">
                        <div><strong className="text-gray-900">Lo que el cliente declara:</strong> {sig.clientClaim}</div>
                        <div><strong className="text-rose-700">Evidencia contrastada:</strong> {sig.evidenceFound}</div>
                      </div>
                    )}

                    {sig.trueNeed && (
                      <div className="text-[11px] font-semibold text-emerald-800 pt-0.5">
                        <strong>Necesidad real a resolver en entrega:</strong> {sig.trueNeed}
                      </div>
                    )}

                    {sig.recommendedExercises && (
                      <div className="text-[10px] text-gray-500 pt-1 flex items-center gap-1 flex-wrap">
                        <span>Ejercicios para la transformación:</span>
                        {sig.recommendedExercises.map(e => (
                          <span key={e} className="bg-white px-1.5 py-0.5 rounded border border-gray-200 font-bold text-gray-800">
                            {e}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PREGUNTAS PENDIENTES */}
          {audit.pendingQuestions.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 flex items-center justify-between">
                <span>Reactivos Pendientes ({audit.pendingQuestions.length})</span>
                <span className="text-gray-400 font-normal text-[11px]">Haz clic para ir directamente</span>
              </h3>
              <div className="max-h-40 overflow-y-auto space-y-1 pr-1">
                {audit.pendingQuestions.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => {
                      onJumpToQuestion(q.id);
                      onClose();
                    }}
                    className="w-full text-left p-2 rounded-lg bg-gray-50 hover:bg-rose-50 border border-gray-200 hover:border-rose-200 text-xs flex items-center justify-between transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      <span className="font-mono text-[10px] font-bold text-[#D7192B] shrink-0">
                        {q.id}
                      </span>
                      <span className="text-gray-700 group-hover:text-gray-900 truncate">
                        {q.text}
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#D7192B] shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Modal con acciones */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-2.5">
          <button
            onClick={onFillTestData}
            className="px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-white text-gray-700 text-xs font-medium transition-all"
          >
            Autocompletar sesión con datos de prueba
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg border border-gray-300 hover:bg-white text-gray-700 text-xs font-bold transition-all"
            >
              Continuar respondiendo
            </button>

            <button
              onClick={() => {
                onFinishSession();
                onClose();
              }}
              className="px-4 py-1.5 rounded-lg bg-[#D7192B] hover:bg-[#b91222] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1"
            >
              <span>Generar Informe y Cerrar Sesión</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
