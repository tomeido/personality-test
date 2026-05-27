## 2024-05-24 - Inline Clipboard Feedback
**Learning:** Using native `alert()` for clipboard copy confirmation creates a jarring UX and disrupts keyboard focus and screen reader continuity.
**Action:** Replace `alert()` with inline state changes on the trigger element (e.g., "✅ 복사 완료!"), disabling the button temporarily, and restoring original DOM structure after a timeout to provide smooth, accessible feedback.
