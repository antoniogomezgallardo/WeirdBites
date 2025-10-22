# WeirdBites - Deployment Increment 1 Wireframes

**Version**: 1.1.0
**Date**: 2025-10-22
**Purpose**: Visual mockups for Deployment Increment 1 (Browse Products)
**User Stories Split**: US-001, US-002, US-003

---

## Overview

This document contains wireframes for Deployment Increment 1, which is composed of vertical slices derived by splitting user stories US-001, US-002, and US-003. These wireframes serve as visual specifications for implementation and help ensure alignment with user experience goals.

**Stories Split into Vertical Slices**:

- **US-001**: Browse all products → Split into vertical slices for product listing
- **US-002**: View product details → Split into vertical slices for product detail view
- **US-003**: View product images → Split into vertical slices for image gallery

**Design Principles**:

- Clean, modern e-commerce aesthetic
- Mobile-first responsive design
- WCAG 2.1 AA accessibility compliance
- Performance-optimized (LCP <2.5s)

---

## 1. US-001: Product Listing Page

### 1.1 Desktop View (1280px+)

```
┌────────────────────────────────────────────────────────────────────────┐
│                         WeirdBites Logo                    🔍 Search    │
│                                                            🛒 Cart (0)  │
├────────────────────────────────────────────────────────────────────────┤
│  Home  |  Products  |  About  |  Contact                   Login       │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Weird Snacks from Around the World                                    │
│  Discover unusual treats and exotic flavors                            │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ Filter & Sort                                                    │  │
│  │ ☐ Japan  ☐ Korea  ☐ Thailand  ☐ Europe  ☐ Other               │  │
│  │ Sort by: [Price: Low to High ▼]                                 │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  Showing 12 products                                                   │
│                                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │          │  │          │  │          │  │          │             │
│  │  Image   │  │  Image   │  │  Image   │  │  Image   │             │
│  │          │  │          │  │          │  │          │             │
│  ├──────────┤  ├──────────┤  ├──────────┤  ├──────────┤             │
│  │Wasabi    │  │Durian    │  │Marmite   │  │Salmiakki │             │
│  │Kit Kat   │  │Candy     │  │Chocolate │  │Licorice  │             │
│  │          │  │          │  │          │  │          │             │
│  │$4.99     │  │$3.49     │  │$5.99     │  │$6.49     │             │
│  │⭐⭐⭐⭐⭐ (24)│  │⭐⭐⭐☆☆ (12)│  │⭐⭐⭐⭐☆ (8) │  │⭐⭐☆☆☆ (5) │             │
│  │          │  │          │  │          │  │          │             │
│  │[View]    │  │[View]    │  │[View]    │  │[View]    │             │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘             │
│                                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │          │  │          │  │          │  │          │             │
│  │  Image   │  │  Image   │  │  Image   │  │  Image   │             │
│  │          │  │          │  │          │  │          │             │
│  ├──────────┤  ├──────────┤  ├──────────┤  ├──────────┤             │
│  │Century   │  │Casu      │  │Bird's    │  │Hákarl    │             │
│  │Egg       │  │Marzu     │  │Nest Soup │  │(Shark)   │             │
│  │          │  │          │  │          │  │          │             │
│  │$8.99     │  │$24.99    │  │$15.99    │  │$12.99    │             │
│  │⭐⭐⭐⭐☆ (15)│  │⭐⭐⭐⭐⭐ (3) │  │⭐⭐⭐⭐⭐ (7) │  │⭐⭐☆☆☆ (9) │             │
│  │          │  │          │  │          │  │          │             │
│  │[View]    │  │[View]    │  │[View]    │  │[View]    │             │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘             │
│                                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │          │  │          │  │          │  │          │             │
│  │  Image   │  │  Image   │  │  Image   │  │  Image   │             │
│  │          │  │          │  │          │  │          │             │
│  ├──────────┤  ├──────────┤  ├──────────┤  ├──────────┤             │
│  │Escamoles │  │Natto     │  │Lutefisk  │  │Balut     │             │
│  │(Ant Eggs)│  │          │  │          │  │          │             │
│  │          │  │          │  │          │  │          │             │
│  │$18.99    │  │$7.49     │  │$9.99     │  │$11.99    │             │
│  │⭐⭐⭐☆☆ (6) │  │⭐⭐⭐⭐☆ (18)│  │⭐⭐⭐☆☆ (11)│  │⭐⭐⭐⭐☆ (4) │             │
│  │          │  │          │  │          │  │          │             │
│  │[View]    │  │[View]    │  │[View]    │  │[View]    │             │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘             │
│                                                                         │
│  ─────────────────────────────────────────────────────────────────    │
│  Pages: [< Previous]  [1] 2  3  4  [Next >]                           │
│                                                                         │
├────────────────────────────────────────────────────────────────────────┤
│  Footer: About | Contact | Terms | Privacy | © 2025 WeirdBites        │
└────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Mobile View (375px)

```
┌─────────────────────────┐
│   ☰  WeirdBites  🛒(0) │
├─────────────────────────┤
│                         │
│  Weird Snacks from      │
│  Around the World       │
│                         │
│  🔍 Search...           │
│                         │
│  Filter: [All ▼]        │
│  Sort: [Featured ▼]     │
│                         │
│  Showing 12 products    │
│                         │
│  ┌─────────────────┐   │
│  │                 │   │
│  │     Image       │   │
│  │                 │   │
│  ├─────────────────┤   │
│  │ Wasabi Kit Kat  │   │
│  │ $4.99           │   │
│  │ ⭐⭐⭐⭐⭐ (24)     │   │
│  │ [View Details]  │   │
│  └─────────────────┘   │
│                         │
│  ┌─────────────────┐   │
│  │                 │   │
│  │     Image       │   │
│  │                 │   │
│  ├─────────────────┤   │
│  │ Durian Candy    │   │
│  │ $3.49           │   │
│  │ ⭐⭐⭐☆☆ (12)     │   │
│  │ [View Details]  │   │
│  └─────────────────┘   │
│                         │
│  ┌─────────────────┐   │
│  │                 │   │
│  │     Image       │   │
│  │                 │   │
│  ├─────────────────┤   │
│  │ Marmite Choc    │   │
│  │ $5.99           │   │
│  │ ⭐⭐⭐⭐☆ (8)      │   │
│  │ [View Details]  │   │
│  └─────────────────┘   │
│                         │
│  [Load More...]         │
│                         │
├─────────────────────────┤
│  About | Contact        │
│  © 2025 WeirdBites      │
└─────────────────────────┘
```

### 1.3 Key Elements

**Header**:

- Logo (clickable, returns to home)
- Search bar (collapsed on mobile, expand on tap)
- Cart icon with item count
- Navigation menu (hamburger on mobile)

**Filter & Sort**:

- Country/region checkboxes (expandable on mobile)
- Sort dropdown: Featured, Price (Low-High), Price (High-Low), Rating, Name

**Product Card**:

- Product image (aspect ratio 1:1, 300x300px desktop, 200x200px mobile)
- Product name (truncated to 2 lines)
- Price (prominent, $X.XX format)
- Rating (stars + review count)
- "View Details" button (primary CTA)

**Grid Layout**:

- Desktop: 4 columns (1fr 1fr 1fr 1fr)
- Tablet: 3 columns
- Mobile: 1 column (full width cards)

**Pagination**:

- Desktop: Previous/Next + numbered pages
- Mobile: "Load More" infinite scroll

### 1.4 Accessibility Features

- Semantic HTML (`<main>`, `<nav>`, `<article>`)
- ARIA labels for all interactive elements
- Keyboard navigation (Tab through products, Enter to select)
- Focus indicators (visible outline on focus)
- Alt text for all product images
- Screen reader announcements for filter/sort changes
- Color contrast ratio ≥4.5:1 (WCAG AA)

### 1.5 Performance Optimizations

- Lazy load images (only load when in viewport)
- Use Next.js Image component (automatic optimization)
- CSS Grid for layout (no heavy JS libraries)
- Pagination (12 products per page, avoid loading all at once)
- Preload above-the-fold images
- Use WebP format with JPEG fallback

---

## 2. US-002: Product Detail Page

### 2.1 Desktop View (1280px+)

```
┌────────────────────────────────────────────────────────────────────────┐
│                         WeirdBites Logo                    🔍 Search    │
│                                                            🛒 Cart (0)  │
├────────────────────────────────────────────────────────────────────────┤
│  Home  |  Products  |  About  |  Contact                   Login       │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Home > Products > Wasabi Kit Kat                                      │
│                                                                         │
│  ┌─────────────────────────────┐  ┌──────────────────────────────┐   │
│  │                             │  │ Wasabi Kit Kat               │   │
│  │                             │  │ Nestle Japan                 │   │
│  │                             │  │                              │   │
│  │        Main Product         │  │ $4.99                        │   │
│  │           Image             │  │                              │   │
│  │        (600x600px)          │  │ ⭐⭐⭐⭐⭐ 4.8/5 (24 reviews)   │   │
│  │                             │  │                              │   │
│  │                             │  │ In Stock ✓                   │   │
│  │                             │  │                              │   │
│  │                             │  │ Description:                 │   │
│  │                             │  │ Experience the unique fusion │   │
│  │                             │  │ of sweet chocolate and spicy │   │
│  │  [Thumbnail 1]              │  │ wasabi in this iconic        │   │
│  │  [Thumbnail 2]              │  │ Japanese Kit Kat flavor.     │   │
│  │  [Thumbnail 3]              │  │ A limited edition treat from │   │
│  │  [Thumbnail 4]              │  │ Nestle Japan that combines   │   │
│  │                             │  │ crispy wafer with a wasabi   │   │
│  └─────────────────────────────┘  │ kick. Perfect for adventurous│   │
│                                    │ snack lovers!                │   │
│                                    │                              │   │
│                                    │ Quantity: [- 1 +]            │   │
│                                    │                              │   │
│                                    │ [Add to Cart] 🛒             │   │
│                                    │                              │   │
│                                    │ Details:                     │   │
│                                    │ • Weight: 45g                │   │
│                                    │ • Origin: Japan              │   │
│                                    │ • Allergens: Milk, Soy, Wheat│   │
│                                    │ • Best Before: 6 months      │   │
│                                    │                              │   │
│                                    │ Shipping:                    │   │
│                                    │ • Free shipping over $25     │   │
│                                    │ • Estimated delivery: 3-5 days│  │
│                                    └──────────────────────────────┘   │
│                                                                         │
│  ─────────────────────────────────────────────────────────────────    │
│                                                                         │
│  Customer Reviews (24)                                  [Write Review]  │
│                                                                         │
│  ⭐⭐⭐⭐⭐  Sarah T. - October 2025                                      │
│  "Amazing flavor combination! The wasabi kick is just right."          │
│  Helpful: 👍 12  👎 2                                                   │
│                                                                         │
│  ⭐⭐⭐⭐⭐  Marcus L. - September 2025                                   │
│  "Best weird snack I've tried. Will definitely order again!"           │
│  Helpful: 👍 8  👎 0                                                    │
│                                                                         │
│  ⭐⭐⭐⭐☆  Emma R. - September 2025                                     │
│  "Good but a bit too spicy for me. Still worth trying!"                │
│  Helpful: 👍 5  👎 1                                                    │
│                                                                         │
│  [Load More Reviews...]                                                │
│                                                                         │
│  ─────────────────────────────────────────────────────────────────    │
│                                                                         │
│  You May Also Like                                                     │
│                                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │  Image   │  │  Image   │  │  Image   │  │  Image   │             │
│  │          │  │          │  │          │  │          │             │
│  │Green Tea │  │Sakura    │  │Matcha    │  │Yuzu      │             │
│  │Kit Kat   │  │Kit Kat   │  │Pocky     │  │Gummies   │             │
│  │$4.99     │  │$5.49     │  │$3.99     │  │$4.49     │             │
│  │[View]    │  │[View]    │  │[View]    │  │[View]    │             │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘             │
│                                                                         │
├────────────────────────────────────────────────────────────────────────┤
│  Footer: About | Contact | Terms | Privacy | © 2025 WeirdBites        │
└────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Mobile View (375px)

```
┌─────────────────────────┐
│   ☰  WeirdBites  🛒(0) │
├─────────────────────────┤
│  Home > Wasabi Kit Kat  │
│                         │
│  ┌─────────────────┐   │
│  │                 │   │
│  │                 │   │
│  │   Main Image    │   │
│  │   (Swipeable)   │   │
│  │                 │   │
│  │                 │   │
│  └─────────────────┘   │
│  ● ○ ○ ○ (indicators) │
│                         │
│  Wasabi Kit Kat         │
│  Nestle Japan           │
│                         │
│  $4.99                  │
│  ⭐⭐⭐⭐⭐ 4.8 (24)       │
│                         │
│  In Stock ✓             │
│                         │
│  Description:           │
│  Experience the unique  │
│  fusion of sweet        │
│  chocolate and spicy    │
│  wasabi in this iconic  │
│  Japanese Kit Kat...    │
│  [Read More]            │
│                         │
│  Quantity: [- 1 +]      │
│                         │
│  [Add to Cart] 🛒       │
│                         │
│  ───────────────────    │
│                         │
│  Details ▼              │
│  • Weight: 45g          │
│  • Origin: Japan        │
│  • Allergens: Milk, Soy │
│                         │
│  Shipping ▼             │
│  • Free over $25        │
│  • Delivery: 3-5 days   │
│                         │
│  Reviews (24) ▼         │
│  ⭐⭐⭐⭐⭐ Sarah T.       │
│  "Amazing flavor..."    │
│  [Read More]            │
│                         │
│  You May Also Like ▼    │
│  ┌─────────────────┐   │
│  │  Image  │ Image │   │
│  │ Green Tea│Sakura│   │
│  │ $4.99   │$5.49 │   │
│  └─────────────────┘   │
│                         │
├─────────────────────────┤
│  About | Contact        │
│  © 2025 WeirdBites      │
└─────────────────────────┘
```

### 2.3 Key Elements

**Breadcrumb Navigation**:

- Home > Products > [Product Name]
- Clickable links for navigation
- Mobile: Truncate middle items if needed

**Product Image Gallery**:

- Main image (large, 600x600px desktop)
- Thumbnail strip (4 thumbnails below main image)
- Click thumbnail to change main image
- Mobile: Swipe gallery with dot indicators
- Zoom on hover (desktop), pinch-to-zoom (mobile)

**Product Information**:

- Product name (H1)
- Brand/manufacturer
- Price (prominent, large font)
- Rating (stars + average + count)
- Stock status (In Stock / Out of Stock / Low Stock)
- Description (2-3 paragraphs, expandable on mobile)

**Quantity Selector**:

- Minus button (disabled at 1)
- Number input (min: 1, max: 99)
- Plus button
- Keyboard accessible (arrow keys)

**Add to Cart Button**:

- Primary CTA (high contrast)
- Loading state during cart update
- Success feedback (cart icon animation, count update)

**Accordion Sections** (Desktop: always open, Mobile: collapsible):

- Details (weight, origin, allergens, expiry)
- Shipping (cost, delivery time)
- Reviews (expandable list)
- You May Also Like (related products)

### 2.4 Interaction States

**Add to Cart Success**:

```
┌─────────────────────────────────┐
│  ✓ Added to Cart!               │
│  Wasabi Kit Kat x1              │
│  [View Cart] [Continue Shopping]│
└─────────────────────────────────┘
```

**Out of Stock**:

```
Product Information (grayed out)
Stock status: ❌ Out of Stock
[Notify Me When Available]
```

**Image Zoom (Desktop Hover)**:

```
Cursor over image → Show magnified view (2x zoom)
Use cursor position to pan around zoomed area
```

### 2.5 Accessibility Features

- Breadcrumb navigation with `aria-label="Breadcrumb"`
- Image gallery with arrow key navigation
- `alt` text for all images ("Wasabi Kit Kat product image 1 of 4")
- Quantity input with `aria-label="Product quantity"`
- Add to Cart with loading state announcement
- Skip links for screen readers
- Focus trap in modal dialogs (if zoom opens modal)
- ARIA live region for cart updates

### 2.6 Performance Optimizations

- Lazy load "You May Also Like" images
- Preload main product image (priority)
- Lazy load review images
- Defer non-critical JS (reviews, recommendations)
- Use Next.js Image with blur placeholder
- Client-side routing (no full page reload on navigation)

---

## 3. US-003: Product Image Gallery

### 3.1 Desktop View - Image Zoom Modal

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                    [X]  │
│                                                                         │
│                                                                         │
│          ┌───────────────────────────────────────────────┐            │
│          │                                                │            │
│          │                                                │            │
│          │                                                │            │
│    [<]   │          Zoomed Product Image                 │   [>]      │
│          │           (1200x1200px)                        │            │
│          │                                                │            │
│          │         Hover to pan, scroll to zoom          │            │
│          │                                                │            │
│          │                                                │            │
│          └───────────────────────────────────────────────┘            │
│                                                                         │
│              [Thumb1]  [Thumb2]  [Thumb3]  [Thumb4]                    │
│                  ●         ○         ○         ○                        │
│                                                                         │
│                      Image 1 of 4                                      │
│                                                                         │
└────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Mobile View - Fullscreen Gallery

```
┌─────────────────────────┐
│                     [X] │
│                         │
│                         │
│                         │
│                         │
│     Product Image       │
│   (Pinch to Zoom)       │
│   (Swipe Left/Right)    │
│                         │
│                         │
│                         │
│                         │
│                         │
│    ● ○ ○ ○              │
│    Image 1 of 4         │
│                         │
└─────────────────────────┘
```

### 3.3 Gallery Features

**Desktop**:

- Click main image → Open fullscreen modal
- Hover over zoomed image → Pan to follow cursor
- Scroll wheel → Zoom in/out (1x to 4x)
- Arrow keys / Click arrows → Navigate images
- Click thumbnails → Jump to specific image
- ESC key → Close modal

**Mobile**:

- Tap main image → Open fullscreen view
- Swipe left/right → Navigate images
- Pinch gesture → Zoom in/out
- Double tap → Quick zoom to 2x
- Swipe down → Close fullscreen

**Image Loading**:

- Progressive JPEG (shows blurred preview while loading)
- Lazy load thumbnails
- Preload next/previous images when gallery opens
- Loading spinner for slow connections

### 3.4 Image Gallery Controls

**Thumbnail Strip**:

```
[Img1*] [Img2] [Img3] [Img4]
  ●      ○      ○      ○
```

- Active thumbnail has border/highlight
- Keyboard accessible (Tab + Enter)
- Touch-friendly (48x48px minimum)

**Zoom Controls** (Desktop):

```
[−] 100% [+]
```

- Zoom out button
- Zoom percentage indicator
- Zoom in button
- Keyboard: `+` / `-` keys

**Navigation Arrows**:

```
[< Previous]        [Next >]
```

- Large, high-contrast arrows
- Disabled when at first/last image
- Keyboard: Arrow keys

### 3.5 Accessibility Features

- Gallery modal with `role="dialog"` and `aria-modal="true"`
- Focus trap within modal (Tab cycles through controls)
- ESC key closes modal
- Arrow key navigation announced to screen readers
- Image count announced ("Image 1 of 4")
- Zoom level announced ("Zoomed to 200%")
- High contrast controls (4.5:1 ratio)
- Close button clearly labeled ("Close image gallery")

### 3.6 Performance Considerations

- Use Next.js Image with `priority` for main image
- Lazy load all other images
- Use `sizes` attribute for responsive images
- Serve WebP with JPEG fallback
- Optimize image dimensions (no larger than needed)
- Use blur placeholder while loading

---

## 4. Responsive Breakpoints

### 4.1 Breakpoints Definition

```css
/* Mobile First Approach */
--mobile: 375px; /* Small phones */
--mobile-lg: 425px; /* Large phones */
--tablet: 768px; /* Tablets */
--desktop: 1024px; /* Small desktop */
--desktop-lg: 1280px; /* Large desktop */
--desktop-xl: 1536px; /* Extra large desktop */
```

### 4.2 Grid Changes by Breakpoint

**Product Listing Grid**:

- `< 768px`: 1 column (full width cards)
- `768px - 1024px`: 2 columns
- `1024px - 1280px`: 3 columns
- `>= 1280px`: 4 columns

**Product Detail Layout**:

- `< 768px`: Stacked (image above, info below)
- `>= 768px`: Side-by-side (60% image, 40% info)

**Navigation**:

- `< 768px`: Hamburger menu
- `>= 768px`: Full horizontal navigation

---

## 5. Component Specifications

### 5.1 Product Card Component

```typescript
interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
}
```

**Dimensions**:

- Desktop: 280px × 400px
- Tablet: 240px × 360px
- Mobile: Full width × 320px

**Elements**:

- Image container (1:1 aspect ratio)
- Product name (2 line truncation)
- Price (bold, large)
- Rating stars + count
- "View Details" button

### 5.2 Image Gallery Component

```typescript
interface ImageGalleryProps {
  images: string[]; // Array of image URLs
  altTexts: string[]; // Array of alt texts
  activeIndex: number; // Currently displayed image
  onImageChange: (index: number) => void;
}
```

**Features**:

- Thumbnail navigation
- Arrow navigation
- Keyboard navigation
- Zoom functionality
- Swipe gesture support (mobile)

### 5.3 Quantity Selector Component

```typescript
interface QuantitySelectorProps {
  value: number;
  min: number;
  max: number;
  onChange: (quantity: number) => void;
}
```

**Behavior**:

- Decrement button disabled at `min`
- Increment button disabled at `max`
- Manual input allowed (validated on blur)
- Arrow keys increment/decrement

---

## 6. Color Palette & Typography

### 6.1 Color Scheme

```css
/* Primary Colors */
--primary: #ff6b35; /* Vibrant Orange (CTA buttons) */
--primary-dark: #e55a2b; /* Hover state */
--primary-light: #ff8558; /* Focus state */

/* Secondary Colors */
--secondary: #004e89; /* Deep Blue (links, accents) */
--secondary-dark: #003d6b;
--secondary-light: #1a6aa8;

/* Neutrals */
--gray-900: #1a1a1a; /* Primary text */
--gray-700: #4a4a4a; /* Secondary text */
--gray-500: #808080; /* Disabled text */
--gray-300: #d1d1d1; /* Borders */
--gray-100: #f5f5f5; /* Backgrounds */
--white: #ffffff;

/* Semantic Colors */
--success: #28a745; /* In stock, success messages */
--warning: #ffc107; /* Low stock warnings */
--error: #dc3545; /* Out of stock, errors */
--info: #17a2b8; /* Info messages */
```

### 6.2 Typography

```css
/* Font Families */
--font-heading: 'Poppins', sans-serif;
--font-body: 'Inter', sans-serif;

/* Font Sizes (Fluid Typography) */
--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem); /* 12-14px */
--text-sm: clamp(0.875rem, 0.825rem + 0.25vw, 1rem); /* 14-16px */
--text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem); /* 16-18px */
--text-lg: clamp(1.125rem, 1.05rem + 0.375vw, 1.25rem); /* 18-20px */
--text-xl: clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem); /* 20-24px */
--text-2xl: clamp(1.5rem, 1.35rem + 0.75vw, 2rem); /* 24-32px */
--text-3xl: clamp(2rem, 1.75rem + 1.25vw, 3rem); /* 32-48px */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### 6.3 Text Styles

**Headings**:

- H1: `--text-3xl`, `--font-bold`, `--font-heading`
- H2: `--text-2xl`, `--font-semibold`, `--font-heading`
- H3: `--text-xl`, `--font-semibold`, `--font-heading`

**Body Text**:

- Regular: `--text-base`, `--font-normal`, `--font-body`
- Small: `--text-sm`, `--font-normal`, `--font-body`

**UI Elements**:

- Buttons: `--text-base`, `--font-semibold`, `--font-body`
- Labels: `--text-sm`, `--font-medium`, `--font-body`

---

## 7. Implementation Notes

### 7.1 Technology Stack

**Framework**: Next.js 14+ (App Router)
**Styling**: Tailwind CSS
**Components**: React 18+
**Images**: Next.js Image component
**State**: React Context / Zustand (cart state)
**Forms**: React Hook Form
**Validation**: Zod

### 7.2 Key Files

```
src/
├── app/
│   ├── page.tsx                    // Home page
│   ├── products/
│   │   ├── page.tsx                // Product listing (US-001)
│   │   └── [id]/
│   │       └── page.tsx            // Product detail (US-002, US-003)
├── components/
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   ├── ImageGallery.tsx
│   ├── QuantitySelector.tsx
│   └── FilterSort.tsx
└── lib/
    ├── types.ts                    // TypeScript interfaces
    └── api.ts                      // API calls
```

### 7.3 Data Fetching

**Product Listing** (US-001):

```typescript
// Server Component (SSR)
async function getProducts() {
  const res = await fetch('/api/products');
  return res.json();
}
```

**Product Detail** (US-002):

```typescript
// Server Component (SSR) with ISR
async function getProduct(id: number) {
  const res = await fetch(`/api/products/${id}`, {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  return res.json();
}
```

### 7.4 Testing Checklist

- [ ] Product listing displays 12 products
- [ ] Grid layout responsive (1/2/3/4 columns)
- [ ] Filter and sort work correctly
- [ ] Product card navigation works (keyboard + mouse)
- [ ] Product detail page loads correct data
- [ ] Image gallery navigation works (arrows, thumbnails, keyboard)
- [ ] Quantity selector increments/decrements correctly
- [ ] Add to Cart updates cart count
- [ ] Breadcrumb navigation works
- [ ] Mobile swipe gestures work
- [ ] Image zoom works (desktop hover, mobile pinch)
- [ ] All WCAG 2.1 AA criteria met (axe-core passing)
- [ ] Lighthouse score >90
- [ ] LCP <2.5s

---

## 8. Document Control

**Version History**:

| Version | Date       | Author                 | Changes                        |
| ------- | ---------- | ---------------------- | ------------------------------ |
| 1.0.0   | 2025-10-19 | Antonio Gomez Gallardo | Initial wireframes for Slice 1 |

**Next Review**: After Slice 1 implementation (validate against actual UI)

**Related Documents**:

- [Product Backlog](../5.product-backlog.md) - User stories US-001, US-002, US-003
- [Non-Functional Requirements](../4.non-functional-requirements.md) - Performance, accessibility targets
- [Vertical Slices](../6.vertical-slices.md) - Slice 1 technical details

---

_Wireframes created for Slice 1: Browse Products feature set, ensuring alignment with user experience goals and technical requirements._
