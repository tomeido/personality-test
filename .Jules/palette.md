## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-11-20 - Non-critical Notification Feedback
**Learning:** Using native `alert()` for non-critical notifications like clipboard copy success disrupts the user experience and can cause accessibility issues by trapping focus.
**Action:** Replace `alert()` with inline UI feedback (e.g., temporarily replacing a button's content with a success message) using safe DOM methods, ensuring original state is restored cleanly.
