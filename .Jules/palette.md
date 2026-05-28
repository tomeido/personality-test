## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-11-21 - Inline UI Feedback for Non-Critical Notifications
**Learning:** Using native `alert()` for non-critical notifications like clipboard copying is disruptive and breaks the UX flow, especially in interactive, animated web applications.
**Action:** Replace `alert()` with inline UI state changes on the triggering element (e.g., swapping button text to "✅ 복사 완료!") and revert it after a short delay (e.g., 2s) to provide clear, contextual feedback without interrupting the user's flow. Ensure original complex child nodes are preserved via `cloneNode(true)` and restored properly.
