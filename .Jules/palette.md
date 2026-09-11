## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-05-24 - Dynamic Visualization Accessibility
**Learning:** Real-time visual updates (like progress bars or charts) need ARIA live regions so screen reader users get the same continuous feedback as sighted users.
**Action:** Apply `aria-live="polite"` to the container of the dynamic visualization elements.
