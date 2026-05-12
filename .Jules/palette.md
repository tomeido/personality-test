## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-05-12 - Inline Copy Feedback
**Learning:** Using `alert()` for clipboard copy fallbacks provides a jarring, browser-native interruption that disrupts the flow and doesn't match the application's styling. It is also less accessible as screen reader users have to switch contexts abruptly.
**Action:** Replace `alert()` fallbacks with inline UI state changes directly on the trigger element (e.g., temporarily updating the button text to "✅ 복사 완료!") using safe DOM APIs. Make sure to reset the button to its original state after a short timeout (e.g., 2000ms). Ensure any decorative icons restored are marked with `aria-hidden="true"`.
