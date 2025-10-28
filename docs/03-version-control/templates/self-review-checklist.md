# Self-Review Checklist

**Version**: 1.0.0
**Purpose**: Author checklist to complete before requesting code review
**Reference**: Module 03 Phase 3 - Code Review Standards

---

## Purpose

Complete this checklist **before** creating your Pull Request or requesting a review. Self-reviewing your code catches 60-80% of issues that reviewers would find, saving time and iterations.

**Benefits**:

- Faster PR approval (fewer review cycles)
- Better code quality
- Learning opportunity (review your own decisions)
- Respect reviewers' time

---

## Pre-Submission Checklist

**Before you create the PR:**

- [ ] **Code Complete**: All acceptance criteria from user story are met
- [ ] **Self-Review**: Reviewed every line of your own diff on GitHub
- [ ] **Pre-commit Passed**: All pre-commit hooks passed (Prettier, ESLint, TypeScript, tests, security)
- [ ] **CI Passed**: All 7 quality gates passed (lint, typecheck, test, e2e, build, security, quality-gate)
- [ ] **Manual Testing**: Tested the feature manually in dev environment
- [ ] **Browser Testing**: Tested in Chrome/Firefox/Safari (if UI changes)
- [ ] **Mobile Testing**: Tested responsive design (if UI changes)
- [ ] **Accessibility**: Tested with keyboard navigation and screen reader (if UI changes)
- [ ] **Branch Updated**: Branch is up to date with main (no merge conflicts)
- [ ] **Cleanup**: Removed console.logs, commented code, and debug statements

---

## Code Quality Self-Check

**Review your code for quality:**

- [ ] **Naming**: Variables, functions, components have clear, descriptive names
- [ ] **DRY**: No duplicate code (extracted to utilities/hooks if repeated)
- [ ] **KISS**: Solution is simple, not over-engineered
- [ ] **Function Size**: Functions are < 50 lines (ideally < 20)
- [ ] **File Size**: Files are < 500 lines (split into smaller files if needed)
- [ ] **TypeScript**: No `any` types unless absolutely necessary (with comment explaining why)
- [ ] **ESLint**: No linting errors or warnings
- [ ] **Comments**: Complex logic has explanatory comments
- [ ] **Magic Numbers**: No hardcoded values (use constants)
- [ ] **Error Handling**: All async operations have try-catch or error boundaries
- [ ] **Loading States**: UI shows loading indicators for async operations
- [ ] **Empty States**: UI handles empty data gracefully

---

## Testing Self-Check

**Verify your tests are comprehensive:**

- [ ] **Coverage**: New/changed code has > 80% test coverage
- [ ] **Unit Tests**: Core logic has unit tests
- [ ] **Integration Tests**: API routes have integration tests
- [ ] **E2E Tests**: Critical user flows have E2E tests (if applicable)
- [ ] **Test Quality**: Tests are clear, isolated, and deterministic
- [ ] **Edge Cases**: Tests cover error cases and edge cases
- [ ] **Test Names**: Test descriptions follow Given-When-Then format
- [ ] **All Tests Pass**: `pnpm test` passes locally
- [ ] **E2E Pass**: `pnpm test:e2e` passes locally (if E2E tests added)
- [ ] **No Flaky Tests**: Tests pass consistently (run multiple times)

---

## Security Self-Check

**Verify your code is secure:**

- [ ] **No Secrets**: No API keys, passwords, or credentials in code
- [ ] **Environment Variables**: Secrets in `.env.local` (never committed)
- [ ] **Input Validation**: All user input validated with Zod or similar
- [ ] **SQL Injection**: Using Prisma properly, no raw SQL
- [ ] **XSS Prevention**: User content escaped/sanitized
- [ ] **Authentication**: Auth checks for protected routes/API endpoints
- [ ] **Authorization**: Permission checks (users access only their own data)
- [ ] **npm audit**: `pnpm audit --audit-level=high` passes
- [ ] **TruffleHog**: No secrets detected in commits
- [ ] **Error Messages**: Error messages don't leak sensitive info

---

## Performance Self-Check

**Verify your code is efficient:**

- [ ] **Database Queries**: Efficient queries, no N+1 problems
- [ ] **Pagination**: Large datasets use pagination
- [ ] **Caching**: Appropriate use of caching (React Query, Next.js cache)
- [ ] **Bundle Size**: No unnecessary imports, tree-shaking works
- [ ] **Images**: Images optimized (Next.js Image component, WebP format)
- [ ] **API Responses**: API returns only necessary data (no over-fetching)
- [ ] **Memory Leaks**: Event listeners cleaned up in useEffect cleanup
- [ ] **Lazy Loading**: Heavy components lazy-loaded (if applicable)

---

## Documentation Self-Check

**Verify your code is well-documented:**

- [ ] **JSDoc**: Functions have JSDoc comments (params, returns, throws)
- [ ] **README**: README updated if setup/usage changed
- [ ] **API Docs**: API endpoints documented if added/changed
- [ ] **Environment Variables**: New env vars added to `.env.example`
- [ ] **Migration Guide**: Breaking changes documented (if applicable)
- [ ] **Comments**: Complex logic has explanatory comments
- [ ] **No TODOs**: No leftover TODO/FIXME (or tickets created for them)

---

## Pull Request Self-Check

**Verify your PR is well-structured:**

- [ ] **PR Title**: Follows conventional commits (`feat(products): add filtering`)
- [ ] **PR Description**: Includes summary, test plan, related issues
- [ ] **Commit Messages**: All commits follow conventional commits format
- [ ] **Commit Quality**: Commits are small and logical (not "WIP" or "fix stuff")
- [ ] **Branch Name**: Descriptive name (`feature/product-filtering`)
- [ ] **PR Size**: < 400 lines changed (if larger, justification in description)
- [ ] **Screenshots**: UI changes include before/after screenshots
- [ ] **Demo Video**: Complex features include demo video (Loom, etc.)
- [ ] **Related Issues**: PR references user story or issue (`Closes #123`)

---

## Deployment Self-Check

**Verify your code is production-ready:**

- [ ] **Feature Flags**: Incomplete features behind feature flags
- [ ] **Database Migrations**: Migrations tested locally
- [ ] **Backward Compatible**: Changes don't break existing functionality
- [ ] **Rollback Plan**: Can be rolled back if needed
- [ ] **Environment Variables**: Production env vars documented
- [ ] **Configuration**: No hardcoded production URLs/settings
- [ ] **Error Tracking**: Errors are logged properly
- [ ] **Monitoring**: Key metrics are tracked (if applicable)

---

## Dependency Self-Check

**If you added/updated dependencies:**

- [ ] **Necessary**: Dependency is truly needed
- [ ] **Maintained**: Dependency is actively maintained (recent commits/releases)
- [ ] **License**: License is compatible (MIT, Apache, BSD)
- [ ] **Bundle Size**: Checked bundle impact with `pnpm build`
- [ ] **Security**: No known vulnerabilities (`pnpm audit`)
- [ ] **Alternatives**: Considered lighter alternatives
- [ ] **lockfile**: `pnpm-lock.yaml` committed

---

## Common Issues Checklist

**Check for these common mistakes:**

- [ ] **Console Logs**: All `console.log()` removed (use proper logging)
- [ ] **Commented Code**: No commented-out code blocks
- [ ] **Debug Code**: No debug/test code left in
- [ ] **Hardcoded Values**: No hardcoded URLs, IDs, or config
- [ ] **Merge Conflicts**: No merge conflict markers (`<<<<<<<`)
- [ ] **Formatting**: Code is properly formatted (Prettier ran)
- [ ] **Imports**: No unused imports
- [ ] **Variables**: No unused variables
- [ ] **Types**: No TypeScript errors (`pnpm tsc`)
- [ ] **Linting**: No ESLint warnings

---

## Self-Review Process

**How to do a thorough self-review:**

### 1. Review on GitHub (Not in IDE)

```bash
# Push your branch
git push origin feature/your-branch

# Open GitHub compare view
# https://github.com/antoniogomezgallardo/WeirdBites/compare/main...feature/your-branch
```

**Why?** GitHub's diff view shows what reviewers see, helps spot issues.

### 2. Review Each File

- Read every changed line
- Look for: naming issues, complexity, missing tests, security issues
- Add inline comments to yourself if you spot issues
- Fix issues before creating PR

### 3. Review Commit History

```bash
git log --oneline main..HEAD
```

- Do commits tell a story?
- Are messages following conventional commits?
- Should any commits be squashed?

### 4. Run Full Test Suite

```bash
pnpm lint && pnpm format:check && pnpm tsc && pnpm test && pnpm test:e2e
```

- All tests pass?
- Coverage meets 80% threshold?
- No flaky tests?

### 5. Manual Testing

- Test happy path
- Test edge cases (empty states, errors, loading)
- Test on different browsers (Chrome, Firefox, Safari)
- Test responsive design (mobile, tablet, desktop)
- Test keyboard navigation (Tab, Enter, Esc)

### 6. Check CI

- All 7 quality gates pass
- No warnings in CI logs
- Preview deployment works

---

## After Self-Review

**Once you've completed this checklist:**

1. Check the box in the PR template: "- [x] Self-Review Completed"
2. Request review from team members (or self-approve if solo)
3. Respond promptly to review feedback
4. Be open to suggestions and learning opportunities

---

## Resources

- [Code Review Checklist](code-review-checklist.md) (for reviewers)
- [Review Guidelines](../review-guidelines.md)
- [CONTRIBUTING.md](../../../CONTRIBUTING.md)
- [Module 07: Development Practices](../../quality-standards/docs/07-development-practices/)

---

**Remember**: Self-reviewing is a skill. The more you do it, the better your initial code becomes, and the fewer issues reviewers find. This is how you grow as a developer.

---

**Last Updated**: 2025-10-28
**Status**: Active
