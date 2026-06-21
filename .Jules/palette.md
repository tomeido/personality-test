## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2026-06-21 - Accessible Fallback UI for Clipboard Copy
**Learning:** Using native `alert()` for non-critical feedback (like a clipboard copy success) creates a jarring UX. However, when implementing temporary inline text replacement as an alternative on interactive elements (like a share button), you must properly save the original DOM tree. Using `innerHTML` isn't safe for content that involves SVGs/emojis alongside text because it can destroy accessibility hooks or structured contents.
**Action:** When temporarily showing feedback in a button, synchronously capture `event.currentTarget`, create deep clones of the element's child nodes (`node.cloneNode(true)`), change the UI (disabling the button to prevent multiple clicks), and then restore the original nodes after a timeout.
