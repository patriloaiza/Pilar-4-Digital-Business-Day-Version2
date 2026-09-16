import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  FileText,
  Lock,
  Sparkles,
  TriangleAlert,
  Check,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { Question, SessionState } from '../types';
import { ensureArray, isQuestionNA, isQuestionHandled } from '../utils/bmsLogic';

interface QuestionCardProps {
  question: Question;
  index: number;
  totalActive: number;
  state: SessionState;
  onSetSingleAnswer: (qId: string, value: string) => void;
  onToggleMultiAnswer: (qId: string, value: string, checked: boolean) => void;
  onSetOpenAnswer: (qId: string, value: string) => void;
  onSetMatrixValue: (qId: string, solution: string, func: string) => void;
  onSetNA: (qId: string, isNA: boolean) => void;
  onUpdateField: (
    field: 'additionalInfo' | 'evidence' | 'observations' | 'privateNotes',
    qId: string,
    value: string
  ) => void;
  onPrevious: () => void;
  onNext: () => void;
  onOpenEvaluation: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  totalActive,
  state,
  onSetSingleAnswer,
  onToggleMultiAnswer,
  onSetOpenAnswer,
  onSetNA,
  onUpdateField,
  onPrevious,
  onNext,
  onOpenEvaluation
}) => {
  const isNA = isQuestionNA(question, state.na);
  const isAnswered = isQuestionHandled(question, state.answers, state.matrix, state.na);
  const alignment = question.alignment;

  return (
    <article
      id={`question-card-${question.id}`}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6 transition-all"
    >
      {/* Barra superior de la tarjeta con Fase y Meta */}
      <div className="bg-gray-50/90 border-b border-gray-200 px-5 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-xs font-black tracking-wider bg-[#111111] text-white px-2.5 py-1 rounded">
            {question.id}
          </span>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            {question.section}
          </span>
          {question.isEssential && (
            <span className="bg-rose-100 text-[#D7192B] border border-rose-200 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
              Esencial
            </span>
          )}
          {alignment?.isControlQuestion && (
            <span className="bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <TriangleAlert className="w-3 h-3 text-amber-600" />
              Control: Evidencia vs Discurso
            </span>
          )}
        </div>

        <div className="text-xs font-semibold text-gray-500">
          Reactivo <strong className="text-gray-900">{index + 1}</strong> de{' '}
          <strong className="text-gray-900">{totalActive}</strong>
        </div>
      </div>

      {/* Cuerpo principal de la pregunta */}
      <div className="p-6 sm:p-8 space-y-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug">
            {question.text}
          </h2>
          {question.help && (
            <p className="mt-2 text-sm text-gray-600 leading-relaxed flex items-start gap-2">
              <CircleHelp className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <span>{question.help}</span>
            </p>
          )}
          {question.example && (
            <div className="mt-2.5 px-3 py-2 bg-gray-50 border-l-2 border-gray-300 rounded text-xs text-gray-600 italic">
              <strong>Referencia:</strong> {question.example}
            </div>
          )}
        </div>

        {/* ALINEACIÓN DE CONSULTORÍA Y TRANSFORMACIÓN */}
        {alignment && (
          <div className="p-4 bg-gradient-to-r from-rose-50/70 to-orange-50/40 rounded-xl border border-rose-100/90 text-xs space-y-2">
            <div className="flex items-center justify-between gap-2 flex-wrap pb-1.5 border-b border-rose-200/50">
              <div className="flex items-center gap-1.5 font-bold text-[#D7192B]">
                <Compass className="w-4 h-4" />
                <span>Alineación Consultoría: {alignment.phase}</span>
              </div>
              <span className="text-[11px] font-semibold text-gray-600">
                Entregable: <strong className="text-gray-900">{alignment.deliverable}</strong>
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-0.5">
              <span className="text-[11px] font-medium text-gray-500">Ejercicios a reforzar:</span>
              {alignment.exercises.map((ex) => (
                <span
                  key={ex}
                  className="bg-white/90 border border-rose-200 text-[#b91222] font-semibold px-2 py-0.5 rounded text-[10px]"
                >
                  {ex}
                </span>
              ))}
            </div>

            <div className="text-gray-700 leading-relaxed text-[11px] pt-1">
              <strong className="text-gray-900">Cómo se logra la transformación:</strong>{' '}
              {alignment.transformationPurpose}
            </div>
          </div>
        )}

        {/* CONTROLES DE RESPUESTA SEGÚN TIPO */}
        <div className="pt-2">
          {/* TIPO: ÚNICA OPCIÓN */}
          {question.type === 'single' && question.options && (
            <div className="space-y-2.5">
              {question.options.map((opt) => {
                const isSelected = state.answers[question.id] === opt;
                return (
                  <label
                    key={opt}
                    className={`flex items-start gap-3.5 p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-rose-50/50 border-[#D7192B] ring-1 ring-[#D7192B]'
                        : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50/60'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`radio-${question.id}`}
                      checked={isSelected}
                      onChange={() => onSetSingleAnswer(question.id, opt)}
                      className="mt-1 w-4 h-4 text-[#D7192B] focus:ring-[#D7192B]"
                    />
                    <span className="text-sm font-medium text-gray-800 leading-snug">{opt}</span>
                  </label>
                );
              })}
            </div>
          )}

          {/* TIPO: MÚLTIPLE SELECCIÓN */}
          {question.type === 'multi' && question.options && (
            <div className="space-y-2.5">
              {question.options.map((opt) => {
                const currentArr = ensureArray(state.answers[question.id]);
                const isChecked = currentArr.includes(opt);
                return (
                  <label
                    key={opt}
                    className={`flex items-start gap-3.5 p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-rose-50/50 border-[#D7192B] ring-1 ring-[#D7192B]'
                        : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50/60'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => onToggleMultiAnswer(question.id, opt, e.target.checked)}
                      className="mt-1 w-4 h-4 text-[#D7192B] rounded focus:ring-[#D7192B]"
                    />
                    <span className="text-sm font-medium text-gray-800 leading-snug">{opt}</span>
                  </label>
                );
              })}
            </div>
          )}

          {/* TIPO: PREGUNTA ABIERTA DE DESARROLLO */}
          {question.type === 'open' && (
            <div>
              <textarea
                value={String(state.answers[question.id] || '')}
                onChange={(e) => onSetOpenAnswer(question.id, e.target.value)}
                placeholder={question.placeholder || 'Escribe detalladamente tu respuesta aquí...'}
                rows={4}
                className="w-full p-4 rounded-xl border border-gray-300 focus:border-[#D7192B] focus:ring-2 focus:ring-[#D7192B]/20 text-sm text-gray-900 leading-relaxed outline-none transition-all placeholder:text-gray-400"
              />
            </div>
          )}
        </div>

        {/* SECCIÓN DE CAMPOS ESTRATÉGICOS DEL CONSULTOR (EVIDENCIA VS DISCURSO) */}
        <details className="group border-t border-gray-100 pt-3">
          <summary className="cursor-pointer text-xs font-bold text-gray-500 hover:text-gray-800 py-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#D7192B]" />
              Notas de Consultor, Evidencias tangibles y Observaciones
            </span>
            <span className="text-[11px] text-gray-400 group-open:rotate-180 transition-transform">
              ▼
            </span>
          </summary>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                Evidencias contrastadas (enlaces, cifras, hechos)
              </label>
              <textarea
                value={state.evidence?.[question.id] || ''}
                onChange={(e) => onUpdateField('evidence', question.id, e.target.value)}
                placeholder="Hechos observados o comprobados que contrastan con lo dicho..."
                rows={2}
                className="w-full p-2.5 text-xs bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#D7192B] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                Observaciones estratégicas para la entrega
              </label>
              <textarea
                value={state.observations?.[question.id] || ''}
                onChange={(e) => onUpdateField('observations', question.id, e.target.value)}
                placeholder="Comentarios clave para explicar la transformación en el reporte..."
                rows={2}
                className="w-full p-2.5 text-xs bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#D7192B] focus:bg-white"
              />
            </div>
          </div>
        </details>
      </div>

      {/* Footer de navegación interna de la tarjeta */}
      <div className="bg-gray-50 px-6 sm:px-8 py-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isNA}
              onChange={(e) => onSetNA(question.id, e.target.checked)}
              className="w-3.5 h-3.5 rounded text-amber-600 focus:ring-amber-500"
            />
            <span>No aplica (N/A) a este perfil</span>
          </label>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onPrevious}
            disabled={index === 0}
            className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-40 disabled:pointer-events-none text-xs font-bold transition-all flex items-center gap-1"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Anterior</span>
          </button>

          <button
            onClick={onNext}
            disabled={index === totalActive - 1}
            className="px-4 py-1.5 rounded-lg bg-[#D7192B] hover:bg-[#b91222] text-white disabled:opacity-40 disabled:pointer-events-none text-xs font-bold transition-all flex items-center gap-1 shadow-sm"
          >
            <span>Siguiente</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
