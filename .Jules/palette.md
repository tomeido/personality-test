## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.
## 2026-05-09 - Accessible Toast Messages & Decorative Icons
**Learning:** In SPAs, visual feedback mechanisms (like a "Copied!" notification that briefly appears in place of a button) are often missed by screen readers unless properly announced. Furthermore, decorative emojis used alongside text (like "📤 Share") cause redundant or confusing announcements.
**Action:** Always wrap dynamic UI status text regions with `aria-live="polite"` (so the updated text is naturally read out) and add `aria-hidden="true"` to purely decorative emojis inside actionable elements.
