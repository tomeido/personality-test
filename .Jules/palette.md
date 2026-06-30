## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2026-06-30 - Inline Feedback for Fallback Mechanisms
**Learning:** Relying on `alert()` for fallback success states disrupts user flow and provides a poor UX, particularly in sharing interactions. However, replacing it requires careful synchronous state capture (e.g. `event.currentTarget` cloning) before async operations, and a robust `try...catch` strategy to ensure the fallback works even when `navigator.clipboard` throws errors in unsupported contexts.
**Action:** When implementing fallback logic (like clipboard copy), use temporary inline UI changes on the trigger element for success states instead of modals, but always wrap the attempt in synchronous and asynchronous error handlers that revert to an accessible failover if needed.
