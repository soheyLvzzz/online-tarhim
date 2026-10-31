# Online Tarhim current project guidance

Read docs/references/custom-workflow-v2.txt and docs/references/memorial-platform-engineering.md together with docs/current-phase-assessment.md before project work. The original workflow DOCX is preserved in docs/references/custom-workflow-v2.docx. Follow the user's explicit instructions first.

## Current phase

Phases 1–3 are closed by explicit user approval; do not reprocess them. Phase 4 chose existing React/TypeScript/CSS/Vite static output and direct phone contact for the first release on the existing host. Phase 5 documented static content, no application API/database for this release. Full platform features are deferred, not deleted or approved.

Phase 6 is closed. Read docs/phase-06/closure-report.md. Public GitHub https://github.com/soheyLvzzz/online-tarhim was fetched read-only: commit 1c3cb8eb5142c7649186f4da702d13fa6e1c6fa3 has .gitignore, .node-version, .env.example and public/favicon.ico at repository root, matching local. App source lives in online-tarhim-source/. Root and staging loaded in browser, and user confirmed favicon fixed. Do not repeat old missing-file questions.

Phase 7 is current. Read docs/phase-07/infrastructure.md, progress-report.md and handoff-guide.md. New developer scripts validate static build assets and generate dist/health.json; check-live.mjs compares real deployed public files to that manifest. This is not a server health API or proof of working business functions. Local TypeScript, 12 tests and build pass; initial live health check returned 404 for not-yet-uploaded health.json. Keep Phase 7 open until user uploads both new environment packages and real online checks pass or differences are resolved. Do not start Phase 8 implicitly.

## Scope and user preferences

Preserve all seven sections, header, footer, black TrackRecord background and current favicon. No src/public/CSS/behavior changes are authorized by basic infrastructure work. User knows destinationless buttons and prioritizes the landing being visible; do not repeatedly reopen those known limitations or silently convert all controls into phone links. The primary request number remains unselected.

Report in Persian. For EVERY workflow step distinguish required action, actual action, evidence/output, remaining work and status. Do not mark not-needed work as implemented or local/mock checks as live verification. Phase outputs must exist before the next phase. Ask material phase-specific missing data during work, not after dependent implementation. Phase 7 currently needs no new account/contact/database data; it needs the user's upload confirmation.

## Deployment and repository

User domain: https://onlinetarhim.com/; cPanel, user-reported document root public_html; staging is /staging/. User performs all panel and GitHub uploads with guidance. Do not sign in, upload or push on their behalf without a new instruction. Do not request passwords, PATs or private keys in chat. Do not expose source/docs/.env files on public_html.

Production and staging HTML differ in robots meta, and have separate checksums/build IDs. Never copy one environment's health.json to the other. Never manually edit checksums to hide a failed check. All release ZIPs need current/real timestamps, regular files 0644, directories 0755; old 1980 ZIP timestamps caused cache concerns and index.html 0600 caused an earlier packaging defect.

Use existing matching assets; do not redraw the logo. favicon-white-v2.png is an unchanged PNG copy of the supplied white logo; favicon.ico is a mechanical multi-size export. User confirmed final tab display.

Keep approvals and observed facts distinct. Local copies do not add files to ChatGPT Project Sources or permanent account memory. Do not publish/change DNS/services or start new backend architecture merely because the workflow lists a future feature.
