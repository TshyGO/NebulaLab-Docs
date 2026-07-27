# Nebula Lab Docs

Public documentation site for Nebula Lab.

Local preview:

```bash
npm install
npm run docs:dev
```

Build:

```bash
npm run docs:build
```

The site is published to Cloudflare Pages at:

```text
https://nebulalab.app/
```

Cloudflare Pages settings: build command `npm run docs:build`, output directory
`docs/.vitepress/dist`, environment variable `NODE_VERSION=24`.

The legacy GitHub Pages path `https://tshygo.github.io/NebulaLab-Docs/` now serves a
redirect shell only (see `redirect/` and `.github/workflows/deploy.yml`), so the docs
links baked into already-released app builds keep working.
