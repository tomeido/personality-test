## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-11-20 - Inline Clipboard Feedback
**Learning:** Native `alert()` is disruptive and stops script execution. It shouldn't be used for routine feedback like copying text to clipboard. Replacing it with inline UI feedback on the button is much smoother, but it's crucial to clone the element's original `childNodes` synchronously before the async copy operation so the button can be perfectly restored later, preserving structure like icons. Additionally, handling clipboard APIs requires synchronous `try...catch` because it throws immediately in non-secure or unsupported environments.
**Action:** When replacing blocking notifications with inline UI state on interactive elements, always synchronously capture `event.currentTarget` and clone `childNodes` (to preserve icons/emojis). Wrap `navigator.clipboard.writeText` in a synchronous `try...catch` to ensure error fallbacks run reliably in all environments.
