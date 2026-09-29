## 2024-05-05 - Dynamic Content Accessibility
**Learning:** In vanilla JavaScript SPAs where content updates dynamically (like a quiz UI), screen readers are unaware of the DOM changes.
**Action:** Always add `aria-live="polite"` and `aria-atomic="true"` to the container element of dynamic content so that screen readers can announce the updates gracefully without requiring a page reload.

## 2024-05-24 - Dynamic Visualization Accessibility
**Learning:** Real-time visual updates (like progress bars or charts) need ARIA live regions so screen reader users get the same continuous feedback as sighted users.
**Action:** Apply `aria-live="polite"` to the container of the dynamic visualization elements.

## 2025-02-12 - Screen Reader Experience with Decorative Emojis
**Learning:** Decorative emojis can degrade the screen reader experience by adding noise, especially when they are accompanied by text that already conveys the meaning.
**Action:** Consistently apply `aria-hidden="true"` to wrapper elements (e.g., `<div class="card-icon">`, `<span class="answer-icon">`) or `<span>` tags containing decorative emojis.

## 2024-11-20 - Inline Clipboard Feedback
**Learning:** Native `alert()` is disruptive and stops script execution. It shouldn't be used for routine feedback like copying text to clipboard. Replacing it with inline UI feedback on the button is much smoother, but it's crucial to clone the element's original `childNodes` synchronously before the async copy operation so the button can be perfectly restored later, preserving structure like icons. Additionally, handling clipboard APIs requires synchronous `try...catch` because it throws immediately in non-secure or unsupported environments.
**Action:** When replacing blocking notifications with inline UI state on interactive elements, always synchronously capture `event.currentTarget` and clone `childNodes` (to preserve icons/emojis). Wrap `navigator.clipboard.writeText` in a synchronous `try...catch` to ensure error fallbacks run reliably in all environments.

## 2025-05-18 - Inline Feedback for Heavy Tasks (Canvas/Download)
**Learning:** For heavy operations like building a result card canvas or interacting with the Web Share API (which might be aborted by the user), failing to provide inline feedback can make the app feel unresponsive. Moreover, restoring the button state after a share cancellation or download fallback requires cloning its original `childNodes` and applying state changes carefully (disabled, text updates) and synchronously catching errors.
**Action:** When a button triggers a heavy task (e.g., `buildResultCardCanvas` + Web Share), add an immediate UI feedback state (like '저장 중...') by temporarily replacing the button's content and disabling it. Yield execution (e.g., `await new Promise(r => setTimeout(r, 50))`) to allow the UI to render. Ensure the button's children are cloned synchronously at the beginning and restored accurately after the share resolves, aborts, or the fallback download completes.
