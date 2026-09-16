import React, { useState } from 'react';
import { Check, Play, RefreshCw, Sparkles, TriangleAlert } from 'lucide-react';
import { SessionState, TestSuiteResult } from '../types';
import { runTestSuite } from '../utils/bmsLogic';

interface TestModePanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentState: SessionState;
  onFillTestData: () => void;
  onResetSession: () => void;
}

export const TestModePanel: React.FC<TestModePanelProps> = ({
  isOpen,
  currentState,
  onFillTestData,
  onResetSession
}) => {
  const [testResult, setTestResult] = useState<TestSuiteResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  if (!isOpen) return null;

  const handleRunTests = () => {
    setIsRunning(true);
    setTimeout(() => {
      const result = runTestSuite(currentState);
      setTestResult(result);
      setIsRunning(false);
    }, 100);
  };

  return (
    <section
      id="testPanel"
      className="bg-[#111111] text-white rounded-xl shadow-lg border border-gray-800 p-5 sm:p-6 mb-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <h3 className="text-base font-black text-white">
              Modo Prueba y Verificación Técnica
            </h3>
          </div>
          <p className="text-xs text-gray-400 mt-1 max-w-xl">
            Verificación metodológica de los 36 reactivos de Digital Business Day, cobertura de las 9 fases
            del servicio y detección de señales de contraste (lo que el cliente manifiesta querer vs lo que realmente necesita).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onResetSession}
            className="px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/60 text-xs font-bold transition-all flex items-center gap-1.5"
            title="Borrar respuestas y comenzar prueba manual pregunta por pregunta"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Vaciar para prueba manual
          </button>

          <button
            onClick={onFillTestData}
            className="px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 text-xs font-bold transition-all flex items-center gap-1.5"
            title="Llenar respuestas de prueba para simular sesión"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Llenar datos de prueba
          </button>

          <button
            onClick={handleRunTests}
            disabled={isRunning}
            className="px-4 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-xs font-black transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-black" />
            {isRunning ? 'Ejecutando...' : 'Ejecutar batería de 20 pruebas'}
          </button>
        </div>
      </div>

      {testResult && (
        <div className="mt-5 space-y-4">
          <div
            className={`p-4 rounded-xl text-sm font-black flex items-center justify-between ${
              testResult.passed === testResult.total
                ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/80 border border-rose-500/40 text-rose-300'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {testResult.passed === testResult.total ? (
                <Check className="w-5 h-5 text-emerald-400" />
              ) : (
                <TriangleAlert className="w-5 h-5 text-rose-400" />
              )}
              <span>
                Resultado: {testResult.passed} de {testResult.total} superadas (
                {testResult.percentage}%)
              </span>
            </div>
            <span className="text-xs font-semibold text-gray-300">
              {testResult.passed === testResult.total
                ? '✓ Todas las pruebas fueron superadas con éxito'
                : '⚠ Hay pruebas que requieren revisión'}
            </span>
          </div>

          <div className="divide-y divide-gray-800/80 max-h-72 overflow-y-auto pr-1">
            {testResult.tests.map((t, idx) => (
              <div
                key={idx}
                className={`py-2 text-xs flex items-start justify-between gap-3 ${
                  t.pass ? 'text-emerald-300' : 'text-rose-400'
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="font-mono text-gray-500">
                    {String(idx + 1).padStart(2, '0')} ·
                  </span>
                  <div>
                    <span className="font-semibold">{t.title}</span>
                    {t.detail && (
                      <div className="text-[11px] text-gray-400 mt-0.5">{t.detail}</div>
                    )}
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    t.pass
                      ? 'bg-emerald-900/50 text-emerald-200'
                      : 'bg-rose-900/50 text-rose-200'
                  }`}
                >
                  {t.pass ? 'PASS' : 'FAIL'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
