## Caso 1: C.A.R.L. – Asistente de IA

### Objetivo
Validar que, independientemente de las respuestas de la IA, el flujo de conversación con C.A.R.L. se ejecuta completo, procesando entradas y entregando salidas sin errores técnicos ni interrupciones.

### Observaciones del análisis
- Tras enviar un mensaje, aparece un indicador de carga y el campo de texto queda bloqueado hasta que termina la respuesta.
- No se permite enviar mensajes vacíos
- Cuando se solicita información (ej: sobre networking), la respuesta contiene texto relacionado con el tema.
- La salida puede variar; a veces es texto libre y otras puede estructurarse en el PROMPT.

### Criterios de validación
- Flujo:
  - Se pueden enviar preguntas y recibir respuestas hasta completar el flujo, sin errores visibles.
  - El input permanece bloqueado mientras C.A.R.L. responde y se habilita al finalizar.
- Contenido:
  - Respuesta no vacía.
  - Si se solicitó estructura (JSON o Secciones de separacion) es válida.
  - Texto con frases completas y palabras relacionadas con el tema del prompt (ej “networking”, “eventos”, “<ciudad>”).

### Casos de prueba
- Flujo principal (Happy Path):
  - Preguntar por eventos de networking en una ciudad este mes; verificar bloqueo del input durante la respuesta y que se recibe una respuesta relacionada y no vacia o con texto de otro tema

- Respuesta con estructura:
  - Solicitar la respuesta con un formato ( titulo, fecha, lugar)
  - Solicitar la respuesta en formato JSON
  
- Interacción seguida:
  - Intentar enviar otra pregunta mientras sigue la respuesta; confirmar que el input permanece bloqueado.

### Viabilidad de automatización
- Alta: se puede automatizar el flujo y las validaciones anteriores.

### Enfoques
- Con Playwright:
  - Navegar a C.A.R.L., enviar prompts del script, esperar la respuesta, verificar bloqueo del input y validar que la salida cumple (no vacía, estructura si aplica, palabras relevantes).

- Alternativa low/no‑code:
  - Grabar la interacción (enviar pregunta y revisar respuesta) y añadir checks básicos de contenido (no vacío, palabras clave).

### Evidencias centralizadas
- Ver `README.MD` → Evidencias:
  - Reporte HTML: `playwright-report/index.html`
  - Capturas: `test-results/`
  - Video (si aplica): `test-results/`
