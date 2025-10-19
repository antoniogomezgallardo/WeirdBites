# WeirdBites - Vertical Slices Implementation Plan

**Version**: 1.0.0
**Date**: 2025-10-19
**Purpose**: Define thin, deployable increments that deliver end-to-end value
**Reference**: Module 01 - Vertical Slicing

---

## 1. What is Vertical Slicing?

**Vertical slicing** is breaking down features into thin, end-to-end increments that cross all architectural layers (UI → API → Database) and deliver working, valuable functionality.

### 1.1 Why Vertical Slices?

**Benefits**:
- ✅ **Faster feedback**: Deploy and validate each slice
- ✅ **Reduced risk**: Spread risk across iterations
- ✅ **Continuous value**: Something useful after each slice
- ✅ **Better estimation**: Small slices are easier to estimate
- ✅ **Early integration**: No "big bang" integration at the end

### 1.2 Vertical vs Horizontal Slicing

```
❌ HORIZONTAL (Anti-Pattern):
Sprint 1: Database schema for all features
Sprint 2: All API endpoints
Sprint 3: All UI components
Sprint 4: Integration (value only here!)

✅ VERTICAL (Best Practice):
Sprint 1: Browse Products (DB + API + UI) → Delivers value!
Sprint 2: Shopping Cart (DB + API + UI) → Delivers value!
Sprint 3: Checkout (DB + API + UI) → Delivers value!
```

---

## 2. WeirdBites Vertical Slices

### Overview

WeirdBites MVP will be built in **7 vertical slices**, each delivering deployable, working functionality.

| Slice | Name | Duration | Story Points | Value Delivered |
|-------|------|----------|--------------|-----------------|
| 1 | Browse Products | 2 weeks | 13 | Product discovery |
| 2 | Shopping Cart | 1 week | 13 | Cart management |
| 3 | Guest Checkout | 2 weeks | 19 | Complete purchase flow |
| 4 | User Accounts | 1 week | 16 | Authentication & profiles |
| 5 | Registered Checkout & History | 1 week | 11 | Enhanced user experience |
| 6 | Search & Reviews | 1 week | 13 | Discovery & social proof |
| 7 | Admin Panel | 2 weeks | 50 | Platform management |

**Total**: 10-12 weeks | 135 story points

---

## 3. Slice 1: Browse Products (Guest) 🍕

**Duration**: 2 weeks
**Story Points**: 13
**Goal**: Users can discover weird snack products

### 3.1 Value Delivered

After Slice 1, users can:
- Visit WeirdBites.com
- Browse product catalog (grid view)
- View product details
- Filter by category
- Experience responsive design (mobile/desktop)

### 3.2 Layers Implemented

**Frontend (Next.js)**:
- Homepage with product grid
- Product detail page
- Category filter component
- Loading states, error handling
- Responsive layout

**Backend (API Routes)**:
- `GET /api/products` - List products (paginated)
- `GET /api/products/:id` - Product details
- `GET /api/categories` - List categories

**Database (PostgreSQL)**:
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  category VARCHAR(100),
  images JSONB, -- array of image URLs
  ingredients TEXT,
  nutrition_facts JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_name ON products(name); -- for search later
```

### 3.3 User Stories Included
- US-001: Browse Product Catalog (5 pts)
- US-002: View Product Details (5 pts)
- US-003: Filter by Category (3 pts)

### 3.4 Testing
- **Unit**: Product card component, filtering logic
- **Integration**: API endpoints return correct data
- **E2E**: Browse products → click product → view details → filter

### 3.5 Acceptance Criteria

**Slice 1 is complete when**:
- [ ] Homepage displays 8-12 products in responsive grid
- [ ] Product detail page shows all product info
- [ ] Category filtering works (updates URL)
- [ ] Pagination or "Load More" functional
- [ ] Loading states implemented
- [ ] Mobile responsive (320px+)
- [ ] Unit tests passing (≥80% coverage)
- [ ] E2E test: Browse flow
- [ ] Lighthouse Performance > 90
- [ ] Deployed to Vercel

### 3.6 Success Metrics
- Page load (LCP) < 2.5s
- No console errors
- Accessible (axe-core clean)
- Can browse on mobile and desktop

---

## 4. Slice 2: Shopping Cart (Guest) 🛒

**Duration**: 1 week
**Story Points**: 13
**Goal**: Users can add products to cart and manage selections

### 4.1 Value Delivered

After Slice 2, users can:
- Add products to cart
- View cart with all items
- Update quantities
- Remove items
- See cart badge count
- Cart persists (24hrs for guests)

### 4.2 Layers Implemented

**Frontend**:
- Add to Cart button with toast notification
- Cart page (/cart)
- Cart badge in header
- Quantity selector (increment/decrement)
- Remove item button

**Backend**:
- `POST /api/cart` - Add item to cart
- `GET /api/cart` - Get cart items
- `PATCH /api/cart/:itemId` - Update quantity
- `DELETE /api/cart/:itemId` - Remove item

**Database**:
```sql
CREATE TABLE cart_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id INTEGER REFERENCES users(id) NULL, -- null for guests
  session_id VARCHAR(255) NOT NULL, -- for guest persistence
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL
);

CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY,
  cart_session_id UUID REFERENCES cart_sessions(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  added_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_cart_session ON cart_items(cart_session_id);
```

### 4.3 User Stories Included
- US-006: Add to Cart (5 pts)
- US-007: View Cart (3 pts)
- US-008: Update Quantity (3 pts)
- US-009: Remove from Cart (2 pts)

### 4.4 Testing
- **Unit**: Cart logic, quantity validation
- **Integration**: Cart API endpoints
- **E2E**: Add to cart → view cart → update quantity → remove

### 4.5 Acceptance Criteria

**Slice 2 is complete when**:
- [ ] Can add products to cart
- [ ] Cart badge shows correct count
- [ ] Cart page displays all items with subtotal
- [ ] Can update quantities
- [ ] Can remove items
- [ ] Guest cart persists 24 hours (localStorage)
- [ ] Stock validation (can't add more than available)
- [ ] Tests passing
- [ ] E2E test: Full cart flow
- [ ] Deployed to Vercel

---

## 5. Slice 3: Guest Checkout 💳

**Duration**: 2 weeks
**Story Points**: 19
**Goal**: Users can complete purchase without account

### 5.1 Value Delivered

After Slice 3, users can:
- Enter shipping information
- Simulate payment (Stripe test mode)
- Receive order confirmation
- See order number and details
- Get simulated confirmation email

**This is the critical MVP slice - the platform becomes a functional e-commerce site!**

### 5.2 Layers Implemented

**Frontend**:
- Checkout page (/checkout)
- Shipping information form
- Payment form (Stripe Elements)
- Order confirmation page
- Form validation UI

**Backend**:
- `POST /api/checkout/shipping` - Save shipping info
- `POST /api/checkout/payment` - Process payment (simulated)
- `POST /api/orders` - Create order
- `GET /api/orders/:orderNumber` - Order status

**Database**:
```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  user_id INTEGER REFERENCES users(id) NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  shipping_address JSONB NOT NULL,
  payment_status VARCHAR(50) DEFAULT 'pending',
  order_status VARCHAR(50) DEFAULT 'pending',
  subtotal DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  product_name VARCHAR(255) NOT NULL,
  product_price DECIMAL(10,2) NOT NULL,
  quantity INTEGER NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL
);

CREATE INDEX idx_orders_email ON orders(customer_email);
CREATE INDEX idx_orders_number ON orders(order_number);
```

### 5.3 User Stories Included
- US-010: Enter Shipping Information (5 pts)
- US-011: Payment Simulation (5 pts)
- US-012: Order Confirmation (3 pts)
- US-013: Form Validation (3 pts)
- US-014: Error Handling (3 pts)

### 5.4 Testing
- **Unit**: Form validation, order calculations
- **Integration**: Order creation API
- **E2E**: Full checkout flow (critical path!)
- **Security**: Input validation, CSRF protection

### 5.5 Acceptance Criteria

**Slice 3 is complete when**:
- [ ] Shipping form validates all fields
- [ ] Stripe test mode integrated
- [ ] Test card 4242... succeeds
- [ ] Test card 4000... fails gracefully
- [ ] Order created in database
- [ ] Stock decreases after order
- [ ] Order confirmation page shows order number
- [ ] Confirmation email sent (simulated)
- [ ] Cart cleared after successful order
- [ ] All tests passing
- [ ] E2E test: Complete checkout flow
- [ ] Security audit (OWASP basics)
- [ ] Deployed to Vercel

---

## 6. Slice 4: User Accounts 👤

**Duration**: 1 week
**Story Points**: 16
**Goal**: Users can create accounts and login

### 6.1 Value Delivered

After Slice 4, users can:
- Register for an account
- Login with email/password
- Logout
- Stay logged in ("Remember me")
- See personalized experience

### 6.2 Layers Implemented

**Frontend**:
- Registration page (/register)
- Login page (/login)
- Logout button in header
- Password strength indicator
- Session-aware UI (show/hide login/logout)

**Backend**:
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Authenticate
- `POST /api/auth/logout` - End session
- `GET /api/auth/me` - Get current user

**Database**:
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
```

### 6.3 User Stories Included
- US-015: User Registration (5 pts)
- US-016: User Login (3 pts)
- US-017: User Logout (1 pt)
- US-018: Password Validation (2 pts)
- US-019: Session Management (3 pts)
- US-020: Remember Me (2 pts)

### 6.4 Testing
- **Unit**: Password hashing, validation
- **Integration**: Auth API endpoints
- **E2E**: Register → login → logout
- **Security**: Password hashing (bcrypt), session security

### 6.5 Acceptance Criteria

**Slice 4 is complete when**:
- [ ] Can register with email/password
- [ ] Password validation enforced (8+ chars, mixed)
- [ ] Passwords hashed with bcrypt
- [ ] Can login with correct credentials
- [ ] Invalid credentials show error
- [ ] Session persists across page refreshes
- [ ] "Remember me" keeps session for 30 days
- [ ] Can logout and session clears
- [ ] Tests passing
- [ ] Security audit (auth vulnerabilities)
- [ ] Deployed to Vercel

---

## 7. Slice 5: Registered Checkout & Order History 📦

**Duration**: 1 week
**Story Points**: 11
**Goal**: Registered users get enhanced experience

### 7.1 Value Delivered

After Slice 5, registered users can:
- Checkout faster (saved info)
- View order history
- See order details
- Track orders (simulated)

### 7.2 Layers Implemented

**Frontend**:
- Pre-filled checkout form (for logged-in users)
- Order history page (/account/orders)
- Order details page (/account/orders/:id)
- "My Account" navigation

**Backend**:
- `GET /api/users/:id/orders` - User's orders
- `GET /api/users/:id/profile` - User profile
- Update order creation to link to user_id

**Database**:
- Link orders to users (user_id column already exists)
- Update cart_sessions to link to user_id

### 7.3 User Stories Included
- US-021: Saved Checkout Info (3 pts)
- US-022: Order History (5 pts)
- US-023: Order Details View (3 pts)

### 7.4 Acceptance Criteria

**Slice 5 is complete when**:
- [ ] Logged-in users see pre-filled checkout
- [ ] Order history shows all past orders
- [ ] Can view order details
- [ ] Orders sorted by date (newest first)
- [ ] Tests passing
- [ ] Deployed to Vercel

---

## 8. Slice 6: Search & Reviews 🔍⭐

**Duration**: 1 week
**Story Points**: 13
**Goal**: Users can find products and read/write reviews

### 8.1 Value Delivered

After Slice 6, users can:
- Search for products by name
- See search results
- Leave product reviews (logged in)
- View reviews and ratings
- See average rating per product

### 8.2 Layers Implemented

**Frontend**:
- Search bar in header
- Search results page (/search)
- Review form on product page
- Reviews display on product page
- Star rating component

**Backend**:
- `GET /api/search?q=query` - Search products
- `POST /api/products/:id/reviews` - Submit review
- `GET /api/products/:id/reviews` - Get reviews

**Database**:
```sql
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_reviews_product ON reviews(product_id);

-- Add to products table
ALTER TABLE products ADD COLUMN average_rating DECIMAL(3,2);
ALTER TABLE products ADD COLUMN review_count INTEGER DEFAULT 0;
```

### 8.3 User Stories Included
- US-024: Product Search (5 pts)
- US-025: Search Results (3 pts)
- US-026: Leave Review (3 pts)
- US-027: View Reviews (2 pts)

### 8.4 Acceptance Criteria

**Slice 6 is complete when**:
- [ ] Search bar functional
- [ ] Search results display correctly
- [ ] Can leave review (logged in only)
- [ ] One review per user per product
- [ ] Reviews display on product page
- [ ] Average rating calculated and displayed
- [ ] Tests passing
- [ ] Deployed to Vercel

---

## 9. Slice 7: Admin Panel 👨‍💼

**Duration**: 2 weeks
**Story Points**: 50
**Goal**: Admin can manage platform

### 9.1 Value Delivered

After Slice 7, admin can:
- Login to admin panel
- Manage products (CRUD)
- Track inventory
- Process orders
- View basic analytics

### 9.2 Layers Implemented

**Frontend**:
- Admin login page (/admin/login)
- Admin dashboard (/admin)
- Products management (/admin/products)
- Orders management (/admin/orders)
- Analytics dashboard

**Backend**:
- Admin authentication (role-based)
- Product CRUD endpoints (admin-only)
- Order management endpoints
- Analytics endpoints

**Database**:
- Add admin role to users
- Admin action logging (optional)

### 9.3 User Stories Included
- US-028 through US-039 (12 stories, 50 points)

### 9.4 Acceptance Criteria

**Slice 7 is complete when**:
- [ ] Admin can login with admin email
- [ ] Admin dashboard shows key metrics
- [ ] Can add/edit/delete products
- [ ] Can upload product images
- [ ] Low stock alerts visible
- [ ] Can view and update orders
- [ ] Tests passing
- [ ] Admin panel accessible only to admin
- [ ] Deployed to Vercel

---

## 10. Deployment Strategy

### 10.1 Per-Slice Deployment

**After each slice**:
1. ✅ All tests pass (unit, integration, E2E)
2. ✅ Code reviewed (self-review + quality checklist)
3. ✅ Security scan clean (npm audit)
4. ✅ Lighthouse score > 90
5. ✅ Deploy to Vercel staging
6. ✅ Smoke test on staging
7. ✅ Deploy to production
8. ✅ Verify in production
9. ✅ Document in CHANGELOG.md

### 10.2 Feature Flags (Optional)

For slices 3+, consider feature flags to deploy behind toggle:
```typescript
// Example
const FEATURE_FLAGS = {
  enableCheckout: process.env.FEATURE_CHECKOUT === 'true',
  enableReviews: process.env.FEATURE_REVIEWS === 'true',
  enableAdminPanel: process.env.FEATURE_ADMIN === 'true',
};
```

**Benefits**:
- Deploy code without exposing feature
- Test in production safely
- Gradual rollout
- Easy rollback

---

## 11. Success Criteria per Slice

### Definition of Done (Per Slice)

A slice is complete when:
- [ ] All user stories in slice meet acceptance criteria
- [ ] All layers implemented (UI, API, DB)
- [ ] Feature works end-to-end
- [ ] Unit tests ≥80% coverage (new code)
- [ ] Integration tests passing
- [ ] E2E test for critical path
- [ ] No ESLint/TypeScript errors
- [ ] Lighthouse Performance > 90
- [ ] Accessibility (axe-core clean)
- [ ] Security scan clean
- [ ] Code reviewed
- [ ] Documentation updated
- [ ] Deployed to production
- [ ] Smoke tested in production

---

## 12. Risk Mitigation

### Per-Slice Risks

**Slice 1**: Learning Next.js App Router
- Mitigation: Tutorials, documentation, simple implementation first

**Slice 2**: Cart persistence strategy
- Mitigation: Start with localStorage, can upgrade to DB later

**Slice 3**: Stripe integration complexity
- Mitigation: Use test mode, follow official docs, limit to basic flow

**Slice 4**: Authentication security
- Mitigation: Use established patterns (NextAuth.js or bcrypt + JWT)

**Slice 5**: Order-user linking
- Mitigation: Simple foreign key, no complex logic

**Slice 6**: Search performance
- Mitigation: Basic SQL LIKE, can upgrade to full-text later

**Slice 7**: Admin complexity
- Mitigation: Break into sub-slices if needed

---

## 13. Progress Tracking

### Slice Completion Log

| Slice | Start Date | End Date | Actual Points | Velocity | Status |
|-------|-----------|----------|---------------|----------|--------|
| 1 | TBD | TBD | TBD | TBD | Not Started |
| 2 | TBD | TBD | TBD | TBD | Not Started |
| 3 | TBD | TBD | TBD | TBD | Not Started |
| 4 | TBD | TBD | TBD | TBD | Not Started |
| 5 | TBD | TBD | TBD | TBD | Not Started |
| 6 | TBD | TBD | TBD | TBD | Not Started |
| 7 | TBD | TBD | TBD | TBD | Not Started |

*Update as slices complete*

---

## 14. Retrospective per Slice

After each slice, reflect:
- What went well?
- What could be improved?
- What did we learn?
- Any blockers?
- Adjust estimates for next slice?

---

## Document Control

**Version History**:

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2025-10-19 | Antonio Gomez Gallardo | Initial vertical slices plan |

**Next Review**: After Slice 1 completion

---

*This vertical slicing plan follows Module 01: Vertical Slicing from the quality-standards documentation. Each slice is thin, end-to-end, valuable, and independently deployable.*
