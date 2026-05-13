# Documentation PR Review Checklist

Use this checklist for AI-generated documentation PRs.

## Required

- [ ] The PR links to a fact pack or source summary.
- [ ] The page does not describe roadmap items as current features.
- [ ] UI labels match the current app copy.
- [ ] The page gives concrete steps, not generic product language.
- [ ] Pro-only, Origin-dependent, login-dependent, or plugin-dependent features state prerequisites.
- [ ] The page links to a sensible next step.
- [ ] `npm run docs:build` passes.

## Voice

- [ ] No empty phrases such as `高效赋能`, `智能闭环`, `一站式提升`.
- [ ] Paragraphs are short.
- [ ] Steps are written as actions a user can take.
- [ ] Warnings explain what can go wrong and how to recover.

## Merge Policy

Do not merge until at least one human reviewer has checked the page for real product usage. Admin bypass is allowed only when the repository owner explicitly asks for it.
