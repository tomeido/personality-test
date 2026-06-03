## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2026-06-03 - Inline Status Feedback for Actions
**Learning:** Using `alert()` for non-critical confirmations (like clipboard copy fallbacks) breaks the user flow and feels outdated.
**Action:** Replace `alert()` with inline UI updates. Temporarily update the triggering element's state (e.g., changing button text to "✅ 복사 완료!" and disabling it) to provide seamless, context-aware feedback, ensuring original DOM structure is saved (e.g., via `cloneNode`) and restored afterward.
