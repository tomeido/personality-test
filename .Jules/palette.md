## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-05-18 - Replacing Native Alerts with Inline Feedback for Clipboard Fallback
**Learning:** Native `alert()` calls for clipboard fallback operations block the main thread and provide poor user experience. Replacing these with inline state changes on the trigger element (e.g., a button) feels much smoother. However, since the DOM update typically happens within an asynchronous Promise chain (like `clipboard.writeText().then()`), the `event.currentTarget` becomes `null` by the time the `.then()` executes. Furthermore, `navigator.clipboard.writeText` throws synchronously in non-secure or unsupported environments, bypassing `.catch()`.

**Action:**
1. Always capture the `currentTarget` (and clone its child nodes if you intend to restore them later) synchronously *before* the asynchronous operation.
2. Wrap the `navigator.clipboard.writeText` operation in a `try...catch` block to handle synchronous errors, ensuring the fallback `alert()` or error handling still functions.
3. Update the UI state inside the `.then()` callback to reflect success, temporarily disable the element to prevent rapid clicks, and use `setTimeout` to restore the original node state.
