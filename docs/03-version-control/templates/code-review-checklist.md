# Code Review Checklist

**Version**: 1.0.0
**Purpose**: Reviewer checklist for conducting thorough, constructive code reviews
**Reference**: Module 03 Phase 3 - Code Review Standards

---

## How to Use This Checklist

1. **Copy this template** for each PR review
2. **Check applicable items** as you review
3. **Add comments** inline in the PR for specific issues
4. **Summarize findings** in your review comment
5. **Choose review action**: Approve, Request Changes, or Comment

**Remember**: Focus on the code, not the person. Be constructive, specific, and helpful.

---

## 1. Functionality

**Does the code do what it's supposed to do?**

- [ ] **Requirements Met**: Code implements all acceptance criteria from the user story
- [ ] **Happy Path Works**: Main functionality works as expected
- [ ] **Edge Cases Handled**: Boundary conditions, empty states, null values handled
- [ ] **Error Handling**: Errors are caught, logged, and handled gracefully
- [ ] **User Experience**: UI changes are intuitive and user-friendly
- [ ] **Accessibility**: WCAG 2.1 compliance (if UI changes)
- [ ] **Performance**: No obvious performance issues (slow queries, memory leaks)
- [ ] **Security**: No security vulnerabilities introduced

**Notes**:

---

## 2. Design & Architecture

**Is the code well-structured and maintainable?**

- [ ] **Fits Project Architecture**: Follows established patterns (Next.js App Router, Prisma, etc.)
- [ ] **Single Responsibility**: Each function/component does one thing well
- [ ] **Separation of Concerns**: Business logic separated from UI, API logic separated from data layer
- [ ] **Dependencies**: No unnecessary dependencies added
- [ ] **Reusability**: Common logic extracted to utilities/hooks
- [ ] **SOLID Principles**: Code follows SOLID where applicable
- [ ] **No Over-Engineering**: Solution is as simple as possible but not simpler

**Notes**:

---

## 3. Code Quality

**Is the code clean and readable?**

- [ ] **Clean Code Principles**: Follows clean code practices (Module 07)
- [ ] **DRY**: No duplicate code (Don't Repeat Yourself)
- [ ] **KISS**: Keep It Simple, Stupid - no unnecessary complexity
- [ ] **Naming**: Variables, functions, components have clear, descriptive names
- [ ] **Magic Numbers**: No hardcoded values, use constants
- [ ] **Function Length**: Functions are < 50 lines (ideally < 20)
- [ ] **File Length**: Files are < 500 lines (split if larger)
- [ ] **Cyclomatic Complexity**: No deeply nested conditionals (max 3-4 levels)
- [ ] **TypeScript**: Proper types, no `any` unless justified
- [ ] **ESLint**: No linting errors or warnings

**Notes**:

---

## 4. Testing

**Are tests comprehensive and meaningful?**

- [ ] **Test Coverage**: Coverage > 80% for new/changed code
- [ ] **Unit Tests**: Core logic has unit tests
- [ ] **Integration Tests**: API routes have integration tests
- [ ] **E2E Tests**: Critical user flows have E2E tests (if applicable)
- [ ] **Test Quality**: Tests are clear, isolated, and deterministic
- [ ] **Edge Cases**: Tests cover error cases and edge cases
- [ ] **Test Names**: Test descriptions are clear (Given-When-Then format)
- [ ] **No Flaky Tests**: Tests pass consistently
- [ ] **Performance Tests**: Performance-critical code has benchmarks (if applicable)

**Notes**:

---

## 5. Security

**Is the code secure?**

- [ ] **No Secrets**: No API keys, passwords, or credentials in code
- [ ] **Input Validation**: All user input is validated and sanitized
- [ ] **SQL Injection**: Using Prisma properly, no raw SQL (or parameterized if necessary)
- [ ] **XSS Prevention**: User content is escaped/sanitized
- [ ] **CSRF Protection**: API routes use CSRF tokens (if applicable)
- [ ] **Authentication**: Auth checks in place for protected routes
- [ ] **Authorization**: Proper permission checks (users can only access their own data)
- [ ] **Dependencies**: No high/critical vulnerabilities (npm audit passes)
- [ ] **Error Messages**: Error messages don't leak sensitive info

**Notes**:

---

## 6. Performance

**Is the code efficient?**

- [ ] **Database Queries**: Efficient queries, proper indexes, no N+1 problems
- [ ] **Algorithm Complexity**: Algorithms are efficient (no O(n²) where O(n log n) works)
- [ ] **Pagination**: Large datasets use pagination/cursor-based pagination
- [ ] **Caching**: Appropriate use of caching (React Query, Next.js cache)
- [ ] **Bundle Size**: No unnecessary imports, tree-shaking works
- [ ] **Images**: Images optimized (Next.js Image component, proper formats)
- [ ] **API Responses**: API returns only necessary data
- [ ] **Memory Leaks**: No obvious memory leaks (event listeners cleaned up)

**Notes**:

---

## 7. Documentation

**Is the code well-documented?**

- [ ] **Code Comments**: Complex logic has explanatory comments
- [ ] **JSDoc**: Functions have JSDoc comments (params, returns, throws)
- [ ] **README Updates**: README updated if setup/usage changed
- [ ] **API Documentation**: API endpoints documented if added/changed
- [ ] **CHANGELOG**: Changes follow conventional commits (will auto-generate changelog)
- [ ] **Migration Guides**: Breaking changes documented (if applicable)
- [ ] **TODO Comments**: No leftover TODO/FIXME without tickets

**Notes**:

---

## 8. Pull Request Quality

**Is the PR well-structured?**

- [ ] **PR Title**: Follows conventional commits format (`type(scope): description`)
- [ ] **PR Description**: Clear summary, test plan, related issues
- [ ] **Commit Messages**: All commits follow conventional commits
- [ ] **Commit Size**: Commits are small and logical (not "WIP" or "fix")
- [ ] **Branch Name**: Descriptive branch name (`feature/`, `fix/`, etc.)
- [ ] **PR Size**: PR is < 400 lines changed (if larger, justification provided)
- [ ] **Self-Review**: Author checked "Self-Review Completed" in PR template
- [ ] **CI Passes**: All 7 quality gates pass (lint, typecheck, test, e2e, build, security, quality-gate)
- [ ] **No Merge Conflicts**: Branch is up to date with main

**Notes**:

---

## 9. Dependencies

**Are dependency changes justified?**

- [ ] **Necessary**: New dependencies are truly needed
- [ ] **Maintained**: Dependencies are actively maintained
- [ ] **License**: Dependencies have compatible licenses (MIT, Apache, etc.)
- [ ] **Bundle Impact**: New dependencies don't significantly increase bundle size
- [ ] **Security**: Dependencies have no known vulnerabilities
- [ ] **Alternatives**: Considered lighter alternatives
- [ ] **lockfile**: `pnpm-lock.yaml` updated correctly

**Notes**:

---

## 10. Deployment Considerations

**Is the code production-ready?**

- [ ] **Feature Flags**: Incomplete features behind feature flags
- [ ] **Database Migrations**: Migrations are safe (backward compatible if needed)
- [ ] **Environment Variables**: New env vars documented in `.env.example`
- [ ] **Backward Compatible**: Changes don't break existing functionality
- [ ] **Rollback Plan**: Can be rolled back if needed
- [ ] **Monitoring**: Errors are logged and monitorable
- [ ] **Configuration**: No hardcoded production URLs/settings

**Notes**:

---

## Review Summary

**Overall Assessment**:

- [ ] **Approve**: Code is ready to merge
- [ ] **Request Changes**: Issues must be addressed before merge
- [ ] **Comment**: Feedback provided, but not blocking

## **Key Strengths**:

## **Areas for Improvement**:

## **Action Items**:

**Estimated Time to Address**: [< 30 min | 1-2 hours | > 2 hours]

---

## Review Principles

**Remember**:

1. **Be Kind**: Assume positive intent, focus on code not person
2. **Be Specific**: "Consider extracting this to a utility" > "This is messy"
3. **Be Constructive**: Suggest solutions, not just problems
4. **Be Timely**: Review within 24 hours (same day preferred)
5. **Be Thorough**: Don't just skim, actually run the code if possible
6. **Be Learning-Focused**: Explain WHY, share knowledge
7. **Be Balanced**: Acknowledge good work, not just issues
8. **Be Clear**: Mark comments as "blocking" vs "nit" vs "question"

**Comment Prefixes**:

- `blocking:` - Must be addressed before merge
- `nit:` - Minor suggestion, not blocking
- `question:` - Seeking clarification
- `praise:` - Acknowledging good work
- `suggestion:` - Alternative approach to consider

---

## Resources

- [Google Engineering Practices - Code Review](https://google.github.io/eng-practices/review/)
- [Review Guidelines](../review-guidelines.md)
- [Self-Review Checklist](self-review-checklist.md)
- [Module 07: Development Practices](../../quality-standards/docs/07-development-practices/)

---

**Last Updated**: 2025-10-28
**Status**: Active
