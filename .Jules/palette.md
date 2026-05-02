## 2024-05-18 - Semantic Progress Bars
**Learning:** Custom `div`-based progress bars lack semantic meaning for screen readers. They cannot inherently announce progress updates.
**Action:** When implementing custom progress bars, always ensure to apply `role="progressbar"` and correctly manage `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` to convey progress context to assistive technologies.
