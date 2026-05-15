import { defineConfig } from 'vitepress'

const RELEASES_REPO = 'TshyGO/NebulaLab-Releases'

async function fetchLatestReleaseTag(): Promise<string> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 5000)
  try {
    const headers: Record<string, string> = { Accept: 'application/vnd.github+json' }
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    }
    const res = await fetch(`https://api.github.com/repos/${RELEASES_REPO}/releases/latest`, {
      headers,
      signal: controller.signal
    })
    if (!res.ok) return ''
    const data = (await res.json()) as { tag_name?: string }
    return typeof data.tag_name === 'string' ? data.tag_name : ''
  } catch {
    return ''
  } finally {
    clearTimeout(timer)
  }
}

const appVersion = await fetchLatestReleaseTag()

export default defineConfig({
  lang: 'en-US',
  title: 'Nebula Lab',
  description: 'A desktop workspace for experimental data: import, process, and export in reusable workflows.',
  base: '/NebulaLab-Docs/',
  cleanUrls: true,
  lastUpdated: true,
  appearance: 'dark',
  themeConfig: {
    appVersion,
    logo: '/logo.png',
    nav: [
      { text: 'Manual', link: '/manual/' },
      { text: 'Tutorials', link: '/tutorials/' },
      { text: 'Roadmap', link: '/roadmap/' },
      { text: 'Download', link: 'https://github.com/TshyGO/NebulaLab-Releases/releases/latest' }
    ],
    sidebar: {
      '/manual/': [
        {
          text: '用户手册',
          items: [
            { text: '入门指南', link: '/manual/' },
            { text: '核心概念', link: '/manual/concepts' },
            { text: '数据准备', link: '/manual/data-preparation' },
            { text: '数据处理流程', link: '/manual/workflow' },
            { text: '社区与模板', link: '/manual/community' }
          ]
        }
      ],
      '/tutorials/': [
        {
          text: '教程',
          items: [
            { text: '教程总览', link: '/tutorials/' },
            { text: '完成一次基础数据处理', link: '/tutorials/basic-processing' }
          ]
        }
      ],
      '/roadmap/': [
        {
          text: '路线图',
          items: [
            { text: '长期方向', link: '/roadmap/' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/TshyGO/NebulaLab-Releases' }
    ],
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: 'Search',
            buttonAriaLabel: 'Search docs'
          },
          modal: {
            displayDetails: 'Display details',
            resetButtonTitle: 'Clear search',
            backButtonTitle: 'Close search',
            noResultsText: 'No results found',
            footer: {
              selectText: 'Select',
              selectKeyAriaLabel: 'Enter',
              navigateText: 'Navigate',
              navigateUpKeyAriaLabel: 'Up arrow',
              navigateDownKeyAriaLabel: 'Down arrow',
              closeText: 'Close',
              closeKeyAriaLabel: 'Escape'
            }
          }
        }
      }
    },
    footer: {
      message: 'Built for experimental data workflows.',
      copyright: 'Copyright © 2026 Nebula Lab'
    }
  }
})
