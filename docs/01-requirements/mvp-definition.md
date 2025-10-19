# WeirdBites - MVP Definition

**Version**: 1.0.0
**Date**: 2025-10-19
**Status**: Approved
**Target Release**: Q4 2025 (flexible, learning-focused)

---

## 1. What is the MVP?

### 1.1 MVP Vision
The **Minimum Viable Product (MVP)** for WeirdBites is the simplest version of the platform that delivers core e-commerce functionality while demonstrating professional SDLC/STLC practices. The MVP enables customers to discover, purchase, and review weird snacks, and allows admins to manage products, inventory, and orders.

### 1.2 MVP Purpose
**Educational Goals**:
- Demonstrate complete requirements engineering (Module 01)
- Implement test pyramid with >80% coverage (Module 04-05)
- Build CI/CD pipeline with quality gates (Module 08)
- Apply WCAG 2.1 accessibility standards (Module 06)
- Practice vertical slicing and iterative delivery (Module 01)
- Showcase TDD/BDD practices (Module 07)

**Functional Goals**:
- Operational e-commerce platform
- Complete customer shopping flow
- Complete admin management flow
- Simulated payment and shipping

### 1.3 MVP Success Criteria
The MVP is considered successful when:
- ✅ All "Must Have" features are implemented and tested
- ✅ All user stories meet Definition of Done
- ✅ Code coverage >80%
- ✅ Lighthouse score >90 (Performance, Accessibility, Best Practices, SEO)
- ✅ WCAG 2.1 Level AA compliant
- ✅ Zero critical/high security vulnerabilities
- ✅ CI/CD pipeline deployed and operational
- ✅ Platform deployed to production (Vercel)
- ✅ DORA metrics tracking active
- ✅ All documentation complete

---

## 2. Scope Definition (MoSCoW)

### 2.1 MUST HAVE (MVP Required)

#### 2.1.1 Customer Features

**Epic 1: Product Discovery**
- [x] **Browse product catalog**
  - Grid view of products (responsive)
  - Product card showing: image, name, price, brief description
  - Pagination or infinite scroll
  - 8-12 products per page

- [x] **View product details**
  - Multiple product images (1-5)
  - Full description ("What makes this weird?")
  - Price, stock status
  - Customer reviews and ratings
  - Ingredients list
  - Add to cart button (enabled/disabled based on stock)

- [x] **Category filtering**
  - Filter by category (e.g., Spicy, Sweet, Savory, International)
  - Clear filters option
  - Product count per category

**Epic 2: Shopping Cart**
- [x] **Add to cart (guest users)**
  - Add product with quantity selector
  - Cart badge shows item count
  - Confirmation toast notification
  - Cart persists for 24 hours (guest)

- [x] **View cart**
  - List all cart items with: image, name, price, quantity
  - Update quantity (increment/decrement)
  - Remove item
  - See subtotal
  - "Continue Shopping" button
  - "Proceed to Checkout" button

- [x] **Cart validation**
  - Show warning if product stock decreased
  - Auto-adjust quantity if stock insufficient
  - Minimum order validation ($5)

**Epic 3: Checkout (Guest)**
- [x] **Guest checkout flow**
  - Email input (required, validated)
  - Shipping information form:
    - Full name
    - Address line 1
    - Address line 2 (optional)
    - City
    - State/Province
    - ZIP/Postal code
    - Phone number
  - Form validation with clear error messages

- [x] **Payment simulation**
  - Payment form (Stripe test mode or equivalent):
    - Card number
    - Expiry date
    - CVV
    - Billing address (same as shipping checkbox)
  - Test cards:
    - Success: 4242 4242 4242 4242
    - Decline: 4000 0000 0000 0002
  - Payment processing simulation (no real charges)

- [x] **Order confirmation**
  - Order confirmation page with:
    - Order number (e.g., ORD-12345)
    - Order summary (items, quantities, prices)
    - Shipping address
    - Total paid
    - Estimated delivery date (simulated)
  - Order confirmation email (simulated)
  - "View Order Status" link (future: requires tracking by order number)

**Epic 4: User Accounts**
- [x] **User registration**
  - Registration form: email, password, confirm password, name
  - Email validation
  - Password strength validation (min 8 chars, mixed case, number)
  - Duplicate email check
  - Auto-login after registration

- [x] **User login**
  - Login form: email, password
  - "Remember me" checkbox (optional)
  - Error handling (invalid credentials)
  - Session management (JWT or session cookies)
  - Redirect to previous page after login

- [x] **User logout**
  - Logout button in header
  - Clear session
  - Redirect to homepage

**Epic 5: Registered User Checkout**
- [x] **Saved information**
  - Pre-fill shipping info from profile
  - Save new shipping address to profile (checkbox)
  - Faster checkout flow

- [x] **Order history**
  - List of past orders (date, order number, total, status)
  - Click to view order details
  - Order details show: items, quantities, prices, shipping address, status
  - Filter by status (optional)

**Epic 6: Product Search**
- [x] **Search functionality**
  - Search bar in header
  - Search by product name
  - Search results page
  - Show number of results
  - Handle "no results" gracefully

**Epic 7: Product Reviews**
- [x] **Leave review (registered users only)**
  - Star rating (1-5, required)
  - Review text (optional, max 500 chars)
  - One review per product per user
  - Validation and error handling

- [x] **View reviews**
  - Display reviews on product detail page
  - Show average rating
  - Show reviewer name and date
  - Sort by most recent (default)

#### 2.1.2 Admin Features

**Epic 8: Admin Authentication**
- [x] **Admin login**
  - Separate admin login page (`/admin/login`)
  - Admin credentials (email whitelist or role-based)
  - Cannot use customer checkout with admin account
  - Admin session management

**Epic 9: Product Management**
- [x] **View products list (admin)**
  - Table view: name, price, stock, category, status
  - Search products
  - Filter by category
  - Sort by name, price, stock

- [x] **Add new product**
  - Product form:
    - Name (required)
    - Description (required)
    - Price (required, min $0.99, max $999.99)
    - Category (required, dropdown)
    - Stock quantity (required, integer)
    - Images (1-5, required minimum 1)
    - Ingredients (optional)
    - Nutrition facts (optional)
  - Image upload with preview
  - Validation
  - Save and publish immediately

- [x] **Edit product**
  - Load existing product data
  - Update any field
  - Re-upload images
  - Save changes

- [x] **Delete product**
  - Soft delete (mark as inactive)
  - Confirmation dialog
  - Remove from customer-facing catalog

**Epic 10: Inventory Management**
- [x] **Track stock levels**
  - Automatic stock decrease on order
  - Stock level display in product list
  - Low stock alert (≤10 units)

- [x] **Update stock**
  - Quick stock update from product list
  - Bulk stock update (optional)

- [x] **Out of stock handling**
  - Automatically disable "Add to Cart" when stock = 0
  - Show "Out of Stock" badge
  - Admin notification

**Epic 11: Order Management**
- [x] **View orders list**
  - Table view: order number, customer email, date, total, status
  - Filter by status (Pending, Processing, Shipped, Delivered)
  - Search by order number or email
  - Sort by date (newest first default)

- [x] **View order details**
  - Full order information:
    - Order number, date, status
    - Customer: name, email, shipping address
    - Items: name, quantity, price
    - Subtotal, total
    - Payment status (simulated)

- [x] **Update order status**
  - Change status: Pending → Processing → Shipped → Delivered
  - Status change triggers email notification (simulated)
  - Cannot reverse status (one-way flow)
  - Add tracking number (optional, simulated)

**Epic 12: Admin Dashboard**
- [x] **Basic analytics**
  - Total orders (all time)
  - Total revenue (all time)
  - Orders today
  - Revenue today
  - Top 5 selling products
  - Low stock alerts (count)
  - Recent orders (last 10)

#### 2.1.3 Technical Requirements

**Architecture**
- [x] Next.js 14+ (App Router)
- [x] TypeScript (strict mode)
- [x] PostgreSQL database
- [x] RESTful API (Next.js API Routes)
- [x] Responsive design (mobile-first)

**Testing**
- [x] Unit tests (Jest)
  - Business logic
  - Utility functions
  - Components (React Testing Library)
  - Target: 70% of test coverage

- [x] Integration tests
  - API endpoints (Supertest or equivalent)
  - Database operations
  - Target: 20% of test coverage

- [x] E2E tests (Playwright)
  - Critical user journeys:
    1. Browse → Add to Cart → Guest Checkout → Purchase
    2. Register → Login → Browse → Purchase
    3. Admin: Add Product → Update Stock → Process Order
  - Target: 10% of test coverage

- [x] Accessibility tests (axe-core)
  - Automated WCAG 2.1 Level AA checks
  - Key pages: Home, Product Detail, Cart, Checkout, Admin

**CI/CD**
- [x] GitHub Actions pipeline
  - Lint on every commit
  - Tests on every PR
  - Build verification
  - Deploy to Vercel on merge to main

- [x] Quality gates
  - Code coverage >80%
  - No ESLint errors
  - No TypeScript errors
  - No critical security vulnerabilities
  - All tests passing

**Performance**
- [x] Lighthouse score >90
- [x] Core Web Vitals:
  - LCP < 2.5s
  - FCP < 1.5s
  - TTI < 3.5s
- [x] API response time p95 < 500ms

**Security**
- [x] Input validation
- [x] SQL injection prevention (ORM)
- [x] XSS prevention (React)
- [x] CSRF tokens
- [x] Password hashing (bcrypt)
- [x] Rate limiting on auth endpoints
- [x] HTTPS only (Vercel automatic)

**Accessibility**
- [x] WCAG 2.1 Level AA compliant
- [x] Keyboard navigation
- [x] Screen reader compatible
- [x] Color contrast ratio ≥4.5:1
- [x] Focus indicators
- [x] ARIA labels where needed

---

### 2.2 SHOULD HAVE (Important but not critical)

**Customer Features**:
- [ ] Wishlist/favorites
- [ ] Password reset flow
- [ ] User profile editing (name, email)
- [ ] Email notifications (real, not just simulated):
  - Order confirmation
  - Shipping notification
  - Delivery notification
- [ ] Advanced search filters:
  - Price range
  - Dietary restrictions (vegan, gluten-free, etc.)
  - Country of origin
- [ ] Product sorting (price low-to-high, ratings, newest)
- [ ] Related products ("You might also like")

**Admin Features**:
- [ ] Bulk product upload (CSV import)
- [ ] Category management (CRUD)
- [ ] Customer list view
- [ ] Advanced analytics:
  - Revenue charts (weekly, monthly)
  - Sales trends
  - Customer analytics
- [ ] Email marketing tools
- [ ] Inventory reports (low stock report)

**Technical**:
- [ ] Performance monitoring (Real User Monitoring)
- [ ] Error tracking (Sentry or similar)
- [ ] Advanced caching (Redis)
- [ ] Database backups automation

---

### 2.3 COULD HAVE (Nice to have)

**Customer Features**:
- [ ] Product recommendations (ML-based)
- [ ] Social sharing (share product links)
- [ ] Gift message option
- [ ] Gift wrapping option
- [ ] Save multiple shipping addresses
- [ ] Promo codes/discounts
- [ ] Product comparison tool
- [ ] Notify when back in stock

**Admin Features**:
- [ ] Promotion/discount management
- [ ] Custom reports builder
- [ ] A/B testing tools
- [ ] Customer segmentation
- [ ] Automated marketing emails

**Technical**:
- [ ] GraphQL API (alternative to REST)
- [ ] Server-Side Rendering optimization
- [ ] Image optimization (WebP, lazy loading)
- [ ] Progressive Web App (PWA) features
- [ ] Advanced SEO (structured data, sitemaps)

---

### 2.4 WON'T HAVE (Out of scope for MVP)

**Definitely Not in V1**:
- ❌ Real payment processing (only simulation)
- ❌ Real shipping integration (only simulation)
- ❌ Mobile native app
- ❌ Multi-currency support
- ❌ Multi-language support (i18n)
- ❌ Subscription boxes
- ❌ Loyalty program/rewards
- ❌ Social login (OAuth) - email/password only
- ❌ Live chat support
- ❌ User-generated product suggestions
- ❌ Affiliate program
- ❌ Marketplace (multiple vendors)
- ❌ Wholesale/B2B features
- ❌ Product personalization (custom packaging)
- ❌ Augmented Reality product preview
- ❌ Voice shopping (Alexa, Google)

---

## 3. Vertical Slices (Development Plan)

The MVP will be built incrementally using vertical slicing. Each slice delivers working, deployable functionality.

### Slice 1: Browse Products (Guest) - Week 1-2
**Goal**: Users can discover weird snacks
- Homepage with product grid
- Product detail page
- Category filtering
- Database: Products table
- Tests: Unit, Integration, E2E

**Value**: First impression of platform, core discovery functionality

---

### Slice 2: Shopping Cart (Guest) - Week 3
**Goal**: Users can collect items for purchase
- Add to cart functionality
- Cart page (view, update, remove items)
- Cart persistence (session/localStorage)
- Database: Cart sessions
- Tests: Unit, Integration, E2E

**Value**: Pre-checkout functionality, no account needed

---

### Slice 3: Guest Checkout - Week 4-5
**Goal**: Users can complete purchase without account
- Checkout flow (shipping info → payment → confirmation)
- Form validation
- Payment simulation (Stripe test mode)
- Order creation
- Database: Orders table
- Tests: Unit, Integration, E2E (critical path)

**Value**: End-to-end purchase flow, MVP value delivery

---

### Slice 4: User Accounts - Week 6
**Goal**: Users can create accounts and login
- Registration page
- Login page
- Logout functionality
- Session management
- Password hashing
- Database: Users table
- Tests: Unit, Integration, E2E

**Value**: Personalization foundation, secure auth

---

### Slice 5: Registered Checkout & Order History - Week 7
**Goal**: Registered users get enhanced experience
- Pre-fill checkout with saved info
- Order history page
- Order details page
- Database: Link orders to users
- Tests: Unit, Integration, E2E

**Value**: Convenience for repeat customers

---

### Slice 6: Product Search & Reviews - Week 8
**Goal**: Users can find products and read/write reviews
- Search functionality
- Search results page
- Leave review (registered users)
- View reviews on product page
- Database: Reviews table
- Tests: Unit, Integration, E2E

**Value**: Product discovery and social proof

---

### Slice 7: Admin Panel - Week 9-10
**Goal**: Admin can manage platform
- Admin authentication
- Product CRUD
- Inventory management
- Order management
- Basic dashboard
- Database: Admin roles
- Tests: Unit, Integration, E2E (admin flows)

**Value**: Operational control, content management

---

**Total Estimated Time**: 10-12 weeks (flexible, learning-focused)

---

## 4. Out of Scope Details

### 4.1 Why No Real Payments?
- **Educational focus**: Don't need PCI compliance complexity
- **Stripe Test Mode**: Demonstrates integration knowledge without legal/financial burden
- **Simpler testing**: No need to handle actual refunds, chargebacks
- **Zero risk**: No customer financial data at risk

### 4.2 Why No Real Shipping?
- **Complexity**: Real shipping APIs (USPS, FedEx) are complex
- **Cost**: Shipping APIs often require paid accounts
- **Simulation sufficient**: Demonstrates understanding of order flow
- **Focus**: More time for quality engineering practices

### 4.3 Why No Mobile App?
- **Scope**: Web responsive design demonstrates mobile UX
- **Technology**: Native app requires different tech stack
- **Time**: Would double development time
- **Responsive web**: Achieves 90% of mobile experience

---

## 5. MVP Acceptance Criteria

### 5.1 Functional Acceptance
- [ ] All "Must Have" user stories completed
- [ ] All user stories pass acceptance criteria
- [ ] All critical user journeys work end-to-end:
  - [ ] Guest: Browse → Cart → Checkout → Confirmation
  - [ ] Registered: Register → Login → Browse → Checkout → Order History
  - [ ] Admin: Login → Add Product → Manage Inventory → Process Orders

### 5.2 Quality Acceptance
- [ ] Code coverage ≥80%
- [ ] All tests passing (unit, integration, E2E)
- [ ] Zero ESLint errors
- [ ] Zero TypeScript errors
- [ ] Lighthouse Performance score ≥90
- [ ] Lighthouse Accessibility score ≥90
- [ ] Lighthouse Best Practices score ≥90
- [ ] Lighthouse SEO score ≥90
- [ ] WCAG 2.1 Level AA compliant (axe-core audit)
- [ ] Zero critical security vulnerabilities (npm audit)
- [ ] Zero high security vulnerabilities

### 5.3 DevOps Acceptance
- [ ] CI/CD pipeline operational
- [ ] Quality gates enforced
- [ ] Deployed to Vercel production
- [ ] Environment variables configured
- [ ] Database migrations automated
- [ ] DORA metrics tracking setup
- [ ] Monitoring/alerting configured (basic)

### 5.4 Documentation Acceptance
- [ ] README.md complete with setup instructions
- [ ] API documentation (endpoint list)
- [ ] Deployment runbook
- [ ] User guide (optional)
- [ ] Admin guide
- [ ] Contributing guidelines
- [ ] Architecture decision records (ADRs)

---

## 6. Success Metrics (MVP Launch)

### 6.1 Technical Metrics
| Metric | Target | Measurement |
|--------|--------|-------------|
| Code Coverage | ≥80% | Jest/Coverage report |
| Test Execution Time | <10 min | CI pipeline |
| Build Time | <5 min | Vercel build logs |
| Deployment Frequency | Daily (once stable) | Git commits |
| Lead Time | <1 day | Git history |
| MTTR | <4 hours | Incident logs |
| Change Failure Rate | <10% | Failed deployments |

### 6.2 Performance Metrics
| Metric | Target | Measurement |
|--------|--------|-------------|
| LCP (Largest Contentful Paint) | <2.5s | Lighthouse |
| FCP (First Contentful Paint) | <1.5s | Lighthouse |
| TTI (Time to Interactive) | <3.5s | Lighthouse |
| API Response (p95) | <500ms | Performance monitoring |
| Lighthouse Performance | ≥90 | Lighthouse CI |

### 6.3 Quality Metrics
| Metric | Target | Measurement |
|--------|--------|-------------|
| Accessibility Score | ≥90 | Lighthouse |
| WCAG 2.1 Compliance | Level AA | axe-core audit |
| Security Vulnerabilities (Critical/High) | 0 | npm audit |
| ESLint Errors | 0 | ESLint report |
| TypeScript Errors | 0 | tsc --noEmit |

---

## 7. Post-MVP Roadmap (V2 Ideas)

**After MVP is stable and documented**:
1. **Wishlist Feature**: Save favorites
2. **Email Notifications**: Real emails via Resend
3. **Advanced Admin Analytics**: Charts and trends
4. **Promo Codes**: Discount functionality
5. **Social Sharing**: Share products on social media
6. **Product Recommendations**: "You might also like"
7. **Multiple Shipping Addresses**: Saved address book
8. **OAuth Login**: Google, GitHub
9. **Performance Optimizations**: Caching, CDN
10. **Advanced SEO**: Sitemaps, structured data

---

## 8. Approval

| Role | Name | Date | Status |
|------|------|------|--------|
| Developer/QAE | Antonio Gomez Gallardo | 2025-10-19 | ✅ Approved |
| Stakeholder | Antonio Gomez Gallardo | 2025-10-19 | ✅ Approved |

**Status**: Approved - Ready for development

---

## Document Control

**Version History**:

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2025-10-19 | Antonio Gomez Gallardo | MVP definition based on BRD and personas |

**Next Review**: After completing Slice 1 (adjust based on learnings)

---

*This MVP definition follows Module 01: Requirements Engineering and Module 02: Agile Planning from the quality-standards documentation. It uses MoSCoW prioritization and vertical slicing techniques.*
