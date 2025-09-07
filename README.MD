## EPX – Prueba Técnica (QA Automatización)

### Caso 1 – C.A.R.L. (Asistente de IA)
- Validaciones:
  - Flujo completo sin errores
  - Respuesta no vacía
  - Estructura válida si aplica (ej. JSON)
  - Palabras clave relevantes al prompt

**BUGS DETECTADOS:**

**Bug #1: Primer mensaje no responde**
- C.A.R.L. no responde al primer mensaje tras nueva conversación
- [Ver evidencia](evidence/AI-assistance-C-A-R-L---Ha-fe4a5-sobre-eventos-de-networking-chromium/test-failed-1.png)

**Bug #2: JSON incompleto** 
- C.A.R.L. omite llave de cierre en respuestas JSON
- [Ver evidencia](evidence/AI-assistance-C-A-R-L---Re-aa996-n-estructura---Formato-JSON-chromium/test-failed-1.png)

**📊 Reportes:**
- [Reporte completo HTML](results/index.html)
- [Carpeta de fallos](evidence)

[Detalles del analisis del caso C.A.R.L.](documentation/AI-assistance.md)

### Caso 2 – Posting Limits y Get Advice
- Validaciones:
  - 1 post gratuito por mes
  - Máximo 2 posts/mes (el 2.º es de pago)
  - 1 Get Advice gratuito por mes
  - Publicaciones adicionales requieren upgrade o pago ($29.99)
  - No publicar nuevamente hasta el siguiente mes
[Detalles del analisis del caso Posting Limits y Get Advice](documentation/Posting-limits.md)

### Caso 3 – Comparación visual (Figma vs Plataforma)
- Validaciones:
  - Elementos clave presentes (headers, CTAs, formularios)
  - Layout y estilos consistentes (con tolerancia)
  - Ignorar zonas dinámicas (fechas, avatares, contadores)
[Detalles del analisis del caso Visual](documentation/visual.md)

### Cómo ejecutar
- Instalar dependencias: `npm i`
- Ejecutar pruebas: `npx playwright test`
- Ver reporte: abrir `playwright-report/index.html`

**⚠️ NOTA IMPORTANTE:** Los tests de C.A.R.L. fallan intencionalmente por bugs reales detectados en el sistema. Ver evidencias en carpetas de `test-results/`.
