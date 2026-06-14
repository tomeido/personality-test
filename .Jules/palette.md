## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-05-18 - Avoid native alert for clipboard feedback
**Learning:** Using native `alert()` for clipboard operations interrupts user flow and feels jarring. It can also cause issues if triggered repeatedly.
**Action:** Replace `alert()` with temporary inline state changes on the trigger element (e.g., disabling the button and changing its content to a success message). Always clone child nodes and manage the disabled state carefully to avoid DOM corruption during asynchronous updates.
