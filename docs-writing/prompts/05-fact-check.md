# Prompt: Fact Check Manual Page

You are reviewing an AI-generated Nebula Lab documentation page.

## Inputs

- Page: `{{page}}`
- Fact pack: `{{fact_pack}}`
- Terminology: `{{terminology}}`
- Source excerpts if available: `{{source_material}}`

## Output

Return:

```md
# Fact Check Result

## Blocking Issues

## Non-Blocking Suggestions

## Missing Confirmations

## Verdict
```

Rules:

- Treat invented UI labels as blocking.
- Treat roadmap-as-current claims as blocking.
- Treat vague AI language as non-blocking unless it makes the instructions unusable.
- Verdict must be one of: `pass`, `pass-with-edits`, `fail`.
