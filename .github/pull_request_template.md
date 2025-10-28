# Pull Request

## Summary

<!-- Provide a brief description of the changes in this PR -->

## Self-Review Completed

<!-- REQUIRED: Complete self-review before requesting review -->

- [ ] **Self-Review Completed** - I have reviewed my own code using the [Self-Review Checklist](../docs/03-version-control/templates/self-review-checklist.md)

## Type of Change

<!-- Mark the relevant option with an "x" -->

- [ ] `feat`: New feature
- [ ] `fix`: Bug fix
- [ ] `docs`: Documentation only changes
- [ ] `style`: Code style (formatting, missing semi colons, etc)
- [ ] `refactor`: Code change that neither fixes a bug nor adds a feature
- [ ] `perf`: Performance improvement
- [ ] `test`: Adding or updating tests
- [ ] `build`: Changes to build system or dependencies
- [ ] `ci`: CI/CD configuration changes
- [ ] `chore`: Other changes that don't modify src or test files

## Changes Made

<!-- Describe the changes in detail. Use bullet points for clarity. -->

-
-
-

## Related Issues

<!-- Link related issues using keywords: Closes #123, Fixes #456, Resolves #789 -->

Closes #

## Testing

<!-- Describe the tests you ran and/or added -->

### Test Coverage

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] E2E tests added/updated
- [ ] All tests passing locally (`pnpm test`)
- [ ] Coverage maintained or improved

### Manual Testing

<!-- Describe manual testing performed -->

- [ ] Tested on local development environment
- [ ] Verified in different browsers (if applicable)
- [ ] Tested responsive design (if applicable)
- [ ] Verified accessibility (if applicable)

## Quality Checks

<!-- Verify all quality checks pass -->

- [ ] `pnpm lint` - No ESLint errors
- [ ] `pnpm format` - All files formatted
- [ ] `pnpm tsc` - No TypeScript errors
- [ ] `pnpm test` - All tests passing
- [ ] `pnpm test:e2e` - E2E tests passing (if applicable)
- [ ] `pnpm build` - Production build succeeds

## Documentation

<!-- Mark if documentation was updated -->

- [ ] Code comments added/updated
- [ ] README updated (if needed)
- [ ] API documentation updated (if applicable)
- [ ] CHANGELOG updated (if applicable)

## Module 03 Compliance

<!-- Verify adherence to Module 03: Version Control standards -->

- [ ] Follows Conventional Commits format
- [ ] Atomic commits (one logical change per commit)
- [ ] All commits pass quality gates
- [ ] Branch is short-lived (< 1-2 days)
- [ ] Feature flags used for incomplete features (if applicable)

## Deployment Considerations

<!-- Any special considerations for deployment? -->

- [ ] No breaking changes
- [ ] Breaking changes documented (if any)
- [ ] Database migrations included (if needed)
- [ ] Environment variables added/updated (if needed)
- [ ] Feature flags configured (if needed)

## Screenshots / Videos

<!-- Add screenshots or videos if UI changes were made -->

## Additional Notes

<!-- Any additional context, warnings, or information for reviewers -->

---

## For Reviewers

### Review Guidance

**Use the comprehensive [Code Review Checklist](../docs/03-version-control/templates/code-review-checklist.md)** covering:

1. **Functionality** - Requirements met, edge cases handled
2. **Design** - Architecture, SOLID principles
3. **Code Quality** - Clean code, DRY, KISS, naming
4. **Testing** - Coverage >80%, comprehensive tests
5. **Security** - No secrets, input validation, auth checks
6. **Performance** - Efficient queries, caching, pagination
7. **Documentation** - JSDoc, comments, README updates
8. **PR Quality** - Conventional commits, size, CI passing

**Review Guidelines**: See [review-guidelines.md](../docs/03-version-control/review-guidelines.md) for detailed guidance on:

- How to provide constructive feedback
- Using comment prefixes (`blocking:`, `nit:`, `question:`, `praise:`)
- Handling large PRs
- Response time expectations

### Quick Reviewer Checklist

- [ ] Self-review completed by author
- [ ] Code follows project style guide
- [ ] Changes align with quality standards
- [ ] Tests are comprehensive (>80% coverage)
- [ ] No security vulnerabilities
- [ ] Performance impact considered
- [ ] Documentation updated
- [ ] All 7 CI checks passing

---

**Module 03 Reference**: This PR follows standards from [Module 03: Version Control](../docs/03-version-control/)

🤖 Generated with [Claude Code](https://claude.com/claude-code)
