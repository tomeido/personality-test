## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.
## 2024-05-19 - Inline Feedback for Clipboard Actions
**Learning:** Native `alert()` dialogs for non-critical confirmations like "Copied to clipboard" disrupt the user flow and feel unpolished.
**Action:** Use safe DOM API methods to temporarily replace the trigger element's content (e.g., button text/icon) with inline success/error states. Clone original child nodes first to preserve complex structures like SVGs or emojis when restoring the initial state after a short delay.
