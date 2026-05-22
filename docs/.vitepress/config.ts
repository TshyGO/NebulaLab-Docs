import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Nebula Lab',
  description: '面向实验数据的桌面工作台：导入、处理，并通过可复用流程导出结果。',
  base: '/NebulaLab-Docs/',
  cleanUrls: true,
  lastUpdated: true,
  appearance: 'dark',
  themeConfig: {
    logo: '/logo.png',
    outline: {
      label: '本页目录'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
    langMenuLabel: '切换语言',
    skipToContentLabel: '跳到内容',
    nav: [
      { text: '用户手册', link: '/manual/' },
      { text: '教程', link: '/tutorials/' },
      { text: '路线图', link: '/roadmap/' },
      { text: '下载', link: 'https://github.com/TshyGO/NebulaLab-Releases/releases/latest' }
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
      message: '为实验数据流程构建。',
      copyright: 'Copyright © 2026 Nebula Lab'
    }
  }
})
