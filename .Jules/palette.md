## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2026-06-20 - Inline Button Feedback Pattern
**Learning:** Using native `alert()` for non-critical notifications (like copying text to clipboard) disrupts the user flow. When replacing it with inline button text (e.g. changing button content to "✅ 복사 완료!"), the original DOM structure (including emojis or icons) must be safely preserved. Additionally, `event.currentTarget` becomes `null` after an asynchronous operation, so the target must be captured synchronously.
**Action:** Clone the original child nodes synchronously (`child.cloneNode(true)`), update the button text, disable it to prevent rapid clicks, and use `setTimeout` to safely restore the original DOM state after the feedback period ends.
