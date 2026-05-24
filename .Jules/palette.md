## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-05-24 - Async Event Handlers and UX Feedback
**Learning:** `alert()` is disruptive to UX, but when replacing it with inline state changes on buttons triggered by async actions (like `navigator.clipboard.writeText`), `event.currentTarget` becomes `null` after the synchronous event phase.
**Action:** Always capture `event.currentTarget` synchronously at the very beginning of the event handler before any async/promise chains, then use it to temporarily display success/error states directly on the button using safe DOM methods (e.g. `document.createElement`) while disabling it to prevent rapid clicks.
