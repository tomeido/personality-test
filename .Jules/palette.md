## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2026-06-19 - Inline Feedback Over Native Alerts
**Learning:** Native `alert()` for non-critical notifications like clipboard fallback causes poor UX by blocking the main thread and requiring extra interaction.
**Action:** Use safe DOM API methods to implement temporary inline state changes on trigger elements, ensuring elements are disabled to prevent state corruption during rapid clicks and complex child nodes are properly cloned and restored.
