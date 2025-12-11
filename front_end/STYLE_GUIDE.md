# 🎨 Visual Style Guide - MicroCommerce Suite

## Color Palette

### Primary Colors
```
Primary:      #6366f1 ████ Indigo (Main brand color)
Primary Dark: #4f46e5 ████ Deep Indigo (Hover states)
Primary Light:#818cf8 ████ Light Indigo (Accents)
```

### Secondary Colors
```
Secondary:      #10b981 ████ Emerald (Success, positive)
Secondary Dark: #059669 ████ Deep Emerald (Hover)
```

### Semantic Colors
```
Danger:  #ef4444 ████ Red (Errors, deletions)
Warning: #f59e0b ████ Amber (Warnings, alerts)
Info:    #3b82f6 ████ Blue (Information)
```

### Backgrounds
```
Dark BG:         #0f172a ████ Darkest (Page background)
Dark BG Light:   #1e293b ████ Dark (Cards, panels)
Dark BG Lighter: #334155 ████ Medium (Inputs, hover)
```

### Text Colors
```
Text Light:  #f1f5f9 ████ Almost white (Headings, primary text)
Text Muted:  #94a3b8 ████ Gray (Secondary text, labels)
```

### Border Colors
```
Border: #334155 ████ Subtle separation
```

---

## Typography

### Font Stack
```
Primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto'
Code:    source-code-pro, Menlo, Monaco, Consolas, 'Courier New'
```

### Font Weights
- **Regular:** 400 (Body text)
- **Semi-bold:** 600 (Labels, buttons)
- **Bold:** 700 (Card titles)
- **Extra Bold:** 800 (Page titles)

### Font Sizes
```
Page Title:    32px (h1)
Card Title:    20-24px (h2)
Subtitle:      16px
Body:          14px
Small:         12-13px
Tiny:          11px
```

---

## Spacing System

### Base Unit: 8px

```
.mt-1, .mb-1, .mr-1, .ml-1     8px   (1 unit)
.mt-2, .mb-2, .mr-2, .ml-2     16px  (2 units)
.mt-3, .mb-3                    24px  (3 units)
.mt-4, .mb-4                    32px  (4 units)

.p-1                            8px   (padding)
.p-2                            16px
.p-3                            24px
.p-4                            32px

gap-2                           8px   (flexbox/grid gap)
gap-3                           12px
gap-4                           16px
```

---

## Border Radius

```
Small:    4px   (Inputs, badges)
Medium:   8px   (Buttons, small cards)
Large:    12px  (Cards, panels)
XLarge:   16px  (Modals, featured cards)
Round:    50%   (Avatars, icons)
Pill:     9999px (Chips, tags)
```

---

## Shadows

### Standard Shadow
```css
box-shadow: 
  0 4px 6px -1px rgba(0, 0, 0, 0.1),
  0 2px 4px -2px rgba(0, 0, 0, 0.1);
```
**Use for:** Cards, buttons

### Large Shadow
```css
box-shadow: 
  0 10px 15px -3px rgba(0, 0, 0, 0.3),
  0 4px 6px -4px rgba(0, 0, 0, 0.3);
```
**Use for:** Hover states, elevated cards

### Modal Shadow
```css
box-shadow: 
  0 20px 25px -5px rgba(0, 0, 0, 0.5),
  0 10px 10px -5px rgba(0, 0, 0, 0.4);
```
**Use for:** Modals, overlays

---

## Gradients

### Primary Button Gradient
```css
background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
```

### Secondary Button Gradient
```css
background: linear-gradient(135deg, #10b981 0%, #059669 100%);
```

### Text Gradient
```css
background: linear-gradient(135deg, #6366f1, #10b981);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

### Page Background
```css
background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
```

---

## Animation Timings

### Easing Functions
```css
ease:           cubic-bezier(0.25, 0.1, 0.25, 1)      /* Default smooth */
ease-in-out:    cubic-bezier(0.42, 0, 0.58, 1)        /* Balanced */
ease-out:       cubic-bezier(0, 0, 0.58, 1)           /* Decelerate */
custom-bounce:  cubic-bezier(0.34, 1.56, 0.64, 1)     /* Bounce effect */
custom-spin:    cubic-bezier(0.68, -0.55, 0.265, 1.55) /* Elastic spin */
```

### Duration Guidelines
```
Instant:      100ms   (Immediate feedback)
Quick:        200ms   (Button hover)
Normal:       300ms   (Default transitions)
Smooth:       500ms   (Card animations)
Slow:         600ms   (Page entrances)
Very Slow:    800ms   (Special effects)
```

### Animation Classes
```html
<!-- Fade animations -->
<div class="fade-in">         <!-- 0.3s fade in -->
<div class="fade-in-up">      <!-- 0.6s fade + slide up -->

<!-- Slide animations -->
<div class="slide-in">        <!-- Slide from left -->
<div class="slide-in-right">  <!-- Slide from right -->

<!-- Scale animations -->
<div class="scale-in">        <!-- 0.5s zoom in -->

<!-- Continuous animations -->
<div class="pulse">           <!-- 2s heartbeat -->
<div class="glow">            <!-- 2s glow effect -->
<div class="bounce">          <!-- 1s bounce -->
<div class="floating">        <!-- 3s float up/down -->
<div class="rotate">          <!-- 3s rotation -->

<!-- Stagger delays -->
<div class="stagger-1">       <!-- 0.1s delay -->
<div class="stagger-2">       <!-- 0.2s delay -->
<div class="stagger-3">       <!-- 0.3s delay -->
<div class="stagger-4">       <!-- 0.4s delay -->
<div class="stagger-5">       <!-- 0.5s delay -->
```

---

## Component Patterns

### Card Structure
```html
<div class="card">
  <div class="card-header">
    <h2 class="card-title">Title</h2>
  </div>
  <div class="card-body">
    Content here
  </div>
</div>
```

### Button Variants
```html
<!-- Primary CTA -->
<button class="btn btn-primary ripple glow">
  Click Me
</button>

<!-- Secondary Action -->
<button class="btn btn-secondary">
  Cancel
</button>

<!-- Danger Action -->
<button class="btn btn-danger">
  Delete
</button>
```

### Form Input
```html
<div class="form-group">
  <label class="form-label">Label</label>
  <input type="text" class="form-control" placeholder="Enter value">
</div>
```

### Badge
```html
<span class="badge badge-success">Active</span>
<span class="badge badge-warning">Pending</span>
<span class="badge badge-danger">Error</span>
<span class="badge badge-primary">New</span>
```

### Alert
```html
<div class="alert alert-success">
  <svg><!-- icon --></svg>
  Success message
</div>
```

### Chip/Tag
```html
<span class="chip">
  Tag Name
  <button class="chip-remove">×</button>
</span>
```

---

## Icon System

### Icon Sizes
```
Small:  16px × 16px (Inline with text)
Medium: 24px × 24px (Buttons)
Large:  32px × 32px (Feature icons)
XLarge: 48px × 48px (Stat cards)
```

### SVG Icon Template
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
  <path d="..." stroke-width="2" stroke-linecap="round"/>
</svg>
```

### Icon Colors
- Use `currentColor` for stroke
- Inherits text color automatically
- Override with inline styles when needed

---

## Grid System

### Grid Layouts
```css
/* 4-column grid (desktop) */
.grid-cols-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

/* 2-column grid */
.grid-cols-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

/* Responsive */
@media (max-width: 768px) {
  .grid-cols-4 { grid-template-columns: 1fr; }
  .grid-cols-2 { grid-template-columns: 1fr; }
}
```

---

## Loading States

### Spinner
```html
<div class="loading-container">
  <div class="spinner"></div>
</div>
```

### Skeleton
```html
<div class="skeleton skeleton-title"></div>
<div class="skeleton skeleton-text"></div>
<div class="skeleton skeleton-avatar"></div>
```

---

## Hover Effects Reference

### Card Hover
- translateY(-4px)
- Enhanced shadow
- Border color → Primary
- Gradient sweep animation

### Button Hover
- translateY(-2px)
- Large shadow
- Scale slightly (optional)

### Table Row Hover
- translateX(4px)
- Left gradient border (0 → 100% height)
- Background darken

### Input Focus
- Border → Primary color
- 3px focus ring
- 20px glow
- translateY(-2px)

---

## Accessibility

### Focus Indicators
All interactive elements have visible focus states:
- 3px solid outline
- High contrast colors
- Never remove outlines

### Color Contrast
- Text on dark: AAA rating (≥7:1)
- UI elements: AA rating (≥4.5:1)

### Animations
- Respect `prefers-reduced-motion`
- Avoid flashing/strobing
- Keep durations reasonable

---

## Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 768px) {
  /* Simplified layouts */
  /* Larger touch targets (44px min) */
  /* Reduced animations */
}

/* Tablet */
@media (min-width: 769px) and (max-width: 1024px) {
  /* 2-column grids */
  /* Moderate spacing */
}

/* Desktop */
@media (min-width: 1025px) {
  /* Full effects */
  /* Multi-column layouts */
}
```

---

## Best Practices

### DO ✅
- Use utility classes for animations
- Combine animations for effect (e.g., `fade-in-up stagger-2`)
- Add stagger delays to lists
- Use gradient text for important numbers
- Apply ripple to primary CTAs
- Use skeleton loaders for slow data

### DON'T ❌
- Animate all elements at once
- Use too many continuous animations
- Forget hover states
- Ignore loading states
- Use animations without purpose
- Overuse bright colors

---

## Quick Reference

### Most Used Classes
```
.card              - Container for content
.btn btn-primary   - Primary action button
.fade-in           - Page entrance
.scale-in          - Pop-in effect
.gradient-text     - Important numbers
.pulse             - Draw attention
.ripple            - Button feedback
.glow              - CTA emphasis
.skeleton          - Loading state
.badge             - Status indicator
```

---

**Style Guide Version:** 1.0  
**Date:** 2024  
**Framework:** Angular 17 + Custom CSS
