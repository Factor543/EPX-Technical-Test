## Caso 2: Posting Limits y Get Advice

### Objetivo:
Verificar los límites de publicación por usuario y la correcta aplicación de pagos o restricciones en el sistema EPX.

### Análisis:
**Funciona:**
- Creación de eventos gratuitos (cuando hay límite disponible, debe ser 1 por mes)
- Creación de eventos de pago (cuando hay límite disponible, debe ser 1 por mes)
- Formularios de creación de eventos completos
- Navegación entre modales y formularios
- Get Advice - Creación de solicitudes de consejo (1 por mes)

**NO funciona:**
- Sistema de límites no aplica correctamente (permite más posts de los permitidos por mes, es decir, permite más de 1 gratis por mes)
- Mensajes de límites alcanzados (no aparecen cuando deberían aparecer, y permite ingresar al formulario de creación de evento, por lo que no bloquea al publicar el segundo evento gratis)
- Modal de upgrade no se muestra (no aparece cuando debería aparecer)

**Parcialmente funciona:**
- Mensajes de confirmación de creación

### Criterios a Evaluar:
1. **Límites de posting**: 1 post gratuito por mes, 1 post de pago por mes, máximo 2 posts total
2. **Mensajes de error**: Aparición correcta cuando los límites son alcanzados
3. **Get Advice**: 1 publicación gratuita por mes

### Casos de Prueba:
- ✅ Publicación de evento gratuito por mes (funciona)
- ✅ Post bloqueado por límite de posts gratuitos (falla - no bloquea la segunda publicación)
- ✅ Publicación de evento pago por mes (funciona)
- ✅ Tercer post bloqueado - Límite máximo alcanzado (falla - no bloquea la tercera publicación, por lo que no cumple con el criterio de 2 posts por mes)
- ✅ Get Advice - Límite de un post gratuito por mes (funciona)

### Viabilidad de Automatización:
**ALTA** - El flujo es predecible y automatizable, pero los bugs del sistema afectan la validez.

**Justificación:**
- Los formularios son estables y automatizables (**RECOMIENDO** implementar test-id para el testing. En botones, formularios, campos, alertas, etc.)
- Las validaciones son claras y medibles
- Los errores del sistema son detectables
- El flujo de navegación es consistente

### Enfoques con Herramientas:

#### Playwright:
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

#### Alternativas Low-Code:
**Limitaciones para este caso:**
- Validaciones de límites requieren lógica compleja (ya que el flujo no es estable y puede variar)
- Manejo de múltiples usuarios, estados y navegaciones distintas
- Verificación de mensajes de error específicos

### Evidencias:
- **Reportes HTML**: `results/index.html`
- **Screenshots de errores**: `evidence/`
- **Videos de ejecución**: `evidence/`
- **Traces para debugging**: `evidence/`

### Recomendaciones para el Equipo de Desarrollo:
1. **Sistema de límites**: Revisar lógica de conteo de posts por usuario
2. **Mensajes de error**: Implementar validación correcta de límites
3. **Modales de upgrade**: Aplicar correctamente los mensajes de error y restricciones para que aparezcan cuando deberían aparecer

### Impedimentos:
- **Límites no funcionan**: El sistema no aplica correctamente las restricciones
- **Usuarios limitados**: Solo 3 credenciales disponibles para testing (Hay que reiniciar los posting limits:
  - Eventos gratis
  - Eventos pago
  - Get Advice
)
