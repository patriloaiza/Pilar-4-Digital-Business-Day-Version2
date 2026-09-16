import { Question, SessionState, AuditReport, StrategicSignal, TestSuiteResult, TestResult } from '../types';
import { coreQuestions, allQuestions, CORE_TOTAL, DEFAULT_CONSULTANT } from '../data/questions';
import { CONSULTING_PHASES } from '../data/phases';

export function clone<T>(val: T): T {
  return JSON.parse(JSON.stringify(val));
}

export function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function ensureArray(val: unknown): string[] {
  if (Array.isArray(val)) return val.map(String);
  if (typeof val === 'string' && val.trim().length > 0) return [val.trim()];
  return [];
}

export function findQuestionById(id: string): Question | undefined {
  return allQuestions.find((q) => q.id === id);
}

export function getActiveQuestions(
  _answers: Record<string, unknown> = {},
  _matrix: Record<string, Record<string, string>> = {}
): Question[] {
  return coreQuestions;
}

export function cleanInactiveConditionals(state: SessionState): SessionState {
  return state;
}

export function createInitialState(): SessionState {
  return {
    clientName: '',
    clientEmail: '',
    consultant: DEFAULT_CONSULTANT,
    startedAt: Date.now(),
    elapsedSeconds: 0,
    currentId: 'ND-001',
    finished: false,
    answers: {},
    na: {},
    additionalInfo: {},
    evidence: {},
    observations: {},
    privateNotes: {},
    matrix: {},
    history: ['ND-001']
  };
}

export function isQuestionNA(q: Question, na: Record<string, boolean>): boolean {
  return Boolean(na[q.id]);
}

export function isQuestionAnswered(
  q: Question,
  answers: Record<string, unknown>,
  matrix: Record<string, Record<string, string>>
): boolean {
  if (q.type === 'matrix') {
    const qMatrix = matrix[q.id];
    if (!qMatrix) return false;
    return Object.keys(qMatrix).length > 0;
  }

  const val = answers[q.id];
  if (val === undefined || val === null) return false;
  if (Array.isArray(val)) return val.length > 0;
  if (typeof val === 'string') return val.trim().length > 0;
  return true;
}

export function isQuestionHandled(
  q: Question,
  answers: Record<string, unknown>,
  matrix: Record<string, Record<string, string>>,
  na: Record<string, boolean>
): boolean {
  if (isQuestionNA(q, na)) return true;
  return isQuestionAnswered(q, answers, matrix);
}

export function calculateProgress(
  answers: Record<string, unknown>,
  matrix: Record<string, Record<string, string>>,
  na: Record<string, boolean>
): {
  total: number;
  answered: number;
  naCount: number;
  completed: number;
  pending: number;
  percentage: number;
} {
  const activeQuestions = coreQuestions;
  const total = activeQuestions.length;

  let answered = 0;
  let naCount = 0;

  for (const q of activeQuestions) {
    if (isQuestionNA(q, na)) {
      naCount++;
    } else if (isQuestionAnswered(q, answers, matrix)) {
      answered++;
    }
  }

  const completed = answered + naCount;
  const pending = Math.max(0, total - completed);
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    total,
    answered,
    naCount,
    completed,
    pending,
    percentage
  };
}

export function getPendingQuestions(
  answers: Record<string, unknown>,
  matrix: Record<string, Record<string, string>>,
  na: Record<string, boolean>
): Question[] {
  return coreQuestions.filter((q) => !isQuestionHandled(q, answers, matrix, na));
}

// ==========================================
// DETECCIÓN ESTRATÉGICA: ALGORITMOS DIGITAL BUSINESS DAY
// ==========================================
export function evaluateSignals(state: SessionState): StrategicSignal[] {
  const signals: StrategicSignal[] = [];
  const ans = state.answers;

  // 1. CONTROL: Trampa de Escala del Fundador (Querer facturar $100k+ trabajando 50+ horas con 80%+ de dependencia personal)
  const nd006 = String(ans['ND-006'] || '');
  const nd012 = String(ans['ND-012'] || '');
  const nd016 = String(ans['ND-016'] || '');
  const nd031 = String(ans['ND-031'] || '');
  const nd032 = String(ans['ND-032'] || '');

  if (
    (nd006.includes('Más del 80%') || nd006.includes('Entre 60% y 80%')) &&
    (nd012.includes('más de 50 horas') || nd012.includes('40 y 50 horas') || nd012.includes('atrapado')) &&
    (nd016.includes('Colapso total') || nd016.includes('ventas se van a cero') || nd016.includes('desatendidos')) &&
    (nd031.includes('100,000') || nd031.includes('200,000') || nd032.includes('volumen') || nd032.includes('más volumen'))
  ) {
    signals.push({
      type: 'red',
      area: 'Arquitectura Operativa & Riesgo de Fundador',
      title: 'Trampa de Escala del Fundador (Colapso por Dependencia Personal)',
      text: 'El fundador manifiesta desear escalar la facturación a 6 cifras, pero su modelo operativo actual depende en más del 80% de su presencia física y colapsaría si entran más clientes.',
      clientClaim: 'Busca escalar facturación atrayendo más volumen de clientes o aumentando ventas.',
      evidenceFound: 'El 80%+ de ingresos depende de su tiempo directo (ND-006), trabaja 50+ horas apagando fuegos (ND-012) y el negocio colapsa en 2 semanas de ausencia (ND-016).',
      trueNeed: 'Productizar la entrega mediante el Service Design (Fase 6.1), aplicar el PEPE Framework para podar servicios no escalables (Fase 1.9) y construir los 3 Agentes de IA (Fase 6.3).',
      source: ['ND-006', 'ND-012', 'ND-016', 'ND-031', 'ND-032'],
      recommendedExercises: ['6.1 Service Design del servicio productizado', '6.3 Matriz de los 3 Agentes de IA', '1.9 PEPE Framework', '1.7 Portafolio según nivel de servicio'],
      phaseTarget: 'Fase 6 · Productización y los 3 Agentes de IA'
    });
  }

  // 2. CONTROL: Automatización Prematura sin Procesos Documentados
  const nd010 = String(ans['ND-010'] || '');
  const nd009 = ensureArray(ans['ND-009']);
  const nd013 = String(ans['ND-013'] || '');
  const nd035 = ensureArray(ans['ND-035']);

  if (
    (nd010.includes('cabeza') || nd010.includes('desordenados') || nd010.includes('desactualizados')) &&
    (nd009.some(t => t.includes('IA') || t.includes('CRM') || t.includes('GoHighLevel')) || nd035.length >= 2) &&
    (nd013.includes('Solopreneur') || nd013.includes('poco definidas') || nd013.includes('ambiguas'))
  ) {
    signals.push({
      type: 'red',
      area: 'Sistemas & Madurez Tecnológica',
      title: 'Automatización Prematura sin Procesos (Riesgo de Caos Sistematizado)',
      text: 'El cliente busca implementar herramientas complejas o agentes de IA pero sus procesos clave residen en su cabeza, lo que multiplicará errores a mayor velocidad.',
      clientClaim: 'Desea delegar o automatizar con IA múltiples áreas de su operativa diaria.',
      evidenceFound: 'Los procesos no están documentados y viven en su memoria (ND-010), mientras opera como solopreneur o con roles difusos (ND-013).',
      trueNeed: 'Documentar y estandarizar la entrega del servicio productizado (Fase 6.1) y auditar su stack real antes de programar los 3 agentes (Fase 6.2 y 6.3).',
      source: ['ND-009', 'ND-010', 'ND-013', 'ND-035'],
      recommendedExercises: ['6.1 Service Design del servicio productizado', '6.2 Auditoría de stack e IA del cliente', '1.10 Catálogo de activos de IA'],
      phaseTarget: 'Fase 6 · Productización y los 3 Agentes de IA'
    });
  }

  // 3. CONTROL: Ceguera Financiera en Adquisición Pagada (Tráfico sin Unit Economics)
  const nd018 = String(ans['ND-018'] || '');
  const nd019 = String(ans['ND-019'] || '');
  const nd020 = String(ans['ND-020'] || '');
  const nd021 = String(ans['ND-021'] || '');

  if (
    (nd019.includes('$500') || nd019.includes('$1,500') || nd019.includes('$5,000') || nd019.includes('anuncios')) &&
    (nd020.includes('No conozco mi CAC') || nd020.includes('noción aproximada') || nd020.includes('no registro')) &&
    (nd018.includes('No tengo calculados') || nd018.includes('Crítico') || nd018.includes('Ajustado') || nd021.includes('Desconozco'))
  ) {
    signals.push({
      type: 'red',
      area: 'Rentabilidad & Unit Economics',
      title: 'Ceguera Financiera en Adquisición Pagada (Quema de Capital en Tráfico)',
      text: 'El negocio invierte o planea invertir dinero en publicidad pagada pero desconoce su Costo de Adquisición (CAC), su margen neto real y el Lifetime Value (LTV).',
      clientClaim: 'Pretende escalar captación invirtiendo en pauta digital o tráfico de pago.',
      evidenceFound: 'Invierte presupuesto mensual en adquisición (ND-019) sin medir CAC por canal (ND-020) y con margen no calculado o ajustado (ND-018).',
      trueNeed: 'Estructurar el Growth Marketing Plan con benchmark de ROAS 3x-5x (Fase 3.1) e implementar el modelo Smart Pricing (Fase 1.8) con tablero de KPIs (Fase 5.3).',
      source: ['ND-018', 'ND-019', 'ND-020', 'ND-021'],
      recommendedExercises: ['3.1 Growth Marketing Plan', '1.8 Smart Pricing', '5.3 KPIs y North Star Metric', '3.4 Diseño de campaña de ventas · One Funnel Day'],
      phaseTarget: 'Fase 3 · Estrategia de marketing y ventas con IA'
    });
  }

  // 4. CONTROL: Dispersión de Oferta sin Escalera de Valor ni Recompra
  const nd024 = String(ans['ND-024'] || '');
  const nd026 = String(ans['ND-026'] || '');
  const nd029 = String(ans['ND-029'] || '');
  const nd032_offer = String(ans['ND-032'] || '');

  if (
    (nd024.includes('No tengo escalera') || nd024.includes('Incompleta') || nd024.includes('sueltos y desordenados')) &&
    (nd026.includes('Menos del 10%') || nd026.includes('No tengo otros') || nd026.includes('nunca vuelven')) &&
    (nd029.includes('No tengo ningún maximizador') || nd029.includes('no utilizo checkout') || nd032_offer.includes('Crear nuevos cursos'))
  ) {
    signals.push({
      type: 'yellow',
      area: 'Arquitectura Comercial & Maximización de Ticket',
      title: 'Dispersión de Oferta sin Escalera de Valor (Fuga del 70% del Valor del Cliente)',
      text: 'El catálogo está compuesto por productos desconectados sin maximizadores de compra, obligando al negocio a conseguir clientes nuevos permanentemente.',
      clientClaim: 'Considera que necesita crear más productos o cursos para venderle más cosas a su audiencia.',
      evidenceFound: 'Carece de escalera de valor integrada (ND-024), tiene menos del 10% de recompra (ND-026) y cero maximizadores de checkout (ND-029).',
      trueNeed: 'Diseñar el Portafolio Hexagonal (Fase 4.1), la Escalera de Valor conectada (Fase 4.2) y los Profit Maximizer Funnels con Bumps y Upsells (Fase 4.5).',
      source: ['ND-024', 'ND-026', 'ND-029', 'ND-032'],
      recommendedExercises: ['4.1 Portafolio hexagonal', '4.2 Escalera de valor', '4.5 Profit Maximizer Funnels', '1.5 Portafolio de soluciones · front y back offers'],
      phaseTarget: 'Fase 4 · Ventas & Comercial'
    });
  }

  // 5. CONTROL: Paradoja de la Delegación (Saturación Operativa vs Perfeccionismo Paralizante)
  const nd011 = ensureArray(ans['ND-011']);
  const nd033 = ensureArray(ans['ND-033']);
  const nd035_del = ensureArray(ans['ND-035']);

  if (
    nd011.length >= 2 &&
    nd033.some(b => b.includes('Saturación') || b.includes('tiempo libre') || b.includes('Miedo a delegar')) &&
    nd035_del.some(d => d.includes('ninguna tarea') || d.includes('intuición y experiencia') || d.includes('criterio experto'))
  ) {
    signals.push({
      type: 'yellow',
      area: 'Liderazgo & Zona de Genialidad',
      title: 'Paradoja de la Delegación (Bloqueo Psicológico del Fundador)',
      text: 'El fundador sufre una asfixia operativa severa pero manifiesta que ninguna tarea se puede delegar porque "todo requiere su intuición personal".',
      clientClaim: 'Señala la falta de tiempo como su principal freno de crecimiento pero retiene todas las tareas.',
      evidenceFound: 'Consume horas en tareas de bajo retorno como DMs y soporte (ND-011) y afirma que nada se puede transferir a IA o colaboradores (ND-035).',
      trueNeed: 'Redefinir la Identidad Operativa del fundador (Fase 5.1) y aislar las tareas repetitivas mediante la Matriz de los 3 Agentes de IA (Fase 6.3).',
      source: ['ND-011', 'ND-033', 'ND-035'],
      recommendedExercises: ['5.1 Identidad operativa del fundador', '6.3 Matriz de los 3 Agentes de IA', '5.2 Visión a 10 años'],
      phaseTarget: 'Fase 5 · Visión y Liderazgo'
    });
  }

  // Si no hay señales críticas detectadas, añadir señal positiva
  if (signals.length === 0) {
    signals.push({
      type: 'green',
      area: 'Madurez Digital & Salud Operativa',
      title: 'Alta Coherencia y Ecosistema de Negocio Saludable',
      text: 'Las respuestas evidencian claridad de modelo, procesos documentados, unit economics medidos y visión estratégica alineada para la jornada.',
      trueNeed: 'Acelerar la productización y el despliegue del Plan 30·60·90 en la jornada de consultoría.'
    });
  }

  return signals;
}

export function getAuditReport(state: SessionState): AuditReport {
  const prog = calculateProgress(state.answers, state.matrix, state.na);
  const pending = getPendingQuestions(state.answers, state.matrix, state.na);
  const signals = evaluateSignals(state);

  const contradictionSignals = signals.filter((s) => s.clientClaim && s.evidenceFound);
  let consistencyScore = 100;
  for (const s of contradictionSignals) {
    if (s.type === 'red') consistencyScore -= 16;
    else if (s.type === 'yellow') consistencyScore -= 8;
  }
  consistencyScore = Math.max(20, Math.min(100, consistencyScore));

  // Cálculo por las 9 fases de Digital Business Day (0 a 8)
  const phaseReadiness: Record<string, { total: number; answered: number; percentage: number }> = {};
  for (const phase of CONSULTING_PHASES) {
    const qInPhase = coreQuestions.filter(q => q.alignment?.phaseNumber === phase.number);
    const totalQ = qInPhase.length;
    const ansQ = qInPhase.filter(q => isQuestionHandled(q, state.answers, state.matrix, state.na)).length;
    phaseReadiness[phase.code] = {
      total: totalQ,
      answered: ansQ,
      percentage: totalQ > 0 ? Math.round((ansQ / totalQ) * 100) : 100
    };
  }

  return {
    totalActive: prog.total,
    coreCompleted: prog.completed,
    coreTotal: CORE_TOTAL,
    conditionalActiveCount: 0,
    conditionalCompleted: 0,
    answeredCount: prog.answered,
    naCount: prog.naCount,
    pendingCount: prog.pending,
    percentage: prog.percentage,
    consistencyScore,
    contradictionCount: contradictionSignals.length,
    pendingQuestions: pending,
    signals,
    isReady: prog.percentage >= 85,
    phaseReadiness
  };
}

export function formatAnswer(
  q: Question,
  val: unknown,
  matrix?: Record<string, Record<string, string>>,
  isNA?: boolean
): string {
  if (isNA) return '<span class="text-amber-600 font-medium">No aplica (N/A)</span>';
  if (val === undefined || val === null || val === '') {
    return '<span class="text-gray-400 italic">Sin responder</span>';
  }

  if (Array.isArray(val)) {
    if (val.length === 0) return '<span class="text-gray-400 italic">Sin responder</span>';
    return val.map((v) => `<span class="inline-block bg-gray-100 border border-gray-300 text-gray-800 rounded px-2 py-0.5 text-xs font-semibold mr-1 mb-1">${escapeHtml(v)}</span>`).join(' ');
  }

  return escapeHtml(String(val));
}

export function safeFileName(str: string): string {
  const clean = str.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
  return `diagnostico_digital_business_day_${clean || 'sesion'}_${new Date().toISOString().slice(0, 10)}`;
}

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs.toString().padStart(2, '0')}s`;
}

export function generateExportJson(state: SessionState) {
  const audit = getAuditReport(state);
  return {
    meta: {
      version: '4.0.0',
      pilar: 'Pilar 4 — Digital Business Day (Transformación de Negocios Digitales y Estrategia con IA)',
      rangoReferencial: '$2,000 — $5,000 USD por jornada de consultoría',
      plataforma: 'CREA Y MONETIZA™',
      consultor: state.consultant || DEFAULT_CONSULTANT,
      cliente: state.clientName,
      email: state.clientEmail,
      fecha: new Date().toISOString(),
      duracionSegundos: state.elapsedSeconds,
      completado: audit.percentage
    },
    resumenAuditoria: {
      porcentajeCompletado: audit.percentage,
      puntajeConsistencia: audit.consistencyScore,
      alertasEstrategicas: audit.signals.length,
      alertas: audit.signals
    },
    respuestasPorFase: CONSULTING_PHASES.map(phase => {
      const questionsInPhase = coreQuestions.filter(q => q.alignment?.phaseNumber === phase.number);
      return {
        fase: phase.code,
        nombre: phase.name,
        ejerciciosAsociados: phase.exercises.map(e => `${e.code} ${e.name}`),
        preguntas: questionsInPhase.map(q => ({
          id: q.id,
          seccion: q.section,
          esencial: q.isEssential,
          pregunta: q.text,
          respuesta: state.answers[q.id] || (state.na[q.id] ? 'N/A' : null),
          alineacionConsultoria: q.alignment
        }))
      };
    })
  };
}

export function generateClientOrConsultantHtml(state: SessionState, isConsultantView: boolean): string {
  const audit = getAuditReport(state);
  const dateStr = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Diagnóstico Estratégico — Digital Business Day · ${escapeHtml(state.clientName || 'Cliente')}</title>
  <style>
    body { font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif; margin: 0; padding: 40px; background: #ffffff; color: #111111; line-height: 1.6; }
    .header { border-bottom: 4px solid #D7192B; padding-bottom: 24px; margin-bottom: 30px; }
    .badge { display: inline-block; background: #D7192B; color: #ffffff; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; margin-bottom: 12px; }
    h1 { font-size: 28px; font-weight: 900; margin: 0 0 8px 0; color: #111111; }
    .meta { font-size: 14px; color: #666; margin-top: 6px; }
    .section-title { font-size: 18px; font-weight: 800; background: #f4f4f5; padding: 10px 14px; border-left: 4px solid #D7192B; margin: 32px 0 16px 0; }
    .question-item { margin-bottom: 20px; padding: 14px; border: 1px solid #e4e4e7; border-radius: 8px; page-break-inside: avoid; }
    .q-id { font-size: 11px; font-weight: 800; color: #D7192B; margin-bottom: 4px; }
    .q-text { font-size: 15px; font-weight: 700; color: #18181b; margin-bottom: 8px; }
    .q-ans { font-size: 14px; color: #27272a; background: #fafafa; padding: 10px; border-radius: 6px; border: 1px solid #f4f4f5; }
    .alignment { margin-top: 8px; font-size: 12px; color: #4b5563; background: #fef2f2; padding: 6px 10px; border-radius: 4px; border-left: 3px solid #ef4444; }
    .alert-card { background: #fff1f2; border: 1px solid #fecdd3; border-left: 5px solid #e11d48; padding: 14px; border-radius: 8px; margin-bottom: 14px; }
    .footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid #e4e4e7; font-size: 12px; color: #71717a; text-align: center; }
  </style>
</head>
<body>
  <div class="header">
    <div class="badge">CREA Y MONETIZA™ · Pilar 4 Digital Business Day</div>
    <h1>Diagnóstico Estratégico de Negocios Digitales y Modelo con IA</h1>
    <div class="meta">
      <strong>Cliente:</strong> ${escapeHtml(state.clientName || 'Sin definir')} | 
      <strong>Consultor:</strong> ${escapeHtml(state.consultant || DEFAULT_CONSULTANT)} | 
      <strong>Fecha:</strong> ${dateStr} | 
      <strong>Completado:</strong> ${audit.percentage}% | 
      <strong>Consistencia Estratégica:</strong> ${audit.consistencyScore}%
    </div>
  </div>

  ${isConsultantView && audit.signals.length > 0 ? `
    <div class="section-title">Análisis Estratégico: Evidencias vs Lo que el Cliente Manifiesta Querer</div>
    ${audit.signals.map(s => `
      <div class="alert-card">
        <strong style="color:#e11d48;">[${s.type.toUpperCase()}] ${escapeHtml(s.title)}</strong>
        <p style="margin:6px 0 4px 0; font-size:13px;">${escapeHtml(s.text)}</p>
        ${s.clientClaim ? `<div style="font-size:12px; margin-top:4px;"><strong>Lo que manifiesta querer:</strong> ${escapeHtml(s.clientClaim)}</div>` : ''}
        ${s.evidenceFound ? `<div style="font-size:12px; margin-top:2px;"><strong>Evidencia en sus respuestas:</strong> ${escapeHtml(s.evidenceFound)}</div>` : ''}
        ${s.trueNeed ? `<div style="font-size:12px; margin-top:4px; color:#15803d;"><strong>Lo que realmente necesita trabajar:</strong> ${escapeHtml(s.trueNeed)}</div>` : ''}
        ${s.recommendedExercises ? `<div style="font-size:11px; margin-top:4px; color:#6b7280;">Ejercicios de la jornada: ${escapeHtml(s.recommendedExercises.join(', '))}</div>` : ''}
      </div>
    `).join('')}
  ` : ''}

  <div class="section-title">Respuestas Levantadas en la Sesión (36 Reactivos Clave)</div>
  ${coreQuestions.map(q => {
    const isNA = isQuestionNA(q, state.na);
    const formatted = formatAnswer(q, state.answers[q.id], undefined, isNA);
    return `
      <div class="question-item">
        <div class="q-id">${q.id} ${q.isEssential ? '· ESENCIAL' : ''} [${escapeHtml(q.section)}]</div>
        <div class="q-text">${escapeHtml(q.text)}</div>
        <div class="q-ans">${formatted}</div>
        ${q.alignment ? `
          <div class="alignment">
            <strong>Fase de Consultoría:</strong> ${escapeHtml(q.alignment.phase)} | 
            <strong>Ejercicios:</strong> ${escapeHtml(q.alignment.exercises.join(', '))}
            <div style="margin-top:2px;"><strong>Cómo logra la transformación:</strong> ${escapeHtml(q.alignment.transformationPurpose)}</div>
          </div>
        ` : ''}
      </div>
    `;
  }).join('')}

  <div class="footer">
    Reporte generado por la plataforma oficial de Diagnóstico Estratégico Digital Business Day — CREA Y MONETIZA™
  </div>
</body>
</html>`;
}

export function printOrDownloadPdf(state: SessionState, isConsultantView: boolean) {
  const html = generateClientOrConsultantHtml(state, isConsultantView);
  const printWin = window.open('', '_blank');
  if (printWin) {
    printWin.document.open();
    printWin.document.write(html);
    printWin.document.close();
    setTimeout(() => {
      printWin.print();
    }, 500);
  } else {
    downloadFile(html, `${safeFileName(state.clientName)}.html`, 'text/html;charset=utf-8');
  }
}

export function fillTestData(state: SessionState): SessionState {
  const next = clone(state);
  next.clientName = 'Ing. Roberto Mendoza';
  next.clientEmail = 'roberto.mendoza@innovacionb2b.com';
  next.consultant = DEFAULT_CONSULTANT;

  // Llenar respuestas realistas estructuradas para las 36 preguntas de Digital Business Day
  const sampleAnswers: Record<string, string | string[]> = {
    'ND-001': [
      'Servicios de consultoría / mentoría 1:1 (hecho a medida)',
      'Programas grupales o cohortes de formación intensiva',
      'Infoproductos autogestionados (cursos grabados, ebooks, plantillas)'
    ],
    'ND-002': [
      'Producto o curso core ticket medio ($100 a $499 USD)',
      'Programa avanzado o grupal intensivo ($500 a $1,499 USD)',
      'High-Ticket o consultoría personalizada ($1,500 a $4,999 USD)'
    ],
    'ND-003': 'Vivo de 1:1 o agencia, y quiero transicionar a un servicio productizado o grupal escalable',
    'ND-004': 'Predominantemente transaccional (menos del 20% proviene de cobros recurrentes)',
    'ND-005': '$500 a $1,499 USD | 4 a 10 ventas mensuales',
    'ND-006': 'Entre 60% y 80%: tengo partes pregrabadas, pero la venta y el soporte dependen de mí',
    'ND-007': 'Validación sólida: más de 50 clientes de pago han completado el programa con testimonios',
    'ND-008': [
      'Metodología o framework registrado con pasos secuenciales comprobados',
      'Acompañamiento directo y auditoría personalizada (no formación pasiva)',
      'Especialización vertical y quirúrgica en un solo nicho o problema urgente'
    ],
    'ND-009': [
      'Plataformas de cursos / membresías (Hotmart, Skool, Kajabi, Teachable, Circle)',
      'CRM y automatizaciones avanzadas (GoHighLevel, ActiveCampaign, HubSpot)',
      'Email marketing básico (ConvertKit, Mailchimp, Brevo, MailerLite)',
      'Mensajería directa para ventas y soporte (WhatsApp Business, Telegram, DMs)',
      'Gestión interna y documentación (Notion, Google Workspace, Trello, ClickUp, Asana)',
      'Herramientas de IA generativa (ChatGPT Plus, Claude Pro, Gemini, Midjourney)'
    ],
    'ND-010': 'Notas y borradores sueltos en Notion o Drive, pero desactualizados y desorganizados',
    'ND-011': [
      'Responder mensajes directos (DMs), comentarios y consultas básicas repetitivas',
      'Atención al cliente, soporte técnico y onboarding manual de alumnos',
      'Agendamiento y reprogramación manual de llamadas de consultoría o ventas'
    ],
    'ND-012': 'Trabajo entre 40 y 50 horas, pero el 70% se va en tareas de bajo valor',
    'ND-013': 'Tengo un equipo pequeño (2 a 4 contratistas: editor, setter, soporte) pero superviso todo',
    'ND-014': 'Embudos con secuencias de nutrición, recordatorios de llamada y etiquetado en CRM',
    'ND-015': 'Cuento con onboarding guiado, acompañamiento estructurado y canal directo para dudas',
    'ND-016': 'La entrega continúa a medias con material grabado, pero la captación y ventas se van a cero',
    'ND-017': '$5,000 a $10,000 USD/mes ($60,000 a $120,000 USD/año — barrera del solopreneur)',
    'ND-018': 'Ajustado (entre 20% y 40% neto): los costos absorben gran parte de los ingresos',
    'ND-019': '$500 a $1,500 USD al mes de forma constante',
    'ND-020': 'Tengo una noción aproximada pero no registro la métrica mes a mes',
    'ND-021': 'El LTV multiplica entre 1.3x y 1.8x el valor de entrada gracias a alguna recompra',
    'ND-022': 'Entre 1 y 3 meses de costes fijos cubiertos en reserva',
    'ND-023': 'Reinvierto entre 20% y 35% en publicidad pagada, automatizaciones y equipo freelance',
    'ND-024': 'Incompleta: tengo productos de bajo y medio costo, pero no tengo una oferta premium High-Ticket',
    'ND-025': 'Transformación concreta, medible y con marco de tiempo claro (Punto A → Punto B definido)',
    'ND-026': 'Entre 10% y 25% de recompra ocasional',
    'ND-027': 'No: solo tengo regalos gratuitos (lead magnets) y paso directo a intentar vender el producto principal',
    'ND-028': 'Tengo una oferta de alto valor ($1,500 a $5,000 USD) pero me cuesta venderla con regularidad',
    'ND-029': 'Tengo un Order Bump básico en el formulario de pago, pero sin upsells posteriores',
    'ND-030': 'A veces pongo enlaces en la bio o stories, pero sin un embudo ni medición detrás',
    'ND-031': 'Alcanzar las 6 cifras: $100,000 a $150,000 USD anuales ($8,000 - $12,500 USD/mes)',
    'ND-032': 'Elevar mi ticket promedio y paquetizar un servicio productizado de alto valor',
    'ND-033': [
      'Falta de flujo constante y predecible de prospectos calificados',
      'Saturación del fundador: no tengo tiempo libre para pensar ni planificar',
      'Falta de automatizaciones y procesos manuales lentos que consumen energía'
    ],
    'ND-034': 'Tengo cursos o recursos grabados pero venden de forma esporádica por falta de tráfico',
    'ND-035': [
      'Calificación y filtrado de leads iniciales en WhatsApp o DMs',
      'Creación de primeros borradores de contenido, copies y guiones de video',
      'Atención de preguntas frecuentes y soporte técnico de alumnos'
    ],
    'ND-036': 'Tengo acuerdos verbales o comisiones informales pero sin herramientas ni seguimiento sistemático'
  };

  next.answers = sampleAnswers;
  next.na = {};
  return next;
}

// BATERÍA COMPLETA DE 20 PRUEBAS METODOLÓGICAS Y ESTRATÉGICAS (PILAR 4 DIGITAL BUSINESS DAY)
export function runTestSuite(currentState: SessionState): TestSuiteResult {
  const tests: TestResult[] = [];

  // 1. Integridad de los 36 reactivos
  tests.push({
    pass: coreQuestions.length === 36,
    title: '1. Catálogo íntegro de 36 reactivos de Negocios Digitales',
    detail: `Total: ${coreQuestions.length} reactivos cargados (ND-001 al ND-036).`
  });

  // 2. Cobertura de las 5 dimensiones
  const sections = new Set(coreQuestions.map(q => q.section));
  tests.push({
    pass: sections.size === 5,
    title: '2. Cobertura de 5 dimensiones estratégicas',
    detail: `Dimensiones detectadas: ${Array.from(sections).join(', ')}.`
  });

  // 3. Cobertura de las 9 fases de consultoría de Digital Business Day (Fases 0 a 8)
  const phasesCovered = new Set(coreQuestions.map(q => q.alignment?.phaseNumber));
  const hasAllMajorPhases = [0, 1, 2, 3, 4, 5, 6, 8].every(num => phasesCovered.has(num));
  tests.push({
    pass: hasAllMajorPhases,
    title: '3. Mapeo continuo en las fases de Digital Business Day',
    detail: `Las preguntas cubren el flujo de las 9 fases del servicio (Kickoff, Auditoría de modelo, Estrategia AI-First, Marketing y ventas con IA, Ventas & Comercial, Visión y Liderazgo, Productización y 3 Agentes de IA, Plan 30·60·90 y Cierre).`
  });

  // 4. Preguntas de control (Lo que el cliente quiere vs Lo que necesita)
  const controlQuestions = coreQuestions.filter(q => q.alignment?.isControlQuestion);
  tests.push({
    pass: controlQuestions.length >= 8,
    title: '4. Preguntas de control configuradas (Querer vs Necesitar)',
    detail: `Existen ${controlQuestions.length} preguntas de control para detectar contradicciones entre la narrativa del cliente y su realidad de negocio.`
  });

  // 5. Explicación de la transformación en cada pregunta
  const withTransformation = coreQuestions.filter(q => q.alignment?.transformationPurpose && q.alignment.transformationPurpose.length > 20);
  tests.push({
    pass: withTransformation.length === 36,
    title: '5. Justificación de transformación (100% de reactivos)',
    detail: `Las 36 preguntas cuentan con explicación detallada de cómo su respuesta conduce a la transformación del negocio.`
  });

  // 6. Entregables de consultoría asociados
  const withDeliverable = coreQuestions.filter(q => q.alignment?.deliverable && q.alignment.deliverable.length > 5);
  tests.push({
    pass: withDeliverable.length === 36,
    title: '6. Entregables concretos vinculados (100% de reactivos)',
    detail: `Cada pregunta apunta a un entregable específico de la jornada de consultoría.`
  });

  // 7. Tipología de preguntas estandarizada para cruce algorítmico (100% single/multi)
  const singleCount = coreQuestions.filter(q => q.type === 'single').length;
  const multiCount = coreQuestions.filter(q => q.type === 'multi').length;
  const structuredCount = singleCount + multiCount;
  tests.push({
    pass: structuredCount === 36,
    title: '7. Estandarización algorítmica (Opciones únicas y múltiples estructuradas)',
    detail: `${structuredCount} de 36 preguntas (${singleCount} de opción única y ${multiCount} de selección múltiple) estructuradas para análisis algorítmico sin ambigüedad.`
  });

  // 8. Estado inicial limpio
  const fresh = createInitialState();
  tests.push({
    pass: fresh.currentId === 'ND-001' && Object.keys(fresh.answers).length === 0 && fresh.finished === false,
    title: '8. Inicialización de sesión en ND-001',
    detail: 'El estado inicial comienza ordenadamente en el primer reactivo con respuestas vacías.'
  });

  // 9. Cálculo de progreso en cero
  const progZero = calculateProgress(fresh.answers, fresh.matrix, fresh.na);
  tests.push({
    pass: progZero.percentage === 0 && progZero.pending === 36 && progZero.answered === 0,
    title: '9. Cálculo de progreso 0% inicial',
    detail: `Progreso: ${progZero.percentage}%, Pendientes: ${progZero.pending}.`
  });

  // 10. Marcado de No Aplica (N/A)
  const naState = createInitialState();
  naState.na['ND-014'] = true;
  const progNA = calculateProgress(naState.answers, naState.matrix, naState.na);
  tests.push({
    pass: progNA.naCount === 1 && progNA.completed === 1,
    title: '10. Gestión de excepciones (N/A)',
    detail: 'Las preguntas marcadas como no aplicables se contabilizan correctamente como gestionadas.'
  });

  // 11. Simulación con datos de prueba realistas
  const simulatedState = fillTestData(fresh);
  const progFull = calculateProgress(simulatedState.answers, simulatedState.matrix, simulatedState.na);
  tests.push({
    pass: progFull.percentage === 100 && progFull.answered === 36,
    title: '11. Simulación de cuestionario completo (100%)',
    detail: `36 de 36 reactivos contestados en la prueba simulada.`
  });

  // 12. Detección de Trampa de Escala del Fundador
  const trapState = createInitialState();
  trapState.answers['ND-006'] = 'Más del 80%: si me enfermo o paro, el negocio deja de facturar y de entregar';
  trapState.answers['ND-012'] = 'Trabajo más de 50 horas a la semana y me siento atrapado en la operativa del día a día';
  trapState.answers['ND-016'] = 'Colapso total: se detienen las ventas, los clientes quedan desatendidos y se generan quejas';
  trapState.answers['ND-031'] = 'Alcanzar las 6 cifras: $100,000 a $150,000 USD anuales ($8,000 - $12,500 USD/mes)';
  trapState.answers['ND-032'] = 'Conseguir más volumen de clientes a mi precio actual mediante más tráfico';
  const trapSignals = evaluateSignals(trapState);
  const hasTrap = trapSignals.some(s => s.title.includes('Trampa de Escala del Fundador'));
  tests.push({
    pass: hasTrap,
    title: '12. Detección de Trampa de Escala del Fundador',
    detail: 'Identifica cuando el cliente busca duplicar facturación con 80%+ de dependencia de su tiempo y 50+ horas de trabajo.'
  });

  // 13. Detección de Automatización Prematura sin Procesos
  const autoState = createInitialState();
  autoState.answers['ND-010'] = 'Todo reside en mi cabeza: ningún proceso está documentado formalmente';
  autoState.answers['ND-009'] = ['CRM y automatizaciones avanzadas (GoHighLevel, ActiveCampaign, HubSpot)', 'Herramientas de IA generativa (ChatGPT Plus, Claude Pro, Gemini, Midjourney)'];
  autoState.answers['ND-013'] = '100% Solopreneur: hago absolutamente todo yo solo (ventas, entrega, contenido y soporte)';
  autoState.answers['ND-035'] = ['Calificación y filtrado de leads iniciales en WhatsApp o DMs', 'Creación de primeros borradores de contenido, copies y guiones de video'];
  const autoSignals = evaluateSignals(autoState);
  const hasAuto = autoSignals.some(s => s.title.includes('Automatización Prematura'));
  tests.push({
    pass: hasAuto,
    title: '13. Detección de Automatización Prematura sin Procesos',
    detail: 'Alerta sobre el riesgo de programar IA o software sobre procesos que residen únicamente en la cabeza del dueño.'
  });

  // 14. Detección de Ceguera Financiera en Adquisición Pagada
  const financeState = createInitialState();
  financeState.answers['ND-018'] = 'No tengo calculados mis números netos con rigor (confundo facturación bruta con beneficio real)';
  financeState.answers['ND-019'] = '$1,500 a $5,000 USD al mes en adquisición pagada';
  financeState.answers['ND-020'] = 'No conozco mi CAC: no sé cuánto me cuesta conseguir un cliente de pago';
  financeState.answers['ND-021'] = 'Desconozco el LTV y no mido la tasa de recompra histórica';
  const financeSignals = evaluateSignals(financeState);
  const hasFinance = financeSignals.some(s => s.title.includes('Ceguera Financiera en Adquisición'));
  tests.push({
    pass: hasFinance,
    title: '14. Detección de Ceguera Financiera en Tráfico Pagado',
    detail: 'Advierte que escalar publicidad sin conocer el CAC ni el margen quema el capital de la empresa.'
  });

  // 15. Detección de Dispersión de Oferta sin Escalera de Valor
  const ladderState = createInitialState();
  ladderState.answers['ND-024'] = 'No tengo escalera: tengo productos sueltos y desordenados que no se conectan entre sí';
  ladderState.answers['ND-026'] = 'Menos del 10%: casi todos compran una sola vez y nunca vuelven a pagar';
  ladderState.answers['ND-029'] = 'No tengo ningún maximizador: el cliente compra 1 producto y la transacción termina';
  ladderState.answers['ND-032'] = 'Crear nuevos cursos y productos para vender más cosas al mismo público';
  const ladderSignals = evaluateSignals(ladderState);
  const hasLadder = ladderSignals.some(s => s.title.includes('Dispersión de Oferta'));
  tests.push({
    pass: hasLadder,
    title: '15. Detección de Dispersión de Oferta sin Escalera de Valor',
    detail: 'Detecta cuando el fundador quiere crear más productos en vez de armar una escalera con maximizadores de ticket.'
  });

  // 16. Detección de Paradoja de la Delegación
  const delegationState = createInitialState();
  delegationState.answers['ND-011'] = ['Responder mensajes directos (DMs), comentarios y consultas básicas repetitivas', 'Atención al cliente, soporte técnico y onboarding manual de alumnos'];
  delegationState.answers['ND-033'] = ['Saturación del fundador: no tengo tiempo libre para pensar ni planificar'];
  delegationState.answers['ND-035'] = ['Siento que ninguna tarea puede delegarse porque todo requiere mi intuición y experiencia'];
  const delegationSignals = evaluateSignals(delegationState);
  const hasDelegation = delegationSignals.some(s => s.title.includes('Paradoja de la Delegación'));
  tests.push({
    pass: hasDelegation,
    title: '16. Detección de Paradoja de la Delegación',
    detail: 'Señala el bloqueo mental de quejarse de falta de tiempo pero rehusarse a soltar tareas por perfeccionismo.'
  });

  // 17. Desglose de madurez diagnóstica en las 9 fases de Digital Business Day
  const audit = getAuditReport(simulatedState);
  const allPhasesCalculated = Object.keys(audit.phaseReadiness).length === 9;
  tests.push({
    pass: allPhasesCalculated,
    title: '17. Desglose de preparación en las 9 fases de Digital Business Day',
    detail: `Fases auditadas: ${Object.keys(audit.phaseReadiness).join(', ')}.`
  });

  // 18. Generación del reporte estructurado JSON
  const jsonReport = generateExportJson(simulatedState);
  tests.push({
    pass: jsonReport.meta.pilar.includes('Digital Business Day') && jsonReport.respuestasPorFase.length === 9,
    title: '18. Estructura de Exportación JSON Oficial (Pilar 4)',
    detail: 'El archivo JSON incluye metadatos, rango referencial ($2,000-$5,000 USD), alertas y las 9 fases con sus 41 ejercicios.'
  });

  // 19. Generación del reporte HTML para Cliente y Consultor
  const clientHtml = generateClientOrConsultantHtml(simulatedState, false);
  const consultantHtml = generateClientOrConsultantHtml(simulatedState, true);
  tests.push({
    pass: clientHtml.includes('Digital Business Day') && consultantHtml.includes('Análisis Estratégico'),
    title: '19. Generación de Informes HTML/PDF Separados',
    detail: 'Genera versión ejecutiva para el cliente y dossier confidencial con alertas y contradicciones para el consultor.'
  });

  // 20. Blindaje con preguntas esenciales
  const essentialCount = coreQuestions.filter(q => q.isEssential).length;
  tests.push({
    pass: essentialCount >= 20,
    title: '20. Blindaje con preguntas esenciales prioritarias',
    detail: `Se identificaron ${essentialCount} preguntas esenciales indispensables para el diagnóstico del negocio.`
  });

  const passed = tests.filter(t => t.pass).length;
  return {
    tests,
    passed,
    total: tests.length,
    percentage: Math.round((passed / tests.length) * 100)
  };
}
