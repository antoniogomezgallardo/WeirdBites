# WeirdBites - Prioritization Rationale

**Version**: 1.0.0
**Date**: 2025-10-19
**Purpose**: Document the rationale behind MoSCoW prioritization and vertical slice ordering
**Reference**: Module 01 - Requirements Engineering (Requirements Prioritization)

---

## Executive Summary

This document explains **why** features were prioritized the way they are in the WeirdBites MVP. It provides transparency into the decision-making process and helps stakeholders understand the strategic thinking behind the backlog order.

**Prioritization Framework**: MoSCoW (Must, Should, Could, Won't)
**Delivery Approach**: 7 vertical slices (incremental, value-driven)
**Primary Driver**: User value and business risk reduction

---

## 1. Prioritization Framework

### 1.1 MoSCoW Method

**Must Have** (60% of effort):

- Critical for MVP launch
- Without these, product is not viable
- Non-negotiable for first release

**Should Have** (20% of effort):

- Important but not critical
- Can be deferred if timeline pressure
- Significantly enhance user experience

**Could Have** (10% of effort):

- Nice to have, low priority
- Include if time/budget allows
- Minimal impact if excluded

**Won't Have** (10% of effort):

- Explicitly out of scope for MVP
- Deferred to post-MVP backlog
- May be reconsidered later

### 1.2 Prioritization Criteria

Each feature was evaluated against these criteria:

| Criterion          | Weight | Description                               |
| ------------------ | ------ | ----------------------------------------- |
| **User Value**     | 30%    | How much does this benefit users?         |
| **Business Value** | 25%    | Revenue impact, competitive advantage     |
| **Risk Reduction** | 20%    | Does this reduce technical/business risk? |
| **Dependencies**   | 15%    | Are other features blocked by this?       |
| **Effort**         | 10%    | Complexity, time required                 |

**Scoring**: 1-5 scale for each criterion, weighted sum determines priority

---

## 2. Must Have Features - Rationale

### 2.1 Slice 1: Browse Products (13 points)

**Stories**: US-001, US-002, US-003

**Why Must Have?**

- **User Value (5/5)**: Users can't buy without browsing
- **Business Value (5/5)**: Core e-commerce functionality
- **Risk Reduction (5/5)**: Validates product-market fit early
- **Dependencies (5/5)**: Blocks all other features
- **Effort (3/5)**: Moderate complexity

**Total Score**: 4.6/5 (Highest priority)

**Rationale**:

1. **Foundation Feature**: Every e-commerce site starts with product browsing
2. **User Journey Entry Point**: Users land here first (homepage or /products)
3. **Technical Foundation**: Establishes database schema, API patterns, component library
4. **Early Feedback**: Quick user validation (can iterate on UX)
5. **Low Risk**: Well-understood problem domain

**Why First?**

- No dependencies (can start immediately)
- Establishes coding standards and patterns
- Provides tangible demo after 2 weeks
- Demonstrates progress to stakeholders

---

### 2.2 Slice 2: Shopping Cart (13 points)

**Stories**: US-004, US-005, US-006

**Why Must Have?**

- **User Value (5/5)**: Can't purchase without cart
- **Business Value (5/5)**: Required for revenue
- **Risk Reduction (4/5)**: Validates state management approach
- **Dependencies (4/5)**: Blocks checkout
- **Effort (3/5)**: Moderate (state management complexity)

**Total Score**: 4.4/5

**Rationale**:

1. **Critical Path**: Browse → Cart → Checkout is the core funnel
2. **State Management**: Introduces cart state (local storage, context)
3. **User Control**: Users expect to modify cart before checkout
4. **Conversion Optimization**: Cart is where users commit to purchase
5. **Technical Learning**: Establishes state management patterns for rest of app

**Why Second?**

- Depends on Slice 1 (product browsing)
- Enables Slice 3 (checkout)
- Provides complete "browse and add to cart" flow
- Demonstrates increasing value (browse alone is limited)

---

### 2.3 Slice 3: Guest Checkout (19 points)

**Stories**: US-007, US-008, US-009, US-010, US-011

**Why Must Have?**

- **User Value (5/5)**: Can't complete purchase without checkout
- **Business Value (5/5)**: Enables revenue (payment processing)
- **Risk Reduction (5/5)**: Highest technical risk (payment integration)
- **Dependencies (5/5)**: Required for MVP launch
- **Effort (4/5)**: High complexity (forms, validation, Stripe)

**Total Score**: 4.8/5 (Highest business value)

**Rationale**:

1. **Revenue Generation**: This is where money is made
2. **Technical Risk**: Payment integration is complex, tackle early
3. **User Conversion**: Guest checkout has highest conversion rate
4. **MVP Definition**: "Can users buy products?" - This delivers YES
5. **Business Validation**: Proves business model (can process payments)

**Why Third?**

- Depends on Slice 1 (products) and Slice 2 (cart)
- Highest technical risk (address early while team is fresh)
- Achieves MVP milestone (end-to-end purchase flow)
- Enables early revenue testing (even without user accounts)

**Why Guest Checkout Before User Accounts?**

- Lower friction (no registration required)
- Higher conversion rate (industry standard: 30% higher)
- Simpler implementation (no authentication complexity)
- Faster to market (can launch with guest checkout only)
- User accounts can be added later without breaking checkout

---

### 2.4 Slice 4: User Accounts (16 points)

**Stories**: US-012, US-013, US-014, US-015, US-016, US-017

**Why Must Have?**

- **User Value (4/5)**: Convenience, saves info
- **Business Value (4/5)**: User retention, repeat purchases
- **Risk Reduction (3/5)**: Authentication adds security risk
- **Dependencies (3/5)**: Enables order history
- **Effort (4/5)**: High (authentication, session management)

**Total Score**: 3.8/5

**Rationale**:

1. **User Retention**: Registered users have 3x higher LTV
2. **Convenience**: Save address/payment for future orders
3. **Business Intelligence**: Track user behavior, preferences
4. **Marketing**: Email marketing, retargeting campaigns
5. **Trust**: Professional sites have user accounts

**Why Fourth (Not Third)?**

- Guest checkout delivers revenue faster
- Authentication complexity (bcrypt, JWT, session management)
- Can iterate on user flows before adding auth layer
- Reduces initial MVP scope (launch with guest checkout if needed)

---

### 2.5 Slice 5: Registered Checkout & Order History (11 points)

**Stories**: US-018, US-019

**Why Must Have?**

- **User Value (4/5)**: Faster checkout, order tracking
- **Business Value (4/5)**: Repeat purchase optimization
- **Risk Reduction (2/5)**: Low risk (builds on Slice 3 & 4)
- **Dependencies (4/5)**: Requires Slice 4 (user accounts)
- **Effort (3/5)**: Moderate (link checkout to user)

**Total Score**: 3.6/5

**Rationale**:

1. **Conversion Optimization**: Registered users convert 2x faster
2. **Reduced Friction**: Pre-filled forms, saved payment methods
3. **Order Tracking**: Users can view past orders
4. **Customer Service**: Support can look up orders
5. **User Engagement**: Order history keeps users engaged

**Why Fifth?**

- Depends on Slice 4 (user accounts)
- Enhances checkout UX for registered users
- Provides post-purchase value (order history)
- Relatively quick win (only 2 stories, 11 points)

---

### 2.6 Slice 6: Search & Reviews (13 points)

**Stories**: US-020, US-021, US-022, US-023

**Why Must Have?**

- **User Value (4/5)**: Find products faster, trust building
- **Business Value (4/5)**: Product discovery, social proof
- **Risk Reduction (2/5)**: Low risk, well-understood features
- **Dependencies (2/5)**: Independent of other features
- **Effort (3/5)**: Moderate (search indexing, review CRUD)

**Total Score**: 3.4/5

**Rationale**:

1. **Product Discovery**: Search is critical for >20 products
2. **Social Proof**: Reviews increase conversion by 270% (industry data)
3. **Trust**: User-generated content builds credibility
4. **SEO**: Reviews add user-generated content for search engines
5. **User Engagement**: Users spend time reading/writing reviews

**Why Sixth (Near End)?**

- Not blocking other features
- Can launch without search (if <20 products)
- Reviews can be added post-launch
- Lower priority than core purchase flow
- Nice-to-have for MVP, essential for scale

---

### 2.7 Slice 7: Admin Panel (50 points)

**Stories**: US-024 through US-035 (12 stories)

**Why Must Have?**

- **User Value (2/5)**: Admin-only, no end-user impact
- **Business Value (5/5)**: Business operations, inventory management
- **Risk Reduction (1/5)**: Low risk, internal tool
- **Dependencies (1/5)**: Independent
- **Effort (5/5)**: High complexity (CRUD for all entities)

**Total Score**: 2.8/5 (Lowest priority Must Have)

**Rationale**:

1. **Business Operations**: Can't run business without admin tools
2. **Inventory Management**: Add/edit/delete products
3. **Order Management**: Process orders, update status
4. **User Management**: Manage user accounts, permissions
5. **Content Management**: Update site content

**Why Last?**

- Can manage via database directly during beta
- Not blocking end-user features
- Large scope (50 points = 3-4 weeks)
- Can be partially deferred (prioritize critical admin functions)
- Lower risk (internal tool, fewer users)

**Could Be Deferred?**

- Yes, if timeline pressure
- Use database admin tools (pgAdmin) temporarily
- Build minimal admin (add products only)
- Complete full admin post-MVP

---

## 3. Should Have Features - Rationale

### 3.1 Why "Should Have" Instead of "Must Have"?

**Should Have features**:

- Enhance UX but not critical for launch
- Can be deferred 1-2 sprints without major impact
- Budget/timeline buffers

**Examples**:

- **Advanced filtering** (country, price range): Nice UX, not blocking
- **Wishlist**: Engagement feature, can add post-launch
- **Product recommendations**: AI/ML feature, complex, defer to v2

---

## 4. Could Have Features - Rationale

### 4.1 Why "Could Have"?

**Could Have features**:

- Low priority, marginal value
- Include only if ahead of schedule
- Typically <5% of MVP effort

**Examples**:

- **Social sharing**: Low usage, not critical
- **Gift wrapping**: Niche feature, complex logistics
- **Multi-currency**: US-only for MVP

---

## 5. Won't Have Features - Rationale

### 5.1 Explicitly Out of Scope

**Won't Have for MVP** (post-MVP backlog):

- **Mobile app**: Focus on responsive web first
- **Subscription box**: Complex logistics, different business model
- **International shipping**: US-only for MVP
- **Wholesale pricing**: B2B feature, defer to v2
- **Affiliate program**: Marketing feature, not launch-critical

**Why Explicitly Define "Won't Have"?**

- Manages stakeholder expectations
- Prevents scope creep
- Documents conscious trade-offs
- Creates post-MVP backlog

---

## 6. Vertical Slice Ordering

### 6.1 Why This Slice Order?

**Slice Order**: 1 → 2 → 3 → 4 → 5 → 6 → 7

**Strategic Rationale**:

**Early Slices (1-3): Core Purchase Flow**

- Deliver end-to-end value fast (can buy products)
- Reduce business risk (validate business model)
- Establish technical foundation
- Provide early user feedback

**Middle Slices (4-5): User Engagement**

- Add user accounts for retention
- Optimize repeat purchase experience
- Build user loyalty

**Late Slices (6-7): Scale & Operations**

- Add features for larger catalog (search)
- Add social proof (reviews)
- Add business tools (admin panel)

### 6.2 Alternative Orderings Considered

**Option A: Admin First**

```
7 (Admin) → 1 (Browse) → 2 (Cart) → 3 (Checkout) → ...
```

**Rejected Why?**

- Delays user value (no customer-facing features for 3 weeks)
- High risk (build admin before validating user flows)
- Poor stakeholder demo (admin tools are boring)

**Option B: All User Features, Then Admin**

```
1 → 2 → 3 → 4 → 5 → 6 → 7 (Admin)
```

**Selected!** (This is our approach)

- Delivers user value incrementally
- Can launch beta without full admin (use DB tools)
- Reduces risk (validate user flows first)
- Better demos (show customer UX)

**Option C: User Accounts Before Checkout**

```
1 (Browse) → 2 (Cart) → 4 (Accounts) → 3 (Checkout) → ...
```

**Rejected Why?**

- Delays revenue (checkout is weeks later)
- Adds complexity early (auth before critical path)
- Guest checkout converts better anyway

---

## 7. Prioritization Trade-Offs

### 7.1 Key Decisions Made

**Decision 1: Guest Checkout Before User Accounts**

- **Trade-Off**: Simpler auth vs. full user management
- **Decision**: Guest first
- **Rationale**: Faster to market, higher conversion, lower risk
- **Impact**: Can launch MVP 2 weeks earlier

**Decision 2: Admin Panel Last**

- **Trade-Off**: Business operations vs. user features
- **Decision**: User features first
- **Rationale**: Can use DB tools temporarily, user value is priority
- **Impact**: 3-4 week time savings, may need to manually manage products initially

**Decision 3: Search & Reviews After Core Flow**

- **Trade-Off**: Product discovery vs. purchase completion
- **Decision**: Purchase flow first
- **Rationale**: Can't sell without checkout, can sell without search (small catalog)
- **Impact**: Small catalogs (<20 products) work fine without search

**Decision 4: No Mobile App for MVP**

- **Trade-Off**: Native mobile experience vs. responsive web
- **Decision**: Responsive web only
- **Rationale**: 60% of traffic is mobile (responsive web is sufficient), native app is 3-6 months extra work
- **Impact**: 6-month timeline reduction, slightly worse mobile UX (but still good)

### 7.2 What We Sacrificed

**Features Cut from MVP**:

- Wishlist (Should Have → Post-MVP)
- Advanced filters (Should Have → Slice 6 or post-MVP)
- Product recommendations (Could Have → Post-MVP)
- Social sharing (Could Have → Post-MVP)
- Multi-currency (Won't Have → v2)
- Mobile app (Won't Have → v2)

**Why These Cuts?**

- 80/20 rule: These features represent 20% of value for 40% of effort
- Can add post-launch with minimal disruption
- Focus on core purchase flow first

---

## 8. Prioritization Validation

### 8.1 How We Validated Priorities

**Method 1: User Story Mapping**

- Mapped all stories to user journey
- Identified critical path (Browse → Cart → Checkout)
- Deferred non-critical-path features

**Method 2: Kano Model**

- Categorized features as Basic, Performance, or Delighters
- Basic (Must Have): Browse, Cart, Checkout
- Performance (Should Have): Search, Reviews
- Delighters (Could Have): Recommendations, Wishlist

**Method 3: Business Value vs. Complexity Matrix**

```
High Value, Low Complexity  → Do First  (Slice 1-3)
High Value, High Complexity → Do Second (Slice 4-5)
Low Value, Low Complexity   → Do Third  (Slice 6)
Low Value, High Complexity  → Defer     (Admin, post-MVP)
```

**Method 4: Weighted Scoring**

- Scored each feature on 5 criteria (see section 1.2)
- Sorted by weighted score
- Drew line at ~135 story points (MVP capacity)

### 8.2 Stakeholder Alignment

**Stakeholder**: Antonio (Developer/QAE) + Educational Portfolio Goals

**Priorities**:

1. **Demonstrate QA skills**: Comprehensive testing, quality metrics
2. **Show SDLC knowledge**: Requirements, planning, execution
3. **Technical excellence**: Clean code, best practices, CI/CD
4. **Real-world application**: Functional e-commerce site

**How Prioritization Aligns**:

- Early slices demonstrate full SDLC (requirements → implementation → testing)
- Quality framework established upfront (DoR, DoD, metrics)
- Incremental delivery shows agile competency
- Admin panel demonstrates CRUD mastery

---

## 9. Re-Prioritization Triggers

### 9.1 When to Re-Prioritize?

**Trigger 1: Sprint Velocity Changes**

- If velocity consistently >15 points: Pull in Should Have features
- If velocity consistently <10 points: Move Must Have to Should Have

**Trigger 2: User Feedback**

- If users request feature repeatedly: Promote to Must Have
- If feature unused: Demote to Won't Have

**Trigger 3: Technical Blockers**

- If feature blocked: Swap order with unblocked feature
- Example: Payment API down → Swap Slice 3 and 4

**Trigger 4: Business Priorities Change**

- If competitor launches feature: Re-evaluate priority
- If market demand shifts: Adjust priorities

### 9.2 Re-Prioritization Process

1. **Identify Trigger**: What changed?
2. **Re-Score Features**: Apply weighted scoring again
3. **Consult Stakeholders**: Get alignment
4. **Update Backlog**: Reorder stories
5. **Communicate**: Update documentation, notify team
6. **Document**: Record rationale for change

---

## 10. Prioritization Anti-Patterns

### 10.1 What We Avoided

**Anti-Pattern 1: HIPPO (Highest Paid Person's Opinion)**

- Avoid: Prioritizing based on authority, not data
- Instead: Use weighted scoring, user research

**Anti-Pattern 2: Feature Factory**

- Avoid: Prioritizing quantity over quality
- Instead: Focus on user value, not feature count

**Anti-Pattern 3: Gold Plating**

- Avoid: Adding "nice to have" before "must have" is done
- Instead: Strict MoSCoW adherence, defer enhancements

**Anti-Pattern 4: Analysis Paralysis**

- Avoid: Over-analyzing priorities, delaying decisions
- Instead: Time-box prioritization (2 hours max)

**Anti-Pattern 5: Scope Creep**

- Avoid: Adding features mid-sprint
- Instead: Change management process (see [Change Management](11.change-management-process.md))

---

## 11. Lessons Learned (To Be Updated)

**After Slice 1**:

- Did priorities hold up? Were assumptions correct?
- What surprised us?
- Would we prioritize differently next time?

**After MVP Launch**:

- Which features were most valuable?
- Which features were least used?
- How did actual velocity compare to estimates?

---

## 12. Document Control

**Version History**:

| Version | Date       | Author                 | Changes                                                |
| ------- | ---------- | ---------------------- | ------------------------------------------------------ |
| 1.0.0   | 2025-10-19 | Antonio Gomez Gallardo | Initial prioritization rationale (Module 01 alignment) |

**Next Review**: After Slice 3 completion (validate prioritization assumptions)

**Related Documents**:

- [MVP Definition](3.mvp-definition.md) - MoSCoW prioritization
- [Product Backlog](5.product-backlog.md) - Prioritized user stories
- [Vertical Slices](6.vertical-slices.md) - Slice ordering and content
- [Change Management Process](11.change-management-process.md) - How to handle priority changes

---

_This prioritization rationale follows Module 01: Requirements Engineering from the quality-standards documentation, emphasizing transparent, data-driven decision-making and stakeholder alignment._
