# Data Preparation Manual Page — Pilot Design

Date: 2026-05-14
Status: Approved (brainstorming)
Topic: First manual page written end-to-end through the `docs-writing/` AI-assisted pipeline.

## Purpose

The Nebula Lab user manual (`docs/manual/`) has four thin placeholder pages and a
13-page plan in `docs-writing/page-map.md`. The `docs-writing/` pipeline is fully
specified but has produced zero fact packs and zero briefs. This pilot runs one
page — `data-preparation` — through all six pipeline stages to:

1. validate the pipeline end-to-end, and
2. leave a reusable template (fact pack + brief + drafting approach) for the
   remaining first-batch pages.

`data-preparation` was chosen because it is content-rich enough to genuinely
exercise fact extraction and is the structural template for `plotting` and
`export`.

## Key context

- The Nebula Lab app source **is available locally** at
  `e:/Antigravity_Workshop/Data_Process` (app version `v0.8.4`). Fact extraction
  uses real source, not guesses. This is the main reason the pilot is feasible
  with grounded facts.
- Current data-preparation UI lives in `src/components/workspace/`:
  `DataPreparationView.tsx` (3-panel shell), `SampleTree.tsx` (left, 原始数据管理),
  `PrepCenter.tsx` + `DataTableView.tsx` (center, data table), `PrepRightPanel.tsx`
  (right, processing/pipeline/reuse), `ImportConfigDrawer.tsx` (import modal).
  UI copy is in `src/lib/copy.ts`.
- The Python `modules/pages/data_loader_page.py` is an older UI generation and is
  **not** the source of truth; the React `src/components/workspace/` tree is.

## Decisions locked in brainstorming

| Decision | Choice |
| --- | --- |
| How to start | Pilot one page through the full pipeline |
| Pipeline adherence | Strictly follow `docs-writing/workflow.md` (all 6 stages, all intermediate artifacts) |
| Pilot page | `data-preparation` |
| Scope of processing operations (column transform, bulk fill, reset, right-side panels) | Out of scope for this page — mention in one sentence and point to the `plotting` page |

## Deliverables

| Stage | Deliverable |
| --- | --- |
| 1 — Fact pack | `docs-writing/fact-packs/data-preparation.md`, citing concrete files under `src/components/workspace/` and labels from `src/lib/copy.ts` |
| 2 — Page brief | `docs-writing/page-briefs/data-preparation.md` |
| 3–5 — Draft, humanize, fact-check | `docs/manual/data-preparation.md` (final page) |
| supporting | `docs/.vitepress/config.ts` — add `data-preparation` to the `/manual/` sidebar |
| supporting | `docs-writing/page-map.md` — update the `data-preparation` row (Source Status / Draft Status) |
| 6 — PR | One PR; body includes fact pack link, `npm run docs:build` validation, and human-review focus per `workflow.md` Stage 6 |

## Page outline (`docs/manual/data-preparation.md`)

Follows the `style-guide.md` Page Pattern.

- **何时用这一页 (When to use)** — Data preparation is the first workspace step:
  bring instrument-exported CSV/TXT/Excel files in, organize them into a
  分组 → 样品 structure, and confirm the table content is parsed correctly.
- **基本步骤 (Basic steps)**
  1. Click 导入文件 in the 原始数据管理 panel, or drag files onto it.
  2. In the 导入文件 dialog set 导入分组, basic parsing (表头 / 跳过行数 / 分隔符 / 编码),
     and check the 轻量预览.
  3. Confirm with 确认导入.
  4. Check groups and samples in the sample tree.
  5. Verify rows/columns per sample in the center data table.
- **关键选项 (Key options)** — import grouping (一起一组 vs. 每个文件单独一组);
  header auto-detection and when to override it; Excel Sheet selection and
  导入范围 (全部 Sheet / 当前 Sheet); sample-tree management (新建分组 / 重命名 /
  创建副本 / drag-to-move); data-table sample switching and Sheet tabs.
- **常见坑 (Common pitfalls)** — wrong header detection → adjust 表头行;
  supported formats are only csv/txt/xlsx/xls/dat/xy/asc; **edit scope is
  counter-intuitive** — when a group is selected, editing one column applies to
  every sample in the group. The edit-scope warning is mandatory.
- **下一步 (Next step)** — link to the `plotting` page.

Processing operations (列变换, 批量填充, 重置, and the right-panel
处理流程/复用 sections) get **one sentence only**, pointing to `plotting`.

## Scope boundaries

- This pilot writes prose only. No screenshots beyond the placeholder pattern
  already used in existing pages.
- The other 11 planned manual pages are untouched.
- The PR is **not** auto-merged. It waits for human review per
  `review-checklist.md` and `workflow.md` Stage 6.
- No app source code is modified; `Data_Process` is read-only reference.

## Success criteria

- All six deliverables exist and are internally consistent.
- Every UI label in the page traces to the fact pack, which traces to a concrete
  source file or `copy.ts` entry.
- No roadmap item is described as a shipped feature.
- `npm run docs:build` passes.
- The fact pack and brief are reusable as a template for `plotting` / `export`.
