## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-05-10 - Replace native alerts with inline button feedback
**Learning:** Native `alert()` dialogs for non-critical notifications (like copying to clipboard) disrupt user flow and feel unpolished.
**Action:** Replace `alert()` with temporary inline state changes on the trigger element itself (e.g., changing button text to "✅ 복사 완료!" for 2 seconds before reverting), ensuring changes are made using DOM API methods (`createElement`, `createTextNode`) with proper `aria-hidden` attributes for decorative icons.
