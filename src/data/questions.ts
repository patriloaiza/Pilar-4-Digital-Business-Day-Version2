import { Question } from '../types';

export const DEFAULT_CONSULTANT = 'Consultor Estratégico — CREA Y MONETIZA™';
export const CORE_TOTAL = 36;
export const STORAGE_KEY = 'digital_business_day_pilar4';
export const coreQuestions: Question[] = [
  // ==========================================
  // BLOQUE 1: MODELO DE NEGOCIO (8 PREGUNTAS)
  // ==========================================
  {
    id: 'ND-001',
    section: 'Modelo de Negocio',
    type: 'multi',
    text: '¿Cuál es tu modelo de negocio actual?',
    isEssential: true,
    help: 'Identifica el tipo de negocio digital, fuentes de ingreso y etapa de madurez comercial.',
    example: 'Ej: Infoproductos + membresía + servicios de consultoría 1:1.',
    options: [
      'Servicios de consultoría / mentoría 1:1 (hecho a medida)',
      'Programas grupales o cohortes de formación intensiva',
      'Infoproductos autogestionados (cursos grabados, ebooks, plantillas)',
      'Membresía o comunidad de suscripción mensual/anual',
      'Agencia / Servicios Done-For-You (ejecución directa para el cliente)',
      'Software / Apps / Herramientas digitales',
      'Eventos presenciales, workshops o bootcamps de inmersión'
    ],
    alignment: {
      phase: 'Fase 0 · Kickoff',
      phaseNumber: 0,
      exercises: ['0.1 Agente IA Interviewer y Briefing Estratégico', '1.1 Formulario de onboarding', '1.5 Portafolio de soluciones · front y back offers'],
      deliverable: 'Briefing estratégico previo a la jornada + Mapeo de modelo de negocio',
      transformationPurpose: 'Radiografía completa del ecosistema para detectar si el modelo tiene apalancamiento o si es un autoempleo frágil.'
    }
  },
  {
    id: 'ND-002',
    section: 'Modelo de Negocio',
    type: 'multi',
    text: '¿Qué vendes exactamente y en qué rangos de precio se sitúa tu catálogo actual?',
    isEssential: true,
    help: 'Catálogo completo con precios para evaluar coherencia de portafolio, márgenes y posicionamiento.',
    example: 'Ej: Curso $297, mentoría grupal $997, consultoría 1:1 $2,500.',
    options: [
      'Oferta de entrada / Tripwire (menos de $100 USD)',
      'Producto o curso core ticket medio ($100 a $499 USD)',
      'Programa avanzado o grupal intensivo ($500 a $1,499 USD)',
      'High-Ticket o consultoría personalizada ($1,500 a $4,999 USD)',
      'Mastermind / Corporativo / Retenedor premium ($5,000+ USD)',
      'Membresía recurrente ($20 a $99 USD/mes)',
      'Cobro por hora o presupuestos a medida según cada cliente'
    ],
    alignment: {
      phase: 'Fase 1 · Auditoría del modelo de negocio',
      phaseNumber: 1,
      exercises: ['1.5 Portafolio de soluciones · front y back offers', '1.8 Smart Pricing'],
      deliverable: 'Auditoría del modelo de negocio + portafolio y pricing ordenados',
      transformationPurpose: 'Estructurar un catálogo coherente con márgenes calculados que elimine la venta por horas o precios improvisados.'
    }
  },
  {
    id: 'ND-003',
    section: 'Modelo de Negocio',
    type: 'single',
    text: '¿Cuál es tu fuente de ingreso principal hoy frente a la que desearías que sea en tu visión a largo plazo?',
    isEssential: true,
    help: 'Brecha estratégica entre la realidad operativa presente y la visión del modelo escalable deseado.',
    example: 'Ej: Principal actual: consultoría 1:1 desgastante. Deseada: programa productizado o recurrente.',
    options: [
      'Vivo de consultoría 1:1 o agencia, pero desearía vivir de cursos grabados 100% pasivos',
      'Vivo de 1:1 o agencia, y quiero transicionar a un servicio productizado o grupal escalable',
      'Vivo de cursos masivos de bajo ticket, pero quiero migrar a High-Ticket para no depender de volúmenes masivos de tráfico',
      'Vivo de lanzamientos bimestrales con picos y valles, pero quiero facturación mensual recurrente y predecible',
      'Tengo múltiples fuentes dispersas que facturan poco, y necesito concentrarme en 1 sola oferta estrella',
      'Mi fuente actual ya es la deseada y solo busco optimizar márgenes y automatizar la entrega con IA'
    ],
    alignment: {
      phase: 'Fase 1 · Auditoría del modelo de negocio',
      phaseNumber: 1,
      exercises: ['1.3 Síntesis del diagnóstico', '1.9 PEPE Framework'],
      deliverable: 'PEPE Framework: qué se Pausa, qué se Elimina, qué se Protege y qué se Escala',
      transformationPurpose: 'Cerrar la brecha entre la ilusión del fundador y un camino viable de transición sin arriesgar la caja actual.',
      isControlQuestion: true
    }
  },
  {
    id: 'ND-004',
    section: 'Modelo de Negocio',
    type: 'single',
    text: '¿Tienes ingresos recurrentes garantizados o el 100% de tu facturación es transaccional?',
    isEssential: true,
    help: 'Mide la estabilidad financiera, predictibilidad del flujo de caja y nivel de estrés del negocio.',
    example: 'Ej: Mayormente transaccional. Solo el 15% es recurrente por membresía.',
    options: [
      '100% transaccional: cada día primero de mes inicio con facturación en cero',
      'Predominantemente transaccional (menos del 20% proviene de cobros recurrentes)',
      'Híbrido balanceado (entre 20% y 50% de ingresos recurrentes)',
      'Mayoría recurrente (más del 50% proviene de membresías, software o retenedores fijos)',
      'Dependiente de 2 o 3 lanzamientos al año (alta volatilidad estacional)'
    ],
    alignment: {
      phase: 'Fase 1 · Auditoría del modelo de negocio',
      phaseNumber: 1,
      exercises: ['1.2 Agentes de investigación', '1.7 Portafolio según nivel de servicio'],
      deliverable: 'Matriz de estabilidad financiera y nivel de servicio',
      transformationPurpose: 'Diseñar mecanismos de retención, pagos en cuotas o servicios continuos para dotar de suelo financiero al negocio.'
    }
  },
  {
    id: 'ND-005',
    section: 'Modelo de Negocio',
    type: 'single',
    text: '¿Cuál es tu ticket promedio actual y cuántas ventas cierras aproximadamente al mes?',
    isEssential: true,
    help: 'Unit economics básico que determina el esfuerzo comercial y el volumen necesario para alcanzar tus metas.',
    example: 'Ej: Ticket promedio $450 USD con 8 a 12 ventas mensuales.',
    options: [
      'Menos de $100 USD | Más de 40 ventas mensuales (alta fricción por volumen)',
      '$100 a $499 USD | 10 a 25 ventas mensuales',
      '$500 a $1,499 USD | 4 a 10 ventas mensuales',
      '$1,500 a $5,000 USD | 1 a 4 ventas mensuales (modelo High-Ticket)',
      'Más de $5,000 USD | 1 o 2 contratos corporativos al trimestre',
      'Volumen errático: meses con cero ventas y meses con ventas concentradas en un lanzamiento',
      'No tengo claro el ticket promedio ponderado de mi facturación'
    ],
    alignment: {
      phase: 'Fase 1 · Auditoría del modelo de negocio',
      phaseNumber: 1,
      exercises: ['1.8 Smart Pricing', '1.6 Portafolio según escala'],
      deliverable: 'Modelo Smart Pricing y umbral de viabilidad comercial',
      transformationPurpose: 'Determinar si la meta de ingresos requiere un volumen inalcanzable de tráfico o una reconfiguración de precios.'
    }
  },
  {
    id: 'ND-006',
    section: 'Modelo de Negocio',
    type: 'single',
    text: '¿Qué porcentaje de tus ingresos depende directamente de tu tiempo y presencia personal?',
    isEssential: true,
    help: 'Mide la escalabilidad real del negocio y el riesgo de saturación del fundador.',
    example: 'Ej: El 80% depende de mi tiempo directo en sesiones o entregas.',
    options: [
      'Más del 80%: si me enfermo o paro, el negocio deja de facturar y de entregar',
      'Entre 60% y 80%: tengo partes pregrabadas, pero la venta y el soporte dependen de mí',
      'Entre 30% y 60%: modelo semi-escalable con equipo o activos digitales consolidados',
      'Menos del 30%: la entrega está productizada, automatizada o delegada en el equipo'
    ],
    alignment: {
      phase: 'Fase 1 · Auditoría del modelo de negocio',
      phaseNumber: 1,
      exercises: ['1.7 Portafolio según nivel de servicio', '1.9 PEPE Framework'],
      deliverable: 'Auditoría de dependencia operativa del fundador',
      transformationPurpose: 'Desenmascarar el falso crecimiento: escalar sin productizar la entrega solo genera agotamiento extremo.',
      isControlQuestion: true
    }
  },
  {
    id: 'ND-007',
    section: 'Modelo de Negocio',
    type: 'single',
    text: '¿Has validado tu producto o servicio con ventas reales de clientes fuera de tu círculo íntimo?',
    isEssential: false,
    help: 'Distingue entre una hipótesis teórica y una oferta con demanda comprobada en el mercado.',
    example: 'Ej: Sí, más de 150 clientes de pago en los últimos 2 años.',
    options: [
      'Validación sólida: más de 50 clientes de pago han completado el programa con testimonios',
      'Validación moderada: entre 10 y 50 ventas realizadas en el último año',
      'Validación incipiente: menos de 10 clientes (primeros beta testers o conocidos)',
      'En fase de idea o rediseño: aún no he validado la oferta con transacciones reales'
    ],
    alignment: {
      phase: 'Fase 0 · Kickoff',
      phaseNumber: 0,
      exercises: ['0.1 Agente IA Interviewer y Briefing Estratégico', '1.3 Síntesis del diagnóstico'],
      deliverable: 'Briefing previo con nivel de validación de mercado',
      transformationPurpose: 'Evitar automatizar o invertir en tráfico para una oferta que aún no ha demostrado conversión orgánica.'
    }
  },
  {
    id: 'ND-008',
    section: 'Modelo de Negocio',
    type: 'multi',
    text: '¿Cuál es tu propuesta de valor y posicionamiento frente a las alternativas del mercado?',
    isEssential: true,
    help: 'Posicionamiento competitivo claro que justifica por qué el cliente te elige a ti y no a la competencia.',
    example: 'Ej: Acompañamiento personalizado y metodología propietaria vs cursos genéricos masivos.',
    options: [
      'Metodología o framework registrado con pasos secuenciales comprobados',
      'Acompañamiento directo y auditoría personalizada (no formación pasiva)',
      'Especialización vertical y quirúrgica en un solo nicho o problema urgente',
      'Garantía de resultado o velocidad acelerada de implementación',
      'Ventaja tecnológica mediante asistentes o prompts de IA diseñados a medida',
      'Mi propuesta es muy similar a la de mis competidores directos (riesgo de comoditización)',
      'Aún no tengo definida una propuesta de valor concisa y memorable'
    ],
    alignment: {
      phase: 'Fase 2 · Estrategia AI-First',
      phaseNumber: 2,
      exercises: ['2.1 Océano Rojo → Océano Azul', '2.2 Competitividad de tu servicio'],
      deliverable: 'Estrategia AI-First priorizada y posicionamiento en Océano Azul',
      transformationPurpose: 'Sacar al negocio de la guerra de precios redefiniendo su propuesta como una solución de categoría única con IA.'
    }
  },

  // ==========================================
  // BLOQUE 2: OPERACIONES Y SISTEMAS (8 PREGUNTAS)
  // ==========================================
  {
    id: 'ND-009',
    section: 'Operaciones y Sistemas',
    type: 'multi',
    text: '¿Qué herramientas y plataformas utilizas actualmente para operar tu negocio digital?',
    isEssential: true,
    help: 'Stack tecnológico para detectar ineficiencias, herramientas subutilizadas y oportunidades de automatización.',
    example: 'Ej: Hotmart, ConvertKit, Zoom, Canva, Google Workspace, Trello.',
    options: [
      'Plataformas de cursos / membresías (Hotmart, Skool, Kajabi, Teachable, Circle)',
      'CRM y automatizaciones avanzadas (GoHighLevel, ActiveCampaign, HubSpot)',
      'Email marketing básico (ConvertKit, Mailchimp, Brevo, MailerLite)',
      'Mensajería directa para ventas y soporte (WhatsApp Business, Telegram, DMs)',
      'Gestión interna y documentación (Notion, Google Workspace, Trello, ClickUp, Asana)',
      'Pasarelas de pago digitales (Stripe, PayPal, MercadoPago)',
      'Herramientas de IA generativa (ChatGPT Plus, Claude Pro, Gemini, Midjourney)',
      'Hojas de cálculo manuales (Google Sheets / Excel como gestor principal)'
    ],
    alignment: {
      phase: 'Fase 6 · Productización y los 3 Agentes de IA',
      phaseNumber: 6,
      exercises: ['6.2 Auditoría de stack e IA del cliente', '1.10 Catálogo de activos de IA'],
      deliverable: 'Auditoría de stack tecnológico y catálogo de activos de IA',
      transformationPurpose: 'Eliminar el desorden de herramientas desconectadas y centralizar la operación en un ecosistema eficiente.'
    }
  },
  {
    id: 'ND-010',
    section: 'Operaciones y Sistemas',
    type: 'single',
    text: '¿Tienes procesos operativos documentados paso a paso (SOPs) o todo reside en tu cabeza?',
    isEssential: true,
    help: 'Nivel de sistematización que determina si el negocio puede delegar, automatizar y escalar.',
    example: 'Ej: Algunos procesos en Notion pero la gran mayoría está en mi cabeza.',
    options: [
      'Todo reside en mi cabeza: ningún proceso está documentado formalmente',
      'Notas y borradores sueltos en Notion o Drive, pero desactualizados y desorganizados',
      'Procesos de entrega del servicio documentados, pero ventas y marketing son 100% empíricos',
      'Sistemas documentados con checklists claros y videos explicativos para el equipo'
    ],
    alignment: {
      phase: 'Fase 6 · Productización y los 3 Agentes de IA',
      phaseNumber: 6,
      exercises: ['6.1 Service Design del servicio productizado', '6.2 Auditoría de stack e IA'],
      deliverable: 'Service Design del servicio productizado',
      transformationPurpose: 'Estandarizar los procedimientos antes de introducir IA; la IA solo potencia procesos que ya están ordenados.',
      isControlQuestion: true
    }
  },
  {
    id: 'ND-011',
    section: 'Operaciones y Sistemas',
    type: 'multi',
    text: '¿Qué tareas repetitivas te consumen más horas semanales con el menor retorno financiero?',
    isEssential: true,
    help: 'Identifica los cuellos de botella operativos a eliminar, automatizar o delegar.',
    example: 'Ej: Responder DMs de soporte, editar videos, crear gráficos y agendar llamadas.',
    options: [
      'Responder mensajes directos (DMs), comentarios y consultas básicas repetitivas',
      'Diseño de piezas gráficas, edición de videos y formateo de publicaciones',
      'Atención al cliente, soporte técnico y onboarding manual de alumnos',
      'Facturación, gestión de cobros pendientes y conciliación administrativa',
      'Agendamiento y reprogramación manual de llamadas de consultoría o ventas',
      'Explicación repetitiva de contenidos teóricos en sesiones 1:1 que podrían grabarse',
      'Búsqueda y prospección manual en frío de potenciales clientes'
    ],
    alignment: {
      phase: 'Fase 6 · Productización y los 3 Agentes de IA',
      phaseNumber: 6,
      exercises: ['6.3 Matriz de los 3 Agentes de IA'],
      deliverable: 'Matriz de los 3 Agentes de IA definidos para liberar tiempo del fundador',
      transformationPurpose: 'Identificar exactamente cuáles tareas delegar a los agentes de IA para devolverle de 10 a 20 horas al fundador.'
    }
  },
  {
    id: 'ND-012',
    section: 'Operaciones y Sistemas',
    type: 'single',
    text: '¿Cuántas horas trabajas efectivamente a la semana y cuántas quisieras dedicar a la dirección estratégica?',
    isEssential: true,
    help: 'Brecha entre la sobrecarga operativa actual y el equilibrio deseado de vida y liderazgo.',
    example: 'Ej: Trabajo 50+ horas apagando fuegos. Quisiera 25-30 horas enfocadas en crecimiento.',
    options: [
      'Trabajo más de 50 horas a la semana y me siento atrapado en la operativa del día a día',
      'Trabajo entre 40 y 50 horas, pero el 70% se va en tareas de bajo valor',
      'Trabajo entre 30 y 40 horas con estrés constante por falta de tiempo para innovar',
      'Trabajo tiempo parcial (menos de 25h) porque tengo otro empleo o compromisos y no logro avanzar',
      'Tengo un horario sostenible (menos de 30h) y busco maximizar la rentabilidad de cada hora'
    ],
    alignment: {
      phase: 'Fase 5 · Visión y Liderazgo',
      phaseNumber: 5,
      exercises: ['5.1 Identidad operativa del fundador'],
      deliverable: 'Identidad operativa del fundador: zona de genialidad vs tareas delegadas',
      transformationPurpose: 'Definir el rol estratégico del fundador como CEO y director, saliendo de la ejecución manual no remunerada.'
    }
  },
  {
    id: 'ND-013',
    section: 'Operaciones y Sistemas',
    type: 'single',
    text: '¿Cuál es la estructura actual de tu equipo y el nivel de claridad de sus funciones?',
    isEssential: true,
    help: 'Estructura organizacional y capacidad de delegación efectiva.',
    example: 'Ej: VA part-time + diseñador freelance con roles poco definidos.',
    options: [
      '100% Solopreneur: hago absolutamente todo yo solo (ventas, entrega, contenido y soporte)',
      'Cuento con 1 asistente virtual (VA) o freelance pero sus tareas y prioridades son ambiguas',
      'Tengo un equipo pequeño (2 a 4 contratistas: editor, setter, soporte) pero superviso todo',
      'Tengo un equipo estructurado con roles bien definidos, entregables y métricas de rendimiento',
      'He contratado colaboradores o agencias en el pasado con malas experiencias y prefiero hacerlo yo'
    ],
    alignment: {
      phase: 'Fase 6 · Productización y los 3 Agentes de IA',
      phaseNumber: 6,
      exercises: ['6.1 Service Design', '6.3 Matriz de los 3 Agentes de IA'],
      deliverable: 'Ecosistema operativo con roles humanos y agentes de IA asignados',
      transformationPurpose: 'Transicionar de una sobrecarga solitaria hacia un equipo ligero potenciado por agentes de inteligencia artificial.'
    }
  },
  {
    id: 'ND-014',
    section: 'Operaciones y Sistemas',
    type: 'single',
    text: '¿Qué nivel de automatizaciones tienes operando actualmente en tu negocio?',
    isEssential: false,
    help: 'Grado de automatización de procesos para identificar quick wins de implementación inmediata.',
    example: 'Ej: Solo auto-respuesta de email y secuencia de bienvenida básica.',
    options: [
      'Cero automatizaciones: todo se procesa manualmente caso a caso',
      'Automatizaciones básicas (correo automático de confirmación o entrega tras la compra)',
      'Embudos con secuencias de nutrición, recordatorios de llamada y etiquetado en CRM',
      'Ecosistema avanzado con automatizaciones conectadas entre web, CRM, WhatsApp y pagos',
      'Tengo herramientas potentes contratadas pero no sé configurarlas ni sacarles provecho'
    ],
    alignment: {
      phase: 'Fase 6 · Productización y los 3 Agentes de IA',
      phaseNumber: 6,
      exercises: ['6.2 Auditoría de stack e IA del cliente'],
      deliverable: 'Inventario de automatizaciones y plan de simplificación',
      transformationPurpose: 'Conectar puntos ciegos en la adquisición y entrega para que el negocio funcione 24/7 sin fricción.'
    }
  },
  {
    id: 'ND-015',
    section: 'Operaciones y Sistemas',
    type: 'single',
    text: '¿Cómo gestionas la experiencia y la relación con tus clientes después de la compra (post-venta)?',
    isEssential: false,
    help: 'Mide la retención de clientes, reducción de cancelaciones y potencial de generar testimonios y recompras.',
    example: 'Ej: Email manual de bienvenida, sin proceso estructurado de seguimiento.',
    options: [
      'No hay proceso estructurado: entrego el servicio o curso y el contacto cesa',
      'Envío un correo manual o doy acceso a la plataforma, sin medir si el cliente avanza',
      'Cuento con onboarding guiado, acompañamiento estructurado y canal directo para dudas',
      'Tengo un sistema integral de éxito del cliente (checkpoints periódicos, medición de satisfacción y solicitud de testimonios)'
    ],
    alignment: {
      phase: 'Fase 8 · Cierre y Offboarding',
      phaseNumber: 8,
      exercises: ['8.1 Checklist de ecosistema y entregables', '8.2 Plan de Offboarding', '8.3 Prueba de resultado y testimonio'],
      deliverable: 'Plan de Offboarding + protocolo de prueba de resultado y testimonios',
      transformationPurpose: 'Garantizar que el cliente obtenga resultados transformadores que se conviertan en casos de estudio y recompras.'
    }
  },
  {
    id: 'ND-016',
    section: 'Operaciones y Sistemas',
    type: 'single',
    text: '¿Qué ocurriría con tus ventas y la entrega a tus clientes si te vas de vacaciones 2 semanas desconectado?',
    isEssential: true,
    help: 'El test definitivo de dependencia del fundador para priorizar la sistematización y los agentes de IA.',
    example: 'Ej: Ventas, soporte, contenido y seguimiento se paralizan por completo.',
    options: [
      'Colapso total: se detienen las ventas, los clientes quedan desatendidos y se generan quejas',
      'La entrega continúa a medias con material grabado, pero la captación y ventas se van a cero',
      'El equipo resuelve la operación rutinaria, pero se acumulan decisiones urgentes y cuellos de botella',
      'El negocio sigue operando, vendiendo y entregando con normalidad gracias a sistemas y equipo'
    ],
    alignment: {
      phase: 'Fase 6 · Productización y los 3 Agentes de IA',
      phaseNumber: 6,
      exercises: ['6.1 Service Design del servicio productizado', '6.3 Matriz de los 3 Agentes de IA'],
      deliverable: 'Plan de autonomía operativa y servicio productizado',
      transformationPurpose: 'Construir los cortafuegos y agentes necesarios para que el negocio no sea rehén del tiempo personal del dueño.',
      isControlQuestion: true
    }
  },

  // ==========================================
  // BLOQUE 3: FINANZAS DEL NEGOCIO (7 PREGUNTAS)
  // ==========================================
  {
    id: 'ND-017',
    section: 'Finanzas del Negocio',
    type: 'single',
    text: '¿En qué rango se ubica tu facturación promedio mensual / anual actual?',
    isEssential: true,
    help: 'Línea base financiera real para establecer metas viables, proyecciones y retorno de la jornada.',
    example: 'Ej: $5,000 USD/mes ($60,000 USD/año).',
    options: [
      'Menos de $2,000 USD/mes (menos de $24,000 USD/año)',
      '$2,000 a $5,000 USD/mes ($24,000 a $60,000 USD/año)',
      '$5,000 a $10,000 USD/mes ($60,000 a $120,000 USD/año — barrera del solopreneur)',
      '$10,000 a $25,000 USD/mes ($120,000 a $300,000 USD/año)',
      'Más de $25,000 USD/mes (más de $300,000 USD/año)',
      'Facturación muy errática: meses de $12,000 USD seguidos de meses de $800 USD'
    ],
    alignment: {
      phase: 'Fase 1 · Auditoría del modelo de negocio',
      phaseNumber: 1,
      exercises: ['1.3 Síntesis del diagnóstico', '1.8 Smart Pricing'],
      deliverable: 'Diagnóstico financiero de partida y metas de crecimiento',
      transformationPurpose: 'Establecer la realidad numérica exacta para proyectar la hoja de ruta sin autoengaños.'
    }
  },
  {
    id: 'ND-018',
    section: 'Finanzas del Negocio',
    type: 'single',
    text: '¿Cuál es tu margen de ganancia neta real tras deducir publicidad, herramientas, comisiones y colaboradores?',
    isEssential: true,
    help: 'Rentabilidad neta real que queda en el bolsillo del fundador o en la reserva de la empresa.',
    example: 'Ej: Margen aproximado del 45% después de todos los gastos.',
    options: [
      'Alto (más del 60% neto): negocio liviano con alta retención de beneficio',
      'Saludable (entre 40% y 60% neto): balance sólido entre costos y rentabilidad',
      'Ajustado (entre 20% y 40% neto): los costos absorben gran parte de los ingresos',
      'Crítico (menos del 20% neto o apenas cubriendo costos operativos)',
      'No tengo calculados mis números netos con rigor (confundo facturación bruta con beneficio real)'
    ],
    alignment: {
      phase: 'Fase 1 · Auditoría del modelo de negocio',
      phaseNumber: 1,
      exercises: ['1.8 Smart Pricing', '5.3 KPIs y North Star Metric'],
      deliverable: 'Auditoría de rentabilidad y modelo Smart Pricing',
      transformationPurpose: 'Priorizar el margen y la rentabilidad sobre la facturación de vanidad.',
      isControlQuestion: true
    }
  },
  {
    id: 'ND-019',
    section: 'Finanzas del Negocio',
    type: 'single',
    text: '¿Cuánto inviertes mensualmente en adquisición de nuevos clientes (publicidad digital, setters, agencias)?',
    isEssential: true,
    help: 'Presupuesto de inversión comercial para evaluar la capacidad de adquisición pagada y su retorno.',
    example: 'Ej: $800/mes en ads + $200 en herramientas = $1,000 USD total.',
    options: [
      '$0 USD: dependo 100% de tráfico orgánico, referidos o prospección manual en DMs',
      'Menos de $500 USD al mes en campañas esporádicas',
      '$500 a $1,500 USD al mes de forma constante',
      '$1,500 a $5,000 USD al mes en adquisición pagada',
      'Más de $5,000 USD al mes escalando tráfico',
      'He invertido en anuncios en el pasado pero perdí dinero sin conseguir retorno positivo'
    ],
    alignment: {
      phase: 'Fase 3 · Estrategia de marketing y ventas con IA',
      phaseNumber: 3,
      exercises: ['3.1 Growth Marketing Plan', '3.4 Diseño de campaña de ventas · One Funnel Day'],
      deliverable: 'Growth Marketing Plan con benchmark de ROAS y presupuesto de adquisición',
      transformationPurpose: 'Establecer un motor de adquisición predecible con retorno sobre inversión publicitaria (ROAS de 3x a 5x).'
    }
  },
  {
    id: 'ND-020',
    section: 'Finanzas del Negocio',
    type: 'single',
    text: '¿Conoces con exactitud tu Costo de Adquisición de Cliente (CAC) por cada canal de venta?',
    isEssential: true,
    help: 'Métrica crítica que determina si puedes escalar la inversión sin poner en riesgo la viabilidad del negocio.',
    example: 'Ej: Aproximadamente $35 por lead calificado, $180 por cliente de pago.',
    options: [
      'Sí, tengo medido el costo por lead calificado y el CAC exacto por cada canal activo',
      'Tengo una noción aproximada pero no registro la métrica mes a mes',
      'No conozco mi CAC: no sé cuánto me cuesta conseguir un cliente de pago',
      'No aplica porque no invierto dinero en publicidad pagada ni adquisición medible'
    ],
    alignment: {
      phase: 'Fase 3 · Estrategia de marketing y ventas con IA',
      phaseNumber: 3,
      exercises: ['3.1 Growth Marketing Plan', '3.2 Business Marketing Plan aterrizado'],
      deliverable: 'Tablero de métricas unitarias y control de CAC',
      transformationPurpose: 'Conocer las métricas que permiten escalar la inversión con certeza matemática y sin especulación.',
      isControlQuestion: true
    }
  },
  {
    id: 'ND-021',
    section: 'Finanzas del Negocio',
    type: 'single',
    text: '¿Cuál es el Lifetime Value (LTV / Valor de Vida) de tu cliente promedio en los primeros 12 meses?',
    isEssential: false,
    help: 'Valor económico total que aporta un cliente a lo largo de su ciclo de relación con la marca.',
    example: 'Ej: No lo tengo calculado, pero estimo que ronda los $600 USD por recompras.',
    options: [
      'El LTV es idéntico a una sola compra: no hay recompras ni continuidad (LTV = 1 compra)',
      'El LTV multiplica entre 1.3x y 1.8x el valor de entrada gracias a alguna recompra',
      'LTV superior a 2.5x gracias a una escalera de valor clara o servicios recurrentes',
      'Desconozco el LTV y no mido la tasa de recompra histórica'
    ],
    alignment: {
      phase: 'Fase 4 · Ventas & Comercial',
      phaseNumber: 4,
      exercises: ['4.3 Customer Journeys', '4.5 Profit Maximizer Funnels'],
      deliverable: 'Estructura de Customer Journey y maximización del LTV',
      transformationPurpose: 'Diseñar el backend del negocio para que un cliente pague varias veces aumentando el beneficio sin costo extra de captación.'
    }
  },
  {
    id: 'ND-022',
    section: 'Finanzas del Negocio',
    type: 'single',
    text: '¿De cuánto es tu runway financiero (meses que el negocio puede sobrevivir si los ingresos caen a cero)?',
    isEssential: false,
    help: 'Salud de caja y margen de maniobra para tomar decisiones estratégicas sin pánico ni urgencias.',
    example: 'Ej: Podría operar 3 meses sin nuevos ingresos.',
    options: [
      'Menos de 1 mes: vivo mes a mes con alta tensión financiera',
      'Entre 1 y 3 meses de costes fijos cubiertos en reserva',
      'Entre 3 y 6 meses de colchón operativo seguro',
      'Más de 6 meses de runway con total holgura financiera'
    ],
    alignment: {
      phase: 'Fase 5 · Visión y Liderazgo',
      phaseNumber: 5,
      exercises: ['5.2 Visión a 10 años', '5.3 KPIs y North Star Metric'],
      deliverable: 'Tablero de salud financiera y runway de crecimiento',
      transformationPurpose: 'Construir una reserva de seguridad para que el fundador opere desde la visión estratégica y no desde la desesperación.'
    }
  },
  {
    id: 'ND-023',
    section: 'Finanzas del Negocio',
    type: 'single',
    text: '¿Reinviertes sistemáticamente utilidades en el negocio y en qué áreas prioritarias?',
    isEssential: false,
    help: 'Mentalidad de reinversión para acelerar el crecimiento con tecnología, equipo y marketing.',
    example: 'Ej: Reinvierto un 20%: formación, herramientas de IA y publicidad.',
    options: [
      'No reinvierto casi nada: retiro todo para gastos personales porque el margen es bajo',
      'Reinvierto entre 10% y 20% principalmente en formación personal y herramientas básicas',
      'Reinvierto entre 20% y 35% en publicidad pagada, automatizaciones y equipo freelance',
      'Reinversión agresiva (más del 35%) enfocada en acelerar escala, sistemas y captación'
    ],
    alignment: {
      phase: 'Fase 5 · Visión y Liderazgo',
      phaseNumber: 5,
      exercises: ['5.2 Visión a 10 años'],
      deliverable: 'Plan de asignación de capital y reinversión estratégica',
      transformationPurpose: 'Canalizar el flujo de caja hacia los activos de mayor palanca (sistemas, IA y captación predecible).'
    }
  },

  // ==========================================
  // BLOQUE 4: PRODUCTO Y OFERTA (7 PREGUNTAS)
  // ==========================================
  {
    id: 'ND-024',
    section: 'Producto y Oferta',
    type: 'single',
    text: '¿Tienes una escalera de valor estructurada donde cada oferta conduce de forma natural a la siguiente?',
    isEssential: true,
    help: 'Arquitectura armónica de productos desde soluciones de entrada hasta programas de alto valor.',
    example: 'Ej: Incompleta: lead magnet gratis → curso $297 → mentoría $997. Falta el servicio premium.',
    options: [
      'No tengo escalera: tengo productos sueltos y desordenados que no se conectan entre sí',
      'Incompleta: tengo cosas gratis y un servicio caro, pero carezco de soluciones intermedias',
      'Incompleta: tengo productos de bajo y medio costo, pero no tengo una oferta premium High-Ticket',
      'Sí: escalera estructurada (Entrada de bajo costo → Oferta Core → Backend High-Ticket)',
      'Solo vendo 1 único servicio y no tengo ninguna otra alternativa que ofrecer'
    ],
    alignment: {
      phase: 'Fase 4 · Ventas & Comercial',
      phaseNumber: 4,
      exercises: ['4.1 Portafolio hexagonal', '4.2 Escalera de valor'],
      deliverable: 'Portafolio hexagonal y Escalera de valor completa',
      transformationPurpose: 'Eliminar las fugas de ingresos articulando un camino claro donde el cliente siempre tenga un siguiente paso con nosotros.',
      isControlQuestion: true
    }
  },
  {
    id: 'ND-025',
    section: 'Producto y Oferta',
    type: 'single',
    text: '¿Cuál es la transformación específica y tangible que promete tu producto o servicio principal?',
    isEssential: true,
    help: 'La promesa central de valor que justifica el precio y moviliza la decisión de compra del cliente.',
    example: 'Ej: Pasar de tener un servicio desordenado a un negocio digital estructurado y rentable.',
    options: [
      'Transformación concreta, medible y con marco de tiempo claro (Punto A → Punto B definido)',
      'Promesa abstracta o genérica (ej: "mejorar tu vida", "crecer en tu mentalidad")',
      'Enfocada en contenidos o entregables (ej: "acceso a 10 módulos con 40 videos")',
      'Aún no tengo clara la promesa central y me cuesta resumirla en una frase contundente'
    ],
    alignment: {
      phase: 'Fase 1 · Auditoría del modelo de negocio',
      phaseNumber: 1,
      exercises: ['1.4 Avatares + Mapa de clientes', '4.7 Briefing de ventas'],
      deliverable: 'Briefing de ventas y mapa de transformación del cliente',
      transformationPurpose: 'Vender resultados transformadores en lugar de horas o información, multiplicando el valor percibido.'
    }
  },
  {
    id: 'ND-026',
    section: 'Producto y Oferta',
    type: 'single',
    text: '¿Qué porcentaje aproximado de tus clientes te compra un segundo producto o renueva su servicio?',
    isEssential: false,
    help: 'Tasa de recompra que indica el nivel de satisfacción, retención y potencial de crecimiento orgánico.',
    example: 'Ej: Aproximadamente el 25% compra un segundo servicio o programa.',
    options: [
      'Menos del 10%: casi todos compran una sola vez y nunca vuelven a pagar',
      'Entre 10% y 25% de recompra ocasional',
      'Entre 25% y 50% gracias a recomendaciones activas de nuevos programas',
      'Más del 50%: fuerte fidelidad con clientes que compran todo el portafolio',
      'No tengo otros productos ni servicios que ofrecerles tras la primera compra'
    ],
    alignment: {
      phase: 'Fase 4 · Ventas & Comercial',
      phaseNumber: 4,
      exercises: ['4.3 Customer Journeys', '4.5 Profit Maximizer Funnels'],
      deliverable: 'Customer Journeys con puntos de activación de recompra',
      transformationPurpose: 'Activar el motor de ingresos más rentable del negocio: vender más a quien ya confía en ti.'
    }
  },
  {
    id: 'ND-027',
    section: 'Producto y Oferta',
    type: 'single',
    text: '¿Tienes un producto de entrada de bajo costo (Tripwire / Front Offer) para convertir desconocidos en clientes pagos?',
    isEssential: true,
    help: 'Oferta irresistible de bajo precio ($17 - $97 USD) que rompe la barrera de confianza y califica compradores.',
    example: 'Ej: Solo el lead magnet gratuito, no tengo producto de entrada de pago.',
    options: [
      'No: solo tengo regalos gratuitos (lead magnets) y paso directo a intentar vender el producto principal',
      'Tengo un producto económico pero no está conectado ni diseñado para filtrar hacia la oferta principal',
      'Sí: producto de entrada validado que amortiza la publicidad y alimenta la oferta core',
      'No tengo nada gratuito ni de bajo costo: dependo de llamadas de venta directa en frío'
    ],
    alignment: {
      phase: 'Fase 1 · Auditoría del modelo de negocio',
      phaseNumber: 1,
      exercises: ['1.5 Portafolio de soluciones · front y back offers', '4.4 Matriz de lead magnets'],
      deliverable: 'Matriz de lead magnets y diseño de Front Offers',
      transformationPurpose: 'Crear compradores calificados en lugar de coleccionar suscriptores gratuitos que nunca compran.'
    }
  },
  {
    id: 'ND-028',
    section: 'Producto y Oferta',
    type: 'single',
    text: '¿Cuál es tu oferta premium (High-Ticket / Back Offer) y qué esquema de precios utilizas?',
    isEssential: false,
    help: 'Servicio o programa de alto valor ($1,500 a $5,000+ USD) que maximiza el beneficio por cliente.',
    example: 'Ej: Consultoría 1:1 a $2,500 USD por 3 meses.',
    options: [
      'No tengo oferta premium: mi producto más caro está por debajo de $500 USD',
      'Tengo una oferta de alto valor ($1,500 a $5,000 USD) pero me cuesta venderla con regularidad',
      'Tengo una oferta premium consolidada con proceso de aplicación y cierre habitual',
      'Tengo una oferta cara pero consume tantas horas personales que evito promocionarla para no saturarme'
    ],
    alignment: {
      phase: 'Fase 4 · Ventas & Comercial',
      phaseNumber: 4,
      exercises: ['4.6 PIF · Pay In Full', '4.1 Portafolio hexagonal'],
      deliverable: 'Estrategia PIF (Pay In Full) y diseño de oferta High-Ticket',
      transformationPurpose: 'Instalar una oferta de alto impacto que genere ingresos significativos con pocos clientes bien seleccionados.'
    }
  },
  {
    id: 'ND-029',
    section: 'Producto y Oferta',
    type: 'single',
    text: '¿Tienes implementados maximizadores de ingresos como Order Bumps, Upsells o Downsells en tus pasarelas?',
    isEssential: false,
    help: 'Estrategias de checkout que incrementan el ticket promedio entre un 20% y un 40% de forma inmediata.',
    example: 'Ej: No tengo nada implementado todavía en la pasarela de pago.',
    options: [
      'No tengo ningún maximizador: el cliente compra 1 producto y la transacción termina',
      'Tengo un Order Bump básico en el formulario de pago, pero sin upsells posteriores',
      'Tengo embudo completo con Order Bump y Upsell en 1 clic (One-Click Upsell)',
      'No utilizo checkout digital optimizado: cobro por transferencia o enlace manual simple'
    ],
    alignment: {
      phase: 'Fase 4 · Ventas & Comercial',
      phaseNumber: 4,
      exercises: ['4.5 Profit Maximizer Funnels'],
      deliverable: 'Funnels con maximizadores de beneficio (Bumps, Upsells y Downsells)',
      transformationPurpose: 'Maximizar el valor de cada transacción en el momento exacto de mayor intención de compra.',
      isControlQuestion: true
    }
  },
  {
    id: 'ND-030',
    section: 'Producto y Oferta',
    type: 'single',
    text: '¿Tu contenido gratuito en redes sociales y canales conduce de forma intencional y medible hacia tu oferta de pago?',
    isEssential: true,
    help: 'Conexión estratégica entre la visibilidad pública y la conversión a clientes de pago.',
    example: 'Ej: A veces comparto enlaces, pero no de forma intencional ni con embudo estructurado.',
    options: [
      'No: publico contenido de valor pero casi nunca hago llamados a la acción de venta',
      'A veces pongo enlaces en la bio o stories, pero sin un embudo ni medición detrás',
      'Sí: cada pieza de contenido tiene un objetivo definido hacia un lead magnet, DM o llamada de venta',
      'Tengo mucho alcance y visualizaciones, pero no logro que esa audiencia se interese en mis ofertas'
    ],
    alignment: {
      phase: 'Fase 3 · Estrategia de marketing y ventas con IA',
      phaseNumber: 3,
      exercises: ['3.7 Pilares de posicionamiento', '3.8 Plan de contenidos · 4 semanas', '3.9 Calendario de ventas anual'],
      deliverable: 'Plan de contenidos de 4 semanas y calendario de ventas conectado',
      transformationPurpose: 'Alinear el contenido diario con las campañas de facturación para erradicar las métricas de vanidad sin ventas.'
    }
  },

  // ==========================================
  // BLOQUE 5: CRECIMIENTO Y ESCALA (6 PREGUNTAS)
  // ==========================================
  {
    id: 'ND-031',
    section: 'Crecimiento y Escala',
    type: 'single',
    text: '¿Cuál es tu meta de facturación anual / mensual para los próximos 12 meses?',
    isEssential: true,
    help: 'Norte financiero cuantitativo indispensable para dimensionar la hoja de ruta y el plan 30·60·90.',
    example: 'Ej: $120,000 USD anuales ($10,000 USD al mes constantes).',
    options: [
      'Consolidar $30,000 a $60,000 USD anuales ($2,500 - $5,000 USD/mes)',
      'Alcanzar las 6 cifras: $100,000 a $150,000 USD anuales ($8,000 - $12,500 USD/mes)',
      'Escalar a $200,000 a $400,000 USD anuales ($16,000 - $33,000 USD/mes)',
      'Superar $500,000+ USD anuales con modelo consolidado',
      'No tengo una meta cuantitativa desglosada en número de ventas por producto'
    ],
    alignment: {
      phase: 'Fase 5 · Visión y Liderazgo',
      phaseNumber: 5,
      exercises: ['5.2 Visión a 10 años', '5.3 KPIs y North Star Metric', '7.1 Plan 30·60·90'],
      deliverable: 'Visión a 10 años + Tablero de KPIs y North Star Metric',
      transformationPurpose: 'Traducir los deseos del fundador a una meta matemática respaldada por un plan de acción ejecutable.'
    }
  },
  {
    id: 'ND-032',
    section: 'Crecimiento y Escala',
    type: 'single',
    text: '¿Cuál es el modelo principal a través del cual deseas escalar tu facturación?',
    isEssential: true,
    help: 'Dirección estratégica del crecimiento: volumen masivo vs aumento de ticket vs recurrencia.',
    example: 'Ej: Elevar ticket promedio + generar ingresos recurrentes vía servicio productizado.',
    options: [
      'Elevar mi ticket promedio y paquetizar un servicio productizado de alto valor',
      'Conseguir más volumen de clientes a mi precio actual mediante más tráfico',
      'Crear nuevos cursos y productos para vender más cosas al mismo público',
      'Construir un modelo de suscripción recurrente con comunidad o membresía',
      'Diversificarme hacia nuevos mercados o nichos de clientes'
    ],
    alignment: {
      phase: 'Fase 1 · Auditoría del modelo de negocio',
      phaseNumber: 1,
      exercises: ['1.6 Portafolio según escala', '3.5 Diversificación horizontal o vertical'],
      deliverable: 'Estrategia de escala y diversificación priorizada',
      transformationPurpose: 'Evitar la dispersión: muchas veces escalar significa subir precios y simplificar, no crear más productos.',
      isControlQuestion: true
    }
  },
  {
    id: 'ND-033',
    section: 'Crecimiento y Escala',
    type: 'multi',
    text: '¿Qué obstáculos y cuellos de botella te impiden crecer al ritmo que deseas hoy?',
    isEssential: true,
    help: 'Identifica las restricciones dominantes que deben resolverse con prioridad en la jornada.',
    example: 'Ej: Dependencia de mi tiempo, falta de embudo optimizado y dispersión en la oferta.',
    options: [
      'Falta de flujo constante y predecible de prospectos calificados',
      'Saturación del fundador: no tengo tiempo libre para pensar ni planificar',
      'Catálogo desordenado con precios bajos que me obligan a vender sin parar',
      'Falta de automatizaciones y procesos manuales lentos que consumen energía',
      'Dificultad para cerrar ventas y convertir interesados en clientes de pago',
      'Miedo a delegar o malas experiencias previas con contratistas',
      'Falta de una propuesta diferenciada en un mercado saturado'
    ],
    alignment: {
      phase: 'Fase 1 · Auditoría del modelo de negocio',
      phaseNumber: 1,
      exercises: ['1.3 Síntesis del diagnóstico', '6.1 Service Design del servicio productizado'],
      deliverable: 'Síntesis del diagnóstico con cuellos de botella identificados',
      transformationPurpose: 'Enfocar las 7 horas del Digital Business Day en resolver el cuello de botella raíz y no los síntomas superficiales.'
    }
  },
  {
    id: 'ND-034',
    section: 'Crecimiento y Escala',
    type: 'single',
    text: '¿Has explorado o implementado ofertas con ingresos desacoplados de tu tiempo directo (semi-pasivos o productizados)?',
    isEssential: false,
    help: 'Oportunidad de generar facturación sin intercambiar horas directas por dinero.',
    example: 'Ej: Tengo un curso grabado que genera ventas marginales porque no tiene tráfico continuo.',
    options: [
      'No: el 100% de mis ingresos exige mi intervención presencial o sincrónica directa',
      'Tengo cursos o recursos grabados pero venden de forma esporádica por falta de tráfico',
      'Tengo productos digitales que generan ventas automáticas constantes pero representan menos del 30%',
      'Cuento con un servicio productizado con entrega estandarizada que no depende de mi tiempo'
    ],
    alignment: {
      phase: 'Fase 2 · Estrategia AI-First',
      phaseNumber: 2,
      exercises: ['2.1 Océano Rojo → Océano Azul', '6.1 Service Design'],
      deliverable: 'Estrategia AI-First y desacoplamiento de tiempo vs ingresos',
      transformationPurpose: 'Migrar el modelo de negocio hacia activos digitales productizados y apalancados por IA.'
    }
  },
  {
    id: 'ND-035',
    section: 'Crecimiento y Escala',
    type: 'multi',
    text: '¿Qué partes específicas de tu operativa podrías transferir de inmediato a un agente de IA o a un contratista si el proceso estuviera listo?',
    isEssential: false,
    help: 'Quick wins de delegación e implementación para los 3 Agentes de IA que se definen en la Fase 6.',
    example: 'Ej: Filtrado de prospectos en DMs, soporte técnico inicial y edición de contenidos.',
    options: [
      'Calificación y filtrado de leads iniciales en WhatsApp o DMs',
      'Creación de primeros borradores de contenido, copies y guiones de video',
      'Atención de preguntas frecuentes y soporte técnico de alumnos',
      'Seguimiento a prospectos que no compraron y reactivación de contactos',
      'Diseño de creativos publicitarios y edición básica de video',
      'Recolección de métricas de ventas y generación de reportes ejecutivos',
      'Siento que ninguna tarea puede delegarse porque todo requiere mi intuición y experiencia'
    ],
    alignment: {
      phase: 'Fase 6 · Productización y los 3 Agentes de IA',
      phaseNumber: 6,
      exercises: ['6.3 Matriz de los 3 Agentes de IA'],
      deliverable: 'Matriz de los 3 Agentes de IA (Marketing, Ventas u Operación)',
      transformationPurpose: 'Instalar los 3 agentes reales nacidos del negocio para automatizar tareas repetitivas y devolver libertad al fundador.'
    }
  },
  {
    id: 'ND-036',
    section: 'Crecimiento y Escala',
    type: 'single',
    text: '¿Cuentas con un programa estructurado de referidos, afiliados o alianzas estratégicas para captar clientes sin gasto publicitario?',
    isEssential: false,
    help: 'Canales de adquisición orgánica de alta conversión y bajo costo basados en la confianza de terceros.',
    example: 'Ej: Nada formal, solo boca a boca espontáneo cuando alguien decide recomendarme.',
    options: [
      'No: solo boca a boca espontáneo y descontrolado cuando algún cliente satisfecho me menciona',
      'Tengo acuerdos verbales o comisiones informales pero sin herramientas ni seguimiento sistemático',
      'Sí: programa estructurado con comisiones definidas, enlaces de afiliación y material promocional',
      'Realizo directos o colaboraciones puntuales pero sin un mecanismo para capturar y monetizar leads'
    ],
    alignment: {
      phase: 'Fase 4 · Ventas & Comercial',
      phaseNumber: 4,
      exercises: ['4.3 Customer Journeys', '3.6 Diversificación E² · 12 pilares'],
      deliverable: 'Customer Journeys y red de alianzas estratégicas',
      transformationPurpose: 'Sistematizar la recomendación boca a boca convirtiéndola en un canal predecible de atracción sin costo por clic.'
    }
  }
];

export const allQuestions = coreQuestions;
