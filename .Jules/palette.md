## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-05-15 - Inline UI Feedback
**Learning:** Using native browser `alert()` for non-critical confirmations (like copying to clipboard) causes intrusive popups that block interaction.
**Action:** Replace `alert()` with temporary inline feedback (e.g., replacing button text with a success message/icon) and disable the element during the feedback interval. Always safely clone and restore the original child nodes to preserve complex DOM structures (like text with SVGs or emojis).
