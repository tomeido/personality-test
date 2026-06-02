## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-05-19 - Replacing Native Alerts with Inline Feedback
**Learning:** Native `alert()` modals for non-critical confirmations (like "Copied to clipboard") are jarring, block the main thread, and disrupt user flow.
**Action:** Replace `alert()` with inline visual feedback on the triggering element (e.g., temporarily changing a button's text to "✅ Copied!"). Disable the button during the feedback period to prevent state corruption, and securely restore original nodes using `cloneNode(true)`.
