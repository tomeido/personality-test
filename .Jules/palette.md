## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-10-27 - Avoid Native Alerts for Async Feedback
**Learning:** Using native `alert()` for non-critical async actions (like copying text to clipboard fallback) disrupts user flow and provides a jarring UX.
**Action:** Implement inline state changes on the trigger element (e.g., updating the button text to show success/error temporarily) using safe DOM manipulation before reverting back to the original state.
