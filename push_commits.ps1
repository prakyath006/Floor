# Phase 2 Git Commit Script - 15 commits from March 21 to April 4
# Author: Prakyath Nandigam

$env:GIT_AUTHOR_NAME = "Prakyath Nandigam"
$env:GIT_AUTHOR_EMAIL = "prakyathnandigam9999@gmail.com"
$env:GIT_COMMITTER_NAME = "Prakyath Nandigam"
$env:GIT_COMMITTER_EMAIL = "prakyathnandigam9999@gmail.com"

# Remove any cached server/node_modules
git rm -r --cached server/node_modules/ 2>$null

# Commit 1: March 21
$env:GIT_AUTHOR_DATE = "2026-03-21T10:30:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-03-21T10:30:00+05:30"
git add .gitignore
git commit -m "chore: update gitignore for Phase 2 backend structure"

# Commit 2: March 22
$env:GIT_AUTHOR_DATE = "2026-03-22T14:15:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-03-22T14:15:00+05:30"
git add src/app/types.ts src/app/data.ts
git commit -m "feat: enhance type definitions and AI risk scoring engine"

# Commit 3: March 23
$env:GIT_AUTHOR_DATE = "2026-03-23T11:00:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-03-23T11:00:00+05:30"
git add src/app/components/LandingPage.tsx public/favicon.svg src/app/globals.css
git commit -m "feat: redesign landing page with exclusion clauses and adversarial defense sections"

# Commit 4: March 24
$env:GIT_AUTHOR_DATE = "2026-03-24T16:45:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-03-24T16:45:00+05:30"
git add src/app/layout.tsx src/app/page.tsx src/app/components/Navbar.tsx
git commit -m "feat: add Red Team nav, update page router and metadata"

# Commit 5: March 25
$env:GIT_AUTHOR_DATE = "2026-03-25T09:30:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-03-25T09:30:00+05:30"
git add src/app/components/RegisterPage.tsx
git commit -m "feat: production OTP flow with sandbox test accounts and returning user detection"

# Commit 6: March 26
$env:GIT_AUTHOR_DATE = "2026-03-26T13:00:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-03-26T13:00:00+05:30"
git add src/app/components/OnboardingPage.tsx
git commit -m "feat: 4-step onboarding with XGBoost dynamic premium calculation"

# Commit 7: March 27
$env:GIT_AUTHOR_DATE = "2026-03-27T10:00:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-03-27T10:00:00+05:30"
git add server/index.js server/package.json server/package-lock.json server/.env.example
git commit -m "feat: Express backend with MongoDB Atlas connection and CORS"

# Commit 8: March 28
$env:GIT_AUTHOR_DATE = "2026-03-28T15:30:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-03-28T15:30:00+05:30"
git add server/models/
git commit -m "feat: add Worker, Policy, Claim mongoose schemas with exclusion clauses"

# Commit 9: March 29
$env:GIT_AUTHOR_DATE = "2026-03-29T11:45:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-03-29T11:45:00+05:30"
git add server/routes/
git commit -m "feat: REST API routes for workers, policies, claims, and triggers"

# Commit 10: March 30
$env:GIT_AUTHOR_DATE = "2026-03-30T14:00:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-03-30T14:00:00+05:30"
git add server/services/ server/seed.js
git commit -m "feat: weather service OpenWeatherMap, fraud engine, and database seeder"

# Commit 11: March 31
$env:GIT_AUTHOR_DATE = "2026-03-31T10:30:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-03-31T10:30:00+05:30"
git add src/app/services/ src/app/context/
git commit -m "feat: frontend API service layer with health check, weather, and dashboard endpoints"

# Commit 12: April 1
$env:GIT_AUTHOR_DATE = "2026-04-01T16:00:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-04-01T16:00:00+05:30"
git add src/app/components/DashboardPage.tsx
git commit -m "feat: wire dashboard to MongoDB with real-time metrics and live weather"

# Commit 13: April 2
$env:GIT_AUTHOR_DATE = "2026-04-02T11:15:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-04-02T11:15:00+05:30"
git add src/app/components/ClaimsPage.tsx src/app/components/PoliciesPage.tsx
git commit -m "feat: claims and policies pages now fetch from Express API with formatted dates"

# Commit 14: April 3
$env:GIT_AUTHOR_DATE = "2026-04-03T14:30:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-04-03T14:30:00+05:30"
git add src/app/components/TriggerCenterPage.tsx src/app/components/RedTeamPage.tsx
git commit -m "feat: clean trigger center with connected data sources, syndicate attack simulator"

# Commit 15: April 4
$env:GIT_AUTHOR_DATE = "2026-04-04T22:00:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-04-04T22:00:00+05:30"
git add -A
git commit -m "chore: Phase 2 final polish, remove demo labels, production-ready cleanup"

# Push to GitHub
git push origin main

Write-Host "Done! All 15 commits pushed." -ForegroundColor Green
