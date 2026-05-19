## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.
## 2024-05-18 - Temporary Inline State for Copy Actions
**Learning:** Using native `alert()` for non-critical confirmations like clipboard copy disrupts the user's flow and feels unpolished.
**Action:** Use temporary inline UI updates on the trigger button (e.g., changing text to a success message and disabling it briefly) using safe DOM methods (`document.createElement`) and a `setTimeout` to revert to the original state.
