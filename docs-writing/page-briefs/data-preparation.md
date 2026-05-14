# Page Brief: docs/manual/data-preparation.md

## Target reader

A researcher who just installed Nebula Lab and wants to get instrument data into the app and confirm it parsed correctly. Not a developer.

## User problem

"I have CSV/TXT/Excel files from an instrument. How do I get them into Nebula Lab, organized, and check the table is right before I do anything else?"

## Page outline (use docs-writing/style-guide.md Page Pattern)

1. 何时用这一页 — data preparation is the first workspace step; what it is for.
2. 基本步骤 — import → set grouping & parsing → check 轻量预览 → 确认导入 → check sample tree → verify rows/columns in the data table.
3. 关键选项 — import grouping (一起一组 vs 每个文件单独一组); header auto-detection and when to override; Excel 预览 Sheet + 导入范围; sample-tree management (新建分组/重命名/创建副本/拖拽移动); data-table 当前样品 switch + Sheet tabs.
4. 常见坑 — wrong header detection → adjust 表头行; supported formats are only csv/txt/xlsx/xls/dat/xy/asc; EDIT SCOPE: selecting a whole group means a column edit applies to every sample in it.
5. 下一步 — link to the plotting page.

## Required facts

All facts come from `docs-writing/fact-packs/data-preparation.md`. Use UI labels exactly as the fact pack quotes them.

## Exclusions

- Do not explain 列变换 / 批量填充 / 重置 or the right-side 处理/复用 panels beyond one sentence pointing to the plotting page.
- Do not mention recipe calculation, experiment records, or group servers (roadmap, not shipped).
- No screenshots in this pass.

## Related pages

- Previous: `docs/manual/concepts.md` (核心概念)
- Next: `docs/manual/plotting.md` (planned; link with the path `/manual/plotting`)
