# Fact Pack: 数据准备 (data-preparation)

App version: v0.8.4 · Source: `e:/Antigravity_Workshop/Data_Process` (read-only reference)

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
