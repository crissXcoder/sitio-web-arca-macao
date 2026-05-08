# DESIGN SYSTEM: Símbolo de los Cielos

## Identidad: Premium Editorial & Conservation

Este sistema de diseño transforma la landing page en una pieza de periodismo visual de alta gama, equilibrando la belleza natural de la Lapa Roja con el rigor científico de su conservación.

### 1. Design Tokens

#### Colores Semánticos
| Nombre | Hex | Aplicación |
|--------|-----|------------|
| **Scarlet Vitality** | `#C41E3A` | CTAs, Títulos principales, Acentos críticos. |
| **Guanacaste Gold** | `#FFD700` | Indicadores de progreso, iconos, feedback. |
| **Ancient Sienna** | `#5D4037` | Texto secundario, divisores, fondos oscuros. |
| **Archival Paper** | `#F9F7F2` | Fondo principal (Light Mode). Evoca papel premium. |
| **Midnight Forest** | `#1B1C19` | Fondo principal (Dark Mode) y texto en Light Mode. |

#### Tipografía
*   **Encabezados**: `Bodoni Moda` (Serifa de alto contraste).
*   **Cuerpo**: `Montserrat` (Sans-serif geométrica).
*   **Datos/Metadata**: `Montserrat Bold` (Uppercase, Tracking: 0.15em).

### 2. Reglas de Composición (Layout)

*   **Asimetría Intencional**: Rechazamos el centrado perfecto. Los elementos deben sentirse dinámicos, con imágenes que "sangran" (full-bleed) o se desplazan fuera de la cuadrícula.
*   **Espacios en Blanco Generosos**: Mínimo 128px de separación entre bloques narrativos para permitir que el contenido "respire".
*   **Depth (Profundidad)**: Uso de capas ópticas (Backdrop Blur: 20-30px) y opacidades, evitando sombras paralelas pesadas.
*   **Bordes**: Sharp Corners (0px) para un look arquitectónico y de revista de prestigio.

### 3. Motion Intent (GSAP)
*   **Entradas**: Opacidad y desplazamientos verticales sutiles (y: 20px).
*   **Hover**: Transiciones de color fluidas y escala sutil (1.02x).
*   **Scroll**: Revelación progresiva de elementos (ScrollReveal) para mantener el flujo narrativo.

### 4. Accesibilidad & Contraste
*   **Contraste**: Mínimo 4.5:1 en todo el texto legible.
*   **Reducción de Movimiento**: Respetar `prefers-reduced-motion` desactivando desplazamientos largos.
