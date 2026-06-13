## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-05-20 - Non-blocking Feedback for Native API Fallbacks
**Learning:** Native API fallbacks (like clipboard API for unsupported share API) often use `alert()` for notifications, which blocks the UI thread, breaks keyboard flow, and creates a jarring user experience.
**Action:** Avoid native `alert()` for non-critical notifications. Replace it with accessible inline state changes (e.g., temporarily replacing the trigger button's content with a success message) and disable the element to prevent state corruption during the timeout, before restoring the original DOM structure.
