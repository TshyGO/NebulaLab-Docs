<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useData, withBase } from 'vitepress'
import { useNebulaPreferences, type NebulaLanguage } from '../composables/preferences'

const { isDark } = useData()
const { language, setLanguage, initPreferences, labels, nav, searchTranslations } = useNebulaPreferences()
const languageMenu = ref<HTMLDetailsElement | null>(null)
const languageOptions: Array<{ code: NebulaLanguage; short: string; label: string }> = [
  { code: 'en', short: 'EN', label: 'English' },
  { code: 'zh', short: '中文', label: '中文' }
]

onMounted(() => {
  initPreferences()
  applySearchButtonLabel()
  document.addEventListener('click', closeLanguageMenuOnOutsideClick)
})

onUnmounted(() => {
  document.removeEventListener('click', closeLanguageMenuOnOutsideClick)
})

watch(language, () => nextTick(applySearchButtonLabel), { immediate: true })

function toggleTheme() {
  isDark.value = !isDark.value
}

function chooseLanguage(nextLanguage: NebulaLanguage) {
  setLanguage(nextLanguage)
  if (languageMenu.value) {
    languageMenu.value.open = false
  }
}

function resolveLink(link: string) {
  return link.startsWith('http') ? link : withBase(link)
}

function isExternal(link: string) {
  return link.startsWith('http')
}

function applySearchButtonLabel() {
  if (typeof document === 'undefined') return

  const buttonText = searchTranslations.value.button.buttonText
  const buttonAriaLabel = searchTranslations.value.button.buttonAriaLabel

  document.querySelectorAll<HTMLButtonElement>('.DocSearch-Button').forEach((button) => {
    button.setAttribute('aria-label', buttonAriaLabel)
  })
  document.querySelectorAll<HTMLElement>('.DocSearch-Button-Placeholder').forEach((placeholder) => {
    placeholder.textContent = buttonText
  })
}

function closeLanguageMenuOnOutsideClick(event: MouseEvent) {
  const target = event.target
  if (!(target instanceof Node)) return
  if (!languageMenu.value?.contains(target)) {
    languageMenu.value && (languageMenu.value.open = false)
  }
}
</script>

<template>
  <div class="NebulaNavControls" aria-label="Display preferences">
    <nav class="nebula-nav-menu" aria-label="Main navigation">
      <a
        v-for="item in nav"
        :key="item.text"
        :href="resolveLink(item.link)"
        :target="isExternal(item.link) ? '_blank' : undefined"
        :rel="isExternal(item.link) ? 'noreferrer' : undefined"
      >
        {{ item.text }}
        <span v-if="isExternal(item.link)" aria-hidden="true">↗</span>
      </a>
    </nav>
    <button
      type="button"
      class="nebula-theme-button"
      :aria-label="isDark ? labels.light : labels.dark"
      :title="isDark ? labels.light : labels.dark"
      @click="toggleTheme"
    >
      <svg v-if="!isDark" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
      <svg v-else viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 14.7A8.5 8.5 0 0 1 9.3 4a7 7 0 1 0 10.7 10.7Z" />
      </svg>
    </button>
    <details ref="languageMenu" class="nebula-language-menu">
      <summary :aria-label="labels.language">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3a14 14 0 0 1 0 18" />
          <path d="M12 3a14 14 0 0 0 0 18" />
        </svg>
        <span>{{ language === 'en' ? 'EN' : '中文' }}</span>
        <svg class="chevron" viewBox="0 0 24 24" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <div class="language-popover">
        <button
          v-for="option in languageOptions"
          :key="option.code"
          type="button"
          :class="{ active: language === option.code }"
          @click="chooseLanguage(option.code)"
        >
          <span>{{ option.short }}</span>
          {{ option.label }}
        </button>
      </div>
    </details>
  </div>
</template>

<style scoped>
.NebulaNavControls {
  display: none;
  align-items: center;
  gap: 8px;
  margin-left: 12px;
  order: 3;
  pointer-events: auto;
}

.nebula-nav-menu {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-right: 8px;
}

.nebula-nav-menu a {
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 600;
  line-height: var(--vp-nav-height);
  text-decoration: none;
  transition: color 180ms ease;
}

.nebula-nav-menu a:hover {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.nebula-nav-menu span {
  margin-left: 3px;
  color: var(--vp-c-text-3);
  font-size: 11px;
}

.nebula-theme-button,
.nebula-language-menu summary {
  display: inline-flex;
  height: 34px;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: 999px;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  font: inherit;
  font-weight: 700;
  transition: background 180ms ease, border-color 180ms ease, color 180ms ease, transform 180ms ease;
}

.nebula-theme-button {
  width: 34px;
}

.nebula-theme-button svg,
.nebula-language-menu svg {
  width: 17px;
  height: 17px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
}

.nebula-theme-button:hover,
.nebula-language-menu[open] summary,
.nebula-language-menu summary:hover {
  border-color: rgba(249, 115, 22, 0.28);
  background: rgba(249, 115, 22, 0.1);
  color: #f97316;
  transform: translateY(-1px);
}

.nebula-language-menu {
  position: relative;
}

.nebula-language-menu summary {
  gap: 7px;
  min-width: 74px;
  list-style: none;
  padding: 0 10px;
}

.nebula-language-menu summary::-webkit-details-marker {
  display: none;
}

.nebula-language-menu .chevron {
  width: 14px;
  height: 14px;
  transition: transform 180ms ease;
}

.nebula-language-menu[open] .chevron {
  transform: rotate(180deg);
}

.language-popover {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  z-index: 40;
  min-width: 170px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg);
  box-shadow: 0 18px 48px rgba(15, 23, 42, 0.16);
  padding: 6px;
}

.language-popover button {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: var(--vp-c-text-1);
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  font-weight: 700;
  padding: 10px 11px;
  text-align: left;
}

.language-popover button:hover,
.language-popover button.active {
  background: rgba(249, 115, 22, 0.1);
  color: #f97316;
}

.language-popover button span {
  color: var(--vp-c-text-3);
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
}

:global(.dark) .language-popover {
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.38);
}

:global(.VPNavBar .content-body > .appearance),
:global(.VPNavBarMenu),
:global(.VPNavBarExtra .item.appearance),
:global(.VPNavScreenMenu),
:global(.VPNavScreenAppearance) {
  display: none !important;
}

:global(.VPNavBar .social-links) {
  order: 4;
}

:global(.VPNavBar .extra) {
  order: 5;
}

:global(.VPNavBar .hamburger) {
  order: 6;
}

@media (min-width: 768px) {
  .NebulaNavControls {
    display: flex;
  }
}

@media (max-width: 900px) {
  .nebula-nav-menu {
    gap: 14px;
  }

  .nebula-nav-menu a {
    font-size: 13px;
  }
}
</style>
