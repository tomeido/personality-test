## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-06-09 - Alert Alternatives for Non-Critical Notifications
**Learning:** Using `alert()` for non-critical notifications (like copying text to the clipboard) provides a poor UX, interrupting user flow. In UI interaction contexts, `event.currentTarget` turns `null` when a synchronous event phase ends, which requires capturing the element synchronously if we need it for an async `.then()` block.
**Action:** Always capture `event.currentTarget` synchronously if it needs to be updated within an async callback (like when a `navigator.clipboard.writeText` promise resolves). To show temporary inline messages on an element, first save a copy of its original children using `cloneNode(true)`, update the DOM safely via elements instead of `innerHTML` to avoid DOM-based XSS, and temporarily disable the button to prevent multiple triggers before restoring the original state.
