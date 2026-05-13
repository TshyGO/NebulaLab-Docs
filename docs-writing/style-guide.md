# Nebula Lab Documentation Style Guide

Write for researchers who need to process experimental data, not for developers.

## Voice

Use plain, direct Chinese.

Prefer:

- `点 导入文件，选择 CSV、TXT 或 Excel 文件。`
- `如果表头没有识别对，在导入配置里调整表头行。`
- `导出到 Origin 前，先确认 X/Y 列和选中的样品。`

Avoid:

- `本功能旨在赋能用户高效完成数据资产管理。`
- `用户可根据实际需求灵活配置相关参数。`
- `通过智能化闭环提升科研工作流效率。`

## Rules

1. Start with the user's task, not the feature's architecture.
2. Use UI labels exactly as they appear in the app.
3. Give steps that a user can follow.
4. Explain when to change a setting and when to leave it alone.
5. Keep paragraphs short.
6. Do not promise features that are not shipped.
7. Mark prerequisites clearly, especially for Origin, Pro features, community login, and plugins.
8. If a fact is uncertain, write `需要确认` in the draft and let a reviewer resolve it.

## Page Pattern

Use this structure unless there is a better reason:

```md
# Page Title

## When To Use This

## Basic Steps

## Key Options

## Common Pitfalls

## Next Step
```

Chinese page headings may be localized in the final docs, but keep the information order consistent.
