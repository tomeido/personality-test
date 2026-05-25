## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-05-24 - Non-intrusive Feedback
**Learning:** Native `alert()` dialogs are highly intrusive, especially for secondary actions like clipboard fallback copying, as they block the main thread and break the user's flow.
**Action:** Replace `alert()` calls with temporary inline state changes on the trigger element itself (e.g., replacing button content with a success message, disabling the button to prevent rapid clicks, and reverting state after a short timeout via DOM API methods).