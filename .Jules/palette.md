## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-06-04 - Non-Critical Feedback Flow
**Learning:** Using native `alert()` for non-critical notifications (like copying text to the clipboard) forcefully interrupts the user's workflow and creates a jarring experience, especially on mobile devices.
**Action:** Replace native alerts with temporary inline state changes on the trigger element (e.g., replacing button text with a success message for 2 seconds) using safe DOM APIs. This provides immediate, contextual feedback without breaking the user's flow.
