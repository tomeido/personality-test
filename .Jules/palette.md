## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.
## 2024-05-20 - Inline Clipboard Feedback
**Learning:** Native `alert()` modals for non-critical fallback actions (like clipboard copy) disrupt the user flow and are not accessible. When updating inline UI elements asynchronously (e.g., after `navigator.clipboard.writeText().then()`), `event.currentTarget` evaluates to null if not captured synchronously.
**Action:** Always capture `event.currentTarget` synchronously at the start of the event handler. Use DOM methods to temporarily swap out the button's children (e.g. replacing text with a success state checkmark) and use `setTimeout` to restore the original state after 2 seconds, ensuring smooth feedback.
