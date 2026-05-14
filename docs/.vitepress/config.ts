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
  lang: 'zh-CN',
  title: 'Nebula Lab',
  description: '面向科研数据预处理、批处理执行与 Origin 交接的 Windows 桌面工作站',
  base: '/NebulaLab-Docs/',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    appVersion,
    logo: '/logo.png',
    nav: [
      { text: '用户手册', link: '/manual/' },
      { text: '教程', link: '/tutorials/' },
      { text: 'Roadmap', link: '/roadmap/' },
      { text: '下载', link: 'https://github.com/TshyGO/NebulaLab-Releases/releases/latest' }
    ],
    sidebar: {
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
          text: 'Roadmap',
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
            buttonText: '搜索',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            displayDetails: '显示详情',
            resetButtonTitle: '清除搜索',
            backButtonTitle: '关闭搜索',
            noResultsText: '没有找到结果',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: '回车键',
              navigateText: '切换',
              navigateUpKeyAriaLabel: '上箭头',
              navigateDownKeyAriaLabel: '下箭头',
              closeText: '关闭',
              closeKeyAriaLabel: 'Esc'
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
