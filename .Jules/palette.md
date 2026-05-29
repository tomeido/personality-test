## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-05-29 - Replaced Native Alerts with Inline Feedback
**Learning:** Using native `alert()` for non-critical feedback (like clipboard copy success/failure) disrupts the user flow, requires extra clicks to dismiss, and is generally poor UX.
**Action:** Replace `alert()` with inline state changes on the triggering element (e.g., temporarily changing a button's text to "✅ 복사되었습니다!"). Clone original nodes synchronously before the async operation to safely restore complex original DOM structure later without race conditions.
