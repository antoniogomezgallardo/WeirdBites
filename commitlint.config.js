/**
 * Commitlint Configuration
 *
 * Enforces Conventional Commits specification
 * https://www.conventionalcommits.org/
 *
 * Aligns with Module 03: Version Control requirements
 */

module.exports = {
  extends: ['@commitlint/config-conventional'],

  rules: {
    // Type enum - allowed commit types
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation only
        'style', // Code style (formatting, missing semi colons, etc)
        'refactor', // Code refactoring
        'perf', // Performance improvement
        'test', // Adding or updating tests
        'build', // Build system or external dependencies
        'ci', // CI/CD configuration
        'chore', // Other changes that don't modify src or test files
        'revert', // Revert previous commit
      ],
    ],

    // Subject (description) rules
    'subject-case': [2, 'never', ['upper-case']], // Don't start with uppercase
    'subject-empty': [2, 'never'], // Subject required
    'subject-full-stop': [2, 'never', '.'], // No period at end

    // Body rules
    'body-leading-blank': [2, 'always'], // Blank line before body
    'body-max-line-length': [2, 'always', 100], // Max line length

    // Footer rules
    'footer-leading-blank': [2, 'always'], // Blank line before footer

    // Scope rules (optional but helpful)
    'scope-case': [2, 'always', 'lower-case'], // Scope in lowercase

    // Header rules
    'header-max-length': [2, 'always', 100], // Max header length
  },

  // Custom prompt messages
  prompt: {
    messages: {
      type: "Select the type of change that you're committing:",
      scope: 'Denote the SCOPE of this change (optional):',
      customScope: 'Denote the SCOPE of this change:',
      subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
      body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
      breaking: 'List any BREAKING CHANGES (optional). Use "|" to break new line:\n',
      footerPrefixSelect: 'Select the ISSUES type of changeList by this change (optional):',
      customFooterPrefix: 'Input ISSUES prefix:',
      footer: 'List any ISSUES by this change. E.g.: #31, #34:\n',
      confirmCommit: 'Are you sure you want to proceed with the commit above?',
    },
    types: [
      { value: 'feat', name: 'feat:     A new feature' },
      { value: 'fix', name: 'fix:      A bug fix' },
      { value: 'docs', name: 'docs:     Documentation only changes' },
      { value: 'style', name: 'style:    Code style (formatting, missing semi colons, etc)' },
      {
        value: 'refactor',
        name: 'refactor: Code change that neither fixes a bug nor adds a feature',
      },
      { value: 'perf', name: 'perf:     Performance improvements' },
      { value: 'test', name: 'test:     Adding or updating tests' },
      { value: 'build', name: 'build:    Changes to build system or dependencies' },
      { value: 'ci', name: 'ci:       CI/CD configuration changes' },
      { value: 'chore', name: "chore:    Other changes that don't modify src or test files" },
      { value: 'revert', name: 'revert:   Reverts a previous commit' },
    ],
    useEmoji: false,
    emojiAlign: 'center',
    useAI: false,
    aiNumber: 1,
    themeColorCode: '',
    scopes: [],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: 'bottom',
    customScopesAlias: 'custom',
    emptyScopesAlias: 'empty',
    upperCaseSubject: false,
    markBreakingChangeMode: false,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: '|',
    skipQuestions: [],
    issuePrefixes: [{ value: 'closed', name: 'closed:   ISSUES has been processed' }],
    customIssuePrefixAlign: 'top',
    emptyIssuePrefixAlias: 'skip',
    customIssuePrefixAlias: 'custom',
    allowCustomIssuePrefix: true,
    allowEmptyIssuePrefix: true,
    confirmColorize: true,
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: '',
    defaultIssues: '',
    defaultScope: '',
    defaultSubject: '',
  },
};
