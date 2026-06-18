## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-06-18 - Non-intrusive Feedback for Native API Fallbacks
**Learning:** Using `alert()` for routine actions like clipboard copying in fallback paths disrupts user flow and provides poor UX. Additionally, `navigator.clipboard.writeText()` will throw a synchronous error if the API is undefined (e.g. in non-secure contexts), bypassing `.catch()`.
**Action:** Replace `alert()` with inline UI feedback (temporarily altering the trigger element with a safe DOM API) and always wrap `navigator.clipboard` access in a synchronous `try...catch` block. Disable the interactive element during the feedback timeout to prevent rapid state corruption.
