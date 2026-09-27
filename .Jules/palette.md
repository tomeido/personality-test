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

## 2024-11-21 - Thread Yielding for Loading States
**Learning:** In vanilla JavaScript, updating the DOM to show an inline loading state immediately before a heavy, blocking synchronous operation (like drawing a large canvas for result cards) can fail to visually render. The browser requires time to process the DOM update and paint the changes to the screen, but the synchronous code blocks the main thread, resulting in the user never seeing the loading state.
**Action:** Always explicitly yield execution to the main thread after updating the DOM for a loading state and before a heavy synchronous task using `await new Promise(resolve => setTimeout(resolve, 50))`. This allows the browser enough time to paint the loading indicator before the main thread is blocked.
