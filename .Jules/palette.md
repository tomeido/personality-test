## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-07-04 - Non-blocking Native API Fallbacks
**Learning:** Native `alert()` calls for non-critical notifications (like copying to clipboard) disrupt user flow and create a poor experience, especially when used as fallbacks for native APIs like `navigator.share`.
**Action:** Replace `alert()` fallbacks with temporary inline state changes on the trigger element (e.g., updating button text to "✅ 복사 완료!" and disabling it temporarily) using safe DOM methods, preserving `alert()` only for error states.
