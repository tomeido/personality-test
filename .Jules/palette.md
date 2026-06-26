## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2026-06-26 - Inline Feedback for Clipboard API
**Learning:** Native `alert()` dialogues are disruptive to UX and can feel jarring when used for simple non-critical operations like copying to clipboard.
**Action:** Instead of using `alert()`, replace the trigger element's content temporarily with safe DOM APIs (e.g. `document.createElement`) to show inline success/error states, maintaining the original complex DOM structure by cloning nodes before the operation.
