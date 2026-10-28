# 📱 Google Cloud Certified Associate Data Practitioner - Quiz PWA

Una aplicación web progresiva (PWA) optimizada para **iPhone** y dispositivos móviles, diseñada para preparar y aprobar el examen de certificación oficial **Google Cloud Certified Associate Data Practitioner**.

---

## 🚀 Características Principales

* **Modo Práctica:** Preguntas de opción múltiple basadas en escenarios reales con retroalimentación inmediata, desglosando por qué la opción correcta es la adecuada y por qué fallan los distractores.
* **Simulador de Examen Oficial:** Modo con temporizador dinámico, preguntas barajadas, bandera de revisión ("flag for review"), navegador de preguntas y reporte final con porcentaje de aprobación (mínimo 70%).
* **Banco de Fallos (Smart Review):** Registra automáticamente cualquier pregunta que respondas incorrectamente para que puedas realizar sesiones exclusivas de "solo preguntas erradas" hasta dominarlas.
* **Métricas y Estadísticas por Dominio:**
  1. *Almacenamiento y Acceso a Datos* (Cloud Storage, BigQuery, Cloud SQL, Spanner, Bigtable)
  2. *Ingesta y Procesamiento de Pipelines* (Pub/Sub, Dataflow, Dataproc, Composer, Dataprep)
  3. *Análisis y Visualización* (BigQuery SQL, Particionado/Clustering, Looker Studio, BI Engine)
  4. *Fundamentos de IA y Machine Learning* (BigQuery ML, Vertex AI, Gemini en BigQuery)
  5. *Gobernanza, Seguridad y Cumplimiento* (Dataplex, IAM, Sensitive Data Protection / DLP, CMEK)
* **100% Offline (PWA):** Una vez abierta en tu iPhone, la app se almacena en la caché de tu teléfono gracias al Service Worker y no requiere conexión a internet.
* **Sin App Store:** Se instala directamente en tu pantalla de inicio desde Safari sin cuentas de desarrollador de Apple ($99/año) ni vencimiento a los 7 días.

---

## 📲 Opción 1: Probar Inmediatamente en tu iPhone (Red Wi-Fi Local)

1. En la terminal de tu Mac, dentro de esta carpeta, ejecuta:
   ```bash
   ./start_server.py
   ```
   *(o `python3 start_server.py`)*

2. La terminal mostrará tu dirección IP local, por ejemplo:
   ```
   💻 En tu Mac:      http://localhost:8000
   📱 En tu iPhone:   http://192.168.1.64:8000
   ```

3. En tu iPhone (conectado a la misma red Wi-Fi):
   * Abre **Safari**.
   * Escribe la dirección indicada (ej. `http://192.168.1.64:8000`).
   * Toca el botón de **Compartir** (icono de cuadrado con la flecha hacia arriba).
   * Selecciona **"Añadir a pantalla de inicio"** (Add to Home Screen).
   * ¡Listo! Ahora abre el nuevo icono en la pantalla de tu iPhone y verás la app a pantalla completa.

---

## 🌐 Opción 2: Publicar Gratis en la Nube (Vercel o GitHub Pages)

Para tener un enlace propio permanente accesible desde cualquier lugar (incluso con datos móviles 4G/5G, fuera de casa):

### Vía GitHub Pages (100% Gratis):
1. Crea un repositorio en GitHub (ej. `gcp-data-quiz`).
2. Sube los archivos:
   ```bash
   git init
   git add .
   git commit -m "Initial commit GCP Data Practitioner Quiz PWA"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/gcp-data-quiz.git
   git push -u origin main
   ```
3. En GitHub ve a **Settings** → **Pages** → en *Branch* selecciona `main` y guarda.
4. Obtendrás un enlace como `https://TU_USUARIO.github.io/gcp-data-quiz/` que podrás abrir en Safari en tu iPhone y añadir a la pantalla de inicio.

### Vía Vercel (1 Clic):
Si tienes cuenta en [Vercel](https://vercel.com), simplemente importa el repositorio o arrastra la carpeta del proyecto. Te dará una URL directa `https://tu-proyecto.vercel.app`.

---

## ✏️ ¿Cómo agregar más preguntas?

El banco de preguntas se encuentra en el archivo [questions.js](file:///Users/ian/Documents/Associate%20Data%20Practitioner/questions.js). Puedes abrirlo y agregar nuevas preguntas siguiendo la misma estructura:

```javascript
{
  id: 36,
  domain: "storage", // storage | pipelines | analysis | ml_ai | governance
  difficulty: "Intermedio",
  question: "¿Pregunta aquí?",
  options: [
    { id: "A", text: "Opción A" },
    { id: "B", text: "Opción B correcta", isCorrect: true },
    { id: "C", text: "Opción C" },
    { id: "D", text: "Opción D" }
  ],
  explanation: {
    general: "Resumen...",
    whyCorrect: "Explicación del fundamento teórico...",
    optionsBreakdown: {
      A: "Por qué A es incorrecta...",
      B: "Por qué B es la correcta...",
      C: "Por qué C es incorrecta...",
      D: "Por qué D es incorrecta..."
    },
    keyConcept: "Nombre del Servicio o Concepto GCP",
    docTip: "Tip de examen..."
  }
}
```
