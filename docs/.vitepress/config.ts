import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Nebula Lab',
  description: '实验数据处理、流程复用与科研记录平台',
  base: '/NebulaLab-Docs/',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: '用户手册', link: '/manual/' },
      { text: '教程', link: '/tutorials/' },
      { text: 'Roadmap', link: '/roadmap/' }
    ],
    sidebar: {
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
      provider: 'local'
    },
    footer: {
      message: 'Built for experimental data workflows.',
      copyright: 'Copyright © 2026 Nebula Lab'
    }
  }
})
