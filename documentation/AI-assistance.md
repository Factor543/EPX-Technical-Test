# **Caso de Prueba 1: C.A.R.L. - Asistente de IA**

### **Objetivo:**

Automatizar el flujo de interacción con el asistente de inteligencia artificial C.A.R.L. para validar que la conversación se ejecute sin errores técnicos y que el contenido de las respuestas cumpla con la estructura y los criterios de relevancia esperados.

**1. Análisis**

La primera etapa fue un análisis exploratorio manual. Al interactuar con C.A.R.L., se identificaron los siguientes puntos cruciales que determinarán el flujo de la automatización:

- **Tiempos de espera entre un mensaje y otro:** Luego de mandar un mensaje, el usuario debe esperar que C.A.R.L. responda por completo para poder seguir interactuando con él. Esto permitirá no llenar de solicitudes a la IA y sobresaturar los procesos.

**Bloqueo de campo de texto:** Se observó que, luego de que el usuario envía un mensaje, sobre el campo de texto que permite la comunicación con C.A.R.L. se fija un spinner que sugiere que debemos esperar que C.A.R.L. termine su respuesta.

**Validación de Contenido:** Se observó que C.A.R.L., una vez se le pide investigar o traer resultados sobre algo, trae dicho contenido correctamente. En el contenido de respuesta viene texto relevante de la investigación (en este caso, network marketing).

**Validaciones del texto:** No se permite enviar mensajes vacíos, ni con ENTER, ni ESPACIO a C.A.R.L.

**2. Estrategia de Automatización**  
Basado en el análisis anterior, la automatización se diseñará para abordar los casos que el análisis sugirió.

* **Uso de Esperas Inteligentes:** Se utilizará la funcionalidad de Playwright para esperar a que el spinner de carga termine su proceso. Esto elimina el uso de esperas como los `page.waitForTimeout()` y hace que la prueba se adapte a la latencia real de la IA, siempre respetando el tiempo de la prueba.

* **Validación del Bloqueo:** El script intentará interactuar con el campo de texto o el botón de envío mientras C.A.R.L. responde, para validar que estos elementos estén deshabilitados o no se permita su escritura.

* **Flujo de la Prueba:** El script replicará el flujo de un usuario real. Un hook hará la navegación previa, iniciará sesión y obtendrá el token de sesión, logrando así una sola autenticación para múltiples casos de prueba. Esto nos ahorrará tiempo de ejecución y escalabilidad. Una vez logrado el ingreso, navegamos hasta el chat de C.A.R.L., dando inicio a las validaciones.

* **Aserciones Dinámicas:** La validación de la respuesta de C.A.R.L. se realizará buscando la presencia de palabras clave o la estructura esperada, en lugar de validar un texto exacto que podría cambiar.

**3. Comparativa entre herramienta code y low code/no code**

| **Características**         | **Playwright** (code) | **Testim** (Low-Code/No-Code) |
|-----------------------------|------------------------|-------------------------------|
| **Flexibilidad:**           | Muy alta               | Media                         |
| **Velocidad de Creación:**  | Baja (También graba)   | Alta                          |
| **Mantenimiento:**          | Medio                  | Muy bajo                      |
| **Curva de Aprendizaje:**   | Alta                   | Muy baja                      |
| **Costo:**                  | Gratuito               | Alto                          |
| **Fiabilidad:**             | Muy alta               | Media                         |
| **Integraciones:**          | Muy alta               | Media                         |
| **Escalabilidad:**          | Alta                   | Media                         |
| **Selectores variados:**    | Alta                   | Baja                          |

![Flujo de la prueba CARL](/test-results/AI-test/perfil.jpg)