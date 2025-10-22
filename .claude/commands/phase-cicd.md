# Phase: CI/CD Pipeline

**Description**: Guide through Module 08 - CI/CD Pipeline implementation for the WeirdBites project

**Usage**: `/phase-cicd [step or topic]`

**Examples**:

- `/phase-cicd` - Start CI/CD phase
- `/phase-cicd github-actions` - Set up GitHub Actions
- `/phase-cicd quality-gates` - Configure quality gates
- `/phase-cicd deployment` - Set up deployment automation

---

## Phase Overview

This command guides you through **Module 08: CI/CD Pipeline**, which focuses on automating build, test, and deployment processes to enable continuous delivery.

### Phase Objectives

By completing this phase, you will have:

- [ ] Continuous Integration (CI) pipeline configured
- [ ] Automated testing on every commit/PR
- [ ] Quality gates enforced (coverage, linting, security)
- [ ] Continuous Delivery (CD) to staging environment
- [ ] Deployment automation with rollback capability
- [ ] Build artifact management
- [ ] Pipeline notifications and alerts
- [ ] DORA metrics tracking
- [ ] Fast feedback loops (<10 min build+test)

### Relevant Documentation

**Core Modules**:

- `docs/quality-standards/docs/08-cicd-pipeline/08-README.md`
- `docs/quality-standards/docs/08-cicd-pipeline/continuous-integration.md`
- `docs/quality-standards/docs/08-cicd-pipeline/continuous-delivery.md`
- `docs/quality-standards/docs/08-cicd-pipeline/build-automation.md`
- `docs/quality-standards/docs/08-cicd-pipeline/deployment-automation.md`
- `docs/quality-standards/docs/03-version-control/cicd-best-practices/03.1-README.md`

**Templates**:

- `docs/quality-standards/templates/pipeline-template.yaml`

**Examples**:

- `docs/quality-standards/examples/ci-pipelines/` - GitHub Actions, GitLab CI, Jenkins
- `docs/quality-standards/examples/deployment/` - Blue-Green, Canary, Terraform (10 files)

### Industry Standards Referenced

- DORA Metrics (DevOps Research and Assessment)
- CI/CD Best Practices (GitHub Flow, GitLab Flow, Trunk-Based Development)

---

## Phase Steps

### Step 1: Configure Continuous Integration (CI)

**Goal**: Automate build and test execution on every commit and pull request.

**Actions**:

1. Read `docs/quality-standards/docs/08-cicd-pipeline/continuous-integration.md`
2. Review examples in `docs/quality-standards/examples/ci-pipelines/`
3. Choose CI platform: GitHub Actions (recommended for GitHub repos)
4. Create pipeline workflow file

**WeirdBites CI Pipeline** (GitHub Actions):

```yaml
# .github/workflows/ci.yml
name: Continuous Integration

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

env:
  NODE_VERSION: '20'
  COVERAGE_THRESHOLD: 80

jobs:
  # Job 1: Lint and Code Quality
  lint:
    name: Lint & Code Quality
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint

      - name: Check code formatting (Prettier)
        run: npm run format:check

      - name: Check TypeScript types
        run: npm run type-check

  # Job 2: Security Scanning
  security:
    name: Security Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run npm audit
        run: npm audit --production

      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

      - name: OWASP Dependency Check
        uses: dependency-check/Dependency-Check_Action@main
        with:
          project: 'WeirdBites'
          path: '.'
          format: 'HTML'

  # Job 3: Unit Tests
  unit-tests:
    name: Unit Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests with coverage
        run: npm run test:unit -- --coverage

      - name: Check coverage threshold
        run: |
          COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
          if (( $(echo "$COVERAGE < $COVERAGE_THRESHOLD" | bc -l) )); then
            echo "Coverage $COVERAGE% is below threshold $COVERAGE_THRESHOLD%"
            exit 1
          fi

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v4
        with:
          token: ${{ secrets.CODECOV_TOKEN }}

  # Job 4: Integration Tests
  integration-tests:
    name: Integration Tests
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: test
          POSTGRES_DB: weirdbites_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

      redis:
        image: redis:7-alpine
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 6379:6379

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run database migrations
        run: npm run db:migrate
        env:
          DATABASE_URL: postgresql://postgres:test@localhost:5432/weirdbites_test

      - name: Run integration tests
        run: npm run test:integration
        env:
          DATABASE_URL: postgresql://postgres:test@localhost:5432/weirdbites_test
          REDIS_URL: redis://localhost:6379

  # Job 5: E2E Tests
  e2e-tests:
    name: E2E Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Build application
        run: npm run build

      - name: Start application
        run: npm run start:test &
        env:
          NODE_ENV: test

      - name: Wait for app to be ready
        run: npx wait-on http://localhost:3000

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Upload Playwright report
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/

  # Job 6: Build
  build:
    name: Build Application
    runs-on: ubuntu-latest
    needs: [lint, security, unit-tests, integration-tests]
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: build
          path: dist/
          retention-days: 30

  # Job 7: Docker Build
  docker:
    name: Build Docker Image
    runs-on: ubuntu-latest
    needs: [build]
    if: github.event_name == 'push'
    steps:
      - uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to DockerHub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: |
            weirdbites/app:${{ github.sha }}
            weirdbites/app:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

**Deliverables**:

- CI pipeline configuration file
- Build passing on all branches
- Fast feedback (<10 minutes)
- Artifacts uploaded

---

### Step 2: Implement Quality Gates

**Goal**: Enforce quality standards automatically before code can be merged.

**Actions**:

1. Read quality gate requirements from Module 08
2. Configure branch protection rules
3. Set up required status checks
4. Define quality criteria that must pass

**WeirdBites Quality Gates**:

```yaml
# Quality Gate Configuration
quality_gates:
  # Code Quality
  - name: 'Linting'
    required: true
    failure_blocks_merge: true

  - name: 'Code Coverage'
    required: true
    threshold: 80%
    failure_blocks_merge: true

  - name: 'Type Safety'
    required: true
    failure_blocks_merge: true

  # Security
  - name: 'Security Scan'
    required: true
    failure_blocks_merge: true
    allowed_severities: ['low', 'medium'] # Block on high/critical

  - name: 'Dependency Audit'
    required: true
    failure_blocks_merge: true

  # Testing
  - name: 'Unit Tests'
    required: true
    failure_blocks_merge: true

  - name: 'Integration Tests'
    required: true
    failure_blocks_merge: true

  - name: 'E2E Tests (Critical Paths)'
    required: true
    failure_blocks_merge: true

  # Performance
  - name: 'Bundle Size'
    required: true
    threshold: '500KB (gzipped)'
    failure_blocks_merge: false # Warning only

  - name: 'Lighthouse Score'
    required: false
    threshold: 90
    failure_blocks_merge: false
```

**GitHub Branch Protection Rules**:

```yaml
# Configure in GitHub repo settings
branches:
  main:
    protection:
      required_status_checks:
        strict: true
        contexts:
          - 'Lint & Code Quality'
          - 'Security Scan'
          - 'Unit Tests'
          - 'Integration Tests'
          - 'E2E Tests'
          - 'Build Application'
      required_pull_request_reviews:
        required_approving_review_count: 1
        dismiss_stale_reviews: true
        require_code_owner_reviews: true
      required_linear_history: true
      enforce_admins: true
```

**Deliverables**:

- Quality gates configured
- Branch protection enabled
- Status checks required
- Merge blocked on failures

---

### Step 3: Configure Continuous Delivery (CD)

**Goal**: Automate deployment to staging/production environments.

**Actions**:

1. Read `docs/quality-standards/docs/08-cicd-pipeline/continuous-delivery.md`
2. Read `docs/quality-standards/docs/08-cicd-pipeline/deployment-automation.md`
3. Review deployment examples in `docs/quality-standards/examples/deployment/`
4. Choose deployment strategy: Blue-Green or Canary

**WeirdBites CD Pipeline**:

```yaml
# .github/workflows/cd.yml
name: Continuous Deployment

on:
  push:
    branches: [main]
  workflow_dispatch: # Manual trigger

jobs:
  deploy-staging:
    name: Deploy to Staging
    runs-on: ubuntu-latest
    environment:
      name: staging
      url: https://staging.weirdbites.com
    steps:
      - uses: actions/checkout@v4

      - name: Download build artifact
        uses: actions/download-artifact@v4
        with:
          name: build

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-west-2

      - name: Deploy to ECS (Staging)
        run: |
          aws ecs update-service \
            --cluster weirdbites-staging \
            --service web \
            --force-new-deployment \
            --desired-count 2

      - name: Wait for deployment
        run: |
          aws ecs wait services-stable \
            --cluster weirdbites-staging \
            --services web

      - name: Run smoke tests
        run: npm run test:smoke
        env:
          BASE_URL: https://staging.weirdbites.com

      - name: Notify Slack
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "✅ Deployed to Staging: ${{ github.sha }}",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Deployment to Staging Complete*\n\nCommit: `${{ github.sha }}`\nBranch: `${{ github.ref }}`\nURL: https://staging.weirdbites.com"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}

  deploy-production:
    name: Deploy to Production
    needs: [deploy-staging]
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://weirdbites.com
    steps:
      - uses: actions/checkout@v4

      - name: Download build artifact
        uses: actions/download-artifact@v4
        with:
          name: build

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-west-2

      - name: Blue-Green Deployment
        run: |
          # Deploy to "green" environment
          aws ecs update-service \
            --cluster weirdbites-prod \
            --service web-green \
            --force-new-deployment

          # Wait for green to be healthy
          aws ecs wait services-stable \
            --cluster weirdbites-prod \
            --services web-green

      - name: Run production smoke tests
        run: npm run test:smoke:production
        env:
          BASE_URL: https://green.weirdbites.com # Green environment URL

      - name: Switch traffic to green
        run: |
          # Update load balancer to point to green
          aws elbv2 modify-rule \
            --rule-arn ${{ secrets.ALB_RULE_ARN }} \
            --actions Type=forward,TargetGroupArn=${{ secrets.GREEN_TARGET_GROUP }}

      - name: Monitor for 5 minutes
        run: |
          sleep 300
          # Check error rates, response times
          ERROR_RATE=$(./scripts/check-error-rate.sh)
          if [ $ERROR_RATE -gt 1 ]; then
            echo "Error rate too high: $ERROR_RATE%"
            exit 1
          fi

      - name: Promote green to blue (if successful)
        if: success()
        run: |
          # Green is now the new blue
          aws ecs update-service \
            --cluster weirdbites-prod \
            --service web-blue \
            --task-definition $(aws ecs describe-services --cluster weirdbites-prod --services web-green --query 'services[0].taskDefinition' --output text)

      - name: Rollback on failure
        if: failure()
        run: |
          # Revert traffic to blue
          aws elbv2 modify-rule \
            --rule-arn ${{ secrets.ALB_RULE_ARN }} \
            --actions Type=forward,TargetGroupArn=${{ secrets.BLUE_TARGET_GROUP }}
          echo "Rolled back to previous version"

      - name: Notify Slack
        if: always()
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "${{ job.status == 'success' && '✅' || '❌' }} Production Deployment ${{ job.status }}",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Production Deployment ${{ job.status }}*\n\nCommit: `${{ github.sha }}`\nURL: https://weirdbites.com"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

**Deliverables**:

- CD pipeline for staging
- CD pipeline for production
- Smoke tests configured
- Rollback mechanism
- Deployment notifications

---

### Step 4: Set Up DORA Metrics Tracking

**Goal**: Measure DevOps performance using DORA metrics.

**Actions**:

1. Read `docs/quality-standards/docs/09-metrics-monitoring/dora-metrics.md`
2. Track 4 key metrics:
   - Deployment Frequency
   - Lead Time for Changes
   - Mean Time to Recovery (MTTR)
   - Change Failure Rate

**DORA Metrics Collection**:

```yaml
# .github/workflows/dora-metrics.yml
name: DORA Metrics

on:
  deployment_status:
  push:
    branches: [main]

jobs:
  track-metrics:
    runs-on: ubuntu-latest
    steps:
      - name: Track deployment frequency
        if: github.event.deployment_status.state == 'success'
        run: |
          curl -X POST https://metrics.weirdbites.com/api/dora \
            -H "Authorization: Bearer ${{ secrets.METRICS_TOKEN }}" \
            -d '{
              "metric": "deployment_frequency",
              "timestamp": "${{ github.event.deployment_status.updated_at }}",
              "environment": "${{ github.event.deployment.environment }}"
            }'

      - name: Track lead time
        if: github.event_name == 'push'
        run: |
          # Calculate time from first commit to deployment
          FIRST_COMMIT_TIME=$(git log --reverse --format="%ct" | head -1)
          DEPLOY_TIME=$(date +%s)
          LEAD_TIME=$((DEPLOY_TIME - FIRST_COMMIT_TIME))

          curl -X POST https://metrics.weirdbites.com/api/dora \
            -H "Authorization: Bearer ${{ secrets.METRICS_TOKEN }}" \
            -d "{
              \"metric\": \"lead_time\",
              \"value\": $LEAD_TIME,
              \"timestamp\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"
            }"
```

**Target DORA Metrics for WeirdBites**:
| Metric | Current | Target (6 months) | Elite Performers |
|--------|---------|-------------------|------------------|
| Deployment Frequency | Manual | Daily | Multiple per day |
| Lead Time for Changes | N/A | < 1 day | < 1 hour |
| MTTR | N/A | < 4 hours | < 1 hour |
| Change Failure Rate | N/A | < 10% | 0-15% |

**Deliverables**:

- DORA metrics dashboard
- Automated metric collection
- Trend tracking over time

---

## Phase Completion Checklist

Before moving to **Phase 7: Production & Monitoring**, ensure:

- [ ] CI pipeline runs on every commit/PR
- [ ] All tests execute automatically (<10 min total)
- [ ] Quality gates block merging on failures
- [ ] Code coverage >80% enforced
- [ ] Security scanning integrated
- [ ] CD deploys to staging automatically
- [ ] CD deploys to production with approval
- [ ] Blue-Green or Canary deployment implemented
- [ ] Rollback mechanism tested
- [ ] DORA metrics tracked
- [ ] Pipeline notifications configured
- [ ] Documentation updated

---

## Pipeline Performance Targets

- **Build Time**: < 5 minutes
- **Test Execution**: < 10 minutes (full suite)
- **Deployment Time**: < 15 minutes (staging), < 30 minutes (production)
- **Pipeline Success Rate**: > 95%
- **Flaky Test Rate**: < 5%

---

## Common Pitfalls (From Documentation)

🚫 **Avoid These Mistakes**:

1. **Slow pipelines** - Optimize parallel execution, caching
2. **Flaky tests** - Fix or quarantine, don't ignore
3. **No rollback plan** - Always have escape hatch
4. **Deploying on Friday** - Avoid unless critical, high risk
5. **No smoke tests** - Verify deployment success
6. **Ignoring failed deployments** - Fix root cause
7. **Manual deployment steps** - Automate everything
8. **No deployment notifications** - Team must be aware

---

## Next Phase

Once CI/CD phase is complete, proceed to:
**Phase 7: Production & Monitoring**

- Set up observability (logs, metrics, traces)
- Configure alerting
- Create runbooks
- Establish SLIs and SLOs

---

## Resources

**Examples**:

- CI Pipelines: `examples/ci-pipelines/` (GitHub Actions, GitLab CI, Jenkins)
- Deployment: `examples/deployment/` (Blue-Green, Canary, Terraform)

**Tools**:

- CI: GitHub Actions, GitLab CI, Jenkins, CircleCI
- CD: ArgoCD, Flux, Spinnaker
- Infrastructure: Terraform, CloudFormation, Pulumi
- Containerization: Docker, Kubernetes
- Monitoring: Datadog, New Relic, Prometheus + Grafana

---

**Remember**: The goal is continuous delivery with confidence. Fast, reliable, automated pipelines enable rapid iteration while maintaining quality!
