export type QuestionType = 'single' | 'multi' | 'open' | 'matrix';

export interface QuestionTrigger {
  question: string;
  values?: string[];
  mode?: 'insufficientEvidence' | 'weakMetrics' | 'lowMonetization' | 'highFollowersLowSales';
}

export type ConsultingPhaseName =
  | 'Fase 0 · Kickoff'
  | 'Fase 1 · Auditoría del modelo de negocio'
  | 'Fase 2 · Estrategia AI-First'
  | 'Fase 3 · Estrategia de marketing y ventas con IA'
  | 'Fase 4 · Ventas & Comercial'
  | 'Fase 5 · Visión y Liderazgo'
  | 'Fase 6 · Productización y los 3 Agentes de IA'
  | 'Fase 7 · Plan 30·60·90'
  | 'Fase 8 · Cierre y Offboarding';

export interface ConsultingAlignment {
  phase: ConsultingPhaseName;
  phaseNumber: number;
  exercises: string[]; // e.g. ["2.1 Inventario por canal", "3.1 Tema paraguas y 3-5 pilares"]
  deliverable: string;
  transformationPurpose: string; // Explicación de cómo el ejercicio logra la transformación
  isControlQuestion?: boolean; // Para identificar si contrasta lo que dice vs lo que hace/evidencias
}

export interface Question {
  id: string;
  section: string;
  type: QuestionType;
  text: string;
  isEssential?: boolean;
  help?: string;
  example?: string;
  placeholder?: string;
  options?: string[];
  related?: string[];
  dependsOn?: string;
  trigger?: QuestionTrigger;
  alignment?: ConsultingAlignment;
}

export interface SessionState {
  clientName: string;
  clientEmail: string;
  consultant: string;
  startedAt: number;
  elapsedSeconds: number;
  currentId: string;
  finished: boolean;
  answers: Record<string, string | string[]>;
  na: Record<string, boolean>;
  additionalInfo: Record<string, string>;
  evidence: Record<string, string>;
  observations: Record<string, string>;
  privateNotes: Record<string, string>;
  matrix: Record<string, Record<string, string>>;
  history: string[];
}

export interface StrategicSignal {
  type: 'red' | 'yellow' | 'green';
  area?: string;
  title: string;
  text: string;
  statement?: string;
  clientClaim?: string;
  evidenceFound?: string;
  trueNeed?: string;
  source?: string[];
  recommendedExercises?: string[];
  phaseTarget?: string;
}

export interface AuditReport {
  totalActive: number;
  coreCompleted: number;
  coreTotal: number;
  conditionalActiveCount: number;
  conditionalCompleted: number;
  answeredCount: number;
  naCount: number;
  pendingCount: number;
  percentage: number;
  consistencyScore: number;
  contradictionCount: number;
  pendingQuestions: Question[];
  signals: StrategicSignal[];
  isReady: boolean;
  phaseReadiness: Record<string, { total: number; answered: number; percentage: number }>;
}

export interface TestResult {
  pass: boolean;
  title: string;
  detail?: string;
}

export interface TestSuiteResult {
  tests: TestResult[];
  passed: number;
  total: number;
  percentage: number;
}

export interface ConsultingPhaseInfo {
  number: number;
  code: string;
  name: string;
  subtitle: string;
  description: string;
  exerciseCount: number;
  exercises: {
    code: string;
    name: string;
    description: string;
  }[];
}
