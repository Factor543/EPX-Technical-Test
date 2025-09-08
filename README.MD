## EPX – Prueba Técnica (QA Automatización)

### Resumen del Proyecto
Este proyecto implementa automatización de pruebas para la plataforma EPX, enfocándose en tres casos críticos de QA: flujos de C.A.R.L., posting limits, y validación de interfaces.

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

- **Limitaciones identificadas**:
  - Get Advice no disponible para usuarios proporcionados

#### **Caso 3 – Comparación Visual (Figma vs Plataforma)** LIMITADO
[Detalles del análisis del caso Visual](documentation/visual.md)

- **Limitaciones**:
  - Sin acceso a Figma para comparación directa
  - Implementación alternativa propuesta con screenshot comparison

- **Enfoque alternativo**:
  - Validación de elementos clave presentes
  - Comparación con versiones anteriores
  - Validación de accesibilidad visual

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
npm test

# Ver reportes
npm run report
```
### Arquitectura del Proyecto
- **Framework y lenguaje**: Playwright con TypeScript
- **Patrón de diseño**: Page Object Model
- **Configuración**: Multi-navegador (Chrome, Firefox, Edge)
- **Reportes**: HTML con screenshots y videos automáticos

### Arquitectura del Proyecto
```
├── tests/                    # Tests automatizados
│   ├── AI-assistance.spec.ts # Tests de C.A.R.L.
│   ├── posting-limits.spec.ts # Tests de Posting Limits
│   └── visual.spec.ts         # Tests de Comparación Visual (falta implementacion)
├── Pages/                    # Page Object Model
│   ├── Carl.ts              # Página de C.A.R.L.
│   ├── Login.ts             # Página de Login y URL's
│   └── Posting.ts           # Página de Posting
├── selectors/               # Selectores centralizados en comun con los test actuales y futuros
│   ├── Alerts.ts            # Selectores de alertas
│   ├── Buttons.ts           # Selectores de botones
│   ├── Fields.ts            # Selectores de campos
│   └── index.ts             # Exportación central
├── documentation/           # Análisis técnico detallado
│   ├── AI-assistance.md     # Análisis del caso C.A.R.L.
│   ├── Posting-limits.md    # Análisis del caso Posting Limits
│   └── visual.md            # Análisis del caso Visual
├── evidence/               # Evidencias de ejecución (esta carpeta NO está incluida en el .gitignore debido a que contiene evidencias de errores descrita en este archivo)
│   ├── AI-assistance-*/     # Evidencias de tests de C.A.R.L.
│   ├── posting-limits-*/    # Evidencias de tests de Posting Limits
│   └── *.png               # Screenshots de errores
├── results/                # Reportes HTML
│   ├── index.html          # Reporte principal
│   └── data/               # Datos de reportes
├── assets/                 # Recursos de prueba
│   └── imgs/               # Imágenes para tests
├── playwright.config.ts    # Configuración principal de Playwright
├── eslint.config.mjs       # Configuración de ESLint
├── .gitignore              # Archivos ignorados por Git
└── index.ts                # Punto de entrada para tests
```