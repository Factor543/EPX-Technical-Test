## Caso 2: Posting Limits y Get Advice

### Objetivo:
Verificar los límites de publicación por usuario y la correcta aplicación de pagos o restricciones en el sistema EPX.

### Análisis Real:
**Funciona:**
- Creación de eventos gratuitos (cuando hay límite disponible)
- Creación de eventos de pago (cuando hay límite disponible)
- Formularios de creación de eventos completos
- Navegación entre modales y formularios

**NO funciona:**
- Sistema de límites no aplica correctamente (permite más posts de los permitidos)
- Mensajes de error de límites no aparecen cuando deberían
- Modal de upgrade no se muestra correctamente

**Parcialmente funciona:**
- Validación de formularios (funciona pero no bloquea por límites)
- Mensajes de confirmación de creación

### Criterios a Evaluar:
1. **Límites de posting**: 1 post gratuito por mes,1 post de pago por mes, máximo 2 posts total
2. **Mensajes de error**: Aparición correcta cuando se exceden límites
3. **Modal de upgrade**: Mostrar opciones de pago cuando se alcanzan límites
4. **Get Advice**: 1 publicación gratuita por mes (no implementado por limitaciones)

### Casos de Prueba Implementados
- ✅ Publicación de evento gratuito por mes (funciona)
- ✅ Post bloqueado por límite de posts gratuitos (falla - no bloquea al publicar el segundo gratis, pero si al publicar el segundo de pago)
- ✅ Publicación de evento pago por mes (funciona)
- ✅ Tercer post bloqueado - Límite máximo alcanzado

### Viabilidad de Automatización
**ALTA** - El flujo es predecible y automatizable, pero los bugs del sistema afectan la validez.

**Justificación:**
- Los formularios son estables y automatizables
- Las validaciones son claras y medibles
- Los errores del sistema son detectables
- El flujo de navegación es consistente

### Enfoques con Herramientas
|
#### Playwright
**¿Por qué es la mejor opción?**

**Ventajas específicas para este caso:**
- **Validación de formularios complejos**: Manejo robusto de campos múltiples
- **Verificación de límites**: Assertions precisas para mensajes de error
- **Manejo de modales**: Control total sobre popups y ventanas emergentes
- **Datos de prueba**: Fácil parametrización con diferentes usuarios

**Comparación con alternativas:**
- **Low-code (Playwright Codegen)**: Limitado para validaciones de límites complejos
- **No-code (Katalon)**: No puede manejar lógica de negocio compleja
- **Selenium**: Menos robusto para aplicaciones modernas con modales

#### Alternativas Low-Code
**Limitaciones para este caso:**
- Validaciones de límites requieren lógica compleja
- Manejo de múltiples usuarios y estados
- Verificación de mensajes de error específicos

### Evidencias
- **Reportes HTML**: `results/index.html`
- **Screenshots de errores**: `evidence/`
- **Videos de ejecución**: `evidence/`
- **Traces para debugging**: `evidence/`

### Recomendaciones para el Equipo de Desarrollo
1. **Sistema de límites**: Revisar lógica de conteo de posts por usuario
2. **Mensajes de error**: Implementar validación correcta de límites
3. **Modal de upgrade**: Corregir aparición de opciones de pago

### Impedimentos
- **Get Advice no disponible**: Los 3 usuarios de prueba no tienen acceso a esta funcionalidad
- **Límites no funcionan**: El sistema no aplica correctamente las restricciones
- **Usuarios limitados**: Solo 3 credenciales disponibles para testing
