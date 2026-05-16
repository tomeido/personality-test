## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-05-16 - Replaced Native Alerts with Inline Form/Button Feedback
**Learning:** Native `alert()` calls for simple user actions (like a clipboard copy fallback) are highly intrusive and break the user's flow, often presenting as jarring browser-level dialogs.
**Action:** When confirming small UI interactions (e.g., copying text, small state changes), use the element itself (or an adjacent inline element) to present temporary, non-disruptive feedback. Disable the element briefly to prevent multiple clicks and use safe DOM methods (`document.createElement`) to display the success/error message before reverting the element's state.
