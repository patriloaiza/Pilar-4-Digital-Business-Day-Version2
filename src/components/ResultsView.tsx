import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  CircleAlert,
  CircleCheck,
  Copy,
  Download,
  FileDown,
  FileText,
  Lock,
  RotateCcw,
  ShieldCheck,
  Compass,
  Layers,
  Sparkles,
  Flame
} from 'lucide-react';
import { SessionState } from '../types';
import {
  calculateProgress,
  downloadFile,
  evaluateSignals,
  formatAnswer,
  generateClientOrConsultantHtml,
  generateExportJson,
  getActiveQuestions,
  isQuestionNA,
  printOrDownloadPdf,
  safeFileName
} from '../utils/bmsLogic';
import { coreQuestions } from '../data/questions';
import { CONSULTING_PHASES } from '../data/phases';

interface ResultsViewProps {
  state: SessionState;
  onReturnToSurvey: () => void;
  onResetSession: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  state,
  onReturnToSurvey,
  onResetSession
}) => {
  const progress = calculateProgress(state.answers, state.matrix, state.na);
  const activeQuestions = getActiveQuestions(state.answers);
  const signals = evaluateSignals(state);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'phases' | 'signals'>('phases');

  const totalExercises = CONSULTING_PHASES.reduce((acc, p) => acc + p.exerciseCount, 0);

  const handleDownloadJson = () => {
    const doc = generateExportJson(state);
    const jsonStr = JSON.stringify(doc, null, 2);
    downloadFile(jsonStr, `${safeFileName(state.clientName)}.json`, 'application/json;charset=utf-8');
  };

  const handleCopyJson = async () => {
    const doc = generateExportJson(state);
    const jsonStr = JSON.stringify(doc, null, 2);
    try {
      await navigator.clipboard.writeText(jsonStr);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = jsonStr;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleExportClientPdf = () => {
    printOrDownloadPdf(state, false);
  };

  const handleExportConsultantPdf = () => {
    printOrDownloadPdf(state, true);
  };

  const handleDownloadClientHtml = () => {
    const html = generateClientOrConsultantHtml(state, false);
    downloadFile(
      html,
      `${safeFileName(state.clientName)}_informe_digital_business_day.html`,
      'text/html;charset=utf-8'
    );
  };

  const handleDownloadConsultantHtml = () => {
    const html = generateClientOrConsultantHtml(state, true);
    downloadFile(
      html,
      `${safeFileName(state.clientName)}_expediente_consultor_estrategico.html`,
      'text/html;charset=utf-8'
    );
  };

  return (
    <div id="results-view" className="space-y-6 animate-fade-in pb-16">
      {/* Banner Principal */}
      <section className="bg-[#111111] text-white rounded-2xl shadow-xl border-t-8 border-[#D7192B] p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-800">
          <div>
            <div className="text-[11px] font-black uppercase tracking-widest text-[#D7192B] mb-1 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5" />
              PATRICIA LOAIZA · CREA Y MONETIZA™
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Expediente Estratégico · Pilar 4 Digital Business Day
            </h1>
            <p className="text-sm text-gray-400 mt-1 max-w-2xl">
              Radiografía diagnóstica con hoja de ruta productizada alineada a 9 fases de Digital Business Day para {state.clientName || 'Cliente'}.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onReturnToSurvey}
              className="px-3.5 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a editar</span>
            </button>
            <button
              onClick={onResetSession}
              className="px-3 py-2 rounded-xl border border-gray-700 hover:bg-gray-800 text-gray-400 hover:text-white text-xs font-medium transition-all"
            >
              Nueva sesión
            </button>
          </div>
        </div>

        {/* Métricas clave */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6">
          <div className="p-3.5 bg-black/40 rounded-xl border border-gray-800">
            <div className="text-xs text-gray-400">Progreso Total</div>
            <div className="text-2xl font-black text-white mt-0.5">{progress.percentage}%</div>
            <div className="text-[10px] text-gray-500 mt-1">{progress.answered} de {progress.total} respondidas</div>
          </div>

          <div className="p-3.5 bg-black/40 rounded-xl border border-gray-800">
            <div className="text-xs text-gray-400">Fases Cubiertas</div>
            <div className="text-2xl font-black text-emerald-400 mt-0.5">9 de 9</div>
            <div className="text-[10px] text-gray-500 mt-1">Fase 0 a Fase 8</div>
          </div>

          <div className="p-3.5 bg-black/40 rounded-xl border border-gray-800">
            <div className="text-xs text-gray-400">Ejercicios Mapeados</div>
            <div className="text-2xl font-black text-blue-400 mt-0.5">{totalExercises}</div>
            <div className="text-[10px] text-gray-500 mt-1">Servicio productizado</div>
          </div>

          <div className="p-3.5 bg-black/40 rounded-xl border border-gray-800">
            <div className="text-xs text-gray-400">Alertas Detectadas</div>
            <div className="text-2xl font-black text-[#D7192B] mt-0.5">{signals.length}</div>
            <div className="text-[10px] text-gray-500 mt-1">Contraste verdad vs discurso</div>
          </div>
        </div>
      </section>

      {/* Botones de Descarga y Exportación */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-[#D7192B]" />
            <h2 className="text-base font-black text-gray-900">
              Exportación Oficial de Entregables
            </h2>
          </div>
          <div className="text-xs text-gray-500">
            Generación instantánea en HTML, PDF y JSON
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={handleExportClientPdf}
            className="p-3.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl text-left transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <FileDown className="w-5 h-5 text-[#D7192B]" />
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#D7192B] text-white px-2 py-0.5 rounded">
                PDF
              </span>
            </div>
            <div>
              <div className="font-bold text-xs text-gray-900 group-hover:text-[#D7192B]">
                Informe para Cliente (PDF)
              </div>
              <div className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                Versión ejecutiva con mapa de fases y ejercicios de transformación.
              </div>
            </div>
          </button>

          <button
            onClick={handleExportConsultantPdf}
            className="p-3.5 bg-gray-900 hover:bg-black text-white rounded-xl text-left transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500 text-black px-2 py-0.5 rounded">
                CONFIDENCIAL
              </span>
            </div>
            <div>
              <div className="font-bold text-xs text-white">
                Dossier del Consultor (PDF)
              </div>
              <div className="text-[11px] text-gray-300 mt-0.5 leading-snug">
                Incluye análisis de contradicciones, evidencias y notas privadas.
              </div>
            </div>
          </button>

          <button
            onClick={handleDownloadClientHtml}
            className="p-3.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-left transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-5 h-5 text-gray-700" />
              <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                HTML
              </span>
            </div>
            <div>
              <div className="font-bold text-xs text-gray-900">
                Descargar HTML Autónomo
              </div>
              <div className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                Archivo independiente para abrir en cualquier navegador o adjuntar.
              </div>
            </div>
          </button>

          <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-gray-700">{`{ JSON }`}</span>
              {copied && <span className="text-[10px] font-bold text-emerald-600">¡Copiado!</span>}
            </div>
            <div>
              <div className="font-bold text-xs text-gray-900 mb-2">
                Datos Crudos JSON
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleDownloadJson}
                  className="flex-1 py-1.5 px-2 bg-white hover:bg-gray-100 border border-gray-300 rounded text-[11px] font-bold text-gray-700 text-center"
                >
                  Descargar
                </button>
                <button
                  onClick={handleCopyJson}
                  className="py-1.5 px-2 bg-white hover:bg-gray-100 border border-gray-300 rounded text-[11px] font-bold text-gray-700"
                  title="Copiar JSON al portapapeles"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navegación por pestañas de resultados */}
      <div className="flex border-b border-gray-200 gap-2">
        <button
          onClick={() => setActiveTab('phases')}
          className={`pb-3 px-4 text-xs font-extrabold transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
            activeTab === 'phases'
              ? 'border-[#D7192B] text-[#D7192B]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Roadmap de Servicio (Fases 0 a 8)</span>
        </button>

        <button
          onClick={() => setActiveTab('signals')}
          className={`pb-3 px-4 text-xs font-extrabold transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
            activeTab === 'signals'
              ? 'border-[#D7192B] text-[#D7192B]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Contraste Estratégico ({signals.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('all')}
          className={`pb-3 px-4 text-xs font-extrabold transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
            activeTab === 'all'
              ? 'border-[#D7192B] text-[#D7192B]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Los 36 Reactivos Clave</span>
        </button>
      </div>

      {/* PESTAÑA: HOJA DE RUTA POR FASES Y EJERCICIOS */}
      {activeTab === 'phases' && (
        <div className="space-y-6">
          {CONSULTING_PHASES.map((phase) => {
            const phaseQuestions = coreQuestions.filter(q => q.alignment?.phaseNumber === phase.number);
            return (
              <div key={phase.code} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
                <div className="bg-gray-50 p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black bg-[#D7192B] text-white px-2 py-0.5 rounded">
                        {phase.code}
                      </span>
                      <h3 className="font-black text-gray-900 text-sm sm:text-base">{phase.name}</h3>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{phase.subtitle}</p>
                  </div>
                  <div className="text-xs font-semibold text-gray-500">
                    {phaseQuestions.length} reactivos alineados · {phase.exerciseCount} ejercicios
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  {/* Ejercicios asociados a la fase */}
                  <div>
                    <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Ejercicios de la Consultoría a Realizar en esta Fase:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                      {phase.exercises.map(ex => (
                        <div key={ex.code} className="p-2.5 bg-rose-50/50 border border-rose-100 rounded-lg">
                          <div className="font-bold text-[#b91222]">{ex.code} · {ex.name}</div>
                          <div className="text-[11px] text-gray-600 mt-0.5 leading-snug">{ex.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Preguntas de diagnóstico para esta fase */}
                  <div className="pt-2 border-t border-gray-100">
                    <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">
                      Evidencias y Respuestas Recogidas para la Entrega:
                    </div>
                    <div className="space-y-3">
                      {phaseQuestions.map(q => {
                        const isNA = isQuestionNA(q, state.na);
                        return (
                          <div key={q.id} className="p-3 bg-gray-50/60 rounded-lg border border-gray-200 text-xs space-y-1.5">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono font-bold text-[#D7192B] text-[11px]">{q.id}</span>
                              {q.alignment?.deliverable && (
                                <span className="text-[10px] bg-white border border-gray-200 text-gray-700 px-1.5 py-0.5 rounded font-medium">
                                  Entregable: {q.alignment.deliverable}
                                </span>
                              )}
                            </div>
                            <div className="font-bold text-gray-900">{q.text}</div>
                            <div className="text-gray-800 bg-white p-2 rounded border border-gray-200">
                              {isNA ? (
                                <span className="text-amber-600 italic">No aplica (N/A)</span>
                              ) : (
                                formatAnswer(q, state.answers[q.id])
                              )}
                            </div>
                            {q.alignment?.transformationPurpose && (
                              <div className="text-[11px] text-gray-600 bg-emerald-50/60 p-2 rounded border border-emerald-100">
                                <strong className="text-emerald-900">Transformación que se logra:</strong> {q.alignment.transformationPurpose}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* PESTAÑA: SEÑALES DE CONTRASTE */}
      {activeTab === 'signals' && (
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed">
            <strong>Matriz de Contraste Estratégico (Lo que el cliente dice vs las evidencias):</strong>{' '}
            Esta sección contrasta los deseos u opiniones del cliente con su realidad operativa, capacidad de horas, números de conversión y ausencia de sistemas. Permite justificar por qué el servicio debe reforzar determinados ejercicios.
          </div>

          <div className="space-y-3">
            {signals.map((sig, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-xl border space-y-2 ${
                  sig.type === 'red'
                    ? 'bg-rose-50/70 border-rose-200'
                    : sig.type === 'yellow'
                    ? 'bg-amber-50/70 border-amber-200'
                    : 'bg-emerald-50/70 border-emerald-200'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-black text-sm text-gray-900 flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${sig.type === 'red' ? 'bg-rose-600' : sig.type === 'yellow' ? 'bg-amber-600' : 'bg-emerald-600'}`} />
                    {sig.title}
                  </h3>
                  {sig.area && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600 bg-white px-2 py-0.5 rounded border border-gray-200">
                      {sig.area}
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-700 leading-relaxed">{sig.text}</p>

                {sig.clientClaim && (
                  <div className="p-3 bg-white rounded-lg border border-gray-200 text-xs space-y-1">
                    <div><strong className="text-gray-900">Discurso del cliente:</strong> {sig.clientClaim}</div>
                    <div><strong className="text-rose-700">Evidencia encontrada:</strong> {sig.evidenceFound}</div>
                  </div>
                )}

                {sig.trueNeed && (
                  <div className="text-xs font-semibold text-emerald-800 bg-emerald-100/50 p-2.5 rounded-lg border border-emerald-200">
                    <strong>Cómo se logra la transformación:</strong> {sig.trueNeed}
                  </div>
                )}

                {sig.recommendedExercises && (
                  <div className="text-xs text-gray-600 pt-1 flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold">Ejercicios obligatorios a reforzar:</span>
                    {sig.recommendedExercises.map(e => (
                      <span key={e} className="bg-white px-2 py-0.5 rounded border border-gray-300 font-bold text-[#b91222]">
                        {e}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PESTAÑA: TODAS LAS PREGUNTAS (36) */}
      {activeTab === 'all' && (
        <div className="space-y-4">
          <div className="text-xs text-gray-500 font-medium">
            Listado completo de los 36 reactivos aplicados en la sesión:
          </div>
          <div className="space-y-3">
            {activeQuestions.map((q, idx) => {
              const isNA = isQuestionNA(q, state.na);
              return (
                <div key={q.id} className="p-4 bg-white rounded-xl border border-gray-200 text-xs space-y-2 shadow-xs">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-xs text-[#D7192B] bg-rose-50 px-2 py-0.5 rounded">
                        {q.id}
                      </span>
                      <span className="text-gray-500 font-semibold">{q.section}</span>
                    </div>
                    {q.alignment && (
                      <span className="text-[10px] text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                        {q.alignment.phase}
                      </span>
                    )}
                  </div>

                  <div className="text-sm font-bold text-gray-900">{q.text}</div>

                  <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200 text-gray-800">
                    {isNA ? (
                      <span className="text-amber-600 font-semibold">No aplica (N/A)</span>
                    ) : (
                      formatAnswer(q, state.answers[q.id])
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
