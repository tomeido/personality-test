## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-05-21 - Non-disruptive State Feedback
**Learning:** Native browser notifications like `alert()` block the main thread and disrupt the user's flow, creating a jarring UX, especially for simple success actions like copying a link.
**Action:** Replace `alert()` and other blocking modal dialogues for non-critical confirmations with temporary, inline state changes on the trigger element (e.g., swapping button text to "✅ Copied!" and disabling it briefly before reverting).
