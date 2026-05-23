## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-05-23 - Interactive Element Feedback
**Learning:** Using `alert()` for non-critical notifications like a successful clipboard copy disrupts the user experience and blocks interaction.
**Action:** Replace `alert()` with a temporary inline state change on the triggering element (e.g., changing button text to "✅ 복사 완료!" and disabling it temporarily) using safe DOM manipulation APIs.
