import { ConsultingPhaseInfo } from '../types';

export const CONSULTING_PHASES: ConsultingPhaseInfo[] = [
  {
    number: 0,
    code: 'Fase 0',
    name: 'Kickoff',
    subtitle: 'El Agente IA Interviewer y el Briefing Estratégico del cliente',
    description: 'Antes de la jornada necesitas una radiografía completa del negocio. Este prompt convierte a tu IA en un entrevistador experto que levanta modelo de negocio, marketing, ventas, operaciones y madurez en IA. El briefing resultante se guarda aquí y se convierte en el insumo de los ejercicios 1.1, 1.3, 2.1 y 5.1: al cliente se le entrevista una sola vez.',
    exerciseCount: 1,
    exercises: [
      {
        code: '0.1',
        name: 'Agente IA Interviewer y Briefing Estratégico',
        description: 'Prompt maestro para que la IA entreviste al cliente y genere el briefing con el que se llega a la jornada con foco absoluto.'
      }
    ]
  },
  {
    number: 1,
    code: 'Fase 1',
    name: 'Auditoría del modelo de negocio',
    subtitle: 'Diagnóstico previo de Negocio y Growth Marketing',
    description: 'Se lee dónde está el negocio hoy, cuál es el cuello de botella real y dónde está la oportunidad mayor. Se construyen los avatares, se ordena el portafolio por escala y nivel de servicio, se define el pricing con criterio y se decide con PEPE qué se mata, qué se pausa, qué se cultiva y qué se protege.',
    exerciseCount: 10,
    exercises: [
      { code: '1.1', name: 'Formulario de onboarding', description: 'Levantamiento exhaustivo del estado actual del negocio y métricas clave.' },
      { code: '1.2', name: 'Agentes de investigación', description: 'Asistentes de IA para analizar el mercado, competencia y tendencias.' },
      { code: '1.3', name: 'Síntesis del diagnóstico', description: 'Resumen ejecutivo con cuellos de botella y oportunidades prioritarias.' },
      { code: '1.4', name: 'Avatares + Mapa de clientes', description: 'Definición de clientes ideales, dolores profundos y psicología de compra.' },
      { code: '1.5', name: 'Portafolio de soluciones · front y back offers', description: 'Arquitectura de ofertas de entrada y soluciones de alto valor.' },
      { code: '1.6', name: 'Portafolio según escala', description: 'Segmentación de productos según apalancamiento y capacidad de entrega.' },
      { code: '1.7', name: 'Portafolio según nivel de servicio', description: 'Ofertas clasificadas por intensidad de acompañamiento (Do It Yourself, Done With You, Done For You).' },
      { code: '1.8', name: 'Smart Pricing', description: 'Modelado de precios rentable basado en valor y márgenes sostenibles.' },
      { code: '1.9', name: 'PEPE Framework', description: 'Decisión estratégica: qué se Pausa, qué se Elimina (mata), qué se Protege y qué se Escala (cultiva).' },
      { code: '1.10', name: 'Catálogo de activos de IA', description: 'Inventario de herramientas y prompts ya existentes en la empresa.' }
    ]
  },
  {
    number: 2,
    code: 'Fase 2',
    name: 'Estrategia AI-First',
    subtitle: 'Frente 01 · Integrar la IA como ventaja competitiva, no como capa cosmética',
    description: 'Se define el enfoque AI-First del negocio: dónde se aplica, con qué criterio y con qué prioridad. La bajada táctica de cada movimiento se aterriza en la Fase 3 con el One Page Strategy, aquí no se duplica.',
    exerciseCount: 3,
    exercises: [
      { code: '2.1', name: 'Océano Rojo → Océano Azul', description: 'Reposicionamiento del negocio para salir de la competencia por precio usando IA.' },
      { code: '2.2', name: 'Competitividad de tu servicio', description: 'Factores diferenciales y barreras de entrada creadas con tecnología e IA.' },
      { code: '2.3', name: 'Business Marketing Plan', description: 'Estrategia integral de marketing de negocio potenciada por IA.' }
    ]
  },
  {
    number: 3,
    code: 'Fase 3',
    name: 'Estrategia de marketing y ventas con IA',
    subtitle: 'Frente 02 · Adquisición con tracción medible y campañas aterrizadas',
    description: 'Se diseña el plan de adquisición con benchmark real de industria (ROAS de 3 a 5 escalando), se aterriza el Business Marketing Plan con responsables, stack y fechas, y cada táctica elegida pasa por el One Page Strategy. Cada bloque tiene su prompt con validación de insumos.',
    exerciseCount: 9,
    exercises: [
      { code: '3.1', name: 'Growth Marketing Plan', description: 'Plan de crecimiento con métricas de adquisición, retención y monetización.' },
      { code: '3.2', name: 'Business Marketing Plan aterrizado', description: 'Plan de acción con asignación de responsables, presupuesto y cronograma.' },
      { code: '3.3', name: 'Estrategias aterrizadas · One Page Strategy', description: 'Hoja de ruta táctica de una sola página por cada iniciativa elegida.' },
      { code: '3.4', name: 'Diseño de campaña de ventas · One Funnel Day', description: 'Arquitectura de embudo de conversión validado para venta directa o llamada.' },
      { code: '3.5', name: 'Diversificación horizontal o vertical', description: 'Expansión hacia nuevos segmentos de clientes o ampliación de servicios.' },
      { code: '3.6', name: 'Diversificación E² · 12 pilares', description: 'Ecosistema de posicionamiento y canales de distribución estratégica.' },
      { code: '3.7', name: 'Pilares de posicionamiento', description: 'Territorios de autoridad y mensajes centrales que atraen clientes cualificados.' },
      { code: '3.8', name: 'Plan de contenidos · 4 semanas', description: 'Calendario táctico de contenidos para nutrir leads y acelerar ventas.' },
      { code: '3.9', name: 'Calendario de ventas anual', description: 'Planificación anual de lanzamientos, promociones y promociones perpetuas.' }
    ]
  },
  {
    number: 4,
    code: 'Fase 4',
    name: 'Ventas & Comercial',
    subtitle: 'Frente 03 · Recorrido comercial y maximización del ticket',
    description: 'Con el portafolio y el pricing ya definidos en la auditoría, aquí se diseña el recorrido comercial completo: de lead magnet a maximización de beneficio.',
    exerciseCount: 7,
    exercises: [
      { code: '4.1', name: 'Portafolio hexagonal', description: 'Estructura armónica de soluciones conectadas para que cada cliente progrese.' },
      { code: '4.2', name: 'Escalera de valor', description: 'Ascenso progresivo del cliente desde bajo ticket hasta servicios high-ticket.' },
      { code: '4.3', name: 'Customer Journeys', description: 'Recorrido detallado del comprador desde el primer contacto hasta promotor.' },
      { code: '4.4', name: 'Matriz de lead magnets', description: 'Activos de atracción de alta conversión alineados a las ofertas principales.' },
      { code: '4.5', name: 'Profit Maximizer Funnels', description: 'Embudos con order bumps, upsells y downsells para elevar el ticket promedio.' },
      { code: '4.6', name: 'PIF · Pay In Full', description: 'Incentivos y estrategias de cierre para cobro del 100% al contado.' },
      { code: '4.7', name: 'Briefing de ventas', description: 'Guiones y argumentos comerciales para manejo de objeciones y cierre.' }
    ]
  },
  {
    number: 5,
    code: 'Fase 5',
    name: 'Visión y Liderazgo',
    subtitle: 'Frente 06 · Alinear visión, prioridades y liderazgo del fundador',
    description: 'Se alinea la visión a 10 años con las decisiones del día. El negocio y su líder quedan apuntando al mismo lugar, con KPIs y North Star Metric definidos.',
    exerciseCount: 3,
    exercises: [
      { code: '5.1', name: 'Identidad operativa del fundador', description: 'Definición de rol estratégico, zonas de genialidad y desconexión operativa.' },
      { code: '5.2', name: 'Visión a 10 años', description: 'Propósito a largo plazo y metas de negocio a prueba de fluctuaciones.' },
      { code: '5.3', name: 'KPIs y North Star Metric', description: 'Tablero de indicadores de control y métrica única que guía el crecimiento.' }
    ]
  },
  {
    number: 6,
    code: 'Fase 6',
    name: 'Productización y los 3 Agentes de IA',
    subtitle: 'Frentes 04 y 05 · Productizar la entrega y automatizarla con IA',
    description: 'Primero se diseña el servicio productizado completo, con nombre, promesa, oferta, objeciones, bonus, pricing y pitch. Después se audita qué usa hoy el negocio, aunque sea informal: ChatGPT suelto, WhatsApp sin automatizar, un Excel que hace de CRM. De ese inventario se cruza qué tarea repetitiva quita más horas contra qué palanca tiene más impacto a 90 días, y de ahí salen los 3 agentes reales (marketing, ventas u operación), nacidos del negocio y no de una plantilla.',
    exerciseCount: 3,
    exercises: [
      { code: '6.1', name: 'Service Design del servicio productizado', description: 'Estandarización del servicio con entregables, plazos y promesas no personalizadas.' },
      { code: '6.2', name: 'Auditoría de stack e IA del cliente', description: 'Inventario de herramientas dispersas para su unificación y automatización.' },
      { code: '6.3', name: 'Matriz de los 3 Agentes de IA', description: 'Diseño e implementación de los 3 agentes clave (Marketing, Ventas u Operación).' }
    ]
  },
  {
    number: 7,
    code: 'Fase 7',
    name: 'Plan 30·60·90',
    subtitle: 'Después de la jornada · Cristalizar todo en la guía de crecimiento',
    description: 'El entregable principal, construido al final porque necesita todo lo anterior: hallazgos, plan de marketing, estrategia de contenidos, plan de negocio, launch plan, visión a 10 años, servicio productizado y los 3 agentes. Más el plan de acción 30·60·90 y la grabación de la sesión.',
    exerciseCount: 2,
    exercises: [
      { code: '7.1', name: 'Plan 30·60·90', description: 'Cronograma ejecutable paso a paso para los primeros 3 meses posteriores a la jornada.' },
      { code: '7.2', name: 'Documento Master', description: 'Guía integral de crecimiento que condensa todas las decisiones estratégicas.' }
    ]
  },
  {
    number: 8,
    code: 'Fase 8',
    name: 'Cierre y Offboarding',
    subtitle: 'Entrega formal, ecosistema, prueba de resultado y acompañamiento post-jornada',
    description: 'Cierre profesional: se entrega el documento, la grabación y los 3 agentes de IA, se captura la prueba de resultado y se define el seguimiento con checkpoints a 30 y 60 días.',
    exerciseCount: 3,
    exercises: [
      { code: '8.1', name: 'Checklist de ecosistema y entregables', description: 'Auditoría final de recepción y verificación de todos los activos entregados.' },
      { code: '8.2', name: 'Plan de Offboarding', description: 'Protocolo de autonomía operativa y transferencia técnica para el cliente y su equipo.' },
      { code: '8.3', name: 'Prueba de resultado y testimonio', description: 'Metodología para documentar el retorno sobre inversión (ROI) y caso de éxito.' }
    ]
  }
];
