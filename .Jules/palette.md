## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-05-18 - Replacing `alert()` with Inline UI Feedback
**Learning:** Native `alert()` calls for non-critical confirmations (like clipboard copy success) interrupt the user's flow and provide a poor UX, especially on mobile devices where alerts can feel aggressive. Furthermore, decorative elements inside buttons (like emojis) without `aria-hidden="true"` create redundant noise for screen reader users.
**Action:** Replace `alert()` success messages with temporary, inline state changes on the trigger element (e.g., changing button text to a success state and temporarily disabling it to prevent rapid clicks). Use safe DOM cloning (`cloneNode(true)`) before the async operation to ensure complex inner DOM structures (like text with adjacent decorative spans) are perfectly restored after the timeout. Ensure all such decorative elements inside interactive controls carry `aria-hidden="true"`.
