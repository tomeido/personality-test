## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-05-19 - Inline Feedback vs Native Alerts
**Learning:** Native `alert()` dialogs block the main thread, provide a jarring user experience, and lack stylistic consistency with the rest of the application.
**Action:** When providing feedback for non-critical user actions like copying to the clipboard, prefer inline state changes (e.g., updating button text and temporarily disabling it) over native alerts to provide a smoother, more integrated experience. Always preserve the original state by cloning child nodes for complex DOM elements.
