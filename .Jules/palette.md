## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-05-17 - Replace disruptive native alerts with inline disabled-state feedback
**Learning:** Native `alert()` calls for minor actions like copying to the clipboard disrupt the user flow and provide a poor UX, especially on mobile. Additionally, decorative emojis in dynamically created content should be explicitly hidden from screen readers.
**Action:** When implementing copy-to-clipboard or share fallbacks, use safe DOM updates (e.g., `document.createElement`, `textContent`) to temporarily replace the trigger button's content with inline success/error feedback. Always disable the button during the timeout to prevent state corruption from rapid clicks, and use `aria-hidden="true"` on decorative feedback emojis.
