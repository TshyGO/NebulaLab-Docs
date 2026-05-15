import { computed, ref, watch } from 'vue'

export type NebulaLanguage = 'en' | 'zh'

const STORAGE_KEY = 'nebulalab-home-language'
const language = ref<NebulaLanguage>('en')
let initialized = false

const searchTranslations = {
  en: {
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
  },
  zh: {
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

const navLabels = {
  en: {
    light: 'Light',
    dark: 'Dark',
    language: 'Language',
    theme: 'Theme'
  },
  zh: {
    light: '浅色',
    dark: '深色',
    language: '语言',
    theme: '主题'
  }
}

export function useNebulaPreferences() {
  function initPreferences() {
    if (initialized || typeof window === 'undefined') return
    initialized = true

    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'zh') {
      language.value = stored
    } else {
      language.value = 'en'
    }

    watch(language, (value) => {
      window.localStorage.setItem(STORAGE_KEY, value)
    })
  }

  function setLanguage(nextLanguage: NebulaLanguage) {
    language.value = nextLanguage
  }

  return {
    language,
    setLanguage,
    initPreferences,
    labels: computed(() => navLabels[language.value]),
    searchTranslations: computed(() => searchTranslations[language.value])
  }
}
