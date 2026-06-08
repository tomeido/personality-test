## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-06-08 - Inline Async Feedback Replacing Alerts
**Learning:** Native `alert()` calls for non-critical information (like clipboard copy success/failure) interrupt the user's flow and create a jarring UX, especially on mobile devices.
**Action:** Replace `alert()` with temporary inline feedback directly on the trigger element (e.g., button). Disable the button during the feedback window to prevent rapid clicking, clone the original DOM nodes (to preserve complex contents like SVGs/emojis), and restore them synchronously after a short timeout. Always capture the event target synchronously before initiating asynchronous operations.
