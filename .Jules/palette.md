## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2025-02-12 - Inline Clipboard Feedback
**Learning:** For non-critical actions like clipboard copy fallback, using `alert()` disrupts the user flow. Replacing the button text inline provides a much better experience. However, because `event.currentTarget` can become null inside asynchronous Promise callbacks, it must be captured synchronously.
**Action:** Replace `alert()` with inline UI feedback for non-critical fallback actions. Capture `event.currentTarget` synchronously, clone its child nodes to preserve complex DOM (like icons + text) during the inline state change, and restore the original DOM nodes securely inside the Promise resolution using safe DOM methods.
