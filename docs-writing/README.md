# Nebula Lab Docs Writing

This directory defines the team workflow for AI-assisted user manual writing.

The goal is not to let a model invent product documentation. The goal is to run a constrained pipeline:

1. extract facts from the current Nebula Lab app,
2. write a narrow page brief,
3. draft one page from that brief,
4. rewrite it into plain user-facing Chinese,
5. fact-check against source material,
6. open a pull request for human review.

Shared files in this directory should be committed. Personal machine paths and model credentials should stay outside git.

## Local Setup

Copy the example config:

```bash
cp docs-ai.config.example.json docs-ai.config.local.json
```

Edit `docs-ai.config.local.json` for your machine:

```json
{
  "appRepoPath": "../NebulaLab",
  "docsRepoPath": ".",
  "modelProvider": "deepseek",
  "draftModel": "deepseek-chat",
  "rewriteModel": "deepseek-chat"
}
```

`docs-ai.config.local.json` is ignored by git. Do not commit local paths, API keys, or private tokens.

## Source Policy

Use current product sources for facts:

- Nebula Lab UI components and copy files
- release notes
- public release README
- existing documentation
- committed fact packs

Do not present roadmap items as current behavior.

## Team Roles

- Source owner: can access the private Nebula Lab app repository and refresh fact packs.
- Page owner: reviews one page PR for usefulness and voice.
- Editor: checks structure, terminology, and consistency.
- AI coordinator: runs the pipeline, opens PRs, and responds to review comments.

One person may hold multiple roles, but the PR must still receive human review.
