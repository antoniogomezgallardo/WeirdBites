# Code Review Guidelines

**Version**: 1.0.0
**Date**: 2025-10-28
**Status**: ✅ **ACTIVE**
**Reference**: Module 03 Phase 3 - Code Review Standards

---

## Overview

This document provides comprehensive guidelines for conducting effective code reviews at WeirdBites. It's based on industry best practices from Google, Microsoft, and the quality-standards framework.

### Goals of Code Review

1. **Maintain Code Quality** - Ensure code meets our quality standards
2. **Catch Bugs Early** - Find issues before they reach production
3. **Share Knowledge** - Learn from each other, spread best practices
4. **Ensure Consistency** - Keep codebase consistent and maintainable
5. **Foster Collaboration** - Build team culture of mutual support
6. **Mentor Developers** - Help each other grow and improve

### Core Principles

- **Be Kind and Constructive** - Focus on code, not the person
- **Be Thorough but Efficient** - Balance quality with velocity
- **Be Educational** - Explain why, share knowledge
- **Be Timely** - Respond within 24 hours
- **Be Consistent** - Apply standards uniformly

---

## The 8 Dimensions of Code Review

Based on [Google Engineering Practices](https://google.github.io/eng-practices/review/), we evaluate code across 8 dimensions:

### 1. Design & Architecture

**What to Look For**:

- Does the code fit into the existing architecture?
- Are the abstractions at the right level?
- Is the code in the right place?
- Are there architectural changes that should be discussed first?

**Good Design**:

```typescript
// ✅ Good - Single Responsibility, clear abstraction
export async function getProductById(id: string): Promise<Product> {
  const product = await db.product.findUnique({ where: { id } });
  if (!product) throw new NotFoundError('Product not found');
  return product;
}
```

**Poor Design**:

```typescript
// ❌ Bad - Doing too much, mixing concerns
export async function getProduct(id: string, req: Request) {
  const user = await getUser(req.cookies.token);
  const product = await db.product.findUnique({ where: { id } });
  if (!product) return null;
  await db.log.create({ data: { userId: user.id, action: 'view' } });
  return product;
}
```

**Feedback Example**:

```
blocking: This function is doing too much (auth, fetch, logging). Consider:
1. Move auth to middleware
2. Extract logging to a separate function
3. Throw error instead of returning null (consistent error handling)

Reference: docs/quality-standards/docs/07-development-practices/clean-code.md
```

### 2. Functionality

**What to Look For**:

- Does the code do what the developer intended?
- Is the code good for users?
- Are edge cases handled?
- Is error handling comprehensive?

**Good Functionality**:

```typescript
// ✅ Good - Handles edge cases
export function calculateDiscount(price: number, discountPercent: number): number {
  if (price < 0) throw new Error('Price cannot be negative');
  if (discountPercent < 0 || discountPercent > 100) {
    throw new Error('Discount must be between 0 and 100');
  }
  return price * (1 - discountPercent / 100);
}
```

**Poor Functionality**:

```typescript
// ❌ Bad - No validation, potential issues
export function calculateDiscount(price: number, discountPercent: number): number {
  return price * (1 - discountPercent / 100);
}
```

**Feedback Example**:

```
blocking: Missing input validation. What happens if:
- price is negative?
- discountPercent is > 100?
- discountPercent is negative?

Add validation and tests for these edge cases.
```

### 3. Complexity

**What to Look For**:

- Is the code more complex than it needs to be?
- Would another developer understand it quickly?
- Can it be simplified?

**Good Complexity**:

```typescript
// ✅ Good - Simple and clear
export function isEligibleForDiscount(user: User): boolean {
  return user.isPremium || user.totalOrders > 10;
}
```

**Poor Complexity**:

```typescript
// ❌ Bad - Unnecessarily complex
export function isEligibleForDiscount(user: User): boolean {
  let eligible = false;
  if (user.isPremium === true) {
    eligible = true;
  } else {
    if (user.totalOrders > 10) {
      eligible = true;
    } else {
      eligible = false;
    }
  }
  return eligible;
}
```

**Feedback Example**:

```
nit: This can be simplified to a single expression:
  return user.isPremium || user.totalOrders > 10;

Simpler code is easier to understand and maintain.
```

### 4. Tests

**What to Look For**:

- Are there tests for new code?
- Do tests cover edge cases?
- Are tests clear and maintainable?
- Is test coverage > 80%?

**Good Tests**:

```typescript
// ✅ Good - Clear, comprehensive
describe('calculateDiscount', () => {
  it('should apply 20% discount to valid price', () => {
    expect(calculateDiscount(100, 20)).toBe(80);
  });

  it('should throw error for negative price', () => {
    expect(() => calculateDiscount(-100, 20)).toThrow('Price cannot be negative');
  });

  it('should throw error for discount > 100', () => {
    expect(() => calculateDiscount(100, 150)).toThrow('Discount must be between 0 and 100');
  });
});
```

**Feedback Example**:

```
blocking: Missing tests for edge cases:
1. What if discountPercent is 0?
2. What if discountPercent is 100?
3. What if price is 0?

Please add tests for these scenarios. Target: >80% coverage.
```

### 5. Naming

**What to Look For**:

- Are names descriptive and clear?
- Do names follow project conventions?
- Are abbreviations avoided?

**Good Naming**:

```typescript
// ✅ Good - Clear, descriptive
const MAX_RETRY_ATTEMPTS = 3;

function getUserByEmail(email: string): Promise<User> {}
function calculateTotalPriceWithTax(price: number, taxRate: number): number {}
```

**Poor Naming**:

```typescript
// ❌ Bad - Unclear, abbreviated
const MAX = 3;

function get(e: string): Promise<User> {}
function calc(p: number, t: number): number {}
```

**Feedback Example**:

```
nit: Consider more descriptive names:
- `get` → `getUserByEmail`
- `calc` → `calculateTotalPriceWithTax`
- `p` → `price`
- `t` → `taxRate`

Clear names make code self-documenting.
```

### 6. Comments

**What to Look For**:

- Do comments explain WHY, not WHAT?
- Are complex algorithms explained?
- Are comments up to date?
- Is JSDoc present for public functions?

**Good Comments**:

```typescript
// ✅ Good - Explains WHY
// We use exponential backoff to avoid overwhelming the payment API
// during high traffic periods (per API provider recommendation)
async function retryPayment(attempt: number): Promise<void> {
  await sleep(Math.pow(2, attempt) * 1000);
}

/**
 * Calculates shipping cost based on weight and distance.
 * @param weightKg - Package weight in kilograms
 * @param distanceKm - Distance in kilometers
 * @returns Shipping cost in USD
 */
export function calculateShippingCost(weightKg: number, distanceKm: number): number {
  // Formula based on carrier contract terms (updated Q4 2024)
  return weightKg * 0.5 + distanceKm * 0.1;
}
```

**Poor Comments**:

```typescript
// ❌ Bad - States the obvious
// Add 1 to i
i = i + 1;

// ❌ Bad - Outdated or wrong
// This function returns the user's age (actually returns birth year)
function getUserBirthYear(user: User): number {
  return user.birthYear;
}
```

**Feedback Example**:

```
question: Can you add a comment explaining why we use exponential backoff here?
It would help future maintainers understand the reasoning.

Also, consider adding JSDoc for this public function.
```

### 7. Style & Formatting

**What to Look For**:

- Does code follow project style guide?
- Is formatting consistent?
- Does ESLint pass?
- Does Prettier pass?

**Note**: Most style issues are caught automatically by our pre-commit hooks (ESLint, Prettier). Focus review time on logic and design.

**Feedback Example**:

```
nit: ESLint is showing a warning here. Run `pnpm lint:fix` to auto-fix.

(In general, our pre-commit hooks catch these, but sometimes they slip through)
```

### 8. Documentation

**What to Look For**:

- Are README updates needed?
- Are API changes documented?
- Are breaking changes documented?
- Are setup instructions updated?

**Feedback Example**:

```
blocking: This PR adds a new environment variable `PAYMENT_API_KEY`.
Please add it to:
1. `.env.example` with a placeholder
2. `README.md` setup instructions
3. `docs/setup/project-setup.md`
```

---

## Review Process

### 1. When to Review

**Review Timing**:

- **Solo Development**: Self-review using both checklists, then approve
- **Team Development**: Review within 24 hours (same day preferred)
- **Urgent Fixes**: Review within 4 hours
- **Large PRs**: May take longer, split into smaller PRs if possible

**Priority Order**:

1. Production bugs (urgent)
2. Blocking PRs (team members waiting)
3. Feature PRs (normal flow)
4. Refactoring PRs (low priority)

### 2. How to Review

**Step-by-Step Process**:

#### Step 1: Understand the Context (5 min)

```
1. Read PR title and description
2. Check related issue/user story
3. Understand acceptance criteria
4. Check PR size and complexity
```

#### Step 2: High-Level Review (10 min)

```
1. Review overall design and architecture
2. Check if approach makes sense
3. Identify any major issues
4. Comment on design before diving into details
```

**Why?** No point reviewing implementation if the design is wrong.

#### Step 3: Detailed Review (20-30 min)

```
1. Review file by file, line by line
2. Use code-review-checklist.md
3. Add inline comments for specific issues
4. Test the code locally if needed
```

#### Step 4: Test the Changes (10-15 min)

```bash
# Check out the PR branch
gh pr checkout 123

# Run tests
pnpm test
pnpm test:e2e

# Run the app
pnpm dev

# Manual testing
# - Test happy path
# - Test edge cases
# - Test UI changes
```

#### Step 5: Provide Feedback (5-10 min)

```
1. Summarize your review
2. Categorize issues (blocking vs nit vs question)
3. Provide constructive suggestions
4. Acknowledge good work
5. Choose review action: Approve, Request Changes, or Comment
```

**Total Time**: 50-70 minutes for a typical PR (~200 lines)

### 3. Review Actions

**Approve** ✅

- All quality standards met
- No blocking issues
- Minor nits are acceptable
- Ready to merge

**Request Changes** 🔴

- Blocking issues found
- Must be addressed before merge
- Author should fix and re-request review

**Comment** 💬

- Feedback provided
- Not blocking merge
- Questions or suggestions
- FYI comments

---

## Writing Effective Feedback

### The Sandwich Method

**Structure**:

1. **Positive**: Start with something good
2. **Constructive**: Provide feedback
3. **Positive**: End with encouragement

**Example**:

```
Great work on implementing the product filtering feature! The logic is clear and well-tested.

blocking: I noticed a potential N+1 query issue in getProducts(). Consider using Prisma's
`include` to fetch categories in a single query instead of a loop.

Overall, this is solid work. Looking forward to seeing this merged!
```

### Comment Prefixes

Use prefixes to indicate comment severity:

- `blocking:` - Must be addressed before merge
- `nit:` - Minor suggestion, not blocking
- `question:` - Seeking clarification
- `praise:` - Acknowledging good work
- `suggestion:` - Alternative approach to consider
- `fyi:` - Information, no action needed

**Examples**:

```
blocking: Missing input validation for user email. Add Zod schema validation.

nit: Consider renaming `getData()` to `getProductData()` for clarity.

question: Why did you choose this approach over using React Query?

praise: Excellent test coverage! 95% is well above our 80% target.

suggestion: You might consider extracting this logic to a custom hook for reusability.

fyi: There's a related PR (#42) working on similar functionality. Might be worth syncing.
```

### Be Specific and Actionable

**Bad Feedback** ❌:

```
This is messy.
This doesn't look right.
Can you improve this?
```

**Good Feedback** ✅:

```
blocking: This function is doing too much. Consider:
1. Extracting the validation logic to a separate function
2. Moving the database call to a repository layer
3. Splitting into smaller, single-purpose functions

Example:
  validateUserInput(data)
  const user = await userRepository.create(data)
  sendWelcomeEmail(user)
```

### Explain WHY

Don't just point out issues—explain the reasoning.

**Bad Feedback** ❌:

```
Don't use any type.
```

**Good Feedback** ✅:

```
nit: Avoid using `any` type here. It defeats the purpose of TypeScript by disabling
type checking. Consider using:
  type Product = { id: string; name: string; price: number }

This provides autocomplete and catches type errors at compile time.
```

### Balance Positive and Negative

Don't just point out problems—acknowledge good work too.

**Example**:

```
praise: Love the use of Zod for validation here! Makes the code much safer and more maintainable.

blocking: Missing error handling for the database call. What if the query fails?

praise: The test coverage is excellent—95% is well above our target.

nit: Consider extracting this magic number (86400000) to a named constant like MS_PER_DAY.
```

---

## Handling Large PRs

### What is a "Large" PR?

- **Small**: < 200 lines changed ✅ (ideal)
- **Medium**: 200-400 lines changed ⚠️ (acceptable)
- **Large**: > 400 lines changed 🔴 (problematic)

### Strategies for Large PRs

#### Option 1: Request Splitting

```
question: This PR is quite large (800+ lines). Would it be possible to split into:
1. Database schema changes + migrations
2. API implementation
3. Frontend components

This would make review more thorough and faster.
```

#### Option 2: Multiple Review Passes

```
Pass 1: Architecture and design
Pass 2: Implementation details
Pass 3: Tests and documentation
```

#### Option 3: Pair Review

```
Schedule a 30-60 min call to walk through the changes together.
```

#### Option 4: Focus on Risk Areas

```
Review high-risk areas thoroughly:
1. Security-critical code
2. Complex business logic
3. Database migrations

Skim low-risk areas:
1. Generated code
2. Config files
3. Test fixtures
```

---

## Common Review Scenarios

### Scenario 1: Disagreement on Approach

**Situation**: You think the author's approach is wrong, but they disagree.

**Resolution**:

1. **Discuss offline** - Schedule a call to discuss
2. **Seek third opinion** - Ask another team member
3. **Check standards** - Reference quality-standards docs
4. **Compromise** - Is there a middle ground?
5. **Document decision** - ADR (Architecture Decision Record)

**Example**:

```
question: I'm concerned about the performance implications of this approach.
Can we schedule a quick call to discuss alternatives?

I'm thinking we could use caching or pagination to address the scale issue.
What do you think?
```

### Scenario 2: Nitpicks vs Blocking Issues

**Situation**: You found many small issues. Should you block the PR?

**Resolution**:

- **Blocking issues**: Security, bugs, breaking changes, missing tests
- **Non-blocking issues**: Style, minor refactoring, naming

**Example**:

```
Approve: This is good to merge! Just a few minor nits:

nit: Consider renaming `process()` to `processPayment()` for clarity
nit: This comment could be more detailed
nit: Might be worth extracting this to a utility

But these are minor. Feel free to merge as-is or address in a follow-up PR.
```

### Scenario 3: Learning Opportunity

**Situation**: Code works but could be improved using a pattern the author doesn't know.

**Resolution**:

- **Teach, don't block** - Share knowledge without blocking merge
- **Provide examples** - Show the pattern in action
- **Link resources** - Reference docs or articles

**Example**:

```
praise: This works well! For future reference, React Query would simplify this code:

  const { data, isLoading } = useQuery(['products'], getProducts)

It handles loading states, caching, and refetching automatically. Worth checking out:
https://tanstack.com/query/latest

But the current implementation is fine. Approving!
```

### Scenario 4: Missing Tests

**Situation**: PR has no tests or insufficient coverage.

**Resolution**:

- **Block if critical** - For complex logic, security-critical code
- **Don't block if simple** - For trivial changes, documentation
- **Be specific** - Point out which scenarios need tests

**Example**:

```
blocking: Missing tests for the new authentication logic. Please add:

1. Unit tests for validateToken():
   - Valid token
   - Expired token
   - Invalid signature
   - Missing token

2. Integration test for /api/auth endpoint:
   - Successful authentication
   - Failed authentication
   - Rate limiting

Target: >80% coverage (currently at 45%)
```

### Scenario 5: Security Concerns

**Situation**: You spotted a potential security issue.

**Resolution**:

- **Always block** - Security issues are never "nits"
- **Explain the risk** - Help author understand the threat
- **Suggest fix** - Provide specific remediation steps
- **Reference standards** - Link to OWASP, quality-standards

**Example**:

```
blocking: Security issue - SQL injection vulnerability

This code is vulnerable to SQL injection:
  db.query(`SELECT * FROM users WHERE email = '${email}'`)

Please use Prisma's parameterized queries:
  db.user.findUnique({ where: { email } })

Reference: https://owasp.org/www-community/attacks/SQL_Injection
Module 06: docs/quality-standards/docs/06-quality-attributes/security.md
```

---

## Review Etiquette

### DO ✅

1. **Be Kind and Respectful**
   - Focus on code, not the person
   - Assume positive intent
   - Use "we" instead of "you" ("We could improve this...")

2. **Be Specific and Actionable**
   - Provide concrete suggestions
   - Link to documentation
   - Show code examples

3. **Be Timely**
   - Respond within 24 hours
   - Prioritize urgent PRs
   - Set expectations if you need more time

4. **Be Educational**
   - Explain WHY, not just WHAT
   - Share knowledge and resources
   - Treat reviews as learning opportunities

5. **Be Thorough but Efficient**
   - Use checklists
   - Focus on high-impact issues
   - Don't bikeshed on trivial matters

6. **Acknowledge Good Work**
   - Praise clever solutions
   - Recognize effort
   - Build positive team culture

### DON'T ❌

1. **Don't Be Vague**
   - ❌ "This is bad"
   - ✅ "This has an O(n²) complexity. Consider using a Map for O(n)."

2. **Don't Be Dismissive**
   - ❌ "Just rewrite this"
   - ✅ "Consider refactoring this into smaller functions for testability"

3. **Don't Nitpick Excessively**
   - Focus on important issues
   - Use `nit:` prefix for minor suggestions
   - Consider if it's worth the author's time

4. **Don't Ignore Your Own Standards**
   - Apply the same standards you expect from others
   - Review your own PRs thoroughly
   - Lead by example

5. **Don't Review When Distracted**
   - Block 30-60 min of focused time
   - Review thoroughly or not at all
   - Quality over speed

6. **Don't Delay Without Communication**
   - If you can't review soon, say so
   - Suggest another reviewer
   - Set expectations

---

## Review Response Time

### Expected Response Times

| PR Type        | Response Time | Justification           |
| -------------- | ------------- | ----------------------- |
| Production Bug | < 4 hours     | Urgent, impacts users   |
| Blocking PR    | < 8 hours     | Team members waiting    |
| Feature PR     | < 24 hours    | Normal development flow |
| Refactoring    | < 48 hours    | Lower priority          |
| Documentation  | < 48 hours    | Lower priority          |

### If You Can't Review on Time

**Option 1**: Communicate delay

```
Thanks for the PR! I'm swamped today. Can review tomorrow morning (10 AM).
In the meantime, @teammate might be able to review faster if it's urgent.
```

**Option 2**: Quick high-level review

```
Quick high-level review: Architecture looks good, will do detailed review tomorrow.
If urgent, feel free to get another reviewer.
```

**Option 3**: Delegate

```
I won't be able to review this today. @teammate has context on this area,
requesting their review instead.
```

---

## Metrics & Continuous Improvement

### Track Review Metrics

**Key Metrics**:

- Average review response time
- Average review completion time
- Number of review iterations per PR
- Defects found in review vs production
- Review feedback acceptance rate

**Goal**: Improve over time, measure effectiveness

### Retrospectives

**Monthly Review Health Check**:

1. Are reviews timely?
2. Is feedback constructive?
3. Are we catching bugs in review?
4. Are reviews a learning opportunity?
5. Is the process efficient?

**Adjust process based on feedback**

---

## Tools & Resources

### Checklists

- [Code Review Checklist](templates/code-review-checklist.md) - For reviewers
- [Self-Review Checklist](templates/self-review-checklist.md) - For authors

### Documentation

- [CONTRIBUTING.md](../../CONTRIBUTING.md) - Development workflow
- [Module 03 Summary](module-03-summary.md) - Version control overview
- [quality-standards](../quality-standards/) - Industry best practices

### External Resources

- [Google Engineering Practices](https://google.github.io/eng-practices/review/)
- [Microsoft Code Review Guide](https://github.com/microsoft/code-with-engineering-playbook/tree/main/docs/code-reviews)
- [Conventional Comments](https://conventionalcomments.org/)

### GitHub Features

- **Review Comments** - Inline feedback on specific lines
- **Review Summary** - Overall feedback and decision
- **Suggested Changes** - Propose code changes directly
- **Request Changes** - Block merge until addressed
- **Review Threads** - Track resolution of comments

---

## Conclusion

Effective code reviews are one of the most powerful tools for maintaining code quality and building team culture. By following these guidelines, we can:

- ✅ Catch bugs before production
- ✅ Maintain consistent code quality
- ✅ Share knowledge and learn from each other
- ✅ Build better software together

**Remember**: The goal is not perfection, but continuous improvement. Be kind, be constructive, and be collaborative.

---

**Last Updated**: 2025-10-28
**Status**: ✅ **ACTIVE**
**Module**: 03 - Version Control & Branching
**Phase**: 3 - Code Review Standards
