## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2026-07-02 - Inline UI Feedback for Native API Fallbacks
**Learning:** Native `alert()` calls for non-critical notifications (like successful clipboard copies) disrupt the flow and provide poor user experience. Also, fallback logic often encounters synchronous TypeErrors when dealing with unsupported APIs like `navigator.clipboard`.
**Action:** Replace `alert()` with inline UI feedback by temporarily modifying the interactive element's DOM (and storing the original state to revert after a timeout). Always wrap native API fallbacks in a synchronous `try...catch` block to handle undefined APIs gracefully.
