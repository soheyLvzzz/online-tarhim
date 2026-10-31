# Online Tarhim project guidance

The user adopted the supplied custom workflow v2 on 2026-10-31. Follow it phase by phase together with the memorial engineering skill. Explicit user instructions take precedence.

Before continuing project work, read:

- `docs/references/custom-workflow-v2.txt` — complete text of the adopted 17-phase workflow.
- `docs/references/custom-workflow-v2.docx` — original authoritative workflow, preserved unchanged.
- `docs/references/memorial-platform-engineering.md` — original supplied engineering skill.
- `docs/current-phase-assessment.md` — evidence and recorded continuation point.

Current continuation: Phase 6 is in progress at the user's explicit request. Read docs/phase-06/progress-report.md, development-guide.md and required-inputs.md. Local development setup is prepared, but user-host Staging and remote repository are not ready. Do not mark the phase complete or start Phase 7. Phase 4 and 5 outputs remain in their folders.

The user explicitly closed Phases 1–3 and instructed that they must not be reprocessed. Respect this closure. Do not ask the user to repeat feasibility analysis; request only operational destination details when needed for actual deployment. Do not claim an independent host test.

The user chose direct telephone contact for the first release and publication to their existing host and domain. Keep React, TypeScript, CSS and Vite with static dist output. No new backend, database or ORM is needed for that first-release scope. Full-platform features are deferred, not deleted or approved by this choice.

Preserve v17's seven sections and footer. The existing desktop implementation covers part of Phase 8, while mobile/tablet, browser visual QA and real control destinations remain outstanding. A direct-contact release still requires explicit behavior decisions for article/playback controls; do not silently turn every button into a phone link. The authoritative contact number is not yet selected; header and footer currently differ.

For each phase, track its steps, evidence, open decisions, required outputs and acceptance condition. Ask material questions during the work before making dependent choices. Register section visual approval before adding its functionality. Continue only independent, unambiguous work while a required answer is pending.

Custom events currently emitted by controls are integration placeholders, not working destination pages or APIs. Report this honestly. No new backend, database, deployment or external-service integration is authorized solely by adopting the workflow.

Report in Persian. Separate observed facts, user-reported completion and unverified items. Update the assessment after meaningful phase progress. Do not claim permanent ChatGPT memory or a Project Sources attachment from local file copies.

Latest user steering: phase outputs must exist before moving to the next phase. The user knows destinationless buttons and wants the landing appearance online first so the domain is not empty. Record known limitations honestly without repeatedly reopening them or treating all future full-platform features as launch requirements. Do not silently remove/alter controls. Ask for phase-specific missing data during work. Phase 5 primary contact number was asked but no selection returned; leave it unresolved and do not ask again in the same turn. The data model can be complete without that content value; contact implementation later needs the real number.

Phase reports must cover every workflow step with the required action, actual action taken, evidence/output, remaining work and status. Distinguish implemented, documented, not needed for this release and waiting for user input. User now requests all Phase 6 operational inputs together. No hosting account credentials should be put in chat, source or ZIP. Git is local only until a remote is explicitly identified.

Latest Phase 6 inputs: user domain onlinetarhim.com, cPanel, user-reported document root public_html. User will perform panel/upload operations themselves with teaching; do not initialize browser/login on their behalf. User wants their own GitHub repository. Provide Private repository guidance; no remote exists yet. A separate /staging/ path is proposed for first verification; actual creation and access level remain unconfirmed. Staging-only distribution has noindex,nofollow; never deploy it unchanged to final root. Track user-reported actions separately from verified outcomes.

Latest user report: staging now loads with the corrected archive; treat as user-confirmed, not agent browser-verified. Only TrackRecord.css background was changed from #121212 to #000000 per explicit request; no other visual/behavior edit. GitHub creation/source upload is still unreported. Request repository URL for the remaining Phase 6 task, then use current source rather than the old gray-background source kit. Do not start Phase 7 yet.

Latest user states files are now deployed manually in public_html root, not just staging. Favicon uses byte-identical white public/assets/logo.png copied as public/favicon-white.png with rel=icon in index.html. Root deployment package must not carry staging noindex meta. No section changes authorized. For Phase 6 closure, verify latest source is committed to the user's GitHub repository and clarify whether a separate working staging URL still exists. Ask only repository URL and whether it is empty/has files; never passwords/tokens. User performs uploads; do not access accounts on their behalf.

Latest exact repository: https://github.com/soheyLvzzz/online-tarhim; user says it is empty. User states staging is gone and site is only at root. Do not claim Phase 6 complete: source upload and a separate staging environment remain. Browser inspection of root and /index.html found zero icon links and robots noindex,nofollow, despite live current black-stats CSS/JS. Local favicon fix now uses favicon-white-v2.png?v=2, an unchanged copy of the supplied white logo. Provide a two-file root patch and source ZIP for user's own upload; do not access GitHub account or push without user instruction. Root page has been observed to load, but final favicon after upload is unverified.
