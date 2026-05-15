<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useNebulaPreferences, type NebulaLanguage } from '../composables/preferences'

const { language, setLanguage, initPreferences, labels, searchTranslations } = useNebulaPreferences()
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

function chooseLanguage(nextLanguage: NebulaLanguage) {
  setLanguage(nextLanguage)
  if (languageMenu.value) {
    languageMenu.value.open = false
  }
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
  pointer-events: auto;
}

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

.nebula-language-menu svg {
  width: 17px;
  height: 17px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
}

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

@media (min-width: 768px) {
  .NebulaNavControls {
    display: flex;
  }
}
</style>
