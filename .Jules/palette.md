## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.
## 2024-05-19 - Replace native alerts with inline UI feedback
**Learning:** Using native browser `alert()` for non-critical confirmations like "Copied to clipboard" disrupts the user flow, takes focus away from the application, and creates a jarring experience, particularly on mobile devices.
**Action:** Replace `alert()` calls with inline state changes directly on the trigger element. When an action completes, temporarily replace the button's content with a success/error message and disable the button to prevent duplicate actions, then restore the original state after a short delay (e.g., 2 seconds).
