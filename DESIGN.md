---
name: Tech-Noir Narrative
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#bac9cc'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#849396'
  outline-variant: '#3b494c'
  surface-tint: '#00daf3'
  primary: '#c3f5ff'
  on-primary: '#00363d'
  primary-container: '#00e5ff'
  on-primary-container: '#00626e'
  inverse-primary: '#006875'
  secondary: '#d1bcff'
  on-secondary: '#3c0090'
  secondary-container: '#7000ff'
  on-secondary-container: '#ddcdff'
  tertiary: '#ffeac0'
  on-tertiary: '#3e2e00'
  tertiary-container: '#fec931'
  on-tertiary-container: '#6f5500'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#9cf0ff'
  primary-fixed-dim: '#00daf3'
  on-primary-fixed: '#001f24'
  on-primary-fixed-variant: '#004f58'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d1bcff'
  on-secondary-fixed: '#23005b'
  on-secondary-fixed-variant: '#5700c9'
  tertiary-fixed: '#ffdf96'
  tertiary-fixed-dim: '#f3bf26'
  on-tertiary-fixed: '#251a00'
  on-tertiary-fixed-variant: '#594400'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 72px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-x: 32px
  stack-unit: 8px
---

## Brand & Style

This design system embodies a "Tech-Noir" aesthetic—a fusion of high-end professional software engineering and futuristic cyberpunk atmospheres. The brand personality is authoritative, cutting-edge, and highly polished. It targets a sophisticated audience within the technology and venture capital sectors who value technical excellence and obsessive attention to detail.

The visual style utilizes **Glassmorphism** as its core structural principle. Surfaces are treated as semi-transparent obsidian sheets, employing backdrop blurs and micro-glows to create a sense of three-dimensional space within a dark environment. High contrast is used strategically to guide the eye, ensuring that while the backdrop is deep and atmospheric, the critical information is vibrantly legible.

## Colors

The palette is anchored in a true-black foundation to maximize OLED contrast and depth.

- **Primary (Electric Cyan):** Used exclusively for interactive states, key highlights, and data visualizations. It should be treated as a light source.
- **Secondary (Neon Purple):** An accent for gradients and secondary highlights to add chromatic depth to the "noir" theme.
- **Surface Tiers:** 
  - `Base`: #050505 (Pure matte black)
  - `Elevated`: #0A0A0A (Slightly lighter for card containers)
  - `Overlay`: #141414 (For menus and tooltips)
- **Status Colors:** Use high-vibrancy variants of Green (#00FF41) for success and Red (#FF0055) for errors, maintaining the neon intensity.

## Typography

The typography system relies on high-performance grotesque and monospaced typefaces. **Geist** is used for display and headings to provide a surgical, technical feel with its tight kerning and geometric construction. 

**Inter** handles long-form body text for maximum readability against dark backgrounds. For metadata, code snippets, and technical labels, **JetBrains Mono** is employed to reinforce the developer-centric nature of the portfolio. All headings should use a subtle text-shadow of the primary color at very low opacity (5-10%) to simulate a "screen glow" effect.

## Layout & Spacing

This design system uses a **Fluid-Fixed hybrid grid**. On desktop, content is contained within a 12-column grid with a maximum width of 1280px to prevent excessive line lengths. On mobile, the grid transitions to a 4-column layout.

Spacing follows a strict **8px linear scale**. Use larger gaps (64px+) between sections to allow the glassmorphic elements to "breathe" and prevent the dark UI from feeling claustrophobic. Components should utilize internal padding that favors a "wide" horizontal aspect ratio.

## Elevation & Depth

Depth is conveyed through **Light Emittance** rather than traditional shadows. 
1. **Backdrop Blur:** All elevated surfaces must use a `backdrop-filter: blur(12px)` combined with a semi-transparent background (#0A0A0A at 80% opacity).
2. **Inner Borders:** Use a 1px solid border at the top and left of elements with a white or primary color at 10% opacity to simulate a "specular highlight" on the edge of the glass.
3. **Glow:** Primary interactive elements (buttons, active tabs) use an `outer-glow` instead of a shadow. Example: `0 0 20px rgba(0, 229, 255, 0.3)`.

## Shapes

The design uses a **Medium-Rounded** profile (`0.5rem` or `8px`). This strikes a balance between the aggressive sharpness of brutalism and the overly friendly nature of consumer apps. 

- Standard components (Inputs, Buttons): 8px
- Feature Cards: 16px (`rounded-lg`)
- Interactive Chips: 100px (Pill-shaped)
- Dividers: Should be treated as glowing "laser lines" 1px thick with a gradient fade to transparency.

## Components

### Buttons
Primary buttons feature a solid Electric Cyan background with black text. On hover, they trigger a "pulse" glow effect. Secondary buttons are "ghost" style with a 1px cyan border and a subtle background blur.

### Cards
Cards are the primary content vessel. They must feature the 1px specular border highlight and a backdrop blur. For "Featured" projects, the card can have a subtle radial gradient background that follows the mouse cursor (hover effect).

### Inputs
Text fields are dark-filled with a bottom-only border. Upon focus, the bottom border expands to 2px and glows in the primary color, with the label transitioning to the monospaced font.

### Navigation
The navigation bar should be a floating "dock" at the top of the screen, utilizing high-density glassmorphism. Active links are indicated by a small neon dot below the text, rather than a traditional underline.

### Technical Tags (Chips)
Use the monospaced font. Tags are styled with a subtle primary-color tint (5% opacity) and a high-contrast text color.