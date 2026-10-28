/**
 * Banco de Preguntas para el Examen de Certificación:
 * Google Cloud Certified Associate Data Practitioner
 * 
 * Estructurado en los 5 dominios oficiales:
 * 1. storage: Almacenamiento y Acceso a Datos
 * 2. pipelines: Ingesta y Procesamiento de Datos
 * 3. analysis: Análisis y Visualización (BigQuery, Looker)
 * 4. ml_ai: Fundamentos de IA y Machine Learning (BigQuery ML, Vertex AI)
 * 5. governance: Gobernanza, Seguridad y Cumplimiento (Dataplex, DLP, IAM)
 */

const DOMAINS = {
  all: { id: "all", name: "Todos los Dominios", icon: "Layers" },
  storage: { id: "storage", name: "1. Almacenamiento y Acceso", icon: "Database" },
  pipelines: { id: "pipelines", name: "2. Ingesta y Procesamiento", icon: "Cpu" },
  analysis: { id: "analysis", name: "3. Análisis y Visualización", icon: "BarChart3" },
  ml_ai: { id: "ml_ai", name: "4. Fundamentos de IA y ML", icon: "Sparkles" },
  governance: { id: "governance", name: "5. Gobernanza y Seguridad", icon: "ShieldCheck" }
};

const QUESTIONS = [
  // ==================== DOMINIO 1: ALMACENAMIENTO Y ACCESO ====================
  {
    id: 1,
    domain: "storage",
    difficulty: "Escenario",
    question: "Tu empresa almacena registros de auditoría financiera en Cloud Storage. Estos archivos deben conservarse durante 5 años por motivos de cumplimiento normativo. Se accede a ellos con mucha frecuencia durante los primeros 30 días, casi nunca durante el resto del año, y solo en casos excepcionales de auditoría en los años 2 a 5. ¿Cuál es la estrategia de clases de almacenamiento más rentable?",
    options: [
      { id: "A", text: "Almacenar todo en Nearline Storage y conservarlo durante 5 años." },
      { id: "B", text: "Iniciar en Standard Storage y configurar una regla de Lifecycle Management para pasar a Nearline a los 30 días, y a Archive a los 365 días.", isCorrect: true },
      { id: "C", text: "Iniciar en Standard Storage y mover manualmente a Coldline Storage al finalizar cada trimestre fiscal." },
      { id: "D", text: "Almacenar todo en Archive Storage desde el primer día para maximizar el ahorro económico." }
    ],
    explanation: {
      general: "Google Cloud Storage Object Lifecycle Management permite automatizar la transición entre clases de almacenamiento para optimizar costos de reposo y de recuperación.",
      whyCorrect: "La opción B es la óptima: los primeros 30 días requieren acceso frecuente (Standard Storage no cobra tarifas de recuperación). Entre el día 30 y el 365 se accede rara vez (Nearline Storage para acceso mensual). Después de 1 año, el acceso es extraordinario (Archive Storage ofrece el costo más bajo por GB/mes, ideal para retención a largo plazo).",
      optionsBreakdown: {
        A: "Incorrecto: Nearline impone un cargo por recuperación de datos y una permanencia mínima de 30 días. En los primeros 30 días, el alto volumen de lecturas generaría costos elevados de recuperación.",
        B: "¡Correcto! Aprovecha las fortalezas de Standard (sin costo de lectura los primeros 30 días), Nearline (costo bajo para acceso esporádico el primer año) y Archive (costo ultra-bajo para los 4 años restantes).",
        C: "Incorrecto: La gestión manual introduce riesgo humano, falta de automatización y no aprovecha la clase Archive para los años 2 a 5.",
        D: "Incorrecto: Archive tiene una permanencia mínima de 365 días y tarifas de recuperación muy altas ($0.05/GB). Acceder a los datos intensamente los primeros 30 días en Archive resultaría extremadamente costoso."
      },
      keyConcept: "Cloud Storage Classes & Lifecycle Management",
      docTip: "Recuerda los mínimos de almacenamiento: Standard (0 días), Nearline (30 días), Coldline (90 días), Archive (365 días)."
    }
  },
  {
    id: 2,
    domain: "storage",
    difficulty: "Intermedio",
    question: "Tienes una tabla transaccional en BigQuery con más de 10 mil millones de filas que registra eventos de usuarios. Las consultas más habituales filtran por el campo `event_timestamp` (un rango de 7 días) y con frecuencia también filtran o agrupan por `country_code` y `event_type`. ¿Cómo deberías diseñar la tabla en BigQuery para minimizar los bytes escaneados y el costo?",
    options: [
      { id: "A", text: "Crear una tabla particionada por `event_timestamp` (DAY) y con clustering por `country_code` y `event_type`.", isCorrect: true },
      { id: "B", text: "Crear una tabla particionada por `country_code` y con clustering por `event_timestamp`." },
      { id: "C", text: "Crear tablas independientes separadas para cada día y para cada país utilizando sufijos de tabla (sharding)." },
      { id: "D", text: "Crear una tabla no particionada con índices de búsqueda en `event_timestamp`." }
    ],
    explanation: {
      general: "La combinación de particionamiento (Partitioning) y agrupamiento (Clustering) es la mejor práctica recomendada por Google para tablas analíticas masivas.",
      whyCorrect: "Particionar por `event_timestamp` permite a BigQuery ignorar particiones enteras (pruning) basadas en fechas, reduciendo drásticamente los bytes leídos. Aplicar clustering por `country_code` y `event_type` organiza físicamente los datos dentro de cada partición, acelerando los filtros secundarios y agregaciones.",
      optionsBreakdown: {
        A: "¡Correcto! Particionamiento por fecha (timestamp a nivel diario) + clustering por columnas categóricas de alta cardinalidad o filtradas con frecuencia.",
        B: "Incorrecto: BigQuery solo permite particionar por fecha/tiempo, entero en rangos o tiempo de ingesta. No se puede particionar directamente por una cadena como `country_code` sin convertirla a rangos de enteros, y el filtro temporal es el más selectivo.",
        C: "Incorrecto: El sharding de tablas (ej. `events_20240101`) es un antipatrón en BigQuery. Degrada el rendimiento de metadatos y dificulta el mantenimiento frente a tablas particionadas nativas.",
        D: "Incorrecto: Sin particiones, BigQuery realizará escaneos completos (Full Table Scans) de los 10 mil millones de filas para filtros de fecha, incrementando enormemente los costos."
      },
      keyConcept: "BigQuery Partitioning & Clustering",
      docTip: "El particionado divide físicamente la tabla en bloques según una columna de fecha/hora; el clustering ordena las filas dentro de cada partición."
    }
  },
  {
    id: 3,
    domain: "storage",
    difficulty: "Intermedio",
    question: "Una aplicación bancaria requiere una base de datos relacional que maneje transacciones ACID con consistencia estricta, alta disponibilidad y capacidad de escalar horizontalmente a nivel global a través de múltiples continentes sin riesgo de lecturas desactualizadas. ¿Qué servicio de Google Cloud debes elegir?",
    options: [
      { id: "A", text: "Cloud SQL con réplicas de lectura entre regiones." },
      { id: "B", text: "Cloud Bigtable con replicación multirregional." },
      { id: "C", text: "Cloud Spanner con configuración multirregional.", isCorrect: true },
      { id: "D", text: "Firestore en modo Datastore." }
    ],
    explanation: {
      general: "Cloud Spanner es el servicio de base de datos relacional de nivel empresarial de Google que combina transacciones ACID con escalabilidad horizontal global.",
      whyCorrect: "Cloud Spanner proporciona consistencia externa fuerte (Strong Consistency) a escala global mediante la tecnología TrueTime de Google, permitiendo lecturas y escrituras ACID distribuidas entre continentes.",
      optionsBreakdown: {
        A: "Incorrecto: Cloud SQL escala verticalmente (no horizontalmente para escrituras) y las réplicas de lectura entre regiones son asíncronas (consistencia eventual, no estricta).",
        B: "Incorrecto: Cloud Bigtable es una base de datos NoSQL de columnas anchas para alta velocidad de ingestión y analítica, pero no ofrece transacciones ACID relacionales complejas entre múltiples filas/tablas.",
        C: "¡Correcto! Cloud Spanner está diseñado específicamente para transacciones relacionales globales con consistencia estricta e ilimitada escalabilidad horizontal.",
        D: "Incorrecto: Firestore es NoSQL orientado a documentos, principalmente para aplicaciones web/móviles, no una base de datos relacional a escala bancaria global."
      },
      keyConcept: "Cloud Spanner vs. Cloud SQL vs. Bigtable",
      docTip: "Regla mnemotécnica: ¿Relacional + Transacciones ACID + Global / Multi-región con consistencia fuerte? -> Cloud Spanner siempre."
    }
  },
  {
    id: 4,
    domain: "storage",
    difficulty: "Básico",
    question: "Necesitas almacenar telemetría de 500,000 sensores de IoT que emiten métricas cada segundo. La solución debe ofrecer lecturas y escrituras con latencia inferior a 10 milisegundos y almacenar petabytes de datos secuenciales organizados por ID de sensor y marca de tiempo. ¿Cuál es el servicio más adecuado?",
    options: [
      { id: "A", text: "Cloud Bigtable", isCorrect: true },
      { id: "B", text: "Cloud SQL para PostgreSQL" },
      { id: "C", text: "BigQuery en modo BI Engine" },
      { id: "D", text: "Cloud Storage en clase Standard" }
    ],
    explanation: {
      general: "Cloud Bigtable es la base de datos NoSQL de baja latencia y alto rendimiento de Google, la misma base tecnológica detrás de Google Search, Maps y YouTube.",
      whyCorrect: "Bigtable está optimizado para cargas de trabajo de series temporales (time-series), IoT y streaming de millones de escrituras por segundo con latencias de un solo dígito de milisegundo a escala de petabytes.",
      optionsBreakdown: {
        A: "¡Correcto! Cloud Bigtable es la solución ideal para telemetría de sensores e IoT con ultra baja latencia (<10ms) y escala de petabytes con un esquema de clave de fila (row key).",
        B: "Incorrecto: Cloud SQL tiene un límite de almacenamiento (máximo 64 TB) y no soportará de forma eficiente medio millón de escrituras por segundo a escala de petabytes.",
        C: "Incorrecto: BigQuery es un data warehouse analítico columnar (OLAP), no una base de datos operativa de baja latencia para escrituras por segundo de IoT.",
        D: "Incorrecto: Cloud Storage es almacenamiento de objetos; no proporciona latencia de milisegundos para consultas por sensor o lecturas individuales en tiempo real."
      },
      keyConcept: "Cloud Bigtable para Time-Series e IoT",
      docTip: "Si en el examen mencionan: baja latencia (sub-10ms), alto rendimiento de escrituras NoSQL, series temporales o IoT -> La respuesta es Cloud Bigtable."
    }
  },
  {
    id: 5,
    domain: "storage",
    difficulty: "Escenario",
    question: "Un analista de datos necesita consultar archivos Parquet de 2 Terabytes almacenados en un bucket de Cloud Storage sin incurrir en costos de ingesta ni cargar los datos permanentemente en BigQuery. Solo necesita ejecutar una consulta exploratoria puntual. ¿Qué mecanismo debería utilizar?",
    options: [
      { id: "A", text: "Cargar los datos en BigQuery usando el comando `bq load` con una tabla temporal." },
      { id: "B", text: "Configurar una tabla externa de BigQuery (External Table) que apunte al bucket de Cloud Storage y ejecutar la consulta SQL.", isCorrect: true },
      { id: "C", text: "Descargar los archivos a una máquina Compute Engine y procesarlos con SQLite." },
      { id: "D", text: "Utilizar Cloud Data Fusion para crear una canalización completa de extracción." }
    ],
    explanation: {
      general: "BigQuery permite consultar datos directamente en Cloud Storage, Google Drive o Bigtable sin moverlos usando 'Tablas Externas' (External Tables).",
      whyCorrect: "Una tabla externa permite consultar formatos como Parquet, ORC, CSV o JSON directamente desde Cloud Storage con sintaxis SQL habitual, sin pagar costos de almacenamiento en BigQuery ni esperar tiempos de carga.",
      optionsBreakdown: {
        A: "Incorrecto: Aunque `bq load` no cobra por la operación de carga, duplica el almacenamiento y requiere tiempo para completar la ingesta de 2 TB antes de poder consultar.",
        B: "¡Correcto! Las tablas externas permiten consultas directas 'in situ' (in-place) sobre Cloud Storage, ideales para análisis exploratorios puntuales.",
        C: "Incorrecto: Descargar 2 TB a una VM es lento, costoso en egress/disco y SQLite no escala para 2 Terabytes.",
        D: "Incorrecto: Cloud Data Fusion introduce costo de infraestructura de clúster innecesario y complejidad excesiva para una consulta SQL exploratoria."
      },
      keyConcept: "BigQuery External Tables (Federated Queries)",
      docTip: "Las tablas externas son ideales para consultas ad-hoc o datos que cambian continuamente en Cloud Storage sin querer pagar doble almacenamiento."
    }
  },

  // ==================== DOMINIO 2: INGESTA Y PROCESAMIENTO ====================
  {
    id: 6,
    domain: "pipelines",
    difficulty: "Intermedio",
    question: "Tu empresa recibe flujos continuos de eventos en tiempo real desde aplicaciones móviles. Necesitas ingerir estos mensajes de forma asíncrona, desacoplada y escalable antes de enviarlos a una canalización de procesamiento. ¿Qué servicio de mensajería de Google Cloud se debe utilizar?",
    options: [
      { id: "A", text: "Cloud Tasks" },
      { id: "B", text: "Cloud Pub/Sub", isCorrect: true },
      { id: "C", text: "Cloud Endpoints" },
      { id: "D", text: "Eventarc para Compute Engine" }
    ],
    explanation: {
      general: "Cloud Pub/Sub es el servicio de mensajería de publicación/suscripción global totalmente gestionado de Google Cloud para la ingesta de streaming.",
      whyCorrect: "Pub/Sub proporciona ingesta de eventos masivos en tiempo real con alta disponibilidad y distribución a múltiples suscriptores de manera desacoplada.",
      optionsBreakdown: {
        A: "Incorrecto: Cloud Tasks está diseñado para la ejecución diferida de tareas asíncronas con control de tasa hacia endpoints específicos, no para streaming masivo de eventos.",
        B: "¡Correcto! Cloud Pub/Sub es la columna vertebral de la ingesta en tiempo real en GCP, escalando automáticamente a millones de eventos por segundo.",
        C: "Incorrecto: Cloud Endpoints es un sistema de gestión de API (API Gateway/Proxy), no un broker de mensajería de eventos.",
        D: "Incorrecto: Eventarc enruta eventos de auditoría y de servicios de Google Cloud hacia Cloud Run o Workflows, no es el buffer principal de telemetría de aplicaciones móviles."
      },
      keyConcept: "Cloud Pub/Sub como Broker de Streaming",
      docTip: "Pub/Sub ofrece entrega 'at-least-once' (al menos una vez) y almacenamiento en buffer de mensajes hasta por 7 días (configurable hasta 31 días)."
    }
  },
  {
    id: 7,
    domain: "pipelines",
    difficulty: "Escenario",
    question: "Necesitas procesar datos que llegan en tiempo real desde Pub/Sub, enriquecerlos con datos de clientes y calcular métricas agrupadas en ventanas de 5 minutos que se mueven cada 1 minuto (ventanas deslizantes). La canalización debe ser tolerante a fallos y manejar datos retrasados (late data). ¿Qué tecnología debes emplear?",
    options: [
      { id: "A", text: "Cloud Dataflow con Apache Beam", isCorrect: true },
      { id: "B", text: "Cloud Dataproc con clúster persistente de Hadoop MapReduce" },
      { id: "C", text: "BigQuery Scheduled Queries cada minuto" },
      { id: "D", text: "Cloud Functions de primera generación con activador de Pub/Sub" }
    ],
    explanation: {
      general: "Google Cloud Dataflow, basado en el modelo de programación de código abierto Apache Beam, es la solución nativa para procesamiento unificado batch y stream.",
      whyCorrect: "Apache Beam / Dataflow soporta ventanas avanzadas (Tumbling, Hopping/Sliding y Session Windows) y gestión precisa de marcas de agua (Watermarks) para datos que llegan con retraso, con procesamiento exactamente una vez (exactly-once processing).",
      optionsBreakdown: {
        A: "¡Correcto! Cloud Dataflow es el estándar de Google Cloud para procesar ventanas deslizantes y manejar datos fuera de orden o retrasados.",
        B: "Incorrecto: MapReduce tradicional es un modelo batch basado en disco y no soporta procesamiento nativo en streaming con ventanas deslizantes de baja latencia.",
        C: "Incorrecto: BigQuery Scheduled Queries ejecuta consultas periódicas, pero no puede mantener estado continuo de streaming con ventanas de 1 minuto ni manejar marcas de agua complejas con baja latencia.",
        D: "Incorrecto: Cloud Functions es sin estado (stateless) por invocación; no mantiene estado entre eventos para computar agregaciones temporales de 5 minutos deslizantes."
      },
      keyConcept: "Cloud Dataflow (Apache Beam) & Windowing",
      docTip: "Ventanas fijas = Tumbling; Ventanas deslizantes/solapadas = Hopping/Sliding; Ventanas basadas en inactividad = Session."
    }
  },
  {
    id: 8,
    domain: "pipelines",
    difficulty: "Básico",
    question: "Tu equipo cuenta con scripts existentes escritos en Apache Spark y Apache Hive en un clúster local de Hadoop. Quieren migrar estos trabajos a Google Cloud con los mínimos cambios de código posibles y minimizando costos cuando no haya trabajos en ejecución. ¿Cuál es la solución recomendada?",
    options: [
      { id: "A", text: "Reescribir todos los scripts en SQL de BigQuery." },
      { id: "B", text: "Utilizar Cloud Dataproc con clústeres efímeros que se crean para ejecutar el trabajo y se destruyen al finalizar.", isCorrect: true },
      { id: "C", text: "Instalar Hadoop y Spark manualmente en instancias de Compute Engine sin apagar nunca las VMs." },
      { id: "D", text: "Convertir todos los trabajos a Cloud Composer Dags sin Spark." }
    ],
    explanation: {
      general: "Cloud Dataproc es el servicio gestionado de Google Cloud para ejecutar el ecosistema de código abierto de Apache (Spark, Hadoop, Hive, Pig, Presto).",
      whyCorrect: "Dataproc permite ejecutar código Spark/Hive existente sin reescribir. La mejor práctica de costos en GCP es usar clústeres efímeros (job-scoped): se inician en 90 segundos, ejecutan el trabajo leyendo/escribiendo en Cloud Storage, y se apagan automáticamente.",
      optionsBreakdown: {
        A: "Incorrecto: Reescribir todo el código Spark y Hive a SQL requiere semanas o meses de esfuerzo y no cumple con el requisito de 'mínimos cambios'.",
        B: "¡Correcto! Cloud Dataproc permite 'lift and shift' de código Spark/Hadoop y los clústeres efímeros reducen drásticamente la factura al no pagar por VMs ociosas.",
        C: "Incorrecto: Gestionar Hadoop en Compute Engine autogestionado genera sobrecarga operativa y mantenerlas encendidas 24/7 desperdicia presupuesto.",
        D: "Incorrecto: Cloud Composer es un orquestador (Apache Airflow), no un motor de procesamiento de cómputo para ejecutar transformaciones Spark masivas."
      },
      keyConcept: "Cloud Dataproc & Clústeres Efímeros",
      docTip: "Dataproc desacopla el almacenamiento del cómputo guardando los datos en Cloud Storage (`gs://`) en lugar de HDFS persistente."
    }
  },
  {
    id: 9,
    domain: "pipelines",
    difficulty: "Intermedio",
    question: "Necesitas orquestar un flujo de trabajo de datos complejo que involucra: extraer datos de un SFTP externo, activar un clúster de Dataproc para transformar los datos, cargar el resultado en BigQuery y finalmente enviar una notificación por Slack si hay algún error. ¿Qué servicio de orquestación de GCP debes usar?",
    options: [
      { id: "A", text: "Cloud Composer", isCorrect: true },
      { id: "B", text: "Cron job en una máquina virtual de Compute Engine" },
      { id: "C", text: "Cloud Dataflow" },
      { id: "D", text: "BigQuery BI Engine" }
    ],
    explanation: {
      general: "Cloud Composer es un servicio gestionado de orquestación de flujos de trabajo basado en el popular proyecto de código abierto Apache Airflow.",
      whyCorrect: "Cloud Composer utiliza grafos acíclicos dirigidos (DAGs en Python) para orquestar y coordinar dependencias entre múltiples servicios y plataformas (Cloud Storage, Dataproc, BigQuery, APIs externas y alertas).",
      optionsBreakdown: {
        A: "¡Correcto! Cloud Composer (Airflow gestionado) es el orquestador por excelencia para pipelines dependientes de múltiples pasos heterogéneos.",
        B: "Incorrecto: Un Cron job tradicional en una VM carece de visualización de dependencias, reintentos automáticos configurables por tarea, registro centralizado y tolerancia a fallos.",
        C: "Incorrecto: Dataflow es un motor de ejecución de datos (procesamiento y transformación), no un orquestador de dependencias entre servicios externos y GCP.",
        D: "Incorrecto: BI Engine es un acelerador de consultas en memoria para BigQuery y herramientas de BI, no un orquestador."
      },
      keyConcept: "Cloud Composer (Apache Airflow)",
      docTip: "Si el problema habla de: orquestación de dependencias, DAGs en Python, coordinación entre diferentes servicios -> Cloud Composer."
    }
  },
  {
    id: 10,
    domain: "pipelines",
    difficulty: "Básico",
    question: "Un equipo de analistas de negocio necesita limpiar, filtrar y explorar visualmente conjuntos de datos sin escribir código antes de cargarlos en BigQuery para generar reportes. ¿Qué herramienta integrada en Google Cloud proporciona una interfaz gráfica para la preparación visual de datos?",
    options: [
      { id: "A", text: "Dataprep by Trifacta", isCorrect: true },
      { id: "B", text: "Cloud Shell" },
      { id: "C", text: "Vertex AI Pipelines" },
      { id: "D", text: "BigQuery Command Line (bq CLI)" }
    ],
    explanation: {
      general: "Dataprep by Trifacta es un servicio de datos inteligente de Google Cloud para explorar visualmente, limpiar y preparar datos estructurados y no estructurados.",
      whyCorrect: "Dataprep ofrece una interfaz visual intuitiva sin código (no-code / low-code) que sugiere transformaciones basadas en la distribución de los datos y compila las recetas de transformación en trabajos de Cloud Dataflow.",
      optionsBreakdown: {
        A: "¡Correcto! Dataprep by Trifacta está diseñado específicamente para usuarios que necesitan limpiar datos visualmente sin escribir código.",
        B: "Incorrecto: Cloud Shell es una interfaz de línea de comandos en navegador, totalmente orientada a código y comandos de administración.",
        C: "Incorrecto: Vertex AI Pipelines está pensado para la orquestación y automatización de flujos de entrenamiento y despliegue de Machine Learning (Kubeflow/TFX).",
        D: "Incorrecto: La herramienta `bq CLI` es una utilidad de terminal basada en texto para desarrolladores e ingenieros de datos."
      },
      keyConcept: "Dataprep by Trifacta",
      docTip: "Dataprep traduce las transformaciones visuales creadas por los usuarios en ejecuciones subyacentes de Cloud Dataflow."
    }
  },

  // ==================== DOMINIO 3: ANÁLISIS Y VISUALIZACIÓN ====================
  {
    id: 11,
    domain: "analysis",
    difficulty: "Básico",
    question: "¿Cuál de las siguientes prácticas de consulta SQL en BigQuery reduce directamente la cantidad de bytes leídos (y por lo tanto el costo en el modelo bajo demanda)?",
    options: [
      { id: "A", text: "Añadir una cláusula `LIMIT 10` al final de una consulta que hace `SELECT *`." },
      { id: "B", text: "Especificar únicamente las columnas necesarias en el `SELECT` en lugar de usar `SELECT *`.", isCorrect: true },
      { id: "C", text: "Usar subconsultas complejas en lugar de sentencias `WITH`." },
      { id: "D", text: "Ordenar los resultados con `ORDER BY` en todas las consultas internas." }
    ],
    explanation: {
      general: "BigQuery es una base de datos analítica orientada a columnas (column-oriented storage). Cada columna se almacena en un archivo independiente.",
      whyCorrect: "Al evitar `SELECT *` y proyectar solo las columnas necesarias, BigQuery únicamente lee del almacenamiento físico los archivos correspondientes a esas columnas, reduciendo proporcionalmente los bytes escaneados y el costo.",
      optionsBreakdown: {
        A: "Incorrecto: En BigQuery, `LIMIT` restringe las filas devueltas al cliente pero NO reduce los bytes escaneados ni el costo en un modelo On-Demand.",
        B: "¡Correcto! Al ser una base de datos columnar, especificar solo las columnas requeridas (pruning de columnas) disminuye de forma directa los bytes leídos.",
        C: "Incorrecto: Las subconsultas y las CTEs (`WITH`) son optimizadas de manera similar por el motor de ejecución de BigQuery; no reducen bytes leídos por sí mismas.",
        D: "Incorrecto: `ORDER BY` en subconsultas intermedias consume recursos de memoria/CPU innecesarios y no reduce los datos escaneados."
      },
      keyConcept: "Almacenamiento Columnar y Costos en BigQuery",
      docTip: "¡Trampa clásica de examen!: `LIMIT 10` NO reduce la cantidad de bytes procesados en una consulta en BigQuery."
    }
  },
  {
    id: 12,
    domain: "analysis",
    difficulty: "Escenario",
    question: "Varios directores ejecutivos consultan frecuentemente un tablero interactivo en Looker Studio conectado a BigQuery. Aunque las consultas analizan agregaciones de métricas clave, las respuestas tardan varios segundos y el costo por escaneo de consultas repetitivas está aumentando. ¿Qué característica de BigQuery puedes activar para lograr respuestas subsegundo y reducir costos sin modificar el tablero?",
    options: [
      { id: "A", text: "Configurar BigQuery BI Engine reservando capacidad de memoria.", isCorrect: true },
      { id: "B", text: "Exportar los datos cada 5 minutos a Google Sheets y conectar Looker Studio a la hoja de cálculo." },
      { id: "C", text: "Crear una vista estándar (View) en BigQuery que contenga la consulta agregada." },
      { id: "D", text: "Aumentar los límites de cuota de la API de BigQuery." }
    ],
    explanation: {
      general: "BigQuery BI Engine es un servicio de análisis en memoria ultrarrápido que acelera las consultas de herramientas de inteligencia de negocios como Looker Studio, Looker y Tableau.",
      whyCorrect: "BI Engine almacena en memoria caché los datos consultados con frecuencia y procesa las consultas directamente en memoria con latencias de milisegundos (sub-segundo), eliminando la necesidad de escanear la tabla base en cada actualización del dashboard.",
      optionsBreakdown: {
        A: "¡Correcto! BigQuery BI Engine se integra de manera transparente con Looker Studio, acelerando las consultas a tiempo real y reduciendo los bytes cobrados.",
        B: "Incorrecto: Google Sheets tiene límites severos de tamaño de datos (10 millones de celdas) y añade fragilidad y mantenimiento manual innecesario.",
        C: "Incorrecto: Una vista lógica estándar (Standard View) es solo una consulta guardada; cada vez que se consulta la vista, la consulta subyacente se ejecuta de nuevo y se cobran todos los bytes escaneados.",
        D: "Incorrecto: Las cuotas de la API no aceleran la velocidad de procesamiento ni el tiempo de respuesta del motor SQL."
      },
      keyConcept: "BigQuery BI Engine & Looker Studio",
      docTip: "Para dashboards interactivos con consultas agregadas repetidas: BI Engine proporciona aceleración en memoria transparente."
    }
  },
  {
    id: 13,
    domain: "analysis",
    difficulty: "Intermedio",
    question: "Tienes una consulta frecuente que calcula agregaciones complejas sobre una tabla de ventas masiva que recibe nuevas inserciones constantemente. Quieres acelerar las consultas y reducir los costos de procesamiento, asegurándote de que los resultados siempre incluyan los datos más recientes sin tener que recalcular manualmente toda la agregación. ¿Qué solución ofrece BigQuery?",
    options: [
      { id: "A", text: "Una vista lógica estándar (Standard View)" },
      { id: "B", text: "Una vista materializada (Materialized View)", isCorrect: true },
      { id: "C", text: "Un procedimiento almacenado ejecutado cada 10 minutos" },
      { id: "D", text: "Una tabla temporal que se actualice mediante Cloud Functions" }
    ],
    explanation: {
      general: "Las vistas materializadas (Materialized Views) en BigQuery precalculan y almacenan periódicamente los resultados de una consulta para mejorar el rendimiento y reducir los costos.",
      whyCorrect: "Las vistas materializadas en BigQuery tienen sincronización automática (Smart Tuning / Incremental Refresh). Si los datos de la tabla base cambian, BigQuery lee los datos precalculados de la vista materializada y solo escanea el delta reciente de la tabla base, entregando datos siempre consistentes y actualizados.",
      optionsBreakdown: {
        A: "Incorrecto: Una vista estándar ejecuta la consulta completa desde cero cada vez, sin almacenar resultados precalculados ni ahorrar costos de procesamiento.",
        B: "¡Correcto! Las vistas materializadas almacenan en caché los datos precalculados y leen automáticamente solo los cambios incrementales de la tabla base.",
        C: "Incorrecto: Un procedimiento almacenado periódico genera desfase en los datos (datos obsoletos entre ejecuciones) y requiere gestión manual de orquestación.",
        D: "Incorrecto: Las tablas temporales tienen un ciclo de vida corto y no admiten consultas directas concurrentes automáticas con optimizador inteligente."
      },
      keyConcept: "BigQuery Materialized Views & Smart Tuning",
      docTip: "El optimizador de BigQuery reescribe automáticamente las consultas para usar la Vista Materializada incluso si el usuario consulta la tabla base original."
    }
  },
  {
    id: 14,
    domain: "analysis",
    difficulty: "Intermedio",
    question: "Estás diseñando una consulta que realiza un JOIN entre una tabla de ventas de 500 millones de registros (`orders`) y una tabla pequeña de referencia de códigos postales de 10,000 registros (`zip_codes`). Según las recomendaciones de optimización de BigQuery, ¿cómo debe estructurarse el JOIN para obtener el mejor rendimiento?",
    options: [
      { id: "A", text: "Colocar la tabla grande (`orders`) a la izquierda del `JOIN` y la tabla pequeña (`zip_codes`) a la derecha.", isCorrect: true },
      { id: "B", text: "Colocar la tabla pequeña (`zip_codes`) a la izquierda del `JOIN` y la tabla grande a la derecha." },
      { id: "C", text: "Dividir ambas tablas en múltiples tablas temporales antes de unirlas." },
      { id: "D", text: "Forzar un `CROSS JOIN` y luego filtrar con `WHERE`." }
    ],
    explanation: {
      general: "El optimizador de consultas de BigQuery utiliza una estrategia de Broadcast Hash Join cuando se une una tabla grande con una tabla pequeña.",
      whyCorrect: "En BigQuery, la mejor práctica al unir dos tablas de tamaños muy dispares es colocar la tabla más grande en el lado izquierdo (`FROM orders`) y la tabla más pequeña en el lado derecho (`JOIN zip_codes`). BigQuery distribuye (broadcasts) la tabla derecha más pequeña a todos los slots que procesan la tabla izquierda grande.",
      optionsBreakdown: {
        A: "¡Correcto! Colocar la tabla más grande a la izquierda y la más pequeña a la derecha permite a BigQuery hacer un Broadcast Join eficiente hacia los nodos trabajadores.",
        B: "Incorrecto: Invertir el orden puede impedir que el motor de ejecución realice un broadcast optimizado, incrementando el barajado de datos en red (shuffle).",
        C: "Incorrecto: Crear tablas temporales añade latencia de E/S y fragmentación de metadatos innecesaria.",
        D: "Incorrecto: Un `CROSS JOIN` genera el producto cartesiano de todas las filas (500M * 10K = 5 billones de filas), lo cual desbordará la memoria de los slots y fallará con error de recursos."
      },
      keyConcept: "BigQuery Query Optimization (JOIN Order)",
      docTip: "Regla de oro de JOINs en BigQuery: Tabla GRANDE a la izquierda, tabla PEQUEÑA a la derecha."
    }
  },
  {
    id: 15,
    domain: "analysis",
    difficulty: "Básico",
    question: "¿Cuál es la principal diferencia entre Looker Studio (anteriormente Google Data Studio) y la plataforma central de Looker orientada a empresas?",
    options: [
      { id: "A", text: "Looker Studio solo funciona con Google Sheets, mientras que Looker solo funciona con BigQuery." },
      { id: "B", text: "Looker cuenta con una capa de modelado de datos semántica gobernada (LookML), mientras que Looker Studio es una herramienta de visualización y reporting ágil y de autoservicio.", isCorrect: true },
      { id: "C", text: "Looker Studio requiere instalar software local en Mac o Windows, mientras que Looker está en la nube." },
      { id: "D", text: "Looker no permite crear gráficos de barras ni tablas dinámicas." }
    ],
    explanation: {
      general: "Google ofrece dos herramientas complementarias de Business Intelligence: Looker Studio y Looker Enterprise.",
      whyCorrect: "Looker Enterprise se basa en LookML, un lenguaje de modelado declarativo que define métricas de negocio unificadas en una capa semántica central gobernada. Looker Studio es una herramienta ligera, ágil y sin costo base para crear dashboards rápidos de autoservicio.",
      optionsBreakdown: {
        A: "Incorrecto: Looker Studio se conecta a cientos de fuentes (BigQuery, Cloud SQL, PostgreSQL, etc.), no solo a Sheets.",
        B: "¡Correcto! La capa semántica gobernada LookML es el corazón de Looker Enterprise para garantizar una 'única versión de la verdad' en toda la organización.",
        C: "Incorrecto: Ambas herramientas son soluciones 100% web basadas en la nube que funcionan en el navegador sin instalación local.",
        D: "Incorrecto: Looker cuenta con amplias capacidades de visualización avanzada, incluyendo gráficos de barras, diagramas y tablas dinámicas."
      },
      keyConcept: "Looker vs. Looker Studio & LookML",
      docTip: "Cuando el examen mencione 'capa semántica centralizada', 'única fuente de verdad' o 'LookML' -> La respuesta es Looker."
    }
  },

  // ==================== DOMINIO 4: FUNDAMENTOS DE IA Y MACHINE LEARNING ====================
  {
    id: 16,
    domain: "ml_ai",
    difficulty: "Básico",
    question: "Un analista de datos con amplios conocimientos de SQL quiere entrenar un modelo de Machine Learning para predecir si un cliente cancelará su suscripción (churn: sí o no) utilizando directamente los datos almacenados en BigQuery, sin necesidad de programar en Python ni exportar los datos a otra plataforma. ¿Qué herramienta debe utilizar?",
    options: [
      { id: "A", text: "BigQuery ML (BQML)", isCorrect: true },
      { id: "B", text: "TensorFlow Extended (TFX) en Compute Engine" },
      { id: "C", text: "Vertex AI Custom Training con contenedores Docker personalizados" },
      { id: "D", text: "Cloud Data Fusion" }
    ],
    explanation: {
      general: "BigQuery ML permite a los profesionales de datos crear, entrenar, evaluar y desplegar modelos de Machine Learning utilizando sentencias SQL estándar dentro de BigQuery.",
      whyCorrect: "BigQuery ML elimina la necesidad de exportar datos y escribir código en Python/R. Permite entrenar modelos de regresión logística, árboles de decisión, clustering y redes neuronales directamente mediante SQL (`CREATE MODEL ...`).",
      optionsBreakdown: {
        A: "¡Correcto! BigQuery ML democratiza el Machine Learning para analistas usando sintaxis SQL nativa directamente donde residen los datos.",
        B: "Incorrecto: TFX requiere programación avanzada en Python, configuración de tuberías complejas y exportación de datos.",
        C: "Incorrecto: Vertex AI Custom Containers requiere construir imágenes Docker y programar scripts de entrenamiento en Python, lo cual contradice el requisito.",
        D: "Incorrecto: Cloud Data Fusion es una herramienta visual de integración y ETL, no una plataforma para entrenar modelos predictivos de clasificación."
      },
      keyConcept: "BigQuery ML (BQML)",
      docTip: "Con BQML, los datos no salen de BigQuery, lo que mejora la velocidad de entrenamiento y la seguridad de los datos al evitar traslados."
    }
  },
  {
    id: 17,
    domain: "ml_ai",
    difficulty: "Intermedio",
    question: "En BigQuery ML, ¿cuál es la función de SQL adecuada para evaluar el rendimiento (como precisión, recall o curva ROC/AUC) de un modelo de clasificación recién entrenado?",
    options: [
      { id: "A", text: "ML.PREDICT" },
      { id: "B", text: "ML.EVALUATE", isCorrect: true },
      { id: "C", text: "ML.CONFUSION_MATRIX solamente" },
      { id: "D", text: "ML.FEATURE_INFO" }
    ],
    explanation: {
      general: "BigQuery ML dispone de funciones SQL específicas para cada etapa del ciclo de vida de un modelo de Machine Learning.",
      whyCorrect: "`ML.EVALUATE` calcula automáticamente las métricas de rendimiento del modelo (precisión, recall, log loss, AUC para clasificación; MSE, RMSE, R2 para regresión) comparando predicciones contra el conjunto de datos de evaluación.",
      optionsBreakdown: {
        A: "Incorrecto: `ML.PREDICT` se utiliza para generar inferencias/predicciones sobre nuevos datos, no para calcular métricas de evaluación del modelo.",
        B: "¡Correcto! `ML.EVALUATE` es la función estándar en BQML para obtener el cuadro completo de métricas de calidad del modelo.",
        C: "Incorrecto: Aunque `ML.CONFUSION_MATRIX` existe para modelos de clasificación, `ML.EVALUATE` es la función general que proporciona el conjunto estándar de métricas (incluyendo ROC/AUC).",
        D: "Incorrecto: `ML.FEATURE_INFO` muestra estadísticas sobre las características de entrada (features) usadas en el entrenamiento, no evalúa el rendimiento predictivo."
      },
      keyConcept: "Funciones de BigQuery ML (ML.EVALUATE vs. ML.PREDICT)",
      docTip: "Ciclo en BQML: CREATE MODEL -> ML.EVALUATE -> ML.PREDICT."
    }
  },
  {
    id: 18,
    domain: "ml_ai",
    difficulty: "Intermedio",
    question: "¿Qué tipo de modelo de BigQuery ML seleccionarías en la opción `model_type` si tu objetivo es agrupar a tus clientes en segmentos homogéneos según su comportamiento de compra, sin disponer de etiquetas predefinidas (aprendizaje no supervisado)?",
    options: [
      { id: "A", text: "LOGISTIC_REG" },
      { id: "B", text: "LINEAR_REG" },
      { id: "C", text: "KMEANS", isCorrect: true },
      { id: "D", text: "BOOSTED_TREE_CLASSIFIER" }
    ],
    explanation: {
      general: "El aprendizaje no supervisado busca patrones ocultos en los datos sin la guía de una variable objetivo (label).",
      whyCorrect: "K-Means es el algoritmo estándar de agrupamiento (clustering) no supervisado. En BQML, se especifica mediante `OPTIONS(model_type='KMEANS', num_clusters=...)` para segmentar clientes automáticamente.",
      optionsBreakdown: {
        A: "Incorrecto: `LOGISTIC_REG` es un algoritmo supervisado para clasificar categorías con etiquetas conocidas (ej. Fraude: Sí/No).",
        B: "Incorrecto: `LINEAR_REG` es supervisado y predice un valor numérico continuo (ej. precio de una vivienda).",
        C: "¡Correcto! K-Means es el algoritmo no supervisado disponible en BigQuery ML para tareas de segmentación y agrupamiento.",
        D: "Incorrecto: `BOOSTED_TREE_CLASSIFIER` es un algoritmo supervisado de ensamble basado en árboles de decisión para clasificación."
      },
      keyConcept: "BigQuery ML: Modelos Supervisados vs. No Supervisados",
      docTip: "K-Means = Segmentación / Clustering sin etiquetas. Regresión Logística / Boosted Trees = Clasificación con etiquetas."
    }
  },
  {
    id: 19,
    domain: "ml_ai",
    difficulty: "Escenario",
    question: "Tu empresa desea utilizar modelos fundacionales de Inteligencia Artificial Generativa (como Gemini) para enriquecer datos de clientes almacenados en BigQuery, por ejemplo, generando resúmenes de texto de opiniones de clientes y clasificando su sentimiento. ¿Cómo se integra Gemini de forma nativa con BigQuery?",
    options: [
      { id: "A", text: "Crear un modelo remoto en BigQuery apuntando a la API de Vertex AI (`REMOTE WITH CONNECTION`) y usar la función `ML.GENERATE_TEXT`.", isCorrect: true },
      { id: "B", text: "Descargar los datos a un portátil personal y procesarlos con la biblioteca OpenAI de Python." },
      { id: "C", text: "Gemini no puede interactuar con datos en BigQuery bajo ninguna circunstancia." },
      { id: "D", text: "Crear un clúster de Dataproc con GPU para compilar los pesos del modelo Gemini desde cero." }
    ],
    explanation: {
      general: "BigQuery se integra con los modelos de lenguaje fundacionales de Vertex AI (como Gemini) mediante Cloud Resource Connections y modelos remotos.",
      whyCorrect: "Al crear una conexión externa con Vertex AI, puedes definir un modelo remoto (`CREATE MODEL ... REMOTE WITH CONNECTION ... OPTIONS(ENDPOINT = 'gemini-pro')`) y luego invocar funciones como `ML.GENERATE_TEXT` directamente en consultas SQL.",
      optionsBreakdown: {
        A: "¡Correcto! Los modelos remotos de BigQuery (`REMOTE WITH CONNECTION`) permiten utilizar Gemini y otros LLMs de Vertex AI mediante consultas SQL nativas.",
        B: "Incorrecto: Descargar datos de clientes a equipos locales viola las políticas de seguridad y gobernanza corporativa, y carece de escalabilidad.",
        C: "Incorrecto: Gemini está profundamente integrado con BigQuery (tanto a través de Gemini in BigQuery / Data Canvas como mediante BQML).",
        D: "Incorrecto: Gemini es un modelo gestionado y cerrado disponible a través de Vertex AI; no se descargan ni compilan sus pesos en un clúster Dataproc autogestionado."
      },
      keyConcept: "Vertex AI Models & BigQuery Remote Connections",
      docTip: "Con `ML.GENERATE_TEXT` o `ML.GENERATE_EMBEDDING`, puedes aplicar IA Generativa a millones de registros con una sola consulta SQL."
    }
  },
  {
    id: 20,
    domain: "ml_ai",
    difficulty: "Básico",
    question: "¿Cuál es la función principal de Vertex AI Feature Store en el ciclo de vida de Machine Learning dentro de Google Cloud?",
    options: [
      { id: "A", text: "Servir como una tienda de aplicaciones para comprar modelos de IA preentrenados." },
      { id: "B", text: "Proporcionar un repositorio centralizado para almacenar, compartir, versionar y servir características (features) tanto para entrenamiento por lotes como para inferencias en tiempo real.", isCorrect: true },
      { id: "C", text: "Almacenar archivos de audio y video únicamente." },
      { id: "D", text: "Reemplazar completamente a BigQuery como base de datos de la empresa." }
    ],
    explanation: {
      general: "Vertex AI Feature Store es un repositorio gestionado diseñado para unificar la gestión de características de Machine Learning.",
      whyCorrect: "Feature Store evita la duplicación de esfuerzos entre equipos de ML, mitiga el sesgo de entrenamiento/servicio (training-serving skew) y permite servir características con baja latencia para predicciones online y alto rendimiento para entrenamiento por lotes.",
      optionsBreakdown: {
        A: "Incorrecto: El catálogo de modelos preentrenados es Model Garden en Vertex AI, no Feature Store.",
        B: "¡Correcto! Vertex AI Feature Store centraliza la definición, versionado y servicio de características para evitar inconsistencias entre entrenamiento e inferencia.",
        C: "Incorrecto: Feature Store almacena valores de características numéricas, categóricas o embeddings calculados, no es un repositorio de medios.",
        D: "Incorrecto: Feature Store no reemplaza a BigQuery; de hecho, suele alimentarse directamente de tablas de BigQuery."
      },
      keyConcept: "Vertex AI Feature Store & MLOps",
      docTip: "Feature Store previene el 'Training-Serving Skew' garantizando que el modelo use exactamente los mismos cálculos de variables en producción que en entrenamiento."
    }
  },

  // ==================== DOMINIO 5: GOBERNANZA, SEGURIDAD Y CUMPLIMIENTO ====================
  {
    id: 21,
    domain: "governance",
    difficulty: "Escenario",
    question: "Tu empresa maneja datos de usuarios en BigQuery que incluyen nombres, correos electrónicos y números de Seguro Social (SSN). Quieres permitir que los analistas consulten métricas de ventas agregadas sin que puedan ver los números de SSN, restringiendo esa columna específica solo al equipo de Recursos Humanos. ¿Qué mecanismo de seguridad de BigQuery debes implementar?",
    options: [
      { id: "A", text: "Crear un bucket de Cloud Storage separado para cada columna." },
      { id: "B", text: "Implementar seguridad a nivel de columna (Column-level Security) usando Policy Tags de Dataplex y asignando el rol de lector detallado solo a RRHH.", isCorrect: true },
      { id: "C", text: "Eliminar la columna de la tabla y pedirle a RRHH que guarde los SSN en un archivo de Excel con contraseña." },
      { id: "D", text: "Otorgar el rol `roles/bigquery.admin` a todos los analistas." }
    ],
    explanation: {
      general: "BigQuery ofrece seguridad granular a nivel de columna mediante etiquetas de política (Policy Tags) gestionadas en Dataplex.",
      whyCorrect: "Al asociar una Policy Tag (ej. `PII_High_Sensitivity`) a la columna SSN, los usuarios sin el rol `Fine-Grained Reader` (Lector detallado) recibirán un error de acceso denegado si intentan consultar dicha columna, o verán los datos enmascarados si se configura enmascaramiento dinámico.",
      optionsBreakdown: {
        A: "Incorrecto: Fragmentar tablas en buckets rompe el modelo relacional y la capacidad de análisis SQL en BigQuery.",
        B: "¡Correcto! Las Policy Tags de Dataplex permiten restringir o enmascarar columnas individuales de forma declarativa y centralizada.",
        C: "Incorrecto: Guardar datos sensibles en Excel viola las normas básicas de seguridad de la información y gobernanza de datos.",
        D: "Incorrecto: Asignar `roles/bigquery.admin` concedería permisos totales a todos los usuarios, empeorando la brecha de seguridad."
      },
      keyConcept: "BigQuery Column-Level Security & Policy Tags",
      docTip: "Para restringir columnas -> Policy Tags (Dataplex). Para restringir filas según el usuario (ej. solo datos de México a analistas de México) -> Row-Level Access Policies."
    }
  },
  {
    id: 22,
    domain: "governance",
    difficulty: "Intermedio",
    question: "Tienes un requisito legal para restringir que los analistas de la sucursal de España solo puedan ver registros de clientes donde `country = 'ES'`, mientras que los analistas de Francia solo puedan ver registros donde `country = 'FR'`. Todo debe gestionarse sobre una única tabla de BigQuery. ¿Qué solución nativa debes aplicar?",
    options: [
      { id: "A", text: "Crear directivas de acceso a nivel de fila (Row-Level Access Policies) con condiciones basadas en `SESSION_USER()` o grupos de IAM.", isCorrect: true },
      { id: "B", text: "Duplicar la tabla en dos proyectos diferentes y sincronizarlas con scripts manuales." },
      { id: "C", text: "Confiar en que los analistas siempre recordarán escribir `WHERE country = 'ES'` en sus consultas." },
      { id: "D", text: "Utilizar Cloud KMS para cifrar toda la base de datos." }
    ],
    explanation: {
      general: "Las directivas de acceso a nivel de fila (Row-Level Security) en BigQuery filtran automáticamente las filas visibles para cada usuario o grupo.",
      whyCorrect: "Con sentencias DDL como `CREATE ROW ACCESS POLICY ... ON sales FILTER USING (country = 'ES')`, BigQuery intercepta y filtra las consultas de forma transparente sin que el usuario pueda evadir el filtro.",
      optionsBreakdown: {
        A: "¡Correcto! Las Row-Level Access Policies aplican filtros de fila forzados a nivel del motor de almacenamiento de BigQuery.",
        B: "Incorrecto: Duplicar tablas multiplica costos de almacenamiento y genera discrepancias en los datos.",
        C: "Incorrecto: La seguridad basada en la 'buena fe' del usuario es inaceptable en auditorías de cumplimiento normativo (GDPR, HIPAA).",
        D: "Incorrecto: Cloud KMS cifra los datos en reposo para protegerlos contra accesos no autorizados a nivel de disco, pero no realiza filtrado lógico de filas por país."
      },
      keyConcept: "BigQuery Row-Level Security",
      docTip: "Recuerda: Seguridad a nivel de COLUMNA = Policy Tags; Seguridad a nivel de FILA = Row-Level Access Policy."
    }
  },
  {
    id: 23,
    domain: "governance",
    difficulty: "Escenario",
    question: "Tu empresa almacena millones de archivos de texto y tickets de soporte en Cloud Storage. Antes de procesar estos archivos para analítica, necesitas detectar y enmascarar automáticamente información de identificación personal (PII) como tarjetas de crédito, correos electrónicos y números de teléfono. ¿Qué servicio de Google Cloud está diseñado para este propósito?",
    options: [
      { id: "A", text: "Sensitive Data Protection (anteriormente Cloud DLP - Data Loss Prevention)", isCorrect: true },
      { id: "B", text: "Cloud Armor" },
      { id: "C", text: "Cloud IAM" },
      { id: "D", text: "Dataproc Metastore" }
    ],
    explanation: {
      general: "Sensitive Data Protection (Cloud DLP) es un servicio totalmente gestionado diseñado para descubrir, clasificar y proteger datos confidenciales a escala.",
      whyCorrect: "Sensitive Data Protection cuenta con más de 150 detectores integrados de elementos de información (infoTypes) para identificar PII y ofrece técnicas de anonimización como enmascaramiento, tokenización, bucketing y seudonimización con preservación de formato.",
      optionsBreakdown: {
        A: "¡Correcto! Sensitive Data Protection (Cloud DLP) es el servicio de Google Cloud para escaneo, detección y anonimización de PII.",
        B: "Incorrecto: Cloud Armor es un servicio de firewall de aplicaciones web (WAF) y mitigación de ataques DDoS en la capa de red/HTTP.",
        C: "Incorrecto: Cloud IAM gestiona quién tiene acceso (identidad y permisos) a qué recursos, pero no inspecciona el contenido de los archivos de texto.",
        D: "Incorrecto: Dataproc Metastore es un servicio de catálogo de metadatos de Apache Hive totalmente gestionado."
      },
      keyConcept: "Sensitive Data Protection (Cloud DLP)",
      docTip: "DLP inspecciona tanto datos en reposo (Cloud Storage, BigQuery) como flujos de streaming antes de su almacenamiento."
    }
  },
  {
    id: 24,
    domain: "governance",
    difficulty: "Intermedio",
    question: "¿Qué servicio de Google Cloud proporciona una plataforma unificada para la gestión de datos (data mesh / data fabric), permitiendo organizar datos distribuidos en Cloud Storage y BigQuery en lagos de datos (lakes) y zonas lógicas (zones), además de monitorear la calidad de los datos y catálogo de metadatos?",
    options: [
      { id: "A", text: "Dataplex", isCorrect: true },
      { id: "B", text: "Cloud Bigtable" },
      { id: "C", text: "Cloud Memorystore" },
      { id: "D", text: "Compute Engine" }
    ],
    explanation: {
      general: "Google Cloud Dataplex es una plataforma de gestión inteligente que ayuda a unificar, gestionar, monitorear y gobernar datos distribuidos en múltiples proyectos y servicios.",
      whyCorrect: "Dataplex organiza los activos de almacenamiento en Lakes, Data Zones (Raw vs. Curated) y Assets, proporcionando descubrimiento de metadatos, gobernanza de seguridad centralizada y chequeos automáticos de calidad de datos (Data Quality tasks).",
      optionsBreakdown: {
        A: "¡Correcto! Dataplex es el centro de gobernanza de datos moderna de Google Cloud que unifica BigQuery y Cloud Storage.",
        B: "Incorrecto: Cloud Bigtable es una base de datos NoSQL de alta velocidad, no una plataforma de gobernanza de datos.",
        C: "Incorrecto: Memorystore es un servicio gestionado de caché en memoria (Redis/Memcached).",
        D: "Incorrecto: Compute Engine proporciona máquinas virtuales de infraestructura básica."
      },
      keyConcept: "Google Cloud Dataplex (Data Governance)",
      docTip: "Conceptos clave de Dataplex: Lakes (dominios de negocio), Data Zones (zonas crudas/curadas) y Data Assets (buckets o datasets)."
    }
  },
  {
    id: 25,
    domain: "governance",
    difficulty: "Básico",
    question: "Necesitas otorgar permisos a un nuevo pasante para que pueda escribir y ejecutar consultas SQL en BigQuery sobre un conjunto de datos específico de ventas, pero no debe tener permisos para modificar esquemas, borrar tablas ni ver datos de otros departamentos. ¿Qué roles de IAM predefinidos mínimos debes asignarle?",
    options: [
      { id: "A", text: "`roles/bigquery.admin` a nivel de proyecto." },
      { id: "B", text: "`roles/bigquery.jobUser` a nivel de proyecto (para ejecutar consultas) y `roles/bigquery.dataViewer` a nivel del dataset de ventas.", isCorrect: true },
      { id: "C", text: "`roles/owner` a nivel de proyecto." },
      { id: "D", text: "`roles/viewer` a nivel de organización." }
    ],
    explanation: {
      general: "El principio de menor privilegio (Least Privilege) en Google Cloud exige otorgar únicamente los roles necesarios en el ámbito más granular posible.",
      whyCorrect: "Para ejecutar consultas en BigQuery, un usuario necesita: 1) Permiso para crear y ejecutar trabajos (jobs) a nivel de proyecto (`roles/bigquery.jobUser`), y 2) Permiso para leer los datos de las tablas involucradas a nivel de dataset (`roles/bigquery.dataViewer`).",
      optionsBreakdown: {
        A: "Incorrecto: `roles/bigquery.admin` otorga control total sobre todos los recursos de BigQuery, incluyendo borrado de datasets y cambio de permisos.",
        B: "¡Correcto! Cumple estrictamente con el principio de menor privilegio separando el permiso de cómputo/ejecución (jobUser en proyecto) del acceso a los datos (dataViewer en dataset específico).",
        C: "Incorrecto: `roles/owner` es el rol básico más permisivo y peligroso en GCP; otorga control total sobre la facturación y recursos del proyecto.",
        D: "Incorrecto: `roles/viewer` a nivel de organización permitiría ver la configuración y recursos de toda la empresa."
      },
      keyConcept: "Principio de Menor Privilegio e IAM en BigQuery",
      docTip: "Pregunta clásica: Si un usuario tiene `dataViewer` sobre una tabla pero no puede ejecutar una consulta, es porque le falta el rol `jobUser` en el proyecto donde se factura la consulta."
    }
  },

  // ==================== PREGUNTAS ADICIONALES DE EXAMEN (ALTO VALOR) ====================
  {
    id: 26,
    domain: "storage",
    difficulty: "Escenario",
    question: "Una empresa multinacional de comercio electrónico planea migrar su almacén de datos a BigQuery. Tienen requisitos de residencia de datos que exigen que los datos de los clientes de la Unión Europea permanezcan físicamente dentro de las fronteras de la UE. ¿En qué nivel de la jerarquía de BigQuery se define la ubicación geográfica (región o multirregión) de los datos?",
    options: [
      { id: "A", text: "A nivel de cada fila de la tabla." },
      { id: "B", text: "A nivel de Dataset al momento de su creación.", isCorrect: true },
      { id: "C", text: "A nivel de la consulta SQL mediante la cláusula `LOCATION = 'EU'`." },
      { id: "D", text: "A nivel de la cuenta de facturación (Cloud Billing Account)." }
    ],
    explanation: {
      general: "En BigQuery, un Dataset es el contenedor de nivel superior que agrupa tablas y vistas, y es donde se definen las políticas de control de acceso y ubicación física de los datos.",
      whyCorrect: "La ubicación geográfica (ej. multirregión `EU` o región específica como `europe-west1`) se especifica obligatoriamente al crear el Dataset y es inmutable una vez creado. Todas las tablas dentro de ese dataset heredarán esa ubicación física.",
      optionsBreakdown: {
        A: "Incorrecto: La ubicación física no se define fila por fila.",
        B: "¡Correcto! La región o multirregión se define al crear el Dataset en BigQuery y no puede modificarse posteriormente.",
        C: "Incorrecto: Las consultas SQL se procesan en la misma región donde reside el dataset consultado; la cláusula SQL no cambia la ubicación del almacenamiento.",
        D: "Incorrecto: La cuenta de facturación gestiona pagos y pagos globales, no la residencia geográfica de los datos."
      },
      keyConcept: "BigQuery Dataset Geography & Compliance",
      docTip: "Si necesitas cambiar la región de un Dataset en BigQuery, debes crear un nuevo dataset en la región deseada y copiar los datos."
    }
  },
  {
    id: 27,
    domain: "pipelines",
    difficulty: "Intermedio",
    question: "Tienes una suscripción de Cloud Pub/Sub que entrega mensajes a un servicio de procesamiento en Cloud Run. Algunos mensajes con formato corrupto provocan errores continuos en la aplicación, impidiendo que se confirme el procesamiento (ACK) y provocando reintentos infinitos que bloquean la cola. ¿Qué característica de Pub/Sub deberías configurar para solucionar esto?",
    options: [
      { id: "A", text: "Configurar un Dead Letter Topic (tema de mensajes no entregados) con un número máximo de reintentos.", isCorrect: true },
      { id: "B", text: "Aumentar el plazo de confirmación (ack deadline) a 600 segundos." },
      { id: "C", text: "Desactivar la retención de mensajes en el tema principal." },
      { id: "D", text: "Cambiar la suscripción de modo Pull a modo Push sin filtros." }
    ],
    explanation: {
      general: "Un Dead Letter Topic (DLQ / Tema de mensajes fallidos) en Pub/Sub captura mensajes que no pueden procesarse con éxito tras un número determinado de reintentos de entrega.",
      whyCorrect: "Al configurar una Dead Letter Queue con un límite (por ejemplo, 5 intentos fallidos), Pub/Sub redirige automáticamente los mensajes problemáticos (poison pills) a un tema separado para su posterior análisis o descarte, permitiendo que la canalización principal continúe procesando sin bloqueos.",
      optionsBreakdown: {
        A: "¡Correcto! Dead Letter Topics aíslan mensajes defectuosos evitando reintentos infinitos y permitiendo el análisis de fallos.",
        B: "Incorrecto: Aumentar el plazo de confirmación solo hace que el sistema espere más tiempo antes de reintentar el mensaje corrupto, empeorando el retraso.",
        C: "Incorrecto: Desactivar la retención no resuelve el bucle de reintentos de mensajes no confirmados mientras la suscripción esté activa.",
        D: "Incorrecto: Si el mensaje está corrupto, la aplicación en Cloud Run seguirá fallando tanto en modo Push como en modo Pull."
      },
      keyConcept: "Pub/Sub Dead Letter Topics (DLQ)",
      docTip: "Cualquier mensaje que supere la cuota de `max_delivery_attempts` se reenvía al Dead Letter Topic configurado."
    }
  },
  {
    id: 28,
    domain: "analysis",
    difficulty: "Escenario",
    question: "Un equipo de analistas ejecuta habitualmente la siguiente consulta en BigQuery: `SELECT DISTINCT user_id FROM sales.orders WHERE order_date >= '2024-01-01'`. Sin embargo, la tabla `orders` tiene 80 columnas adicionales y pesa 500 GB en total. La columna `order_date` pesa 1 GB y `user_id` pesa 2 GB. Si el modelo de facturación es bajo demanda ($6.25 por TB escaneado), ¿cuánto volumen de datos cobrará BigQuery por esta consulta?",
    options: [
      { id: "A", text: "Aproximadamente 500 GB (el tamaño total de la tabla)." },
      { id: "B", text: "Aproximadamente 3 GB (la suma de los tamaños de las columnas `order_date` y `user_id`).", isCorrect: true },
      { id: "C", text: "0 GB porque se usa `DISTINCT`." },
      { id: "D", text: "Depende de la cantidad de filas que devuelva el resultado final." }
    ],
    explanation: {
      general: "El modelo de facturación On-Demand de BigQuery calcula el costo basándose estrictamente en los bytes escaneados de las columnas referenciadas en la consulta.",
      whyCorrect: "Dado que BigQuery es un almacén columnar, solo lee del disco las columnas mencionadas en el `SELECT` (`user_id`: 2 GB) y en la cláusula `WHERE` (`order_date`: 1 GB). Las 80 columnas restantes nunca se leen ni se cargan en memoria, por lo que solo se facturan ~3 GB.",
      optionsBreakdown: {
        A: "Incorrecto: En una base de datos orientada a filas se leería toda la tabla, pero BigQuery es columnar y no lee las columnas no solicitadas.",
        B: "¡Correcto! BigQuery suma únicamente los bytes correspondientes a las columnas referenciadas en las cláusulas SELECT, WHERE, JOIN y GROUP BY.",
        C: "Incorrecto: `DISTINCT` realiza una deduplicación lógica durante la fase de ejecución, no exime del cobro de lectura de datos.",
        D: "Incorrecto: En BigQuery On-Demand el cobro depende de los datos leídos a la entrada, no de la cantidad de filas que devuelva la respuesta."
      },
      keyConcept: "Cálculo de Bytes Escaneados en BigQuery",
      docTip: "Antes de ejecutar una consulta en la consola de BigQuery, el validador en la esquina superior derecha te indica con precisión cuántos bytes serán escaneados."
    }
  },
  {
    id: 29,
    domain: "ml_ai",
    difficulty: "Escenario",
    question: "Deseas predecir el importe monetario total (un número continuo como $45.50, $120.00) que gastará un cliente en su próxima compra usando BigQuery ML. ¿Qué valor de `model_type` debes configurar en la cláusula `OPTIONS` de la sentencia `CREATE MODEL`?",
    options: [
      { id: "A", text: "model_type = 'LINEAR_REG'", isCorrect: true },
      { id: "B", text: "model_type = 'LOGISTIC_REG'" },
      { id: "C", text: "model_type = 'KMEANS'" },
      { id: "D", text: "model_type = 'PCA'" }
    ],
    explanation: {
      general: "Para predecir variables continuas o numéricas (precios, ingresos, temperaturas), se utilizan modelos de regresión.",
      whyCorrect: "`LINEAR_REG` (Regresión lineal) es el modelo matemático supervisado diseñado para modelar la relación entre variables predictoras y una variable objetivo numérica continua.",
      optionsBreakdown: {
        A: "¡Correcto! Regresión Lineal (`LINEAR_REG`) es el tipo de modelo para predecir números continuos como importes monetarios.",
        B: "Incorrecto: `LOGISTIC_REG` (Regresión Logística) predice probabilidades entre 0 y 1 para problemas de clasificación categórica (ej. Comprará: Sí/No).",
        C: "Incorrecto: `KMEANS` es un algoritmo no supervisado para agrupamiento/segmentación, no para predecir montos futuros de ventas.",
        D: "Incorrecto: `PCA` (Análisis de Componentes Principales) se utiliza para reducción de dimensionalidad, no para regresión predictiva."
      },
      keyConcept: "Regresión Lineal vs. Logística en BQML",
      docTip: "¿La respuesta que buscas es un número continuo (precio, importe, tiempo)? -> Linear Regression. ¿Es una categoría/etiqueta (sí/no, spam/no spam)? -> Logistic Regression."
    }
  },
  {
    id: 30,
    domain: "governance",
    difficulty: "Intermedio",
    question: "La política de seguridad de tu corporación exige que todos los datos almacenados en Cloud Storage y BigQuery estén cifrados en reposo utilizando claves criptográficas generadas y rotadas por el propio equipo de seguridad de la empresa mediante Cloud KMS, con control total sobre la revocación de acceso a las claves. ¿Qué tipo de cifrado se debe utilizar?",
    options: [
      { id: "A", text: "Cifrado predeterminado con claves gestionadas por Google (Google-managed encryption keys)." },
      { id: "B", text: "Claves de cifrado gestionadas por el cliente (CMEK - Customer-Managed Encryption Keys).", isCorrect: true },
      { id: "C", text: "Desactivar el cifrado por completo para optimizar el rendimiento de lectura." },
      { id: "D", text: "Cifrado por software con contraseñas zip antes de subir cada archivo." }
    ],
    explanation: {
      general: "Por defecto, todos los datos en Google Cloud están cifrados en reposo con claves gestionadas por Google. Para cumplimiento estricto, Google ofrece CMEK y CSEK.",
      whyCorrect: "CMEK (Customer-Managed Encryption Keys) permite a las empresas gestionar el ciclo de vida de sus propias claves de cifrado en Google Cloud Key Management Service (Cloud KMS) e integrarlas de forma nativa con servicios como BigQuery, Cloud Storage y Compute Engine.",
      optionsBreakdown: {
        A: "Incorrecto: Las claves gestionadas por Google no otorgan al cliente control sobre la rotación manual, políticas de retención o revocación instantánea de acceso.",
        B: "¡Correcto! CMEK utiliza Cloud KMS para que el cliente mantenga el control sobre la generación, rotación y permisos de uso de la clave de cifrado.",
        C: "Incorrecto: Google Cloud no permite almacenar datos sin cifrar; el cifrado en reposo es obligatorio y automático en toda la plataforma.",
        D: "Incorrecto: Archivos zip con contraseña representan una solución arcaica que inhabilita las capacidades analíticas de BigQuery y la automatización en la nube."
      },
      keyConcept: "CMEK (Customer-Managed Encryption Keys) vs. Cloud KMS",
      docTip: "Google-managed (transparente y por defecto) < CMEK (claves en Cloud KMS controladas por el cliente) < CSEK (claves generadas fuera de Google)."
    }
  },
  {
    id: 31,
    domain: "storage",
    difficulty: "Básico",
    question: "Deseas transferir automáticamente petabytes de datos de análisis desde Amazon S3 a Google Cloud Storage de forma programada y recurrente, sin necesidad de aprovisionar ni gestionar servidores intermediarios. ¿Qué servicio nativo de Google Cloud debes utilizar?",
    options: [
      { id: "A", text: "Storage Transfer Service", isCorrect: true },
      { id: "B", text: "Comando manual `gsutil cp` en tu máquina local" },
      { id: "C", text: "Transfer Appliance únicamente" },
      { id: "D", text: "Google Drive Sync" }
    ],
    explanation: {
      general: "Storage Transfer Service es una solución totalmente gestionada para mover datos a gran escala hacia Cloud Storage desde otros proveedores de nube (AWS S3, Azure Blob) o entre buckets de GCP.",
      whyCorrect: "Storage Transfer Service no requiere servidores, escala automáticamente para mover petabytes por red, admite programación periódica, valida la integridad de los datos mediante sumas de verificación y maneja reintentos automáticos.",
      optionsBreakdown: {
        A: "¡Correcto! Storage Transfer Service es la herramienta gestionada recomendada por Google para transferencias masivas en la nube.",
        B: "Incorrecto: Usar `gsutil cp` desde una máquina local transferiría datos a través de tu conexión doméstica o de oficina, lo que tardaría años para petabytes y es propenso a interrupciones.",
        C: "Incorrecto: Transfer Appliance es un dispositivo físico de hardware para enviar datos que no pueden transmitirse por la red por falta de ancho de banda.",
        D: "Incorrecto: Google Drive Sync es una herramienta de usuario final para sincronizar carpetas personales de oficina, no para petabytes empresariales."
      },
      keyConcept: "Storage Transfer Service",
      docTip: "Para migrar de AWS S3 o Azure Blob a Cloud Storage -> Storage Transfer Service. Para cargas desde centros de datos locales sin ancho de banda -> Transfer Appliance."
    }
  },
  {
    id: 32,
    domain: "analysis",
    difficulty: "Escenario",
    question: "Un usuario reporta que una consulta analítica que une múltiples tablas en BigQuery arrojó el siguiente error: `Resources exceeded during query execution: The query could not be executed in the allocated memory`. ¿Cuál es la causa más probable y cómo debería resolverse?",
    options: [
      { id: "A", text: "La consulta intentó ordenar (`ORDER BY`) un conjunto inmenso de datos sin `LIMIT`, o realizó un `JOIN` no optimizado que generó un producto cartesiano masivo; debe optimizarse filtrando antes del JOIN o eliminando el ordenamiento innecesario.", isCorrect: true },
      { id: "B", text: "BigQuery se quedó sin espacio de disco en los centros de datos de Google." },
      { id: "C", text: "El usuario no tiene suficiente memoria RAM instalada en su navegador web." },
      { id: "D", text: "El dataset de BigQuery fue eliminado durante la ejecución." }
    ],
    explanation: {
      general: "El error 'Resources exceeded' ocurre cuando una operación en BigQuery satura la memoria asignada a los slots de procesamiento.",
      whyCorrect: "Operaciones como `ORDER BY` sin particionar o JOINs que multiplican descontroladamente las filas (data skew o ausencia de condiciones ON correctas) fuerzan a los slots a retener demasiados datos en memoria. La solución es agregar filtros tempranos con `WHERE`, particionar o evitar `ORDER BY` masivos.",
      optionsBreakdown: {
        A: "¡Correcto! Optimizar la consulta reduciendo la cardinalidad del JOIN y limitando agregaciones/ordenamientos masivos resuelve el desbordamiento de memoria.",
        B: "Incorrecto: La infraestructura de almacenamiento de BigQuery (Colossus) es virtualmente ilimitada; el error es de memoria de procesamiento (cómputo), no de disco físico.",
        C: "Incorrecto: Las consultas de BigQuery se ejecutan íntegramente en la nube de Google; la RAM de la máquina del cliente no influye en la ejecución del motor SQL.",
        D: "Incorrecto: Si el dataset se hubiera eliminado, el error sería `Not found: Dataset`."
      },
      keyConcept: "BigQuery Troubleshooting & Resources Exceeded",
      docTip: "Si ves 'Resources exceeded': revisa cláusulas `ORDER BY` globales en millones de filas o un `JOIN` con claves repetidas que cause un producto cartesiano imprevisto."
    }
  },
  {
    id: 33,
    domain: "pipelines",
    difficulty: "Básico",
    question: "Necesitas programar la ingestión automatizada diaria de datos desde aplicaciones SaaS de terceros (como Salesforce, Google Analytics 4, YouTube Channel reports) directamente hacia BigQuery sin tener que construir pipelines de código personalizados. ¿Qué herramienta de BigQuery debes utilizar?",
    options: [
      { id: "A", text: "BigQuery Data Transfer Service (BQ DTS)", isCorrect: true },
      { id: "B", text: "Cloud Pub/Sub Lite" },
      { id: "C", text: "Vertex AI Pipelines" },
      { id: "D", text: "Dataproc Hub" }
    ],
    explanation: {
      general: "BigQuery Data Transfer Service (BQ DTS) es un servicio totalmente gestionado para automatizar la transferencia programada de datos hacia BigQuery desde fuentes de Google y de terceros.",
      whyCorrect: "BQ DTS proporciona conectores nativos preconfigurados para Google Ads, Google Analytics, YouTube, Teradata, Amazon S3, Salesforce y más, cargando datos periódicamente de forma confiable sin escribir código ETL.",
      optionsBreakdown: {
        A: "¡Correcto! BigQuery Data Transfer Service automatiza la carga recurrente de datos desde servicios de Google y SaaS externos sin necesidad de escribir código.",
        B: "Incorrecto: Pub/Sub Lite es una versión económica de mensajería de colas para Kafka-like streaming, requiere desarrollo de productores y consumidores.",
        C: "Incorrecto: Vertex AI Pipelines está enfocado en flujos de MLOps y entrenamiento de modelos.",
        D: "Incorrecto: Dataproc Hub es una herramienta para lanzar entornos Jupyter para administradores de Spark."
      },
      keyConcept: "BigQuery Data Transfer Service (BQ DTS)",
      docTip: "Para ingesta periódica sin código desde Google Ads, YouTube, S3 o Salesforce hacia BigQuery -> BigQuery Data Transfer Service."
    }
  },
  {
    id: 34,
    domain: "ml_ai",
    difficulty: "Intermedio",
    question: "Un banco desea predecir qué clientes tienen mayor probabilidad de solicitar un préstamo hipotecario (Clasificación binaria: Sí o No). El científico de datos entrena un modelo de `LOGISTIC_REG` en BigQuery ML y desea conocer qué variables o características (features) tuvieron mayor peso o impacto en las decisiones del modelo. ¿Qué función de BQML debe consultar?",
    options: [
      { id: "A", text: "ML.WEIGHTS", isCorrect: true },
      { id: "B", text: "ML.ROC_CURVE" },
      { id: "C", text: "ML.TRAINING_INFO" },
      { id: "D", text: "ML.DISTANCE" }
    ],
    explanation: {
      general: "La interpretabilidad y explicabilidad de modelos de Machine Learning son fundamentales en industrias reguladas.",
      whyCorrect: "`ML.WEIGHTS` devuelve los coeficientes y pesos numéricos asignados a cada característica de entrada en modelos lineales y logísticos entrenados con BigQuery ML, permitiendo entender la influencia relativa de cada variable en la predicción.",
      optionsBreakdown: {
        A: "¡Correcto! `ML.WEIGHTS` muestra los pesos/coeficientes de las características para modelos lineales y logísticos.",
        B: "Incorrecto: `ML.ROC_CURVE` genera puntos para graficar la curva de sensibilidad vs especificidad a diferentes umbrales, pero no muestra la importancia de variables individuales.",
        C: "Incorrecto: `ML.TRAINING_INFO` muestra las iteraciones y el valor de la función de pérdida durante el entrenamiento.",
        D: "Incorrecto: `ML.DISTANCE` calcula distancias entre registros para modelos de clustering o embeddings."
      },
      keyConcept: "Explicabilidad e Interpretabilidad en BQML",
      docTip: "Para modelos basados en árboles (Boosted Trees / Random Forest), se utiliza `ML.GLOBAL_EXPLAIN` o `ML.FEATURE_IMPORTANCE`."
    }
  },
  {
    id: 35,
    domain: "governance",
    difficulty: "Escenario",
    question: "¿Qué herramienta integrada dentro del ecosistema de Dataplex en Google Cloud permite escribir reglas declarativas (por ejemplo: 'la columna email no debe tener nulos' y 'el valor de edad debe estar entre 18 y 120') para evaluar y monitorear periódicamente la calidad de los datos en BigQuery y Cloud Storage?",
    options: [
      { id: "A", text: "Dataplex Data Quality (Auto Data Quality)", isCorrect: true },
      { id: "B", text: "Cloud Monitoring con alertas de CPU" },
      { id: "C", text: "Google Cloud Armor" },
      { id: "D", text: "Cloud Trace" }
    ],
    explanation: {
      general: "La calidad de los datos (Data Quality) es un pilar crítico en la gobernanza de datos para evitar que pipelines y reportes dependan de datos incompletos o erróneos.",
      whyCorrect: "Dataplex Data Quality permite a los ingenieros y practicantes de datos definir reglas de validación declarativas basadas en esquemas YAML, ejecutando escaneos automáticos sobre datasets de BigQuery para detectar anomalías, nulos y valores fuera de rango sin requerir código personalizado.",
      optionsBreakdown: {
        A: "¡Correcto! Dataplex Data Quality automatiza la validación y monitoreo de reglas de integridad, completitud y unicidad de datos.",
        B: "Incorrecto: Cloud Monitoring monitorea métricas de infraestructura (uso de CPU, memoria, red de VMs), no la validez semántica del contenido de las tablas de datos.",
        C: "Incorrecto: Cloud Armor protege contra ciberataques DDoS y amenazas web en la capa de red.",
        D: "Incorrecto: Cloud Trace es una herramienta de observabilidad para medir la latencia de llamadas RPC en aplicaciones distribuidas."
      },
      keyConcept: "Dataplex Data Quality",
      docTip: "Dataplex combina: Catálogo de datos (descubrimiento), Seguridad unificada (IAM) y Calidad de datos (reglas declarativas automáticas)."
    }
  }
];

// Helper para exportar
if (typeof module !== "undefined" && module.exports) {
  module.exports = { DOMAINS, QUESTIONS };
}
