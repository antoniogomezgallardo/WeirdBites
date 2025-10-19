# WeirdBites - Business Requirements Document

**Version**: 1.0.0
**Date**: 2025-10-19
**Status**: Draft
**Owner**: Antonio Gomez Gallardo
**Project Type**: Educational Portfolio Project

---

## 1. Executive Summary

### 1.1 Purpose
This document defines the business requirements for **WeirdBites**, an educational e-commerce platform designed to demonstrate mastery of the Software Development Life Cycle (SDLC) and Software Testing Life Cycle (STLC) through practical implementation.

### 1.2 Project Vision
WeirdBites is a full-stack e-commerce application for purchasing unusual and weird snacks that customers won't find anywhere else. Built with modern software engineering practices including BDD/TDD, comprehensive multi-level testing, CI/CD automation, and strict adherence to quality standards at every phase of development.

### 1.3 Business Value
**Primary Value**: Educational demonstration of professional QA engineering practices
- Showcase end-to-end quality assurance implementation
- Portfolio piece for QAE role (starting November 3rd)
- Practical application of 16 quality-standards modules
- Reference implementation for industry best practices

**Secondary Value**: Functional e-commerce platform
- Browse and purchase unique snack products
- Simulated payment and shipping experience
- Admin product and inventory management

---

## 2. Stakeholder Analysis

### 2.1 Primary Stakeholders

| Stakeholder | Interest | Influence | Engagement Strategy |
|------------|----------|-----------|---------------------|
| Antonio (Developer/QAE) | High | High | Manage Closely - Primary decision maker |
| End Users (Customers) | High | Low | Keep Informed - Test subjects, feedback providers |
| Future Employers | Medium | Low | Keep Satisfied - Via portfolio demonstration |
| Open Source Community | Low | Low | Monitor - Potential contributors/learners |

### 2.2 RACI Matrix

| Activity | Developer/QAE | Customers | Employers |
|----------|--------------|-----------|-----------|
| Define Requirements | R, A | C | I |
| Approve Requirements | R, A | I | I |
| Implement Features | R, A | I | I |
| Test Features | R, A | C | I |
| Accept Deliverables | R, A | I | C |

*R=Responsible, A=Accountable, C=Consulted, I=Informed*

---

## 3. Business Context

### 3.1 Problem Statement
**Problem**: Need to demonstrate comprehensive SDLC/STLC knowledge through a real-world project

**Solution**: Build a production-quality e-commerce platform following all 16 quality-standards modules:
- Module 00: Foundations
- Module 01: Requirements Engineering
- Module 02: Agile Planning
- Module 03: Version Control
- Module 04: Testing Strategy
- Module 05: Test Levels
- Module 06: Quality Attributes
- Module 07: Development Practices
- Module 08: CI/CD Pipeline
- Module 09: Metrics & Monitoring
- Module 10: Deployment
- Module 11: Tools Ecosystem
- Module 12: Governance
- Module 13: Incident Management
- Module 14: Continuous Improvement
- Module 15: AI in QA
- Module 16: Agentic Workflows

### 3.2 Target Audience

**Primary Persona**: Curious Snacker
- Age: 18-45
- Tech-savvy, adventurous eaters
- Looking for unique food experiences
- Willing to try unusual products
- Values convenience and novelty

**Secondary Personas**:
- Gift Givers: Purchasing weird snacks as unique gifts
- Food Bloggers: Reviewing unusual products
- Party Planners: Sourcing conversation-starter snacks

### 3.3 Product Positioning
"WeirdBites is the go-to destination for discovering and purchasing unusual snacks you won't find in regular stores."

**Unique Selling Proposition (USP)**:
- Curated selection of genuinely weird/unusual snacks
- Each product tells a story (origin, why it's weird, taste profile)
- Educational content about snack origins and culture
- Simulated end-to-end shopping experience

---

## 4. Business Objectives

### 4.1 Educational Goals (Primary)
1. **Demonstrate Requirements Engineering**
   - IEEE 830 compliant documentation
   - User stories with INVEST criteria
   - Acceptance criteria (Given-When-Then)
   - Requirements traceability

2. **Showcase Testing Excellence**
   - Test pyramid (70/20/10 distribution)
   - Unit, integration, E2E, contract, accessibility tests
   - >80% code coverage
   - TDD/BDD practices

3. **Implement CI/CD Pipeline**
   - GitHub Actions automation
   - Quality gates enforced
   - Automated deployment
   - DORA metrics tracking

4. **Apply Quality Attributes**
   - Performance optimization (< 2s page loads)
   - WCAG 2.1 Level AA accessibility
   - Security best practices
   - Scalability within free tier limits

5. **Practice Agile Methodologies**
   - Vertical slicing
   - Iterative development
   - Continuous delivery
   - Definition of Ready/Done

### 4.2 Functional Goals (Secondary)
1. **Customer Experience**
   - Browse and discover weird snack products
   - Search and filter catalog
   - Add items to shopping cart
   - Complete purchase (simulated payment)
   - Track order status (simulated shipping)
   - Leave product reviews

2. **Admin Operations**
   - Manage product catalog (CRUD)
   - Track inventory levels
   - Process orders
   - View analytics dashboard

---

## 5. Scope Definition

### 5.1 In Scope (MVP)

#### 5.1.1 Customer Features
**Must Have**:
- Browse product catalog (grid/list view)
- View product details (images, description, price, stock)
- Add to cart (guest users)
- View and edit shopping cart
- Guest checkout (email, shipping info, payment simulation)
- User registration and login
- Registered user checkout (saved info)
- Order confirmation
- Order history (registered users)
- Product search
- Category filtering
- Product reviews and ratings

**Should Have**:
- Wishlist functionality
- Email notifications (order confirmation)
- Password reset
- User profile management

**Could Have**:
- Product recommendations ("You might also like")
- Social sharing (share product links)
- Advanced search filters (price range, dietary restrictions)

#### 5.1.2 Admin Features
**Must Have**:
- Admin authentication
- Product management (create, read, update, delete)
- Inventory tracking (stock levels, low stock alerts)
- Order management (view, update status)
- Basic analytics dashboard (orders, revenue, popular products)

**Should Have**:
- Bulk product upload (CSV import)
- Category management
- Customer management

**Could Have**:
- Advanced analytics (charts, trends)
- Promotion/discount management
- Email campaign tools

### 5.2 Out of Scope (Won't Have in v1)
- **Real Payment Processing**: Only simulation (Stripe test mode)
- **Real Shipping Integration**: Only status simulation
- **Mobile Native App**: Web responsive only
- **Multi-currency**: USD only
- **Multi-language**: English only
- **Subscription Boxes**: One-time purchases only
- **Loyalty Program**: No points/rewards
- **Social Login**: Email/password only (OAuth could be added later)
- **Live Chat Support**: Contact form only
- **Advanced SEO**: Basic meta tags only
- **Multi-vendor Marketplace**: Single store owner

### 5.3 Constraints

#### 5.3.1 Technical Constraints
- **Budget**: Free tier only
  - Hosting: Vercel Free (100GB bandwidth/month)
  - Database: Supabase Free (500MB) or Neon Free (3GB)
  - File Storage: Vercel Blob Free (1GB) or Cloudinary Free (25GB)
  - Email: Resend Free (100 emails/day)
  - No paid services allowed

- **Technology Stack**: Predetermined (Next.js, PostgreSQL, TypeScript)
- **Browser Support**: Modern browsers only (last 2 versions)
- **Performance**: Subject to free tier limitations

#### 5.3.2 Timeline Constraints
- **Learning-focused**: No hard deadlines
- **Iterative delivery**: Focus on quality over speed
- **Target**: MVP by end of 2025 (flexible)

#### 5.3.3 Regulatory Constraints
- **No Real Commerce**: Simulated transactions only
- **GDPR Awareness**: Privacy-conscious design (though not legally required)
- **Accessibility**: WCAG 2.1 Level AA compliance

---

## 6. Business Rules

### 6.1 Product Rules
**BR-001**: Product Inventory
- Product can be added to cart only if `stock > 0`
- When order is placed, stock decreases by ordered quantity
- When stock reaches 10 or below, trigger "Low Stock Alert"
- When stock = 0, product shows "Out of Stock" and cart button disabled

**BR-002**: Product Pricing
- All prices displayed in USD
- Prices include tax (for simplicity)
- Minimum product price: $0.99
- Maximum product price: $999.99

**BR-003**: Product Images
- Minimum 1 image per product (required)
- Maximum 5 images per product
- Supported formats: JPEG, PNG, WebP
- Maximum file size: 5MB per image
- First image is primary thumbnail

### 6.2 Cart Rules
**BR-004**: Shopping Cart
- Guest cart expires after 24 hours of inactivity
- Registered user cart persists indefinitely
- Maximum quantity per product: 99
- Minimum order subtotal: $5.00
- If product stock decreases below cart quantity, show warning and adjust

### 6.3 Checkout Rules
**BR-005**: Guest Checkout
- Requires: email, name, shipping address, phone
- Email validation required
- No account created (order tracked by email only)

**BR-006**: Registered User Checkout
- Can save multiple shipping addresses
- Can save payment methods (simulated)
- Order history accessible

**BR-007**: Payment Simulation
- Use Stripe test card numbers
- Success: 4242 4242 4242 4242
- Decline: 4000 0000 0000 0002
- No real charges processed
- Order status: "Paid" (simulated)

### 6.4 Order Rules
**BR-008**: Order Processing
- Order statuses: Pending → Processing → Shipped → Delivered
- Simulated shipping: Orders "ship" after 1 day
- Simulated delivery: Orders "delivered" after 3 days
- Order confirmation email sent immediately (simulated)

**BR-009**: Order Cancellation
- Orders can be cancelled within 1 hour of placement
- After 1 hour, status becomes non-cancellable

### 6.5 Review Rules
**BR-010**: Product Reviews
- Only registered users can leave reviews
- One review per product per user
- Ratings: 1-5 stars (required)
- Review text: Optional (max 500 characters)
- Reviews must be approved before display (future: auto-approve for now)

### 6.6 Admin Rules
**BR-011**: Admin Access
- Admin users have separate authentication
- Admin email must be whitelisted
- Cannot purchase through admin account
- All admin actions logged

---

## 7. Success Metrics

### 7.1 Educational Success Metrics (Primary)

#### 7.1.1 DORA Metrics
| Metric | Current | Target (6 months) | Elite Performers |
|--------|---------|-------------------|------------------|
| Deployment Frequency | Manual | Daily | Multiple per day |
| Lead Time for Changes | N/A | < 1 day | < 1 hour |
| Mean Time to Recovery (MTTR) | N/A | < 4 hours | < 1 hour |
| Change Failure Rate | N/A | < 10% | 0-15% |

#### 7.1.2 Quality Metrics
| Metric | Target | Measurement |
|--------|--------|-------------|
| Code Coverage | > 80% | Overall, > 95% for critical paths |
| Cyclomatic Complexity | < 10 per method | Static analysis |
| Technical Debt Ratio | < 5% | SonarQube/ESLint |
| Defect Density | < 1 per KLOC | Bugs per 1000 lines of code |

#### 7.1.3 Testing Metrics
| Metric | Target | Notes |
|--------|--------|-------|
| Test Automation Rate | > 80% | % of test cases automated |
| Test Execution Time | < 10 minutes | Full suite |
| Flaky Test Rate | < 5% | Tests that intermittently fail |
| Test Pyramid Distribution | 70% unit, 20% integration, 10% E2E | Balanced coverage |

### 7.2 Functional Success Metrics (Secondary)

#### 7.2.1 Performance
- Page Load Time (LCP): < 2.5 seconds
- First Contentful Paint (FCP): < 1.5 seconds
- Time to Interactive (TTI): < 3.5 seconds
- API Response Time (p95): < 500ms
- Lighthouse Score: > 90 (Performance, Accessibility, Best Practices, SEO)

#### 7.2.2 User Experience
- Cart Abandonment Rate: < 70% (industry average 69.8%)
- Checkout Completion: > 30%
- Average Session Duration: > 3 minutes
- Bounce Rate: < 50%

#### 7.2.3 System Health
- Uptime: > 99% (Vercel SLA)
- Error Rate: < 1% of requests
- Database Query Time: < 100ms (average)
- Zero critical security vulnerabilities

---

## 8. Assumptions

### 8.1 Technical Assumptions
1. **Free Tier Sufficiency**: Free tiers will provide adequate resources for educational purposes
2. **Simulated Services**: Payment and shipping simulation will adequately demonstrate e-commerce flow
3. **Browser Compatibility**: Users will use modern browsers (Chrome, Firefox, Safari, Edge)
4. **Internet Access**: Users have stable internet connection
5. **Product Data**: Initial product catalog will be manually created (10-50 products)

### 8.2 User Assumptions
1. **Tech Literacy**: Users comfortable with online shopping
2. **Language**: All users understand English
3. **Device**: Users have access to desktop, tablet, or mobile devices
4. **Email**: Users have valid email addresses
5. **Privacy**: Users accept cookie usage for cart persistence

### 8.3 Business Assumptions
1. **No Real Revenue**: This is educational, not a commercial venture
2. **Limited Scale**: Designed for demonstration, not production scale
3. **Single Administrator**: One admin user (Antonio)
4. **Content Moderation**: Reviews manually moderated (if implemented)
5. **No Customer Support**: No SLA for response times

---

## 9. Dependencies

### 9.1 External Dependencies
- **Vercel**: Hosting platform availability
- **Supabase/Neon**: Database service availability
- **Stripe**: Test mode API availability
- **Cloudinary/Vercel Blob**: Image hosting availability
- **Resend/SendGrid**: Email service availability
- **GitHub**: Repository and Actions availability

### 9.2 Internal Dependencies
- **Time**: Developer availability for learning-focused timeline
- **Documentation**: Completion of requirements before development
- **Quality Standards**: Reference documentation (already available)

---

## 10. Risks and Mitigation

### 10.1 Risk Register

| Risk ID | Risk | Probability | Impact | Mitigation |
|---------|------|-------------|--------|------------|
| R-001 | Free tier limits exceeded | Medium | High | Monitor usage, optimize queries, implement caching |
| R-002 | Service provider changes terms | Low | Medium | Use open standards, design for portability |
| R-003 | Scope creep | High | Medium | Strict adherence to MVP, defer features to v2 |
| R-004 | Technical complexity overwhelming | Medium | High | Follow documentation, break into small slices |
| R-005 | Security vulnerabilities | Medium | High | Follow OWASP guidelines, regular dependency updates |
| R-006 | Performance degradation | Medium | Medium | Performance testing, monitoring, optimization |
| R-007 | Accessibility non-compliance | Low | Medium | Automated axe-core testing, manual WCAG audit |

### 10.2 Mitigation Strategies

**For R-001 (Free Tier Limits)**:
- Implement request caching
- Optimize database queries (indexes, query optimization)
- Use CDN for static assets
- Monitor usage dashboards weekly

**For R-003 (Scope Creep)**:
- Document MoSCoW prioritization
- Review all new features against MVP definition
- Defer non-critical features to backlog
- Timebox exploration (spikes)

**For R-004 (Technical Complexity)**:
- Follow quality-standards documentation
- Break features into thin vertical slices
- Ask for help in communities (Stack Overflow, Discord)
- Prioritize learning over perfection

**For R-005 (Security)**:
- npm audit on every install
- Dependabot automated security updates
- Input validation and sanitization
- SQL injection prevention (use ORM)
- XSS prevention (React auto-escaping)
- CSRF tokens on forms
- Rate limiting on APIs

---

## 11. Acceptance Criteria

### 11.1 Requirements Document Acceptance
This business requirements document is considered complete and approved when:
- [ ] All sections filled with accurate information
- [ ] Stakeholder (Antonio) has reviewed and approved
- [ ] Scope clearly defined (in/out)
- [ ] Success metrics identified
- [ ] Risks documented with mitigation
- [ ] Assumptions validated
- [ ] Dependencies identified
- [ ] Traceability to quality-standards documentation established

### 11.2 MVP Acceptance
The MVP is considered complete when:
- [ ] All "Must Have" features implemented
- [ ] All user stories meet Definition of Done
- [ ] Code coverage > 80%
- [ ] Accessibility WCAG 2.1 Level AA compliant
- [ ] Performance targets met (Lighthouse > 90)
- [ ] Zero critical/high security vulnerabilities
- [ ] CI/CD pipeline operational
- [ ] Deployed to production (Vercel)
- [ ] Documentation complete (API, deployment, runbooks)
- [ ] DORA metrics tracking active

---

## 12. Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Developer/QAE | Antonio Gomez Gallardo | _Pending_ | 2025-10-19 |
| Stakeholder | Antonio Gomez Gallardo | _Pending_ | 2025-10-19 |

**Status**: Draft - Awaiting approval

---

## 13. References

### 13.1 Quality Standards Documentation
- Location: `docs/quality-standards/`
- Manifesto: `docs/quality-standards/MANIFESTO.md`
- Philosophy: `docs/quality-standards/PHILOSOPHY.md`
- Module 01: `docs/quality-standards/docs/01-requirements/`

### 13.2 Industry Standards
- IEEE 830-1998: Software Requirements Specifications
- IEEE 29148-2011: Requirements Engineering
- ISO/IEC 25010: Software Quality Model
- WCAG 2.1: Web Content Accessibility Guidelines
- OWASP Top 10: Security best practices

### 13.3 Templates Used
- Business Requirements Template: Based on IEEE 830
- User Story Template: `docs/quality-standards/templates/user-story.md`
- Acceptance Criteria Template: `docs/quality-standards/templates/acceptance-criteria-template.md`

---

## Document Control

**Version History**:

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 0.1 | 2025-10-19 | Antonio Gomez Gallardo | Initial draft |
| 1.0.0 | 2025-10-19 | Antonio Gomez Gallardo | Complete BRD based on stakeholder input |

**Next Review Date**: Before Phase 2 (Agile Planning)

**Distribution List**:
- Antonio Gomez Gallardo (Developer/QAE)
- Project Repository: `docs/business-requirements.md`

---

*This document follows the requirements engineering process defined in Module 01 of the quality-standards documentation.*
