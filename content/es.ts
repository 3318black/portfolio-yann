import {
  NAV_ANCHORS,
  githubProfile,
  identityShared,
  sectionFlags,
  socials,
  stackItems,
} from "@/content/shared";
import type { SiteContent } from "@/content/types";

/**
 * Contenu espagnol.
 *
 * Adapté et non décalqué. Le vouvoiement (« usted ») est retenu pour le ton
 * professionnel adressé au client ; les ancres restent en français (voir
 * `NAV_ANCHORS`), seuls les libellés changent.
 */
export const es: SiteContent = {
  identity: {
    ...identityShared,
    role: "Data Analyst · Estadística & Machine Learning",
    availability: "Abierto a oportunidades",
  },

  socials,
  sections: sectionFlags,

  nav: [
    { label: "sobre mí", href: NAV_ANCHORS.about },
    { label: "proyectos", href: NAV_ANCHORS.projects },
    { label: "competencias", href: NAV_ANCHORS.skills },
    { label: "artículos", href: NAV_ANCHORS.articles },
  ],

  ui: {
    skipToContent: "Ir al contenido",
    mainNavLabel: "Navegación principal",
    localeSwitcherLabel: "Elegir idioma",
    headerContact: "contacto",
    notFound: {
      code: "ERROR 404",
      title: "ESTA PÁGINA NO EXISTE",
      body: "Puede que el enlace esté obsoleto. Todo el portafolio cabe en una sola página.",
      cta: "VOLVER AL INICIO",
    },
  },

  hero: {
    title:
      "Sus Datos Ya Contienen Las Respuestas. Mi Trabajo Es Hacerlas Legibles.",
    subtitle:
      "Data analyst con un máster en ciencia de datos. Pongo en orden los conjuntos de datos más imperfectos, extraigo de ellos análisis estadísticos y predictivos fiables, y devuelvo una lectura clara en Looker Studio.",
    cta: { label: "proyectos destacados", href: NAV_ANCHORS.projects },
    strip: {
      text: "Descubra mi trayectoria — grado en informática, desarrollo de aplicaciones, máster en ciencia de datos — y los proyectos que han formado mi manera de trabajar.",
      cta: { label: "sobre mí", href: NAV_ANCHORS.about },
    },
  },

  skills: {
    title: ["LO QUE PUEDO", "HACER POR USTED"],
    intro:
      "Todo empieza por un conjunto de datos fiable. Documento cada decisión de limpieza y después explico lo que el análisis demuestra — y lo que no.",
    items: [
      {
        title: "1. LIMPIEZA Y PREPARACIÓN DE DATOS",
        body: "El núcleo de mi trabajo. Python, Pandas, NumPy: auditoría de calidad antes que nada, tratamiento de valores ausentes y atípicos, normalización de formatos, eliminación de duplicados y cruce de varias fuentes. Cada corrección queda justificada y registrada, y el proceso se puede repetir de principio a fin.",
      },
      {
        title: "2. ANÁLISIS ESTADÍSTICO Y EXPLORACIÓN (EDA)",
        body: "Lectura crítica de distribuciones, correlaciones, contrastes de hipótesis y segmentación. Documento lo que los datos pueden — y no pueden — demostrar, y nunca dejo pasar una correlación por una causa.",
      },
      {
        title: "3. MACHINE LEARNING",
        body: "Regresión, clasificación, validación cruzada y evaluación de modelos con scikit-learn. Me importa tanto medir el rendimiento como explicar qué ha aprendido realmente el modelo y en qué variables se apoya.",
      },
      {
        title: "4. VISUALIZACIÓN Y PRESENTACIÓN",
        body: "Looker Studio para los cuadros de mando compartidos, Matplotlib y Seaborn para el análisis. Gráficos elegidos según la pregunta planteada y comentados, para que un equipo no técnico sepa qué hacer con ellos.",
      },
      {
        title: "5. SQL Y BASES DE DATOS",
        body: "PostgreSQL: consultas analíticas, CTE, funciones de ventana, diseño de esquemas y modelado orientado al análisis.",
      },
      {
        title: "6. AUTOMATIZACIÓN",
        body: "Scripts y procesos programados para eliminar los pasos manuales recurrentes: recogida, control de calidad y actualización de los entregables.",
      },
      {
        title: "7. DESARROLLO DE API",
        body: "FastAPI y Flask, heredados de mi grado en informática: exponer un conjunto de datos o un modelo tras una interfaz estable y documentada, cuando un archivo o un cuadro de mando no bastan.",
      },
    ],
  },

  about: {
    title: "SOBRE MÍ",
    body: "Me llamo Yann Niangara y soy data analyst. Un grado en informática, desarrollo de aplicaciones y después un máster en ciencia de datos: esa base técnica me sirve sobre todo para hacer fiables los datos antes de analizarlos. Ahí es donde paso más tiempo, porque un análisis nunca vale más que el conjunto de datos que lo sostiene. Después llegan la estadística, el machine learning y el trabajo de presentación — explicar un resultado con la misma claridad con la que se obtiene. Estoy abierto tanto a un puesto fijo como a proyectos freelance o a un contrato en alternancia.",
    cta: { label: "MI TRAYECTORIA", href: NAV_ANCHORS.contact },
    /** maqueta — cifras sin verificar, a confirmar o corregir */
    stats: [
      { value: 12, label: "Proyectos de datos realizados" },
      { value: 24, label: "Meses de formación en datos" },
      { value: 4, label: "Certificaciones obtenidas" },
    ],
  },

  projects: {
    title: "PROYECTOS DESTACADOS",
    intro:
      "Cuatro análisis llevados del dato bruto a la recomendación, con el detalle de las herramientas empleadas.",
    cta: { label: "VER TODOS LOS PROYECTOS", href: githubProfile },
    items: [
      {
        badge: "MACHINE LEARNING",
        title: "PREDICCIÓN DE FUGA · KKBOX",
        description:
          "Aplicación en línea de apoyo a la retención para un servicio de streaming. Cada lunes, ordena a los abonados según su riesgo de baja e indica, para cada uno, qué decirle por teléfono. De 50 llamadas por semana, el modelo encuentra de media 14 bajas reales, frente a 4 con una ordenación por ingresos — medido sobre 76 semanas pasadas que nunca había visto. Python, XGBoost, scikit-learn, Streamlit.",
        mediaLabel: "aplicación en línea · lista del lunes",
        tint: "neutral",
        href: "https://appapppy-gm32tcl7sk2qhllhvg9vdv.streamlit.app/",
      },
      /**
       * maqueta — los tres proyectos siguientes vienen del diseño y no
       * corresponden a ningún trabajo real. Sustituir por repositorios auténticos.
       */
      {
        badge: "POWER BI",
        title: "ANÁLISIS DE VENTAS RETAIL",
        description:
          "Dieciocho meses de transacciones reunidos en un único cuadro de mando: estacionalidad, margen por categoría y clasificación de tiendas. Del análisis salieron tres recomendaciones de surtido. Power BI, SQL, DAX.",
        mediaLabel: "captura del cuadro de mando de ventas",
        tint: "green",
      },
      {
        badge: "TABLEAU",
        title: "CUADRO DE MANDO DE RRHH",
        description:
          "Seguimiento de la rotación, el absentismo y la pirámide de edad de 800 empleados. Filtros por departamento y antigüedad. Tableau, Excel, limpieza en Python.",
        mediaLabel: "captura del cuadro de mando de RRHH",
        tint: "blue",
      },
      {
        badge: "PYTHON & SQL",
        title: "MOVILIDAD URBANA CON DATOS ABIERTOS",
        description:
          "Cruce de conjuntos de datos públicos para cartografiar las horas de saturación de una red de transporte. PostgreSQL, Pandas, Matplotlib.",
        mediaLabel: "mapa + gráficos en Python",
        tint: "amber",
      },
    ],
  },

  stack: { title: "STACK TÉCNICO", items: stackItems },

  testimonials: {
    title: "LO QUE DICEN DE MI TRABAJO",
    intro: "Opiniones de profesores y compañeros de proyectos colectivos.",
    /** maqueta — CONTENIDO FICTICIO, sección desactivada */
    items: [
      {
        kind: "quote",
        quote:
          "«Yann hace las preguntas correctas antes de tocar los datos. El grupo adoptó su cuadro de mando de ventas tal cual.»",
        author: "Claire Fontaine — profesora de estadística",
      },
      {
        kind: "metric",
        value: "96 %",
        caption:
          "de precisión en el modelo de fuga, validado por validación cruzada",
        emphasis: "neon",
      },
      {
        kind: "quote",
        quote:
          "«Riguroso con la calidad de los datos y claro al presentarlos. Hace que el análisis lo entiendan perfiles no técnicos.»",
        author: "Marc Delaunay — tutor, proyecto colectivo de datos",
      },
      {
        kind: "quote",
        quote:
          "«Repasó todo nuestro conjunto de datos, corrigió los duplicados que nadie había visto y rehízo la estructura del informe en dos días.»",
        author: "Sarah Amrani — compañera de proyecto",
      },
      {
        kind: "quote",
        quote:
          "«Autónomo en SQL y Power BI y, sobre todo, capaz de explicar qué significa la cifra.»",
        author: "Luc Berrada — responsable de la formación",
      },
      {
        kind: "metric",
        value: "- 32 %",
        caption:
          "de tiempo de elaboración de informes tras automatizar el cuadro de mando de RRHH",
        emphasis: "dark",
      },
    ],
  },

  faq: {
    title: ["PREGUNTAS", "FRECUENTES"],
    intro:
      "Lo que más me preguntan en las entrevistas. ¿Otra pregunta? El formulario está justo debajo.",
    items: [
      {
        title: "¿QUÉ TECNOLOGÍAS UTILIZA?",
        body: "Python (Pandas, NumPy, scikit-learn) y SQL a diario, PostgreSQL para las bases de datos y Looker Studio para los cuadros de mando compartidos. FastAPI y Flask cuando hay que exponer un proceso, Git para el control de versiones.",
      },
      {
        title: "¿QUÉ TIPO DE PUESTO BUSCA?",
        body: "Estoy abierto tanto a un puesto fijo como a proyectos freelance, y la alternancia sigue siendo una opción. El formato importa menos que el tema: proyectos donde el dato desemboque en una decisión o en una herramienta que se use de verdad.",
      },
      {
        title: "¿CÓMO ABORDA UN PROYECTO DE DATOS?",
        body: "Definición de la pregunta de negocio y después una auditoría de calidad sistemática: mientras el conjunto de datos no sea fiable, el análisis no significa nada. Vienen luego la exploración, el modelado cuando se justifica, y la presentación — informe, cuadro de mando en Looker Studio o API según el uso. Cada decisión de limpieza queda documentada y es reproducible.",
      },
      {
        title: "¿HA TRABAJADO EN EQUIPO?",
        body: "Sí, en varios proyectos colectivos: reparto de tareas con Git, revisiones cruzadas de código y presentación ante un tribunal.",
      },
      {
        title: "¿TRABAJA EN REMOTO?",
        body: "Híbrido o presencial en la región de París, con teletrabajo puntual.",
      },
      {
        title: "¿CÓMO EMPEZAMOS A COLABORAR?",
        body: "Un mensaje a través del formulario y después una conversación de 20 minutos para entender sus datos y sus prioridades.",
      },
    ],
  },

  articles: {
    title: "NOTAS Y LECTURAS",
    intro:
      "Lo que leo, pruebo y retengo sobre herramientas y métodos de análisis.",
    /**
     * maqueta — artículos inventados y enlaces ficticios. Sustituirlos, u
     * ocultar toda la sección mediante `sectionFlags.showArticles`.
     */
    items: [
      {
        category: "MÉTODO",
        date: "12 DE JUNIO DE 2026",
        title: "LIMPIAR UN CONJUNTO DE DATOS EN 5 PASOS REPRODUCIBLES",
        excerpt:
          "La lista de comprobación que aplico antes de cualquier análisis, del tipado de columnas a la trazabilidad de las correcciones.",
        href: githubProfile,
      },
      {
        category: "HERRAMIENTAS",
        date: "28 DE MAYO DE 2026",
        title: "POWER BI O TABLEAU: CÓMO ELIJO",
        excerpt:
          "Comparación sobre un mismo conjunto de datos de retail: modelado, rapidez de prototipado y trabajo compartido.",
        href: githubProfile,
      },
    ],
  },

  contact: {
    title: "TRABAJEMOS JUNTOS",
    intro:
      "Un puesto, un proyecto freelance o un contrato en alternancia: dígame qué necesita y le respondo en menos de 24 h.",
    submitLabel: "ENVIAR",
    submittingLabel: "ENVIANDO…",
    subjectLabels: {
      job: "Puesto fijo",
      apprenticeship: "Alternancia",
      freelance: "Proyecto freelance",
      other: "Otro",
    },
    fields: {
      name: "NOMBRE",
      email: "EMAIL",
      subject: "ASUNTO",
      message: "MENSAJE",
    },
    placeholders: {
      name: "Su nombre",
      email: "usted@empresa.com",
      message: "Hábleme de sus datos…",
    },
    success: "Mensaje enviado. Le respondo en menos de 24 h.",
    errorGeneric:
      "El envío ha fallado. Inténtelo de nuevo o escríbame directamente por email.",
    errorRateLimit:
      "Demasiados mensajes enviados. Inténtelo dentro de unos minutos.",
    validation: {
      nameMin: "Su nombre debe tener al menos 2 caracteres.",
      nameMax: "Su nombre no puede superar los 80 caracteres.",
      emailInvalid: "Dirección de email no válida.",
      emailMax: "Esta dirección es demasiado larga.",
      subjectInvalid: "Elija un asunto de la lista.",
      messageMin:
        "Describa lo que necesita en unas palabras (20 caracteres mínimo).",
      messageMax: "Por favor, no supere los 2000 caracteres.",
    },
  },

  footer: { copyright: "© 2026 YANN NIANGARA — PORTAFOLIO DATA ANALYST" },
};
