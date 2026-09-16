"""Print a limited, redacted error from Claude's execution JSON array."""

import json
import os
from pathlib import Path
import re


def redact(text):
    for name, value in os.environ.items():
        if value and re.search(r"TOKEN|SECRET|PASSWORD|API_KEY", name):
            text = text.replace(value, "[REDACTED]")
    patterns = (
        r"\b(?:sk-[A-Za-z0-9_-]+|gh[pousr]_[A-Za-z0-9_]+|github_pat_[A-Za-z0-9_]+)",
        r"\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+",
        r"(?i)\b(?:bearer|basic)\s+[A-Za-z0-9._~+/=-]+",
        r"(?i)\b(?:api[_-]?key|access[_-]?token|refresh[_-]?token|oauth[_-]?token|password|secret)"
        r"[\"']?\s*[:=]\s*[\"']?[A-Za-z0-9._~+/=-]+",
    )
    for pattern in patterns:
        text = re.sub(pattern, "[REDACTED]", text)
    return text


def main():
    execution_file = os.environ.get("CLAUDE_EXECUTION_FILE")
    if not execution_file:
        print("Claude review diagnostic: execution output is unavailable.")
        return
    try:
        messages = json.loads(Path(execution_file).read_text())
    except (OSError, ValueError, UnicodeError):
        print("Claude review diagnostic: execution output is missing or invalid.")
        return

    if not isinstance(messages, list):
        print("Claude review diagnostic: execution output has an unexpected format.")
        return
    results = [
        message for message in messages
        if isinstance(message, dict) and message.get("type") == "result"
    ]
    if not results:
        print("Claude review diagnostic: no final result was recorded.")
        return
    result = results[-1]
    if result.get("subtype") == "success" and not result.get("is_error"):
        print("Claude review diagnostic: no failed final result was recorded.")
        return

    details = []
    if isinstance(result.get("result"), str):
        details.append(result["result"])
    errors = result.get("errors", [])
    if isinstance(errors, str):
        details.append(errors)
    elif isinstance(errors, list):
        details.extend(error for error in errors if isinstance(error, str))
    # A single prefixed line also prevents error text from becoming Actions commands.
    detail = " ".join(redact(" ".join(details)).split())[:2000]
    print("Claude review failure: " + (detail or "No error details were recorded."))


if __name__ == "__main__":
    main()
