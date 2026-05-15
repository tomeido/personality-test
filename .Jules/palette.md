## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-10-27 - Inline Action Feedback
**Learning:** Native `alert()` dialogs block the main thread and provide poor user experience for non-critical confirmations like "Copied to clipboard."
**Action:** Use inline button state changes (temporarily replacing button content using safe DOM APIs) for non-critical feedback to keep the interaction smooth and accessible.
