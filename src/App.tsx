import { useState, useEffect, useCallback, useRef } from 'react';
import { SessionState } from './types';
import { DEFAULT_CONSULTANT, STORAGE_KEY, CORE_TOTAL } from './data/questions';
import {
  calculateProgress,
  cleanInactiveConditionals,
  clone,
  createInitialState,
  fillTestData,
  findQuestionById,
  getActiveQuestions,
  getAuditReport,
  isQuestionHandled,
  downloadFile,
  safeFileName
} from './utils/bmsLogic';
import { Topbar } from './components/Topbar';
import { CoverHeader } from './components/CoverHeader';
import { QuestionCard } from './components/QuestionCard';
import { BottomBar } from './components/BottomBar';
import { EvaluationModal } from './components/EvaluationModal';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { TestModePanel } from './components/TestModePanel';
import { CompletionView } from './components/CompletionView';
import { ResultsView } from './components/ResultsView';
import { PendingQuestionsBanner } from './components/PendingQuestionsBanner';

export default function App() {
  const [session, setSession] = useState<SessionState>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
      if (saved) {
        const parsed = JSON.parse(saved);
        const base = createInitialState();
        return {
          ...base,
          ...parsed,
          answers: { ...base.answers, ...(parsed.answers || {}) },
          matrix: { ...base.matrix, ...(parsed.matrix || {}) },
          na: { ...base.na, ...(parsed.na || {}) },
          additionalInfo: { ...base.additionalInfo, ...(parsed.additionalInfo || {}) },
          evidence: { ...base.evidence, ...(parsed.evidence || {}) },
          observations: { ...base.observations, ...(parsed.observations || {}) },
          privateNotes: { ...base.privateNotes, ...(parsed.privateNotes || {}) }
        };
      }
    } catch (e) {
      console.warn('Error al cargar datos previos de localStorage', e);
    }
    return createInitialState();
  });

  const [isEvaluationOpen, setIsEvaluationOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isTestModeOpen, setIsTestModeOpen] = useState(false);
  const [activeView, setActiveView] = useState<'survey' | 'completion' | 'results'>(() =>
    session.finished ? 'completion' : 'survey'
  );

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<any>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }, []);

  const activeQuestions = getActiveQuestions(session.answers);
  const currentIdx = Math.max(
    0,
    activeQuestions.findIndex((q) => q.id === session.currentId)
  );
  const currentQuestion = activeQuestions[currentIdx] || activeQuestions[0];
  const progress = calculateProgress(session.answers, session.matrix, session.na);
  const audit = getAuditReport(session);

  // PostMessage para comunicación con iframe en GoHighLevel (GHL)
  useEffect(() => {
    const notifyParentOfHeight = () => {
      try {
        if (typeof window !== 'undefined' && window.parent && window.parent !== window) {
          const height = Math.max(
            document.documentElement?.scrollHeight || 0,
            document.body?.scrollHeight || 0,
            950
          );
          // Compatible con listener en GoHighLevel: e.data.type === 'bms-resize'
          window.parent.postMessage(
            {
              type: 'bms-resize',
              height,
              percentage: progress.percentage,
              isReady: audit.isReady
            },
            '*'
          );
          window.parent.postMessage(
            {
              type: 'mp-resize',
              height,
              percentage: progress.percentage,
              isReady: audit.isReady
            },
            '*'
          );
        }
      } catch (err) {
        console.warn('Error enviando resize al iframe padre:', err);
      }
    };

    notifyParentOfHeight();
    window.addEventListener('resize', notifyParentOfHeight);
    return () => {
      window.removeEventListener('resize', notifyParentOfHeight);
    };
  }, [progress.percentage, audit.isReady, activeView, currentIdx]);

  // Temporizador de sesión
  useEffect(() => {
    if (session.finished) return;
    const interval = setInterval(() => {
      setSession((prev) => ({
        ...prev,
        elapsedSeconds: Math.floor((Date.now() - (prev.startedAt || Date.now())) / 1000)
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, [session.finished]);

  // Guardado automático en localStorage
  const persistState = useCallback((stateToSave: SessionState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.warn('No se pudo guardar en localStorage', e);
    }
  }, []);

  // Handlers para respuestas
  const handleSetSingleAnswer = (qId: string, val: string) => {
    setSession((prev) => {
      const next = clone(prev);
      next.answers[qId] = val;
      next.na[qId] = false;
      persistState(next);
      return next;
    });
  };

  const handleToggleMultiAnswer = (qId: string, val: string, checked: boolean) => {
    setSession((prev) => {
      const next = clone(prev);
      const cur = Array.isArray(next.answers[qId]) ? [...(next.answers[qId] as string[])] : [];
      if (checked) {
        if (!cur.includes(val)) cur.push(val);
      } else {
        const idx = cur.indexOf(val);
        if (idx !== -1) cur.splice(idx, 1);
      }
      next.answers[qId] = cur;
      next.na[qId] = false;
      persistState(next);
      return next;
    });
  };

  const handleSetOpenAnswer = (qId: string, val: string) => {
    setSession((prev) => {
      const next = clone(prev);
      next.answers[qId] = val;
      next.na[qId] = false;
      persistState(next);
      return next;
    });
  };

  const handleSetNA = (qId: string, isNA: boolean) => {
    setSession((prev) => {
      const next = clone(prev);
      next.na[qId] = isNA;
      if (isNA) {
        delete next.answers[qId];
      }
      persistState(next);
      return next;
    });
  };

  const handleUpdateField = (
    field: 'additionalInfo' | 'evidence' | 'observations' | 'privateNotes',
    qId: string,
    value: string
  ) => {
    setSession((prev) => {
      const next = clone(prev);
      next[field][qId] = value;
      persistState(next);
      return next;
    });
  };

  // Navegación entre preguntas
  const handlePrevious = () => {
    if (currentIdx > 0) {
      const prevQ = activeQuestions[currentIdx - 1];
      setSession((prev) => {
        const next = clone(prev);
        next.currentId = prevQ.id;
        persistState(next);
        return next;
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (currentIdx < activeQuestions.length - 1) {
      const nextQ = activeQuestions[currentIdx + 1];
      setSession((prev) => {
        const next = clone(prev);
        next.currentId = nextQ.id;
        persistState(next);
        return next;
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleJumpToQuestion = (qId: string) => {
    const exists = activeQuestions.some((q) => q.id === qId);
    if (exists) {
      setSession((prev) => {
        const next = clone(prev);
        next.currentId = qId;
        persistState(next);
        return next;
      });
      setActiveView('survey');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Guardado manual
  const handleSaveSession = () => {
    persistState(session);
    const jsonStr = JSON.stringify(session, null, 2);
    downloadFile(jsonStr, `${safeFileName(session.clientName)}_backup.json`, 'application/json;charset=utf-8');
    showToast('Sesión guardada y descargada en archivo JSON correctamente');
  };

  // Carga de archivo
  const handleLoadSession = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event: any) => {
        try {
          const parsed = JSON.parse(event.target.result);
          const merged: SessionState = { ...createInitialState(), ...parsed };
          setSession(merged);
          persistState(merged);
          showToast('Sesión restaurada con éxito desde el archivo seleccionado');
        } catch (err) {
          alert('El archivo no tiene un formato JSON válido');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  // Finalizar sesión
  const handleFinishSession = () => {
    setSession((prev) => {
      const next = clone(prev);
      next.finished = true;
      persistState(next);
      return next;
    });
    setActiveView('completion');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('¡Diagnóstico completado! Revisa el informe generado.');
  };

  // Reiniciar sesión
  const handleConfirmReset = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.warn('No se pudo borrar localStorage', e);
    }
    setSession(createInitialState());
    setIsResetConfirmOpen(false);
    setActiveView('survey');
    showToast('Sesión reiniciada. Se han limpiado todos los datos.');
  };

  // Llenar datos de prueba
  const handleFillTestData = () => {
    const testFilled = fillTestData(session);
    setSession(testFilled);
    persistState(testFilled);
    showToast('Sesión completada con datos de prueba realistas para Digital Business Day');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-gray-900 flex flex-col font-sans selection:bg-[#D7192B] selection:text-white pb-20">
      {/* Toast de notificación */}
      {toastMessage && (
        <div className="fixed top-16 right-4 z-50 bg-[#111111] text-white px-4 py-3 rounded-xl shadow-2xl border-l-4 border-[#D7192B] text-xs font-semibold animate-slide-in flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Barra de navegación superior fija */}
      <Topbar
        currentIndex={currentIdx}
        totalActive={activeQuestions.length}
        answeredCount={progress.answered}
        pendingCount={progress.pending}
        percentage={progress.percentage}
        coreAnswered={progress.answered}
        coreTotal={CORE_TOTAL}
        conditionalActiveCount={0}
        onOpenEvaluation={() => setIsEvaluationOpen(true)}
        activeView={activeView}
        onReturnToSurvey={() => setActiveView('survey')}
        onStartManualTest={handleFillTestData}
      />

      {/* Contenedor Principal */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-6">
        {/* Banner de Preguntas Pendientes si hay más de 5 respondidas y aún faltan */}
        {activeView === 'survey' && progress.answered >= 5 && progress.pending > 0 && (
          <PendingQuestionsBanner
            pendingQuestions={activeQuestions.filter(
              (q) => !session.answers[q.id] && !session.na[q.id]
            )}
            onJumpToQuestion={handleJumpToQuestion}
          />
        )}

        {/* Modo Prueba si está abierto */}
        <TestModePanel
          isOpen={isTestModeOpen}
          onClose={() => setIsTestModeOpen(false)}
          currentState={session}
          onFillTestData={handleFillTestData}
          onResetSession={() => setIsResetConfirmOpen(true)}
        />

        {/* VISTAS CONDICIONALES */}
        {activeView === 'survey' && (
          <>
            {/* Cabecera / Identificación */}
            <CoverHeader
              clientName={session.clientName}
              clientEmail={session.clientEmail}
              consultant={session.consultant}
              onChangeClientName={(val) => {
                setSession((p) => {
                  const next = { ...p, clientName: val };
                  persistState(next);
                  return next;
                });
              }}
              onChangeClientEmail={(val) => {
                setSession((p) => {
                  const next = { ...p, clientEmail: val };
                  persistState(next);
                  return next;
                });
              }}
              onChangeConsultant={(val) => {
                setSession((p) => {
                  const next = { ...p, consultant: val };
                  persistState(next);
                  return next;
                });
              }}
            />

            {/* Tarjeta de Pregunta Activa */}
            {currentQuestion && (
              <QuestionCard
                question={currentQuestion}
                index={currentIdx}
                totalActive={activeQuestions.length}
                state={session}
                onSetSingleAnswer={handleSetSingleAnswer}
                onToggleMultiAnswer={handleToggleMultiAnswer}
                onSetOpenAnswer={handleSetOpenAnswer}
                onSetMatrixValue={() => {}}
                onSetNA={handleSetNA}
                onUpdateField={handleUpdateField}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onOpenEvaluation={() => setIsEvaluationOpen(true)}
              />
            )}
          </>
        )}

        {activeView === 'completion' && (
          <CompletionView
            state={session}
            onShowResults={() => setActiveView('results')}
            onReturnToSurvey={() => setActiveView('survey')}
            onResetSession={() => setIsResetConfirmOpen(true)}
          />
        )}

        {activeView === 'results' && (
          <ResultsView
            state={session}
            onReturnToSurvey={() => setActiveView('survey')}
            onResetSession={() => setIsResetConfirmOpen(true)}
          />
        )}
      </main>

      {/* Barra de Acciones Inferior Fija (Con los mismos botones exactos) */}
      <BottomBar
        onPrevious={handlePrevious}
        onNext={handleNext}
        canPrevious={currentIdx > 0}
        canNext={currentIdx < activeQuestions.length - 1}
        isLastQuestion={currentIdx === activeQuestions.length - 1}
        onSave={handleSaveSession}
        onLoad={handleLoadSession}
        onOpenEvaluation={() => setIsEvaluationOpen(true)}
        onFinish={handleFinishSession}
        onReset={() => setIsResetConfirmOpen(true)}
        onToggleTestMode={() => setIsTestModeOpen(!isTestModeOpen)}
        isTestModeOpen={isTestModeOpen}
        pendingCount={progress.pending}
        activeView={activeView}
        onReturnToSurvey={() => setActiveView('survey')}
      />

      {/* Modales */}
      <EvaluationModal
        isOpen={isEvaluationOpen}
        onClose={() => setIsEvaluationOpen(false)}
        audit={audit}
        onJumpToQuestion={handleJumpToQuestion}
        onFinishSession={handleFinishSession}
        onFillTestData={handleFillTestData}
      />

      <ResetConfirmModal
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirmReset={handleConfirmReset}
      />
    </div>
  );
}
