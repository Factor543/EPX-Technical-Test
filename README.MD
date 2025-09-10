## EPX – Prueba Técnica (QA Automatización)

---
**************************************************************IMPORTANTE**********************************************************

**ASPECTOS OMITIDOS INTENCIONALMENTE POR PRACTICIDAD Y PROPÓSITO DE LAS PRUEBAS**

**1. VARIABLES DE ENTORNO - OMITIDAS POR PRÁCTICIDAD**
- Las credenciales están hardcodeadas directamente en el código
- Razón: Prácticidad y propósito de las pruebas

**2. MULTI-NAVEGADOR - SOLO CHROMIUM POR EFICIENCIA**  
- Solo se ejecuta en Chromium (Chrome)
- Firefox y Edge están deshabilitados en playwright.config.ts
- Razón: Prácticidad y propósito de las pruebas
- En producción se implementarían todos los navegadores y responsive design

**3. RESULTADOS DE EJECUCIÓN - SUBIDOS AL REPOSITORIO INTENCIONALMENTE**
- Los archivos de evidence/ y results/ están incluidos en el repositorio
- Contiene videos, screenshots, traces y reportes HTML de las ejecuciones
- Razón: Las referencias en este README apuntan a archivos internos de esas carpetas
- No subirlos dañaría la documentación y redirecciones del proyecto
- En producción estos archivos se excluirían en el archivo .gitignore del repositorio
- *****Puede afectar el tiempo de clonación debido al tamaño de videos y metadatos*****

**4. WAITFOR TIMEOUTS - COLOCADOS ESTRATÉGICAMENTE**
- Se utilizan page.waitForTimeout() en puntos específicos del código
- Razón: Controlar comportamientos asíncronos y dar tiempo a respuestas de IA
- Necesarios para estabilizar tests en entornos de staging con latencia variable
- En producción se optimizarían con waits más específicos (waitForSelector, waitForResponse)
- Los timeouts están colocados estratégicamente, no son aleatorios, ni por no seguir 
---

### Resumen Técnico del Proyecto
Este proyecto implementa una suite de automatización de pruebas end-to-end para la plataforma EPX utilizando Playwright con TypeScript. La arquitectura se basa en el patrón Page Object Model (POM) con selectores centralizados, implementando validaciones específicas para flujos de IA, límites de publicación y comparación visual. El sistema incluye manejo robusto de errores, generación automática de evidencias (screenshots, videos, traces) y reportes HTML detallados. La implementación demuestra competencias avanzadas en QA automation, detección proactiva de bugs críticos y documentación técnica exhaustiva.

### Precondiciones para Ejecución

*****************PASOS A SEGUIR ANTES DE EJECUTAR LOS TESTS*****************

1. **Usuarios de prueba disponibles:**
   - Usuario 1: [cmendoza+qa1@shokworks.io]
   - Usuario 2: [cmendoza+qa2@shokworks.io] 
   - Usuario 3: [cmendoza+qa3@shokworks.io]
   - Contraseña unica para los 3 usuarios: Cmendoza1.

2. **Reiniciar límites de publicación:**
   - Resetear contadores de posts gratuitos y de pago
   - Limpiar historial de publicaciones del mes actual
   - Añadir submerchant a los usuarios

3. **Limpiar conversaciones CARL:**
   - Eliminar historial de conversaciones de los 3 usuarios
   - Asegurar que el chat esté vacío para resultados reales
   - Los errores alternativos están controlados en el código

### Casos de Prueba Implementados

#### **Caso 1 – C.A.R.L. (Asistente de IA)** COMPLETO
[Detalles del análisis del caso C.A.R.L.](documentation/AI-assistance.md)
- **Validaciones implementadas**:
  - Flujo completo sin errores
  - Respuesta no vacía
  - Estructura válida si aplica (ej. JSON)
  - Palabras clave relevantes al prompt
  - Input bloqueado durante respuesta

**BUGS DETECTADOS:**

**Bug #1: Primer mensaje no responde**
- C.A.R.L. no responde al primer mensaje tras nueva conversación
- [Ver evidencias en carpeta](evidence/) - Buscar carpetas que contengan "AI-assistance"

**Bug #2: JSON incompleto** 
- C.A.R.L. omite llave de cierre en respuestas JSON
- [Ver evidencias en carpeta](evidence/) - Buscar carpetas que contengan "AI-assistance"

#### **Caso 2 – Posting Limits y Get Advice** COMPLETO
[Detalles del análisis del caso Posting Limits](documentation/Posting-limits.md)
- **Validaciones implementadas**:
  - 1 post gratuito por mes
  - Máximo 2 posts/mes (el 2.º es de pago)
  - Publicaciones adicionales requieren upgrade o pago ($29.99)
  - No publicar nuevamente hasta el siguiente mes
  - Validación de mensajes de error y restricciones

**BUGS DETECTADOS:**

**Bug #1: Sistema de límites no funciona**
- Permite más posts gratuitos de los permitidos
- [Ver evidencias en carpeta](evidence/) - Buscar carpetas que contengan "posting-limits"

**Bug #2: Mensajes de error no aparecen**
- No muestra mensajes de límite excedido cuando debería
- [Ver evidencias en carpeta](evidence/) - Buscar carpetas que contengan "posting-limits"

#### **Caso 3 – Comparación Visual (Figma vs Plataforma)** COMPLETO
[Detalles del análisis del caso Visual](documentation/visual.md)
- **Validaciones implementadas**:
  - Comparación directa con diseños de Figma
  - Análisis de elementos clave (navbar, formularios, modales)
  - Detección de diferencias visuales y de layout
  - Documentación exhaustiva de hallazgos

### Cómo ejecutar

#### **Instalación**
```bash
# Instalar dependencias
npm install

# Instalar navegadores de Playwright
npx playwright install
```

#### **Ejecución de Tests**
```bash
# Ejecutar todos los tests
npm run test

# Ver reportes HTML (incluye videos, capturas y traces)
npm run report
```

#### **Linting y Formateo**
```bash
# Ejecutar ESLint para verificar calidad del código
npm run lint

```

### Reportes y Evidencias
- **Reporte HTML**: Incluye videos de ejecución, capturas de pantalla automáticas y traces detallados
- **Evidencias**: Screenshots y videos guardados automáticamente en carpeta `evidence/`
- **Traces**: Información detallada de cada paso de ejecución

### Arquitectura del Proyecto
- **Framework y lenguaje**: Playwright con TypeScript
- **Patrón de diseño**: Page Object Model
- **Reportes**: HTML con screenshots, videos y traces automáticos
- **Linting**: ESLint configurado para mantener calidad de código

### Estructura del Proyecto
```
├── tests/                    # carpetas de tests automatizados
│   ├── AI-assistance.spec.ts # Tests de C.A.R.L.
│   ├── posting-limits.spec.ts # Tests de Posting Limits
│   └── visual.spec.ts         # Tests de Comparación Visual
├── Pages/                    # carpetas de Page Object Model
│   ├── Carl.ts              # Página de C.A.R.L.
│   ├── Login.ts             # Página de Login y URL's
│   └── Posting.ts           # Página de Posting
├── selectors/               # carpetas de Selectores centralizados
│   ├── Alerts.ts            # Selectores de alertas
│   ├── Buttons.ts           # Selectores de botones
│   ├── Fields.ts            # Selectores de campos
│   └── index.ts             # Exportación central
├── documentation/           # carpetas de Análisis técnico detallado
│   ├── AI-assistance.md     # Análisis del caso C.A.R.L.
│   ├── Posting-limits.md    # Análisis del caso Posting Limits
│   └── visual.md            # Análisis del caso Visual
├── evidence/               # carpetas de Evidencias de ejecución
│   ├── AI-assistance-*/     # Evidencias de tests de C.A.R.L.
│   ├── posting-limits-*/    # Evidencias de tests de Posting Limits
│   └── *.png               # Screenshots de errores
├── results/                # carpetas de Reportes HTML
│   ├── index.html          # Reporte principal
│   └── data/               # Datos de reportes
├── assets/                 # carpetas de Recursos de prueba
│   ├── figma/              # Diseños de referencia
│   ├── screenshots/        # Capturas de producción
│   └── imgs/               # Imágenes para tests
├── playwright.config.ts    # archivo de Configuración principal de Playwright
├── eslint.config.mjs       # archivo de Configuración de ESLint
├── .gitignore              # archivo de Archivos ignorados por Git
└── index.ts                # archivo de Punto de entrada para tests
```

