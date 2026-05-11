## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.
## 2026-05-11 - Inline Button Feedback
**Learning:** Replaced a disruptive native `alert()` for clipboard copying success with inline button feedback. Using a temporary visual state change on the button itself keeps the user in the interaction flow and reduces friction.
**Action:** Always prefer inline feedback directly on the trigger element for micro-interactions like clipboard copies, using safe DOM APIs (`document.createElement`) to swap out contents briefly before restoring.
