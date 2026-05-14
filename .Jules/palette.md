## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2025-02-12 - Screen Reader Experience with Decorative Emojis
**Learning:** Decorative emojis can degrade the screen reader experience by adding noise, especially when they are accompanied by text that already conveys the meaning.
**Action:** Consistently apply `aria-hidden="true"` to wrapper elements (e.g., `<div class="card-icon">`, `<span class="answer-icon">`) or `<span>` tags containing decorative emojis.
