## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-05-18 - Inline Feedback and Asynchronous State
**Learning:** In asynchronous event callbacks (like `navigator.clipboard.writeText().then()`), `event.currentTarget` can become `null` after the event dispatch phase. Additionally, native APIs without proper `try...catch` wrappers might fail silently or inconsistently on unsupported contexts.
**Action:** When implementing inline UI feedback after a Promise, capture the target element and its original state (e.g., via `cloneNode(true)`) synchronously beforehand. Always wrap native fallback APIs in `try...catch` and limit `alert()` to error states to reduce disruption.
