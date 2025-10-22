# Phase: Requirements Engineering

**Description**: Guide through Module 01 - Requirements Engineering phase of the WeirdBites project

**Usage**: `/phase-requirements [step or topic]`

**Examples**:

- `/phase-requirements` - Start requirements phase
- `/phase-requirements user stories` - Create user stories
- `/phase-requirements acceptance criteria` - Define acceptance criteria
- `/phase-requirements validation` - Validate requirements

---

## Phase Overview

This command guides you through **Module 01: Requirements Engineering**, which focuses on transforming business needs into testable technical specifications.

### Phase Objectives

By completing this phase, you will have:

- [ ] Clear, prioritized business requirements for WeirdBites e-commerce platform
- [ ] User stories following INVEST criteria
- [ ] Acceptance criteria in Given-When-Then format
- [ ] Requirements validated using DoR (Definition of Ready)
- [ ] Requirements traceability matrix
- [ ] Vertical slices identified for iterative development
- [ ] User story map created

### Relevant Documentation

**Core Modules**:

- `docs/quality-standards/docs/01-requirements/01-README.md`
- `docs/quality-standards/docs/01-requirements/user-stories.md`
- `docs/quality-standards/docs/01-requirements/acceptance-criteria.md`
- `docs/quality-standards/docs/01-requirements/requirements-validation.md`
- `docs/quality-standards/docs/01-requirements/requirements-prioritization.md`
- `docs/quality-standards/docs/01-requirements/vertical-slicing.md`
- `docs/quality-standards/docs/01-requirements/user-story-mapping.md`

**Templates**:

- `docs/quality-standards/templates/user-story.md`
- `docs/quality-standards/templates/acceptance-criteria-template.md`
- `docs/quality-standards/templates/definition-of-ready.md`

### Industry Standards Referenced

- IEEE 830 - Software Requirements Specifications
- ISO/IEC/IEEE 29148 - Requirements Engineering

---

## Phase Steps

### Step 1: Define Business Requirements

**Goal**: Understand what WeirdBites needs to do from a business perspective.

**Actions**:

1. Read Module 01 README to understand requirements engineering process
2. Identify stakeholder needs (customers, business owners, operations)
3. Define business goals and success criteria
4. Identify constraints (budget, timeline, technology, compliance)

**WeirdBites Context**:

- E-commerce platform for unique food products
- Core features: product catalog, shopping cart, checkout, user accounts
- Non-functional: performance, security, accessibility, scalability

**Deliverables**:

- Business requirements document
- Stakeholder analysis
- Success metrics definition

---

### Step 2: Create User Stories

**Goal**: Transform business requirements into user-centric stories using INVEST criteria.

**Actions**:

1. Read `docs/quality-standards/docs/01-requirements/user-stories.md`
2. Use the template from `docs/quality-standards/templates/user-story.md`
3. Create user stories following format:
   ```
   As a [user type]
   I want [goal]
   So that [benefit]
   ```
4. Validate each story against INVEST criteria:
   - **I**ndependent
   - **N**egotiable
   - **V**aluable
   - **E**stimable
   - **S**mall
   - **T**estable

**WeirdBites Examples**:

```
User Story: Product Search
As a customer
I want to search for products by name or category
So that I can quickly find items I'm interested in purchasing

User Story: Add to Cart
As a customer
I want to add products to my shopping cart
So that I can purchase multiple items in a single transaction
```

**Deliverables**:

- Product backlog with prioritized user stories
- Each story validated against INVEST

---

### Step 3: Define Acceptance Criteria

**Goal**: Make each user story testable with clear acceptance criteria.

**Actions**:

1. Read `docs/quality-standards/docs/01-requirements/acceptance-criteria.md`
2. Use Given-When-Then format from template
3. For each user story, define:
   - **Given** [initial context]
   - **When** [action occurs]
   - **Then** [expected outcome]
4. Include both positive and negative scenarios
5. Define edge cases and boundary conditions

**WeirdBites Example**:

```
User Story: Add to Cart

Acceptance Criteria:
1. Given I am viewing a product detail page
   When I click the "Add to Cart" button
   Then the product is added to my cart
   And the cart count increases by 1
   And I see a confirmation message

2. Given the product is out of stock
   When I attempt to add it to cart
   Then I see an error message "Product out of stock"
   And the product is NOT added to cart

3. Given I add a product with quantity selector
   When I select quantity of 5 and click "Add to Cart"
   Then 5 units are added to cart
   And inventory is reserved for 15 minutes
```

**Deliverables**:

- Acceptance criteria for each user story
- Edge cases documented
- Validation rules defined

---

### Step 4: Prioritize Requirements

**Goal**: Determine implementation order using prioritization techniques.

**Actions**:

1. Read `docs/quality-standards/docs/01-requirements/requirements-prioritization.md`
2. Apply MoSCoW method:
   - **M**ust have (MVP features)
   - **S**hould have (important but not critical)
   - **C**ould have (nice to have)
   - **W**on't have (out of scope for now)
3. Consider WSJF (Weighted Shortest Job First):
   - Cost of Delay / Job Duration

**WeirdBites Prioritization Example**:

```
Must Have (MVP):
- User registration/login
- Product catalog browsing
- Add to cart
- Checkout and payment
- Order confirmation

Should Have:
- Product search and filters
- User reviews and ratings
- Order history
- Wishlist

Could Have:
- Product recommendations
- Social sharing
- Email notifications
- Gift wrapping option

Won't Have (v1):
- Subscription boxes
- Mobile app
- Loyalty program
- Multi-language support
```

**Deliverables**:

- Prioritized product backlog
- MVP scope defined
- Release roadmap

---

### Step 5: Create Vertical Slices

**Goal**: Break features into deliverable increments.

**Actions**:

1. Read `docs/quality-standards/docs/01-requirements/vertical-slicing.md`
2. Identify thin vertical slices that deliver end-to-end value
3. Each slice should:
   - Include all layers (UI, API, database)
   - Be independently deployable
   - Provide user value
   - Be testable

**WeirdBites Vertical Slice Example**:

```
Slice 1: "Browse and View Products"
- UI: Product listing page (simple grid)
- UI: Product detail page (basic info only)
- API: GET /products (paginated)
- API: GET /products/:id
- DB: Products table
- Tests: E2E product browsing, API tests

Value: Users can discover and learn about products

Slice 2: "Add to Cart (Guest)"
- UI: Add to cart button
- UI: Cart icon with count
- API: POST /cart/items
- API: GET /cart
- DB: Cart session storage
- Tests: Cart functionality, session management

Value: Users can start shopping without account

Slice 3: "Checkout (Guest)"
- UI: Checkout form (shipping, payment)
- UI: Order confirmation page
- API: POST /orders
- API: Payment integration (Stripe)
- DB: Orders table
- Tests: Checkout flow, payment processing

Value: Users can complete purchase
```

**Deliverables**:

- Vertical slices identified
- Implementation order defined
- Each slice scoped and estimated

---

### Step 6: Validate Against Definition of Ready

**Goal**: Ensure requirements are ready for development.

**Actions**:

1. Read `docs/quality-standards/templates/definition-of-ready.md`
2. For each user story, verify:
   - [ ] Clear and testable acceptance criteria
   - [ ] Dependencies identified
   - [ ] Estimated (story points)
   - [ ] No blockers
   - [ ] UI/UX mockups if needed
   - [ ] API contracts defined
   - [ ] Performance criteria specified
   - [ ] Security requirements identified
   - [ ] Accessibility requirements defined
   - [ ] Team has the skills to deliver

**Deliverables**:

- DoR checklist completed for each story
- Stories marked "Ready for Development"
- Blocked stories identified with resolution plan

---

### Step 7: Create User Story Map

**Goal**: Visualize the user journey and identify releases.

**Actions**:

1. Read `docs/quality-standards/docs/01-requirements/user-story-mapping.md`
2. Create user story map with:
   - **Backbone**: Major user activities (top row)
   - **Walking Skeleton**: User tasks (second row)
   - **Stories**: Specific stories (grouped under tasks)
3. Identify release boundaries (horizontal slices)

**WeirdBites User Story Map**:

```
Backbone:       Discover    →    Select    →    Purchase    →    Receive
─────────────────────────────────────────────────────────────────────────
Walking         Browse          Add to         Checkout         Track
Skeleton:       Products        Cart           & Pay            Order
─────────────────────────────────────────────────────────────────────────
              View category   Add item       Enter address    View status
Stories:      Search          Change qty     Select payment   Email confirm
              Filter          Save for       Apply coupon     Print receipt
              Sort            later          Review order     Cancel order
─────────────────────────────────────────────────────────────────────────
Release 1:  ▼──────────────────────────────────────▼
            (MVP: Browse, Cart, Checkout)

Release 2:                  ▼─────────────────────────────────▼
                            (Enhanced: Search, Tracking, User Account)
```

**Deliverables**:

- User story map
- Release plan with scope
- Walking skeleton identified

---

## Phase Completion Checklist

Before moving to **Phase 2: Agile Planning**, ensure:

- [ ] All user stories follow INVEST criteria
- [ ] Every story has clear acceptance criteria (Given-When-Then)
- [ ] Requirements prioritized using MoSCoW
- [ ] MVP scope clearly defined
- [ ] Vertical slices identified and ordered
- [ ] User story map created
- [ ] All stories pass Definition of Ready
- [ ] Stakeholders have reviewed and approved requirements
- [ ] Traceability matrix created (requirements → user stories)
- [ ] Requirements documented in version control

---

## Key Artifacts to Create

1. **Product Backlog** (`docs/product-backlog.md`)
   - All user stories with acceptance criteria
   - Priority and estimates
   - Dependencies mapped

2. **User Story Map** (`docs/user-story-map.md` or visual tool)
   - Visual representation of user journey
   - Release boundaries marked

3. **Requirements Traceability Matrix** (`docs/requirements-traceability.md`)
   - Business requirement → User story mapping
   - Ensures nothing is missed

4. **MVP Definition** (`docs/mvp-definition.md`)
   - Must-have features for first release
   - Success criteria
   - Out of scope items

---

## Common Pitfalls (From Documentation)

🚫 **Avoid These Mistakes**:

1. **Skipping acceptance criteria** - Stories must be testable
2. **Vague requirements** - "User-friendly" is not measurable
3. **Too large stories** - Break into smaller vertical slices
4. **Missing edge cases** - Define boundary conditions
5. **No prioritization** - Everything can't be P0
6. **Technical stories without user value** - Frame as user benefit
7. **Ignoring non-functional requirements** - Security, performance, accessibility matter
8. **No stakeholder validation** - Requirements must be reviewed

---

## Next Phase

Once requirements phase is complete, proceed to:
**Phase 2: Agile Planning** (`/phase-planning`)

- Define Definition of Done (DoD)
- Estimate user stories
- Sprint planning
- Velocity tracking

---

## Resources

**Templates to Use**:

- User Story Template: `templates/user-story.md`
- Acceptance Criteria: `templates/acceptance-criteria-template.md`
- Definition of Ready: `templates/definition-of-ready.md`

**Examples to Reference**:

- Manual Testing Examples: `examples/manual-testing/` (has test cases based on requirements)

**Standards**:

- IEEE 830: Software Requirements Specification
- ISO/IEC/IEEE 29148: Requirements Engineering

---

**Remember**: Good requirements are the foundation of quality. Take time to get this right before moving to development!
