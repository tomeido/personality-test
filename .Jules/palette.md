## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-06-27 - Inline Feedback for Clipboard Fallbacks
**Learning:** Native `alert()` calls are disruptive to the user flow, especially for common actions like copying to clipboard. Relying on them as primary fallback feedback is bad UX.
**Action:** Replace `alert()` with temporary inline state changes on the trigger element (e.g., updating button text to "✅ 복사완료!") and disabling the element momentarily to prevent spam clicks. Always maintain the native fallback (like `alert()`) strictly for unsupported environments or errors.
