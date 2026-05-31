## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.
## 2026-05-31 - Native Alert Disruption
**Learning:** Native `alert()` modals severely interrupt user flow, especially during frequent actions like copying a link. Furthermore, simply swapping it for text replacement without cloning child nodes breaks complex button structures (like emoji icons alongside text).
**Action:** Replace non-critical `alert()` modals with temporary inline state changes on the trigger element. Always use `.cloneNode(true)` on original children to perfectly restore complex button HTML after the feedback timeout.
