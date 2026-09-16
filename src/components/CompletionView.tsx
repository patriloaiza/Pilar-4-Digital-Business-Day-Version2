import React, { useState } from 'react';
import {
  ArrowLeft,
  BarChart3,
  Check,
  Copy,
  Download,
  FileDown,
  FileText,
  Lock,
  RotateCcw,
  Sparkles,
  Compass,
  Layers,
  Flame
} from 'lucide-react';
import { SessionState } from '../types';
import {
  calculateProgress,
  downloadFile,
  formatTime,
  generateClientOrConsultantHtml,
  generateExportJson,
  printOrDownloadPdf,
  safeFileName
} from '../utils/bmsLogic';

interface CompletionViewProps {
  state: SessionState;
  onShowResults: () => void;
  onReturnToSurvey: () => void;
  onResetSession: () => void;
}

export const CompletionView: React.FC<CompletionViewProps> = ({
  state,
  onShowResults,
  onReturnToSurvey,
  onResetSession
}) => {
  const progress = calculateProgress(state.answers, state.matrix, state.na);
  const [copied, setCopied] = useState(false);

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

  return (
    <div id="completion-view" className="space-y-6 animate-fade-in pb-16">
      <section className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-[#171717] to-[#252525] text-white p-6 sm:p-10 border-b-4 border-[#D7192B]">
          <div className="flex items-center gap-2.5 text-[#f55364] font-mono text-xs font-black uppercase tracking-widest mb-3">
            <Flame className="w-4 h-4" />
            <span>Diagnóstico Completado · Pilar 4 Digital Business Day</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            ¡Diagnóstico de Digital Business Day Finalizado!
          </h1>
          <p className="text-sm sm:text-base text-gray-300 mt-2 max-w-2xl leading-relaxed">
            Se han procesado las 36 respuestas clave de{' '}
            <strong className="text-white font-bold">{state.clientName || 'la empresa'}</strong>. Las
            respuestas han quedado vinculadas a los 41 ejercicios de las 9 fases del servicio productizado.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <div className="text-[11px] text-gray-400">Progreso total</div>
              <div className="text-2xl font-black text-white mt-0.5">{progress.percentage}%</div>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <div className="text-[11px] text-gray-400">Respuestas registradas</div>
              <div className="text-2xl font-black text-emerald-400 mt-0.5">
                {progress.answered}
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <div className="text-[11px] text-gray-400">Fases cubiertas</div>
              <div className="text-2xl font-black text-blue-400 mt-0.5">9 de 9</div>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <div className="text-[11px] text-gray-400">Tiempo de sesión</div>
              <div className="text-xl font-bold text-gray-200 mt-0.5">
                {formatTime(state.elapsedSeconds)}
              </div>
            </div>
          </div>
        </div>

        {/* Acciones principales */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-gray-900">
                Siguientes pasos con el cliente
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Accede al panel de resultados o descarga la documentación en el formato que requieras.
              </p>
            </div>

            <button
              onClick={onShowResults}
              className="px-5 py-2.5 rounded-xl bg-[#D7192B] hover:bg-[#b91222] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Ver Hoja de Ruta y Resultados Completos</span>
            </button>
          </div>

          {/* Tarjetas de descarga */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
            <button
              onClick={handleExportClientPdf}
              className="p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-left transition-all group flex flex-col justify-between cursor-pointer"
            >
              <div>
                <FileDown className="w-5 h-5 text-[#D7192B] mb-2" />
                <div className="font-bold text-xs text-gray-900 group-hover:text-[#D7192B]">
                  Informe Ejecutivo (PDF)
                </div>
                <div className="text-[11px] text-gray-500 mt-1">
                  Documento limpio y formateado con las 9 fases listo para entregar al cliente.
                </div>
              </div>
              <span className="text-[11px] font-bold text-[#D7192B] mt-4 flex items-center gap-1">
                Imprimir / Guardar PDF →
              </span>
            </button>

            <button
              onClick={handleExportConsultantPdf}
              className="p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-left transition-all group flex flex-col justify-between cursor-pointer"
            >
              <div>
                <Lock className="w-5 h-5 text-gray-800 mb-2" />
                <div className="font-bold text-xs text-gray-900">
                  Expediente de Consultoría (Confidencial)
                </div>
                <div className="text-[11px] text-gray-500 mt-1">
                  Incluye contrastes de control, notas de consultor y plan de transformación.
                </div>
              </div>
              <span className="text-[11px] font-bold text-gray-800 mt-4 flex items-center gap-1">
                Generar Expediente →
              </span>
            </button>

            <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex flex-col justify-between">
              <div>
                <FileText className="w-5 h-5 text-gray-700 mb-2" />
                <div className="font-bold text-xs text-gray-900">
                  Exportación de Datos Crudos (JSON)
                </div>
                <div className="text-[11px] text-gray-500 mt-1">
                  Para guardar respaldo o importar en Notion, CRM o plataformas externas.
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={handleDownloadJson}
                  className="flex-1 py-1.5 px-3 bg-white hover:bg-gray-200 border border-gray-300 rounded text-xs font-bold text-gray-700 text-center cursor-pointer"
                >
                  Descargar
                </button>
                <button
                  onClick={handleCopyJson}
                  className="py-1.5 px-3 bg-white hover:bg-gray-200 border border-gray-300 rounded text-xs font-bold text-gray-700 flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={onReturnToSurvey}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a revisar respuestas</span>
            </button>

            <button
              onClick={onResetSession}
              className="px-4 py-2 rounded-lg text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar cuestionario</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
