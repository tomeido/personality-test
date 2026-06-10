## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-06-10 - Inline Feedback for Fallback Native APIs
**Learning:** Using native `alert()` for non-critical notifications like clipboard fallbacks creates a disruptive, block-style UX. When implementing temporary inline state changes on interactive elements (e.g. updating button text), we must synchronously capture the target element and its state (like child nodes using `.cloneNode(true)`) before initiating asynchronous Promises.
**Action:** Replace `alert()` with inline UI feedback by temporarily updating the triggering element's content and disabling it to prevent state corruption from rapid clicks, then restoring original state inside a timeout.
