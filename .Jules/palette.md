## 2024-05-24 - Screen Reader Support for SPA Quiz Flow
**Learning:** In a single-page application quiz, screen readers will not automatically announce the newly populated question text when navigating to the next step, leaving visually impaired users unaware that the content has changed.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element that holds dynamic content (like a question panel) so updates are smoothly announced without interrupting the user's flow.
