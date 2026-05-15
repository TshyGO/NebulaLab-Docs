# Agent rules for this repo

## Never destroy work without explicit permission

These operations can wipe local changes that are not in git history. **Do not run any of them autonomously** — ask first and wait for an explicit "yes":

- `git checkout <path>` / `git checkout -- <path>` / `git restore <path>` (overwrites working tree from HEAD or index)
- `git reset --hard` / `git reset --keep`
- `git clean -f` / `git clean -fd`
- `git stash` followed by `git stash drop`
- `rm -rf` / `Remove-Item -Recurse -Force` on tracked files or directories
- `> file` / `Set-Content file` / `Out-File file` that overwrites existing content with a smaller payload
- `git branch -D` / `git push --force` / `git push --force-with-lease`

The rule covers files I edited in this session AND any uncommitted work that was already in the working tree when I started. Uncommitted changes are not recoverable from git history.

## When something is broken, fix it in place

If a file is corrupted, malformed, or in an unexpected state, the first instinct must be to **repair, not revert**. Steps:

1. Read the file and identify the specific broken region.
2. Compare to what it should be (from conversation context, from git, from a sibling file).
3. Edit the broken region targeted-ly with the Edit tool.

Reverting is only acceptable when the user has explicitly asked for it.

## File encoding

When writing files that contain non-ASCII characters (Chinese text in particular), use the Write or Edit tool — they are encoding-safe. **Do not use PowerShell `Set-Content`, `Out-File`, `>`, `>>` redirection, or `Get-Content | Set-Content` pipelines on files that contain Chinese / Japanese / Korean / emoji**. On Windows PowerShell 5 these silently re-encode through the active codepage and corrupt UTF-8 byte sequences (typical symptom: the third byte of a 3-byte UTF-8 sequence is replaced with `?`, breaking sentence-ending punctuation like `。`, `、`, `—`, `…`).

If a bulk replacement across a file is needed, use Python with explicit `encoding='utf-8'` on both read and write.
