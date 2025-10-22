# WeirdBites - Non-Functional Requirements (NFRs)

**Version**: 1.0.0
**Date**: 2025-10-19
**Status**: Approved
**Reference**: Module 06 - Quality Attributes

---

## 1. Overview

Non-functional requirements (NFRs) define **how** the system should behave, focusing on quality attributes rather than specific features. These requirements are critical for user satisfaction, system reliability, and long-term maintainability.

### 1.1 NFR Categories (ISO/IEC 25010)

- Performance
- Security
- Usability & Accessibility
- Reliability & Availability
- Scalability
- Compatibility
- Maintainability
- Portability

---

## 2. Performance Requirements

### 2.1 Response Time

| Metric                            | Target                   | Measurement Method               | Priority |
| --------------------------------- | ------------------------ | -------------------------------- | -------- |
| **Page Load Time (LCP)**          | < 2.5s (95th percentile) | Lighthouse, Real User Monitoring | High     |
| **First Contentful Paint (FCP)**  | < 1.5s (95th percentile) | Lighthouse                       | High     |
| **Time to Interactive (TTI)**     | < 3.5s (95th percentile) | Lighthouse                       | High     |
| **Cumulative Layout Shift (CLS)** | < 0.1                    | Lighthouse                       | Medium   |
| **First Input Delay (FID)**       | < 100ms                  | Real User Monitoring             | Medium   |

**Rationale**: Core Web Vitals directly impact SEO and user experience. Fast page loads reduce bounce rate and increase conversions.

**Measurement**:

- Lighthouse CI in GitHub Actions
- Vercel Analytics (free tier)
- Manual testing on 3G networks (throttled)

**Acceptance Criteria**:

```
Given a user visits the homepage
When the page loads
Then Largest Contentful Paint occurs within 2.5 seconds
And the Lighthouse Performance score is ≥90
```

### 2.2 API Response Time

| Endpoint Pattern          | Target (p95) | Target (p99) | Priority |
| ------------------------- | ------------ | ------------ | -------- |
| **GET /api/products**     | < 500ms      | < 1000ms     | High     |
| **GET /api/products/:id** | < 300ms      | < 600ms      | High     |
| **POST /api/cart**        | < 400ms      | < 800ms      | High     |
| **POST /api/orders**      | < 1000ms     | < 2000ms     | High     |
| **GET /api/orders**       | < 500ms      | < 1000ms     | Medium   |
| **Admin endpoints**       | < 1000ms     | < 2000ms     | Low      |

**Rationale**: Fast API responses improve perceived performance and reduce user frustration.

**Measurement**:

- Server-side logging with timestamps
- Performance testing with k6
- Vercel Serverless Function metrics

**Acceptance Criteria**:

```
Given 100 concurrent users requesting products
When measuring API response times
Then 95% of requests complete in < 500ms
And 99% of requests complete in < 1000ms
```

### 2.3 Database Query Performance

| Query Type                     | Target  | Priority |
| ------------------------------ | ------- | -------- |
| **Simple SELECT** (by ID)      | < 10ms  | High     |
| **Product list** (paginated)   | < 50ms  | High     |
| **Product search** (full-text) | < 100ms | Medium   |
| **Order with joins**           | < 50ms  | High     |
| **Analytics queries**          | < 500ms | Low      |

**Rationale**: Database is often the bottleneck. Optimized queries ensure fast API responses.

**Implementation**:

- Indexes on frequently queried columns (id, category, name)
- Pagination to limit result sets
- Connection pooling (PgBouncer or Prisma)
- Query plan analysis (EXPLAIN ANALYZE)

### 2.4 Throughput

| Metric                  | Target                      | Priority |
| ----------------------- | --------------------------- | -------- |
| **Concurrent users**    | 100 users (free tier limit) | Medium   |
| **Requests per second** | 50 rps (burst)              | Medium   |
| **Orders per minute**   | 10 orders/min               | Low      |

**Rationale**: Free tier has limitations. Design for efficiency within constraints.

**Testing**: Load testing with k6 simulating realistic user behavior.

---

## 3. Security Requirements

### 3.1 Authentication & Authorization

| Requirement               | Implementation                                             | Priority |
| ------------------------- | ---------------------------------------------------------- | -------- |
| **Password strength**     | Min 8 characters, mixed case, number                       | High     |
| **Password storage**      | bcrypt hashing (cost factor 10+)                           | High     |
| **Session management**    | JWT or secure session cookies (httpOnly, secure, sameSite) | High     |
| **Session timeout**       | 30 minutes inactivity (customer), 15 minutes (admin)       | Medium   |
| **Failed login attempts** | Lock after 5 failed attempts (15 min cooldown)             | Medium   |
| **Admin access control**  | Email whitelist or role-based access                       | High     |

**Acceptance Criteria**:

```
Given a user enters a password
When the password is "weak123"
Then the system rejects it with error "Password must contain at least 8 characters, uppercase, lowercase, and number"

Given an admin user is inactive for 15 minutes
When they attempt to perform an admin action
Then they are redirected to login page
```

### 3.2 Data Protection

| Requirement                   | Implementation                                        | Priority |
| ----------------------------- | ----------------------------------------------------- | -------- |
| **HTTPS only**                | Force HTTPS (Vercel automatic)                        | High     |
| **Sensitive data in transit** | TLS 1.2+                                              | High     |
| **SQL injection prevention**  | Parameterized queries (ORM: Prisma)                   | High     |
| **XSS prevention**            | React auto-escaping, Content Security Policy          | High     |
| **CSRF protection**           | CSRF tokens on state-changing requests                | High     |
| **Input validation**          | Server-side validation (Zod or similar)               | High     |
| **File upload security**      | Type validation, size limits, virus scanning (future) | Medium   |

**Acceptance Criteria**:

```
Given an attacker attempts SQL injection
When they submit "'; DROP TABLE users; --" in a form field
Then the input is safely escaped/rejected
And no database changes occur

Given a user uploads a file
When the file type is .exe
Then the system rejects it with "Only images allowed (JPEG, PNG, WebP)"
```

### 3.3 API Security

| Requirement            | Implementation                                                        | Priority |
| ---------------------- | --------------------------------------------------------------------- | -------- |
| **Rate limiting**      | 100 requests/min per IP (auth endpoints), 1000 requests/min (general) | High     |
| **API authentication** | JWT tokens in Authorization header                                    | High     |
| **CORS policy**        | Restrict to allowed origins only                                      | High     |
| **Error messages**     | No sensitive data in error responses                                  | Medium   |

**Implementation**:

```typescript
// Rate limiting example
import { rateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
  const identifier = req.headers.get('x-forwarded-for') || 'anonymous';
  const { success } = await rateLimit(identifier, 100); // 100 req/min

  if (!success) {
    return new Response('Too many requests', { status: 429 });
  }

  // ... handle request
}
```

### 3.4 Dependency Security

| Requirement                       | Implementation                           | Priority |
| --------------------------------- | ---------------------------------------- | -------- |
| **Vulnerability scanning**        | npm audit on every install               | High     |
| **Automated updates**             | Dependabot for security patches          | High     |
| **Zero critical vulnerabilities** | Block deployment if critical vulns exist | High     |
| **Zero high vulnerabilities**     | Fix within 7 days                        | High     |

**CI/CD Integration**:

```yaml
# GitHub Actions
- name: Security audit
  run: npm audit --production --audit-level=high
```

---

## 4. Usability & Accessibility Requirements

### 4.1 Accessibility (WCAG 2.1 Level AA)

| Guideline          | Requirement                                                | Priority |
| ------------------ | ---------------------------------------------------------- | -------- |
| **Perceivable**    | All images have alt text                                   | High     |
|                    | Color contrast ratio ≥ 4.5:1 (text), ≥ 3:1 (UI components) | High     |
|                    | Content adaptable (no info conveyed by color alone)        | High     |
| **Operable**       | All functionality keyboard accessible                      | High     |
|                    | Focus indicators visible (2px outline, distinct color)     | High     |
|                    | No keyboard traps                                          | High     |
|                    | Skip links for navigation                                  | Medium   |
| **Understandable** | Form labels associated with inputs                         | High     |
|                    | Error messages clear and actionable                        | High     |
|                    | Consistent navigation across pages                         | High     |
| **Robust**         | Valid HTML5                                                | High     |
|                    | ARIA landmarks used appropriately                          | High     |
|                    | Compatible with assistive technologies (screen readers)    | High     |

**Testing**:

- Automated: axe-core integrated into E2E tests
- Manual: NVDA/JAWS screen reader testing
- Manual: Keyboard-only navigation testing

**Acceptance Criteria**:

```
Given a user navigates via keyboard only
When they tab through the product page
Then all interactive elements receive focus
And focus order is logical (top to bottom, left to right)
And focus indicators are clearly visible

Given a screen reader user views a product
When the product image is announced
Then the alt text describes the product (e.g., "Ghost Pepper Chocolate Bar package")
```

### 4.2 Usability

| Requirement               | Target                                      | Priority |
| ------------------------- | ------------------------------------------- | -------- |
| **New user registration** | Complete in < 3 minutes (90% of users)      | High     |
| **Guest checkout**        | Complete in < 5 minutes (90% of users)      | High     |
| **Product search**        | Find product in < 30 seconds                | Medium   |
| **Mobile responsiveness** | Full functionality on 320px+ screens        | High     |
| **Form error recovery**   | Clear error messages with inline validation | High     |

**Acceptance Criteria**:

```
Given a new user wants to create an account
When they complete the registration form
Then the process takes < 3 minutes
And all form fields have clear labels
And validation errors appear inline (not just on submit)
And password strength is indicated visually
```

---

## 5. Reliability & Availability Requirements

### 5.1 Uptime

| Metric               | Target                           | Measurement                      | Priority |
| -------------------- | -------------------------------- | -------------------------------- | -------- |
| **Uptime**           | > 99% (monthly)                  | Vercel status, uptime monitoring | High     |
| **Planned downtime** | < 4 hours/year (for maintenance) | Scheduled maintenance windows    | Low      |

**Rationale**: 99% uptime = 7.2 hours downtime/month (acceptable for educational project). Vercel's SLA provides 99.99% for paid plans, free tier has no SLA but typically high uptime.

### 5.2 Error Handling

| Requirement              | Implementation                                     | Priority |
| ------------------------ | -------------------------------------------------- | -------- |
| **Graceful degradation** | Show user-friendly error messages                  | High     |
| **Error logging**        | Log all errors with stack traces                   | High     |
| **User impact**          | Error rate < 1% of requests                        | High     |
| **Recovery**             | Retry transient failures (3 attempts with backoff) | Medium   |

**Acceptance Criteria**:

```
Given the database is temporarily unavailable
When a user attempts to load products
Then they see "We're experiencing technical difficulties. Please try again in a moment."
And the error is logged for investigation
And the page suggests refreshing

Given an API request fails
When it's a transient error (network timeout)
Then the system retries up to 3 times with exponential backoff
```

### 5.3 Data Integrity

| Requirement            | Implementation                                    | Priority |
| ---------------------- | ------------------------------------------------- | -------- |
| **Order consistency**  | Database transactions (ACID)                      | High     |
| **Inventory accuracy** | Atomic stock updates                              | High     |
| **No data loss**       | Database backups (automated via hosting provider) | High     |
| **Idempotency**        | Prevent duplicate orders                          | High     |

**Acceptance Criteria**:

```
Given 2 users attempt to purchase the last item simultaneously
When both submit orders
Then only 1 order succeeds
And stock correctly decreases to 0
And the second user sees "Out of stock" error
```

---

## 6. Scalability Requirements

### 6.1 Free Tier Constraints

| Resource                        | Free Tier Limit                | Design Consideration                | Priority |
| ------------------------------- | ------------------------------ | ----------------------------------- | -------- |
| **Vercel Bandwidth**            | 100GB/month                    | Optimize images, use CDN            | High     |
| **Vercel Serverless Functions** | 100GB-hours/month              | Efficient function code             | Medium   |
| **Database Storage**            | 500MB (Supabase) or 3GB (Neon) | Limit product images, compress data | Medium   |
| **Database Connections**        | 10-20 concurrent               | Connection pooling                  | Medium   |

**Implementation**:

- Image optimization (Next.js Image component, WebP format)
- Lazy loading for images
- Pagination for all lists (max 20 items/page)
- Database connection pooling (Prisma or PgBouncer)

### 6.2 Scalability Targets

| Metric               | Current Design     | Future (if needed)                     | Priority |
| -------------------- | ------------------ | -------------------------------------- | -------- |
| **Product catalog**  | Up to 500 products | Search indexing (Algolia, Meilisearch) | Low      |
| **Concurrent users** | 100 users          | Caching layer (Redis), CDN             | Low      |
| **Orders per day**   | 100 orders         | Async processing (queues)              | Low      |

**Rationale**: Educational project doesn't need massive scale. Design for reasonable limits, document scaling path.

---

## 7. Compatibility Requirements

### 7.1 Browser Support

| Browser                     | Version               | Priority |
| --------------------------- | --------------------- | -------- |
| **Chrome**                  | Last 2 major versions | High     |
| **Firefox**                 | Last 2 major versions | High     |
| **Safari**                  | Last 2 major versions | High     |
| **Edge**                    | Last 2 major versions | High     |
| **Mobile Safari (iOS)**     | iOS 14+               | High     |
| **Chrome Mobile (Android)** | Android 10+           | High     |

**Rationale**: Modern browsers only (ES2020+). No IE11 support (saves development time, enables modern features).

**Testing**: BrowserStack or manual testing on real devices.

### 7.2 Device Support

| Device Type | Screen Size | Priority |
| ----------- | ----------- | -------- |
| **Desktop** | 1920x1080+  | High     |
| **Laptop**  | 1366x768+   | High     |
| **Tablet**  | 768px+      | High     |
| **Mobile**  | 320px+      | High     |

**Implementation**: Mobile-first responsive design with breakpoints:

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

**Acceptance Criteria**:

```
Given a user accesses the site on iPhone SE (375px width)
When they browse products
Then the layout adapts to single column
And all buttons are touch-friendly (min 44x44px)
And text is readable (min 16px font size)
```

---

## 8. Maintainability Requirements

### 8.1 Code Quality

| Metric                     | Target            | Measurement          | Priority |
| -------------------------- | ----------------- | -------------------- | -------- |
| **Code coverage**          | ≥ 80%             | Jest/Coverage report | High     |
| **Cyclomatic complexity**  | < 10 per function | ESLint               | High     |
| **TypeScript strict mode** | Enabled           | tsc --noEmit         | High     |
| **ESLint errors**          | 0                 | ESLint               | High     |
| **Code duplication**       | < 5%              | SonarQube (optional) | Medium   |

**Implementation**:

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### 8.2 Documentation

| Requirement       | Standard                        | Priority |
| ----------------- | ------------------------------- | -------- |
| **README**        | Setup instructions, tech stack  | High     |
| **API docs**      | Endpoint list with examples     | High     |
| **Code comments** | JSDoc for public functions      | Medium   |
| **ADRs**          | Architecture decisions recorded | Medium   |
| **Runbooks**      | Deployment, troubleshooting     | Medium   |

---

## 9. Portability Requirements

| Requirement            | Implementation                            | Priority |
| ---------------------- | ----------------------------------------- | -------- |
| **Database agnostic**  | Use ORM (Prisma) for portability          | Medium   |
| **Environment config** | .env files, no hardcoded values           | High     |
| **Deployment**         | Docker support (optional, Vercel primary) | Low      |

---

## 10. NFR Acceptance Criteria

### 10.1 Performance Acceptance

- [ ] Lighthouse Performance score ≥ 90 on all key pages
- [ ] API p95 response times < 500ms
- [ ] Database queries < 100ms (average)
- [ ] Page load (LCP) < 2.5s

### 10.2 Security Acceptance

- [ ] Zero critical/high npm vulnerabilities
- [ ] All passwords hashed with bcrypt
- [ ] HTTPS enforced
- [ ] CSRF protection on forms
- [ ] Input validation on all endpoints
- [ ] Rate limiting on authentication endpoints

### 10.3 Accessibility Acceptance

- [ ] Lighthouse Accessibility score ≥ 90
- [ ] Zero axe-core violations
- [ ] Keyboard navigation functional
- [ ] Screen reader testing passed (manual)
- [ ] Color contrast ratios ≥ 4.5:1

### 10.4 Reliability Acceptance

- [ ] Error rate < 1%
- [ ] No unhandled exceptions in production
- [ ] Database transactions for critical operations
- [ ] Graceful error messages

### 10.5 Maintainability Acceptance

- [ ] Code coverage ≥ 80%
- [ ] Zero ESLint errors
- [ ] Zero TypeScript errors
- [ ] Cyclomatic complexity < 10
- [ ] All code reviewed

---

## 11. NFR Testing Strategy

### 11.1 Performance Testing

**Tools**: Lighthouse CI, k6, Vercel Analytics

**Tests**:

1. **Load testing**: 100 concurrent users for 10 minutes
2. **Stress testing**: Ramp to breaking point (find limits)
3. **Spike testing**: Sudden traffic burst simulation
4. **Endurance testing**: Sustained load for 1 hour

### 11.2 Security Testing

**Tools**: npm audit, OWASP ZAP (optional), Snyk

**Tests**:

1. **Dependency scanning**: Every PR
2. **SQL injection**: Manual testing with payloads
3. **XSS testing**: Manual testing with scripts
4. **Authentication testing**: Invalid credentials, session expiry
5. **Authorization testing**: Role-based access

### 11.3 Accessibility Testing

**Tools**: axe-core, Lighthouse, NVDA/JAWS

**Tests**:

1. **Automated axe-core**: Every E2E test
2. **Lighthouse audit**: Every deployment
3. **Keyboard navigation**: Manual testing
4. **Screen reader**: Manual testing with NVDA
5. **Color contrast**: Manual audit with tools

### 11.4 Compatibility Testing

**Tools**: BrowserStack, real devices

**Tests**:

1. **Browser matrix**: Chrome, Firefox, Safari, Edge (last 2 versions)
2. **Mobile devices**: iPhone, Android (various sizes)
3. **Responsive breakpoints**: 320px, 768px, 1024px, 1920px

---

## 12. Document Control

**Version History**:

| Version | Date       | Author                 | Changes                                           |
| ------- | ---------- | ---------------------- | ------------------------------------------------- |
| 1.0.0   | 2025-10-19 | Antonio Gomez Gallardo | Initial NFRs based on ISO/IEC 25010 and Module 06 |

**Next Review**: After Slice 1 completion (validate performance targets)

---

_These non-functional requirements follow Module 06: Quality Attributes and industry standards (ISO/IEC 25010, WCAG 2.1, OWASP). They are measurable, testable, and aligned with free-tier constraints._
