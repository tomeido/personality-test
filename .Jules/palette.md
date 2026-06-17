## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-05-24 - Inline Feedback over Alerts
**Learning:** Native `alert()` calls for non-critical notifications (like clipboard copy fallbacks) are disruptive to the user flow. Replacing them with temporary inline state changes on the trigger element (e.g., a button) provides a much smoother and less intrusive experience. We must also consider synchronous errors that can be thrown by native APIs (like `navigator.clipboard.writeText`) in unsupported environments.
**Action:** When implementing feedback for actions, prioritize modifying the element that triggered the action safely. Ensure synchronous capture of `event.currentTarget`, safe DOM node cloning to preserve complex child structures (like icons), and use synchronous `try...catch` blocks to wrap native API calls that may fail immediately. Disable the element temporarily to prevent rapid consecutive clicks while displaying the feedback state.
