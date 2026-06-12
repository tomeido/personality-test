## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-06-12 - Replace Blocking Alerts with Inline State Changes
**Learning:** Native `alert()` dialogs used for fallback interactions (like clipboard copying) are disruptive, block the UI thread, and provide a poor user experience.
**Action:** Replace `alert()` messages with temporary inline state changes on the triggering element (e.g., swapping button content to a success message and disabling it). Be sure to clone original nodes synchronously before any async operations to restore them perfectly after a short delay.
