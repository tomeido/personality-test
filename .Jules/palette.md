## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2026-06-25 - Inline Feedback for Fallbacks
**Learning:** Relying on native `alert()` for non-critical fallback notifications (like clipboard copying) disrupts the flow and feels unpolished compared to inline UI updates.
**Action:** Replaced `alert()` with temporary inline button text updates using safe DOM APIs. Used `event.currentTarget` to capture the button synchronously before the async clipboard Promise and cloned original nodes to restore the state accurately after a timeout.
