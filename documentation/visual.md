## Caso 3: Comparación Visual Figma vs Plataforma

### Objetivo:
Verificar que la implementación en producción coincida con el diseño de Figma, detectando diferencias visuales y de layout.

### Metodología:
1. **Análisis de Figma** - Identificar elementos clave del diseño
2. **Capturas de Aplicación** - Screenshots de elementos equivalentes
3. **Comparación Visual** - Análisis lado a lado
4. **Documentación de Hallazgos** - Diferencias encontradas

### Elementos a Validar:
- [x] Header/Navigation
- [x] Formularios principales
- [x] Botones y elementos interactivos
- [x] Modales y popups

### Herramientas Utilizadas:
- **Figma** - Diseño de referencia
- **Playwright** - Capturas de producción
- **Análisis manual** - Comparación visual

### Evidencias:
- **Screenshots Figma**: [assets/figma/](/assets/figma/)
- **Screenshots Aplicación**: [assets/screenshots/](/assets/screenshots/)

---

## **ANÁLISIS POR ELEMENTO**

### **1. CARL CHAT**
[Figma](/assets/figma/Carl-chat-figma.png)
[Aplicacion](/assets/screenshots/CARL-chat-production.png)

#### ** EVALUACIÓN:**
- **Cercanía Visual**: Bastante parecidos, pero tienen algunas diferencias en: contenido del panel izquierdo y funcionalidad del chat
- **Diferencias principales**: Toggle "Train" faltante, descripción de C.A.R.L. diferente, pestañas distintas, contenido del panel izquierdo completamente diferente

#### **ELEMENTOS IGUALES:**
- Estructura general: Layout de 3 columnas (header + panel izquierdo + área principal)
- Navegación superior: Logo EPX + elementos de usuario
- Campo de entrada: Texto "How can C.A.R.L. help you today?" idéntico
- Disclaimer: Texto sobre verificar datos críticos idéntico
- Botón "Beta Bugs": Presente en ambas versiones

#### **DIFERENCIAS:**
**Figma:**
- Título: "Build Brands & Generate Demand"
- Tarjetas colapsables con títulos
- Avatar central con diseño futurista
- Descripción: "As the Chief Marketing Officer, my role revolves around branding, marketing strategy..."
- Toggle "Train" (off)
- Pestañas: "Actions" (activa) y "History"
- Selector de rol "Chief Marketing Officer"

**Aplicación:**
- Título: "Chat W/ C.A.R.L"
- Lista de prompts/sugerencias
- Un avatar distinto
- Descripción: "Carl's a speed-eating, data-entry machine looking for a good time. Carl's in Beta Mode..."
- Sin toggle "Train"
- Pestañas: "Suggestions" (activa) y "History"
- Icono del micrófono al lado del campo de entrada
- Barra de desplazamiento en el panel izquierdo

---

### **2. NAVBAR/HEADER**
[Figma](/assets/figma/Carl-navbar-figma.png)
[Aplicacion](/assets/screenshots/CARL-navbar-production.png)

#### ** EVALUACIÓN:**
- **Cercanía Visual**: Muy parecidos, pero tienen algunas diferencias en: responsividad de la navbar
- **Diferencias principales**: Comportamiento responsivo diferente, enlaces pueden ocultarse en pantallas pequeñas

#### **ELEMENTOS IGUALES:**
- Logo EPX en posición idéntica
- Estructura de navegación horizontal
- Botón "Beta Bugs" presente
- Iconos circulares (C.A.R.L., grupo de personas, ADN) idénticos
- Iconos de notificación (campana, menú hamburguesa) idénticos
- Imagen de perfil del usuario idéntica

#### **DIFERENCIAS:**
**Figma:**
- Enlaces de navegación visibles: "Home", "Achieve", "Explore", "Improve", "Connect", "Online", "Vault", "Tribes", "Future Forward™"
- Separadores verticales entre enlaces
- Enlace "Online" resaltado con indicador visual

**Aplicación:**
- Al encoger ligeramente la pantalla las opciones del navbar desaparecen

---

### **3. EVENT FORM**
[Figma](/assets/figma/event-form-figma.png)
[Aplicacion](/assets/screenshots/event-form-production.png)

#### **EVALUACIÓN:**
- **Cercanía Visual**: Muy parecidos, pero tienen algunas diferencias en: funcionalidades avanzadas y campos opcionales
- **Diferencias principales**: Campos de video, fechas opcionales, sección de costos y límites de caracteres

#### **ELEMENTOS IGUALES:**
- Logo EPX en posición idéntica
- Enlaces de navegación: "Home", "Online" (resaltado), "Achieve", "Explore", "Connect", "Vault", "Tribes", "FutureForward"
- Elementos de usuario: "Beta Bugs", contador XPLR, barra de búsqueda "Search"
- Iconos de notificación (campana, pregunta, perfil) idénticos
- Título: "Host an Online Event" idéntico
- Sección Thumbnail Image: Área de drag & drop, texto "Drag and drop an image", "Or browse to choose a file"
- Sección Event Type: Botones de radio "Meetup (Discussion)" y "MasterClass" (Meetup seleccionado)
- Sección Audience: Botones "Entire Network" y "EPX+ Members Only"
- Sección Co-Owners: Campo de selección con placeholder "Select Co-Owners"
- Sección Event Title: Campo con placeholder "ex. Quantum Physics-based Leadership"
- Sección Event Description: Área de texto con placeholder "ex. Describe the topics to be discussed"
- Secciones de Bullet Points: "Describe in 3-5 bullet points about what a viewer will learn" y "Describe in 3-5 bullet points about why it is valuable"
- Sección Detail Page Banner: Área de drag & drop con recomendaciones de tamaño
- Secciones de Tags: Category Tags, Skills, Business model, Industry, Impact con placeholders y botones "Show all"
- Campos de Asistentes y Horarios: Min/Max attendees, Start Date, Start/End Time con placeholders e iconos
- Campos de Video Conferencia: Join link, Meeting ID, Meeting Passcode con placeholders y notas
- Botones de Acción: "Cancel" y "Publish" (botón naranja resaltado)

#### **DIFERENCIAS:**
**Figma:**
- Contador de caracteres en descripción: "0/1200"
- Campo de video opcional con especificaciones: "Drag and drop an video MP4, AVI or MKV smaller than 250MB 90 seconds max in length"
- Campo "End Date (Optional)" con calendario
- Sección completa de costos: "Price per person (USD)" con símbolo "$"
- Sección de descuentos: "Do you want to set up any discount codes?" con campos para código, cantidad y máximo de descuentos
- Solo 2 botones: "Cancel" y "Publish"

**Aplicación:**
- Contador de caracteres en descripción: "0/1000"
- Sin campo de video opcional
- Sin campo "End Date (Optional)"
- Sin sección de costos y descuentos
- 4 botones: "Save as Draft", "Preview", "Cancel", "Publish"

---

### **4. MODAL EPX**
[Figma](/assets/figma/Modal-EPX-figma.png)
[Aplicacion](/assets/screenshots/Modal-EPX-production.png)

#### ** EVALUACIÓN:**
- **Cercanía Visual**: Idénticos - implementación perfecta
- **Diferencias principales**: Solo diferencia en contexto de uso (esperado y correcto para un componente funcional)

#### **ELEMENTOS IGUALES:**
- Estructura del modal con header y body
- Header con gradiente horizontal de naranja a amarillo
- Título "EPX +" en letras grandes, blancas y en negrita, centrado
- Subtítulo "Superstar!" en letras blancas de tamaño mediano
- Botón de cierre "X" blanco en esquina superior derecha
- Body con fondo blanco sólido
- Texto principal: "Our records indicate you have used your free listings which are included in your membership."
- Texto secundario: "You are allowed a limited number of opportunities to post per period of time. **Pay to Play.**" con "Pay to Play." resaltado en naranja
- Bordes redondeados y sombra sutil
- Tipografía sans-serif limpia y legible

#### **DIFERENCIAS:**
**Figma:**
- Modal presentado de forma aislada, sin contenido de fondo visible

**Aplicación:**
- Modal superpuesto sobre la interfaz principal de la aplicación
- Muestra barra de navegación, barra lateral de filtros y lista de eventos en el fondo