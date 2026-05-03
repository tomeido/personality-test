## 2026-05-03 - Dynamic Progress Bar Accessibility
**Learning:** Screen readers won't announce updates to a custom visual progress bar by default. Hiding the visual text with aria-hidden="true" and using a properly marked up role="progressbar" with aria-valuenow updating dynamically provides a standard, robust experience.
**Action:** Always add role="progressbar", aria-valuemin, aria-valuemax, aria-valuenow, and an aria-label to custom progress bars, and update aria-valuenow programmatically as the value changes.
