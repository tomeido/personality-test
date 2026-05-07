
## 2024-05-18 - SPA Quiz Accessibility Learnings
**Learning:** SPA quiz applications with dynamic content require `aria-live="polite"` and `aria-atomic="true"` on question containers so that screen readers correctly announce content changes without requiring page reloads. In addition, progress indicators must use `role="progressbar"` with `aria-valuemin`, `aria-valuemax`, and dynamic `aria-valuenow` to effectively communicate testing progress to users relying on assistive technologies.
**Action:** Always add ARIA live regions for dynamically changing text content in SPAs and ensure visual progress bars are semantically exposed as progressbar roles with dynamic value updates.
