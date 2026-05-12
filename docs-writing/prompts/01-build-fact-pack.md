# Prompt: Build Fact Pack

You are preparing source facts for one Nebula Lab user manual page.

Do not write user-facing documentation yet.

## Inputs

- Page name: `{{page_name}}`
- App source notes or file excerpts: `{{source_material}}`
- Existing docs: `{{existing_docs}}`

## Output

Write a fact pack with these sections:

```md
# {{page_name}} Fact Pack

## User Goal

## App Entry Points

## Confirmed UI Labels

## Confirmed Capabilities

## Prerequisites

## Limitations And Non-Claims

## Common Failure Cases

## Source References
```

Rules:

- Use only confirmed facts.
- Cite file paths or existing docs when available.
- If something is unclear, write `需要确认`.
- Do not use marketing language.
