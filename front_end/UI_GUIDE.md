# 🎨 MicroCommerce Suite - UI Component Guide

## Application Screens

### 1. Dashboard (/)
**Purpose**: Overview of business metrics
**Components**:
- 4 Statistics Cards (Customers, Products, Revenue, Bills)
- Recent Bills Section
- Low Stock Alerts Section

**Colors**:
- Customer Card: Indigo (#6366f1)
- Product Card: Emerald (#10b981)
- Revenue Card: Amber (#f59e0b)
- Bills Card: Blue (#3b82f6)

---

### 2. Customers (/customers)
**Purpose**: Manage customer database
**Features**:
- Search bar at top
- Add Customer button (top right)
- Table with columns: ID, Name, Email, Actions
- Customer avatars with initials
- Edit and Delete action buttons

**Modal Form**:
- Name field (required, min 2 chars)
- Email field (required, email format)
- Cancel and Save buttons

---

### 3. Products (/products)
**Purpose**: Inventory management
**Features**:
- Search bar
- Add Product button
- Table columns: ID, Name, Price, Quantity, Status, Actions
- Stock status badges:
  - Green: In Stock (≥10)
  - Yellow: Low Stock (<10)
  - Red: Out of Stock (0)

**Modal Form**:
- Product ID (required, unique)
- Name (required)
- Price ($ icon, min 0)
- Quantity (min 0)

---

### 4. Bills (/bills)
**Purpose**: Invoice management
**Features**:
- Create Bill button
- Card-based layout (3 columns on desktop)
- Each card shows:
  - Bill number
  - Customer ID
  - Date
  - Number of items
  - Total amount
  - Delete button
- Click card to view details

**Create Bill Form**:
- Customer selection dropdown
- Multiple product rows:
  - Product dropdown
  - Quantity input
  - Unit price (auto-filled)
  - Item total (calculated)
- Add/Remove product buttons
- Grand Total display

---

### 5. Bill Details (/bills/:id)
**Purpose**: View and print invoice
**Features**:
- Back button
- Print button
- Professional invoice layout:
  - Company info (top left)
  - Invoice number and date (top right)
  - Bill To section
  - Product items table
  - Subtotal, Tax (10%), Total
  - Payment terms
  - Signature line
- White background for printing

---

## Navigation Components

### Top Navbar (Fixed)
**Elements**:
- Logo (left): MicroCommerce Suite with gradient
- Notification icon with badge
- User avatar with name
**Height**: 64px
**Background**: Dark with bottom border

### Sidebar (Fixed)
**Elements**:
- Dashboard icon + label
- Customers icon + label
- Products icon + label
- Bills icon + label (with badge)
**Width**: 260px
**Features**:
- Active route highlight (indigo background)
- Hover effects
- Icon + text layout

---

## Design System

### Spacing Scale
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

### Border Radius
- Small: 4px (badges)
- Medium: 8px (inputs, buttons)
- Large: 12px (cards)
- Full: 50% (avatars)

### Shadows
- Default: `0 4px 6px rgba(0,0,0,0.1)`
- Large: `0 10px 15px rgba(0,0,0,0.3)`

### Animations
- Fade In: 0.4s ease-out
- Slide In: 0.4s ease-out
- Hover transitions: 0.2-0.3s

### Typography
- Headings: 700-800 weight
- Body: 400-600 weight
- Small text: 12-13px
- Body text: 14-16px
- Headings: 18-36px

---

## Responsive Behavior

### Mobile (<768px)
- Sidebar hidden (hamburger menu could be added)
- Single column grids
- Stacked forms
- Smaller font sizes
- Reduced padding

### Tablet (768-1024px)
- 2-column grids
- Compressed sidebar
- Medium spacing

### Desktop (>1024px)
- Full layout
- 3-4 column grids
- Maximum spacing
- All features visible

---

## Interactive Elements

### Buttons
**Primary**: Gradient indigo, white text, lift on hover
**Secondary**: Gradient emerald, white text
**Outline**: Border only, fill on hover
**Danger**: Red, for delete actions
**Icon**: Small, circular, action buttons

### Inputs
- Dark background
- Light border
- Primary color focus state
- Glow effect on focus
- Placeholder text in muted color

### Cards
- Hover: Lift up 4px + stronger shadow
- Clickable cards have arrow indicator
- Smooth transitions

### Modals
- Centered overlay
- Dark semi-transparent background
- Click outside to close
- Slide-in animation
- Large variant for complex forms

### Tables
- Hover row highlight
- Striped alternate rows (optional)
- Action buttons on right
- Overflow scrolling

---

## Icons (SVG)

All icons are inline SVG for:
- Sharp rendering
- Easy color changes
- No external dependencies

Common icons used:
- Home (dashboard)
- Users (customers)
- Package (products)
- File (bills)
- Plus (add)
- Edit (pencil)
- Trash (delete)
- Search (magnifying glass)
- Arrow (navigation)
- Check (success)
- X (close/error)
- Bell (notifications)

---

## Accessibility Features

- Semantic HTML elements
- Proper heading hierarchy
- Alt text for icons (via title attributes)
- Focus states on all interactive elements
- Color contrast meets WCAG AA standards
- Keyboard navigation support
- Screen reader friendly

---

## Performance Optimizations

- Lazy loading (can be added for routes)
- OnPush change detection (can be optimized)
- Minimal dependencies
- CSS variables for theme
- Optimized bundle size
- Tree shaking enabled

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

This design system ensures consistency across all components and provides a professional, modern user experience.
