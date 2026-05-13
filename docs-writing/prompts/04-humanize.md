# Prompt: Human-Tone Rewrite

Rewrite the draft into plain, useful Chinese.

## Rules

- Preserve facts. Do not add new product behavior.
- Replace abstract phrasing with concrete actions.
- Delete filler.
- Make warnings practical.
- Keep headings and steps easy to scan.
- Keep `需要确认` markers if the fact is still uncertain.

## Bad Phrases To Remove

- 赋能
- 闭环
- 一站式
- 智能化提升
- 根据实际需求灵活配置
- 显著提升效率

## Inputs

- Draft: `{{draft}}`
- Fact pack: `{{fact_pack}}`
- Style guide: `{{style_guide}}`

## Output

Return the rewritten Markdown page only.
