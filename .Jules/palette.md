## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2026-06-29 - Inline Feedback for Clipboard Actions
**Learning:** Native `alert()` calls for success states (like "Copied to clipboard!") interrupt the user's flow and can be intrusive, particularly on mobile.
**Action:** Replace success alerts with temporary inline feedback directly on the interaction target (e.g., changing button text to "✅ Copied!"). Ensure to capture the original DOM state and restore it after a short delay (e.g., 2s) while keeping the original `alert()` logic exclusively as a fallback for errors or unsupported environments. Use `navigator.clipboard.writeText` safely by wrapping it in a synchronous `try...catch`.
