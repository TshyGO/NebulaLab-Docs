import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Nebula Lab',
  base: '/NebulaLab-Docs/',
  cleanUrls: true,
  lastUpdated: true,
  appearance: 'dark',
  themeConfig: {
    logo: '/logo.png',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/TshyGO/NebulaLab-Releases' }
    ],
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
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
          },
          en: {
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
                  selectKeyAriaLabel: 'Enter key',
                  navigateText: 'Navigate',
                  navigateUpKeyAriaLabel: 'Up arrow',
                  navigateDownKeyAriaLabel: 'Down arrow',
                  closeText: 'Close',
                  closeKeyAriaLabel: 'Escape'
                }
              }
            }
          }
        }
      }
    }
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      description: '面向实验数据的桌面工作台：导入、处理，并通过可复用流程导出结果。',
      themeConfig: {
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
                { text: '社区与模板', link: '/manual/community' },
                { text: '关于Pro会员', link: '/manual/pro' }
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
        footer: {
          message: '为实验数据流程构建。',
          copyright: 'Copyright © 2026 Nebula Lab'
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      description: 'A desktop workspace for experimental data: import, process, and export results through reusable workflows.',
      link: '/en/',
      themeConfig: {
        outline: {
          label: 'On this page'
        },
        docFooter: {
          prev: 'Previous page',
          next: 'Next page'
        },
        darkModeSwitchLabel: 'Appearance',
        lightModeSwitchTitle: 'Switch to light theme',
        darkModeSwitchTitle: 'Switch to dark theme',
        sidebarMenuLabel: 'Menu',
        returnToTopLabel: 'Return to top',
        langMenuLabel: 'Change language',
        skipToContentLabel: 'Skip to content',
        nav: [
          { text: 'User Manual', link: '/en/manual/' },
          { text: 'Tutorials', link: '/en/tutorials/' },
          { text: 'Roadmap', link: '/en/roadmap/' },
          { text: 'Download', link: 'https://github.com/TshyGO/NebulaLab-Releases/releases/latest' }
        ],
        sidebar: {
          '/en/manual/': [
            {
              text: 'User Manual',
              items: [
                { text: 'Getting Started', link: '/en/manual/' },
                { text: 'Core Concepts', link: '/en/manual/concepts' },
                { text: 'Data Preparation', link: '/en/manual/data-preparation' },
                { text: 'Data Processing Workflow', link: '/en/manual/workflow' },
                { text: 'Community & Templates', link: '/en/manual/community' },
                { text: 'About Pro Membership', link: '/en/manual/pro' }
              ]
            }
          ],
          '/en/tutorials/': [
            {
              text: 'Tutorials',
              items: [
                { text: 'Overview', link: '/en/tutorials/' },
                { text: 'Basic Data Processing', link: '/en/tutorials/basic-processing' }
              ]
            }
          ],
          '/en/roadmap/': [
            {
              text: 'Roadmap',
              items: [
                { text: 'Long-term Direction', link: '/en/roadmap/' }
              ]
            }
          ]
        },
        footer: {
          message: 'Built for experimental data workflows.',
          copyright: 'Copyright © 2026 Nebula Lab'
        }
      }
    }
  }
})
