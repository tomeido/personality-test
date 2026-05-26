## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-05-18 - Inline Feedback for Fallback UI State
**Learning:** Native `alert()` calls for non-critical fallback actions (like clipboard copy failures or success messages) create intrusive, blocking interactions that disrupt flow. When swapping button contents inline to provide safe, non-disruptive feedback, you must synchronously capture `event.currentTarget` beforehand if the update happens asynchronously (e.g. inside a `.then()`), and you must deep-clone original child nodes (e.g., `child.cloneNode(true)`) to fully preserve complex elements like emojis or SVGs upon restoration.
**Action:** When a button triggers an async API that might fail or need immediate confirmation, provide an inline success/error state on the button itself. Clear its HTML, append safely-created DOM elements with the message, disable the button, and use a timeout to restore cloned children and re-enable it.
