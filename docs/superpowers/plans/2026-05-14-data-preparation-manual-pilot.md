# Data Preparation Manual Page Pilot — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Run the `data-preparation` manual page through all six stages of the `docs-writing/` AI-assisted pipeline, producing the page plus reusable fact pack and brief.

**Architecture:** This is a documentation pipeline, not code. "Tests" map to two verification gates: the Stage 5 fact-check checklist (`docs-writing/review-checklist.md`) and `npm run docs:build`. Each task produces one artifact file and ends with a commit. Facts are grounded in the Nebula Lab app source at `e:/Antigravity_Workshop/Data_Process` (app `v0.8.4`), read-only.

**Tech Stack:** VitePress (zh-CN), Markdown. Source app: React + Tauri (`src/components/workspace/`), UI copy in `src/lib/copy.ts`.

**Branch:** `claude/data-preparation-manual-pilot` (already created, spec already committed there).

**Spec:** `docs/superpowers/specs/2026-05-14-data-preparation-manual-pilot-design.md`

---

## File Structure

| File | Responsibility | Task |
| --- | --- | --- |
| `docs-writing/fact-packs/data-preparation.md` | Source-of-truth fact summary, cites real files | 1 |
| `docs-writing/page-briefs/data-preparation.md` | Drafting instructions for one page | 2 |
| `docs/manual/data-preparation.md` | The published manual page | 3 (draft), 4 (humanize), 5 (fact-check) |
| `docs/.vitepress/config.ts` | Add page to `/manual/` sidebar | 6 |
| `docs-writing/page-map.md` | Update `data-preparation` row status | 6 |

---

## Task 1: Fact Pack

**Files:**
- Create: `docs-writing/fact-packs/data-preparation.md`
- Reference (read-only): `e:/Antigravity_Workshop/Data_Process/src/components/workspace/{DataPreparationView,SampleTree,PrepCenter,DataTableView,PrepRightPanel,ImportConfigDrawer}.tsx`, `src/components/WorkspaceShell.tsx`, `src/lib/copy.ts`
- Reference: `docs-writing/fact-packs/README.md` (format), `docs-writing/workflow.md` Stage 1 (what a fact pack must answer)

- [ ] **Step 1: Confirm the source facts below still match `Data_Process`**

Spot-check 3 things in `e:/Antigravity_Workshop/Data_Process` before writing — line numbers drift, labels do not:
- `src/lib/copy.ts` still has `prep: '数据准备'`, `importFiles: '导入文件'`, `importHint`, `useHeader`/`headerRow`/`skipRows`/`delimiter`/`encoding`, `previewSheet`, `confirmImport`, `tableWorkspace: '表格工作区'`, `currentSample`, `prepEmptyTitle`.
- `src/components/workspace/SampleTree.tsx` still hardcodes the panel heading `原始数据管理` and the file-dialog extension filter.
- `src/components/workspace/ImportConfigDrawer.tsx` still has the `helper` object with `导入分组` / `基本解析` / `轻量预览` section labels.

If any label changed, use the current label and note it; also update `docs-writing/terminology.md` if a tracked term changed (per `workflow.md`).

- [ ] **Step 2: Write the fact pack**

Write `docs-writing/fact-packs/data-preparation.md` with these sections. Every bullet must cite a file. Content to capture:

```markdown
# Fact Pack: 数据准备 (data-preparation)

App version: v0.8.4 · Source: e:/Antigravity_Workshop/Data_Process (read-only reference)

## Where the feature appears
- Top nav button `数据准备` — first of three workspace steps (`数据准备` / `绘图工作台` / `导出`). Source: `src/components/WorkspaceShell.tsx` (`viewMode === 'prep'`), `src/lib/copy.ts` (`prep: '数据准备'`).
- Layout is three horizontal panels. Source: `src/components/workspace/DataPreparationView.tsx`.
  - Left: sample tree, panel heading `原始数据管理`. Source: `SampleTree.tsx`.
  - Center: data table, header `表格工作区`. Source: `PrepCenter.tsx` → `DataTableView.tsx`, `copy.ts` (`tableWorkspace`).
  - Right: processing / pipeline / reuse panels — OUT OF SCOPE for this page. Source: `PrepRightPanel.tsx`.

## What the user can do — Import
- Two entry points (Source: `SampleTree.tsx`):
  1. Click `导入文件` (button, top-right of `原始数据管理`) → file picker. Allowed extensions: `csv, txt, xlsx, xls, dat, xy, asc`.
  2. Drag files onto the window → drop overlay → same import dialog.
- Import dialog `导入文件` (Source: `ImportConfigDrawer.tsx`, `copy.ts`):
  - Info chips: `首个文件 {name}`, `文件数 {count}`, `文件类型 {type}` (`自动识别` until analyzed).
  - Section `导入分组`: select `本次一起导入为一组` / `每个文件单独一组`; group-name input (`分组名` / `分组名前缀`, both optional — blank auto-names). Default: together when >1 file, separate when 1.
  - Section `基本解析`: `使用表头` (启用/禁用), `表头行`, `跳过行数`, `分隔符`, `编码`. For Excel, `分隔符` and `编码` are disabled.
  - Header structure is auto-detected on the first analysis pass; `使用表头`/`表头行`/`跳过行数` are only sent after that pass. Practical meaning: leave them alone unless detection is wrong.
  - Excel only: `预览 Sheet` selector; if >1 sheet, `导入范围` toggle `全部 Sheet` / `当前 Sheet`.
  - Section `轻量预览`: first 5 rows.
  - Footer: `取消` / `确认导入` (shows `导入中…` while running). Success task: `已导入 {count} 个数据表`. Failure: `导入失败：{message}`.

## What the user can do — Sample tree
Source: `SampleTree.tsx`, `copy.ts`.
- Tree is `分组` (group) nodes containing `样品` (sample) nodes; groups can nest. Group kinds: `group` / `子组` / `独立流程`.
- Search box placeholder `搜索样品…`. Empty states: `还没有导入样品，先选择或拖入文件。` / `没有匹配的样品。`. Footer counters: `{n} 分组 · {n} 样品`.
- Group actions (hover buttons + right-click): `创建副本`, `重命名分组`, `删除分组`. Root right-click: `导入文件`, `创建分组` (dialog input `分组名称`).
- Sample actions: `创建副本`, `重命名样品`, `删除样品`. Deleting the last sample of a file deletes the file (`删除文件`).
- Drag a sample onto another group → confirm-move dialog. Drag onto empty root area → `拖到这里，新建分组` → confirm-new-group dialog.
- Delete confirmations warn about cascade: deleting a file removes all its samples and groups; deleting a group removes the samples inside it.

## What the user can do — Data table
Source: `DataTableView.tsx`, `copy.ts`.
- `当前样品` dropdown switches the previewed sample/bundle within the current group.
- Info chips: file name, group name, `{n} 行`, `{n} 列`, selected-row count, current-column summary, `同步中` while loading.
- Excel bundles show Sheet tab buttons under the header.
- Cells are editable inline. Empty/error state: `先导入一批同类数据` / `导入后会按文件自动建组，你可以在这里切换文件、Sheet、分组和样品。`.

## EDIT SCOPE — mandatory pitfall
Source: `DataTableView.tsx` (`editScope` memo).
- Table edits apply by scope: `当前分组` (all samples in the group) / `当前 Sheet` / `当前样品`.
- When the whole group is selected, scope becomes `group` — editing one column hits EVERY sample in the group. This is counter-intuitive and must be warned about in the page.

## Out of scope (mention once, link to plotting page)
- Right-click table operations: `列变换`, `批量填充选中行`, `删除行/列`, `重置`, `新增行/列`. Source: `DataTableView.tsx`.
- Right panel: `当前状态` / `已记录步骤` / `应用与复用`. Source: `PrepRightPanel.tsx`.

## Must NOT be claimed
- No recipe/formula calculation, no experiment records, no group server — these are roadmap items (`docs/roadmap/index.md`), not shipped.
- Do not describe processing operations in detail; that belongs to the `plotting` page per `docs-writing/page-map.md`.

## Supporting sources
`src/components/workspace/DataPreparationView.tsx`, `SampleTree.tsx`, `PrepCenter.tsx`, `DataTableView.tsx`, `PrepRightPanel.tsx`, `ImportConfigDrawer.tsx`, `src/components/WorkspaceShell.tsx`, `src/lib/copy.ts`; app version `version.json` (v0.8.4).
```

- [ ] **Step 3: Verify the fact pack cites only real files and shipped behavior**

Re-read the fact pack against `docs-writing/workflow.md` Stage 1. Confirm: every section answers a Stage 1 question, every bullet cites a file, nothing from `docs/roadmap/index.md` is stated as current.

- [ ] **Step 4: Commit**

```bash
git add docs-writing/fact-packs/data-preparation.md
git commit -m "docs: add data-preparation fact pack

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 2: Page Brief

**Files:**
- Create: `docs-writing/page-briefs/data-preparation.md`
- Reference: `docs-writing/fact-packs/data-preparation.md` (Task 1), `docs-writing/page-briefs/README.md`, `docs-writing/workflow.md` Stage 2, `docs-writing/page-map.md` (the `data-preparation` row + links to neighbors), `docs/superpowers/specs/2026-05-14-data-preparation-manual-pilot-design.md` (the agreed outline)

- [ ] **Step 1: Write the page brief**

Write `docs-writing/page-briefs/data-preparation.md`. It must be small enough for a cheap model with no repo access. Content:

```markdown
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
All facts come from docs-writing/fact-packs/data-preparation.md. Use UI labels exactly as the fact pack quotes them.

## Exclusions
- Do not explain 列变换 / 批量填充 / 重置 or the right-side 处理/复用 panels beyond one sentence pointing to the plotting page.
- Do not mention recipe calculation, experiment records, or group servers (roadmap, not shipped).
- No screenshots in this pass.

## Related pages
- Previous: docs/manual/concepts.md (核心概念)
- Next: docs/manual/plotting.md (planned; link with the path /manual/plotting)
```

- [ ] **Step 2: Commit**

```bash
git add docs-writing/page-briefs/data-preparation.md
git commit -m "docs: add data-preparation page brief

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 3: Draft the Page

**Files:**
- Create: `docs/manual/data-preparation.md`
- Reference: `docs-writing/page-briefs/data-preparation.md`, `docs-writing/fact-packs/data-preparation.md`, `docs-writing/style-guide.md`, `docs-writing/terminology.md`, existing pages `docs/manual/concepts.md` and `docs/manual/workflow.md` (for tone/format match)

- [ ] **Step 1: Write the draft page**

Write `docs/manual/data-preparation.md` following the brief outline. Rules: use `docs-writing/style-guide.md` Page Pattern; use UI labels exactly as the fact pack quotes them; if any fact is uncertain, write `需要确认：...` instead of inventing. Structure:

```markdown
# 数据准备

## 何时用这一页

[2-3 sentences: 数据准备是工作区的第一步；把仪器导出的 CSV / TXT / Excel 导入，理成「分组 → 样品」结构，并确认表格解析正确。]

## 基本步骤

1. 在「原始数据管理」面板点「导入文件」，或把文件拖进面板。支持 csv、txt、xlsx、xls、dat、xy、asc。
2. 在「导入文件」弹窗里设「导入分组」，检查「基本解析」，看「轻量预览」前 5 行是否正确。
3. 点「确认导入」。
4. 在左侧样品树里检查「分组」和「样品」结构。
5. 在中间「表格工作区」用「当前样品」逐个核对行列。

## 关键选项

### 导入分组
[本次一起导入为一组 / 每个文件单独一组；分组名可留空自动命名。]

### 基本解析与表头
[表头会自动识别，一般不用动「使用表头」「表头行」「跳过行数」；只有识别错了才改。Excel 文件「分隔符」「编码」不可用。]

### Excel 的 Sheet
[预览 Sheet 选择；多 Sheet 时「导入范围」可选「全部 Sheet」或「当前 Sheet」。]

### 样品树管理
[创建分组、重命名、创建副本；拖样品到别的分组移动，拖到空白处新建分组。删除文件/分组会连带删除下面的样品，弹窗会提示。]

### 数据表查看
[「当前样品」下拉切换样品；Excel 会显示 Sheet 标签页；单元格可直接编辑。]

## 常见坑

- 表头识别错了：在「导入文件」弹窗里手动调「表头行」。
- 格式不支持：只接受 csv、txt、xlsx、xls、dat、xy、asc。
- 编辑作用域：选中整个「分组」时，改一列会作用到组内所有样品。只想改一个样品，先在「当前样品」里单独选它。

## 下一步

数据导入并核对后，进入[绘图工作台](/manual/plotting)处理数据、出图。数据表右键里的「列变换」等处理操作也在那一页讲。
```

- [ ] **Step 2: Commit**

```bash
git add docs/manual/data-preparation.md
git commit -m "docs: draft data-preparation manual page

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 4: Humanize Pass

**Files:**
- Modify: `docs/manual/data-preparation.md`
- Reference: `docs-writing/workflow.md` Stage 4, `docs-writing/style-guide.md` (Voice section), `docs-writing/review-checklist.md` (Voice section)

- [ ] **Step 1: Rewrite for plain, direct Chinese**

Edit `docs/manual/data-preparation.md`: shorten sentences, make steps concrete actions, remove abstract nouns and any marketing tone, delete vague "根据需要" filler. Do NOT add new product facts — only rephrase what is already there. Check against the `style-guide.md` "Avoid" examples and `review-checklist.md` "Voice" items (no `高效赋能`, `智能闭环`, `一站式提升`; short paragraphs; warnings explain what goes wrong and how to recover).

- [ ] **Step 2: Commit**

```bash
git add docs/manual/data-preparation.md
git commit -m "docs: humanize data-preparation page tone

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 5: Fact-Check Pass

**Files:**
- Modify: `docs/manual/data-preparation.md` (only if the check finds problems)
- Reference: `docs-writing/fact-packs/data-preparation.md`, `docs-writing/review-checklist.md`, `docs-writing/workflow.md` Stage 5

- [ ] **Step 1: Run the fact-check checklist**

Go through `docs/manual/data-preparation.md` line by line against `docs-writing/review-checklist.md` "Required" items:
- Every button/page/section name in the page appears in the fact pack.
- No roadmap item (recipe calc, experiment records, group server) is described as current.
- Origin / Pro / login / plugin dependencies — none claimed here, confirm none leaked in.
- The page links to a sensible next step (`/manual/plotting`).
- Any remaining `需要确认：...` markers are resolved or escalated.

Fix any issue inline.

- [ ] **Step 2: Commit (only if Step 1 changed the file)**

```bash
git add docs/manual/data-preparation.md
git commit -m "docs: fact-check fixes for data-preparation page

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

If Step 1 found nothing to fix, skip the commit and note "fact-check clean, no changes".

---

## Task 6: Wire the Page into the Site

**Files:**
- Modify: `docs/.vitepress/config.ts` (the `/manual/` sidebar `items` array)
- Modify: `docs-writing/page-map.md` (the `data-preparation` row)

- [ ] **Step 1: Add the sidebar entry**

In `docs/.vitepress/config.ts`, the `/manual/` sidebar currently is:

```ts
      '/manual/': [
        {
          text: '用户手册',
          items: [
            { text: '开始之前', link: '/manual/' },
            { text: '核心概念', link: '/manual/concepts' },
            { text: '数据处理流程', link: '/manual/workflow' },
            { text: '社区与模板', link: '/manual/community' }
          ]
        }
      ],
```

Add `数据准备` after `核心概念`:

```ts
      '/manual/': [
        {
          text: '用户手册',
          items: [
            { text: '开始之前', link: '/manual/' },
            { text: '核心概念', link: '/manual/concepts' },
            { text: '数据准备', link: '/manual/data-preparation' },
            { text: '数据处理流程', link: '/manual/workflow' },
            { text: '社区与模板', link: '/manual/community' }
          ]
        }
      ],
```

- [ ] **Step 2: Update the page map**

In `docs-writing/page-map.md`, the current row is:

```markdown
| `docs/manual/data-preparation.md` | Import, parse, preview, columns, sample tree | needed | not started | TBD |
```

Change `Source Status` and `Draft Status`:

```markdown
| `docs/manual/data-preparation.md` | Import, parse, preview, columns, sample tree | fact pack | drafted | TBD |
```

- [ ] **Step 3: Commit**

```bash
git add docs/.vitepress/config.ts docs-writing/page-map.md
git commit -m "docs: wire data-preparation page into manual sidebar and page map

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 7: Build Validation

**Files:** none modified unless the build fails.

- [ ] **Step 1: Install dependencies if needed**

Run: `npm install`
Expected: completes without errors (node_modules already present; this is a no-op refresh).

- [ ] **Step 2: Run the docs build**

Run: `npm run docs:build`
Expected: VitePress build completes, no dead-link errors, `docs/manual/data-preparation.md` appears in the built output. The `/manual/plotting` link target does not yet exist — VitePress treats unknown internal links as a build error only if dead-link checking is on. If the build fails on the `/manual/plotting` link, change the link in `docs/manual/data-preparation.md` to plain text "绘图工作台（页面规划中）" and note it for the PR; do not invent a `plotting.md` page.

- [ ] **Step 3: Commit (only if Step 2 forced a change)**

```bash
git add docs/manual/data-preparation.md
git commit -m "docs: adjust plotting link until plotting page exists

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

If the build passed with no changes, skip the commit and note "docs:build passed".

---

## Task 8: Open the Pull Request

**Files:** none. This task pushes the branch and opens a PR.

- [ ] **Step 1: Push the branch**

```bash
git push -u origin claude/data-preparation-manual-pilot
```

- [ ] **Step 2: Create the PR**

Run `gh pr create` with base `main` and this body (per `docs-writing/workflow.md` Stage 6 — fact pack, generated pages, validation command, human review focus):

```markdown
## What

First manual page run through the `docs-writing/` AI-assisted pipeline: `数据准备` (data-preparation).

## Source fact pack

`docs-writing/fact-packs/data-preparation.md` — grounded in `src/components/workspace/` and `src/lib/copy.ts` of the Nebula Lab app (v0.8.4).

## Generated / edited files

- `docs-writing/fact-packs/data-preparation.md` (new)
- `docs-writing/page-briefs/data-preparation.md` (new)
- `docs/manual/data-preparation.md` (new)
- `docs/.vitepress/config.ts` (sidebar entry)
- `docs-writing/page-map.md` (row status)
- `docs/superpowers/specs/...` + `docs/superpowers/plans/...` (pilot spec & plan)

## Validation

`npm run docs:build` — passes.

## Human review focus

- Does the page match real product usage? (page owner)
- Are all UI labels current? (the app moves; labels were read from v0.8.4)
- Is the EDIT SCOPE pitfall described correctly — selecting a group means a column edit hits every sample?
- The `/manual/plotting` next-step link points to a page that does not exist yet.

Do not merge without human review (per `docs-writing/review-checklist.md`).
```

- [ ] **Step 3: Report the PR URL**

Output the PR URL to the user. Do not merge — the pilot ends at "PR open, awaiting human review".

---

## Self-Review

**Spec coverage:**
- Six deliverables in the spec → Tasks 1, 2, 3–5, 6 (config.ts + page-map), 8. ✓
- "Strictly follow all 6 pipeline stages" → Task 1 (Stage 1), 2 (Stage 2), 3 (Stage 3), 4 (Stage 4), 5 (Stage 5), 8 (Stage 6). ✓
- "Processing operations out of scope, one sentence → plotting" → enforced in Task 1 (Out of scope section), Task 2 (Exclusions), Task 3 (下一步 section). ✓
- "EDIT SCOPE mandatory warning" → Task 1 dedicated section, Task 3 常见坑, Task 5 check. ✓
- "PR not auto-merged" → Task 8 Step 3 explicit. ✓
- "npm run docs:build passes" → Task 7. ✓
- Success criterion "fact pack reusable as template" → fact pack format in Task 1 is generic enough for plotting/export. ✓

**Placeholder scan:** No "TBD/TODO" in task steps. The `TBD` in the page-map row is existing source content being edited, not a plan placeholder. Each artifact has its full content shown.

**Type/label consistency:** UI labels (`数据准备`, `导入文件`, `原始数据管理`, `表格工作区`, `当前样品`, `轻量预览`, `确认导入`) are quoted identically in Tasks 1, 2, and 3. The `/manual/plotting` link target is referenced consistently in Tasks 2, 3, 7, 8 with the same fallback handling.
