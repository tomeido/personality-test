## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.
## 2024-05-18 - Inline Feedback vs Alerts
**Learning:** Native `alert()` dialogs are disruptive to the user flow, especially for common actions like copying to clipboard.
**Action:** Replace `alert()` messages with temporary inline state changes on the trigger element (e.g., replacing button text with "✅ 복사 완료") to provide smooth, context-aware feedback without interrupting the user. Always disable the button during the timeout period to prevent rapid repeated clicks.
