## Caso 1: C.A.R.L. - Asistente de IA

### Objetivo:
Verificar que C.A.R.L. reciba correctamente las preguntas y devuelva respuestas sin errores, siguiendo el formato esperado y manteniendo coherencia en el contenido.

### Análisis:
**Funciona:**
- Flujo básico de pregunta y respuesta (tras aplicar un ajuste temporal)
- Bloqueo del campo de entrada mientras se genera la respuesta
- Reinicio del contexto entre conversaciones
- Respuestas con el formato solicitado (cuando funciona correctamente)

**NO funciona:**
- Primer mensaje en conversaciones nuevas (falla de forma constante)
- Generación de JSON incompleto (falta llave de cierre)

**Parcialmente funciona:**
- Respuestas con formato correcto (solo después de una interacción previa)

### Criterios a Evaluar:
1. **Funcionamiento general**: sin errores de conexión o tiempos de espera excesivos
2. **Contenido**: respuesta no vacía y relevante a la pregunta
3. **Estructura**: formato correcto cuando se solicita (JSON, listas)
4. **Experiencia de usuario**: campo de entrada bloqueado durante la respuesta y habilitado al finalizar

### Casos de Prueba:
- ✅ Pregunta sobre networking (falla por error del primer mensaje)
- ✅ Respuesta con formato estructurado (funciona tras el ajuste temporal)
- ✅ Validación de JSON (falla por error de formato)
- ✅ Bloqueo del campo de entrada (funciona correctamente)

### Viabilidad de Automatización:
**ALTA** – Aunque presenta errores, el comportamiento es consistente y se puede automatizar.

**Justificación:**
- Los errores se repiten de forma predecible y son detectables
- El flujo principal funciona de manera estable
- Las validaciones son claras y medibles
- Los ajustes temporales aplicados resultan efectivos

### Enfoques con Herramientas:

#### Playwright:
**¿Por qué es la mejor opción?**

**Ventajas específicas para este caso:**
- **Manejo de errores repetitivos**: permite implementar soluciones específicas
- **Comprobaciones de contenido**: validaciones precisas de texto y formato
- **Gestión de tiempos de espera**: clave para respuestas de IA que pueden tardar
- **Informes detallados**: evidencias claras de fallos para el equipo de desarrollo

**Comparación con alternativas:**
- **Low-code (Playwright Codegen)**: limitado para manejar casos complejos
- **No-code (Katalon)**: insuficiente para validaciones de contenido de IA
- **Selenium**: menos robusto para aplicaciones modernas

#### Alternativas Low-Code:
**Limitaciones para este caso:**
- Las validaciones de IA requieren alta precisión
- Los errores repetitivos necesitan manejo específico
- Menor control sobre tiempos críticos

### Evidencias:
- **Reportes HTML**: `results/index.html`
- **Capturas de errores**: `evidence/`
- **Videos de ejecución**: `evidence/`
- **Traces para debugging**: `evidence/`

### Recomendaciones para el Equipo de Desarrollo:
1. **Error del primer mensaje**: revisar la inicialización del chatbot
2. **JSON incompleto**: verificar el procesamiento de las respuestas de IA

### Impedimentos:
- **Errores repetitivos**: afectan las validaciones de algunas pruebas y obligan a aplicar ajustes temporales
