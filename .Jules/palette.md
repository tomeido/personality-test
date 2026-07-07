## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-05-24 - Safely Replacing Native Alerts with Inline Feedback
**Learning:** Native `alert()` calls disrupt user flow. When replacing them with inline UI updates (like replacing button text with a success message for clipboard copies), it's crucial to capture the original DOM state synchronously *before* initiating the asynchronous Promise. Additionally, `navigator.clipboard` will throw a synchronous `TypeError` if accessed in an unsupported environment or non-secure context, bypassing the `.catch()` of the Promise chain.
**Action:** Always wrap `navigator.clipboard.writeText` in a synchronous `try...catch` block to handle undefined contexts safely. For inline updates, capture `event.currentTarget` synchronously, update the UI only upon successful Promise resolution, and ensure the button is disabled during the success message timeout to prevent state corruption from repeated clicks. Preserve the fallback `alert()` for errors or unsupported environments.
