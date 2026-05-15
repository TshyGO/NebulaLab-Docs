<script setup lang="ts">
import { onMounted } from 'vue'
import { useData, withBase } from 'vitepress'
import { useNebulaPreferences, type NebulaLanguage } from '../composables/preferences'

const { isDark } = useData()
const { language, setLanguage, initPreferences, labels, nav } = useNebulaPreferences()
const languageOptions: Array<{ code: NebulaLanguage; short: string; label: string }> = [
  { code: 'en', short: 'EN', label: 'English' },
  { code: 'zh', short: '中文', label: '中文' }
]

onMounted(initPreferences)

function toggleTheme() {
  isDark.value = !isDark.value
}

function chooseLanguage(nextLanguage: NebulaLanguage) {
  setLanguage(nextLanguage)
}

function resolveLink(link: string) {
  return link.startsWith('http') ? link : withBase(link)
}

function isExternal(link: string) {
  return link.startsWith('http')
}
</script>

<template>
  <div class="NebulaNavScreenControls" aria-label="Display preferences">
    <nav class="screen-menu" aria-label="Main navigation">
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
    <div class="row">
      <span>{{ labels.theme }}</span>
      <button
        type="button"
        class="icon-button"
        :aria-label="isDark ? labels.light : labels.dark"
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
    </div>
    <div class="row">
      <span>{{ labels.language }}</span>
      <details class="screen-language-menu">
        <summary>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18" />
            <path d="M12 3a14 14 0 0 1 0 18" />
            <path d="M12 3a14 14 0 0 0 0 18" />
          </svg>
          <span>{{ language === 'en' ? 'EN' : '中文' }}</span>
        </summary>
        <div>
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
  </div>
</template>

<style scoped>
.NebulaNavScreenControls {
  display: grid;
  gap: 16px;
  margin-top: 24px;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 24px;
}

.screen-menu {
  display: grid;
  gap: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 20px;
}

.screen-menu a {
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 700;
  line-height: 24px;
  text-decoration: none;
}

.screen-menu span {
  color: var(--vp-c-text-3);
  font-size: 11px;
  margin-left: 4px;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.row > span {
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 700;
}

.icon-button,
.screen-language-menu summary {
  display: inline-flex;
  height: 36px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font: inherit;
  font-weight: 700;
}

.icon-button {
  width: 36px;
  border-radius: 999px;
}

.icon-button svg,
.screen-language-menu svg {
  width: 17px;
  height: 17px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
}

.screen-language-menu {
  position: relative;
}

.screen-language-menu summary {
  gap: 8px;
  min-width: 86px;
  border-radius: 999px;
  list-style: none;
  padding: 0 12px;
}

.screen-language-menu summary::-webkit-details-marker {
  display: none;
}

.screen-language-menu div {
  display: grid;
  gap: 4px;
  margin-top: 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg);
  padding: 6px;
}

.screen-language-menu button {
  display: flex;
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
  padding: 9px 10px;
  text-align: left;
}

.icon-button:hover,
.screen-language-menu summary:hover,
.screen-language-menu button:hover,
.screen-language-menu button.active {
  border-color: rgba(249, 115, 22, 0.28);
  background: rgba(249, 115, 22, 0.1);
  color: #f97316;
}

.screen-language-menu button span {
  color: var(--vp-c-text-3);
  font-size: 11px;
  font-weight: 800;
}

@media (min-width: 768px) {
  .NebulaNavScreenControls {
    display: none;
  }
}
</style>
