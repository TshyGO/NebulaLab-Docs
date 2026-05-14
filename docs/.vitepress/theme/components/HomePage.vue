<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useData, withBase } from 'vitepress'

const releaseUrl = 'https://github.com/TshyGO/NebulaLab-Releases/releases/latest'

const { theme } = useData()
const appVersion = computed(() => (theme.value).appVersion || '')
const kickerText = computed(() =>
  appVersion.value ? `Windows 桌面端 · ${appVersion.value}` : 'Windows 桌面端'
)
const windowTitle = computed(() =>
  appVersion.value ? `Nebula Lab · ${appVersion.value}` : 'Nebula Lab'
)

const slides = [
  {
    image: '/01-data.png',
    alt: 'Nebula Lab 数据准备界面截图',
    caption: '导入 CSV、Excel 或 TXT，按样品分组建立工作集。'
  },
  {
    image: '/02-plot.png',
    alt: 'Nebula Lab 绘图工作台界面截图',
    caption: '映射坐标列，叠加平滑、归一化、基线扣除等处理步骤。'
  },
  {
    image: '/03-export.png',
    alt: 'Nebula Lab Origin 导出界面截图',
    caption: '预览确认后导出到 Origin，连同图形模板与主题一并交付。'
  }
]

const active = ref(0)
const activeSlide = computed(() => slides[active.value] ?? slides[0])
const isPaused = ref(false)
const progressKey = ref(0)
let timer

function setSlide(index) {
  if (active.value === index) return
  active.value = index
  startTimer()
}

function startTimer() {
  window.clearInterval(timer)
  isPaused.value = false
  progressKey.value += 1
  timer = window.setInterval(() => {
    active.value = (active.value + 1) % slides.length
    progressKey.value += 1
  }, 5200)
}

function stopTimer() {
  window.clearInterval(timer)
  isPaused.value = true
}

onMounted(startTimer)
onUnmounted(stopTimer)
</script>

<template>
  <main class="nl-home">
    <section class="nl-hero">
      <div class="nl-hero-copy">
        <p class="nl-kicker">{{ kickerText }}</p>
        <h1>Nebula Lab</h1>
        <p class="nl-lead">
          成组实验数据的预处理工作台。一条样品调好流程，整组一起跑完，再交给 Origin。
        </p>
        <div class="nl-actions" aria-label="主要操作">
          <a class="nl-btn nl-btn-primary" :href="releaseUrl" target="_blank" rel="noreferrer">下载 Nebula Lab</a>
          <a class="nl-btn nl-btn-secondary" :href="withBase('/manual/')">阅读用户手册</a>
        </div>
        <div class="nl-proof-row" aria-label="当前能力">
          <span>CSV / TXT / Excel</span>
          <span>处理流程复用</span>
          <span>Origin 模板</span>
          <span>社区资源</span>
        </div>
      </div>

      <div class="nl-product" @mouseenter="stopTimer" @mouseleave="startTimer">
        <div class="nl-tabs" :class="{ paused: isPaused }" aria-label="产品流程截图">
          <button class="nl-tab" :class="{ active: active === 0 }" type="button" @click="setSlide(0)">
            <span>01</span>
            数据准备
            <i v-if="active === 0" :key="`progress-${progressKey}-0`" aria-hidden="true"></i>
          </button>
          <button class="nl-tab" :class="{ active: active === 1 }" type="button" @click="setSlide(1)">
            <span>02</span>
            绘图工作台
            <i v-if="active === 1" :key="`progress-${progressKey}-1`" aria-hidden="true"></i>
          </button>
          <button class="nl-tab" :class="{ active: active === 2 }" type="button" @click="setSlide(2)">
            <span>03</span>
            导出
            <i v-if="active === 2" :key="`progress-${progressKey}-2`" aria-hidden="true"></i>
          </button>
        </div>
        <div class="nl-window">
          <div class="nl-window-bar">
            <span class="nl-dot red"></span>
            <span class="nl-dot yellow"></span>
            <span class="nl-dot green"></span>
            <span class="nl-window-title">{{ windowTitle }}</span>
          </div>
          <div class="nl-screen">
            <Transition name="nl-fade" mode="out-in">
              <img :key="activeSlide.image" :src="withBase(activeSlide.image)" :alt="activeSlide.alt">
            </Transition>
          </div>
        </div>
        <p class="nl-caption">{{ activeSlide.caption }}</p>
      </div>
    </section>

    <section class="nl-section nl-workflow" aria-labelledby="workflow-title">
      <div>
        <p class="nl-section-label">工作方式</p>
        <h2 id="workflow-title">先整理，再作图。</h2>
      </div>
      <div class="nl-flow">
        <a :href="withBase('/manual/workflow')" class="nl-flow-item">
          <span>01</span>
          <strong>导入仪器文件</strong>
          <p>读入 CSV、TXT、Excel，确认表头、坐标列与样品分组。</p>
        </a>
        <a :href="withBase('/tutorials/basic-processing')" class="nl-flow-item">
          <span>02</span>
          <strong>先调一条样品</strong>
          <p>在一条样品上试好裁剪、平滑、归一化、基线扣除，确认曲线没问题。</p>
        </a>
        <a :href="withBase('/manual/concepts')" class="nl-flow-item">
          <span>03</span>
          <strong>批量套用到整组</strong>
          <p>把这条样品的处理流程套到同组其它样品上，避免重复点击。</p>
        </a>
        <a :href="withBase('/manual/concepts')" class="nl-flow-item">
          <span>04</span>
          <strong>交付到 Origin</strong>
          <p>导出组级数据，连同图形模板与主题一并交给 Origin 作图。</p>
        </a>
      </div>
    </section>

    <section class="nl-section nl-community" aria-labelledby="community-title">
      <div>
        <p class="nl-section-label">社区资源</p>
        <h2 id="community-title">别人调好的流程、模板和脚本，直接拿来就用。</h2>
      </div>
      <div class="nl-resource-grid">
        <a :href="withBase('/manual/community')" class="nl-resource-item">
          <span>Workflow</span>
          <strong>数据处理流程</strong>
          <p>把常用处理步骤打包成 Workflow，下载即可在自己的数据上重放。</p>
        </a>
        <a :href="withBase('/manual/community')" class="nl-resource-item">
          <span>Origin</span>
          <strong>绘图模板与主题</strong>
          <p>直接套用他人沉淀的 Origin 图形模板与外观主题。</p>
        </a>
        <a :href="withBase('/manual/community')" class="nl-resource-item">
          <span>Script</span>
          <strong>科研脚本</strong>
          <p>汇总 ImageJ、MATLAB、Python 等自动化脚本，按学科和软件分类查找。</p>
        </a>
      </div>
    </section>

    <section class="nl-section nl-audience" aria-labelledby="audience-title">
      <div>
        <p class="nl-section-label">适合场景</p>
        <h2 id="audience-title">从材料到化学、生物到能源——按样品分组的数据都能处理。</h2>
      </div>
      <div class="nl-audience-grid">
        <div>
          <strong>谱图、曲线、表格数据</strong>
          <p>XRD、Raman、XPS、TGA、DSC、FTIR 等表征曲线，或任何按样品分组的测试结果。</p>
        </div>
        <div>
          <strong>同类样品批量处理</strong>
          <p>一组样品、一套处理、一次完成。先在一条上验证，再批量复用。</p>
        </div>
        <div>
          <strong>进入 Origin 前的整理</strong>
          <p>在 Nebula Lab 里把数据结构和处理步骤固定下来，Origin 只负责最后的排版。</p>
        </div>
      </div>
    </section>

    <section class="nl-section nl-roadmap" aria-labelledby="roadmap-title">
      <div>
        <p class="nl-section-label">接下来</p>
        <h2 id="roadmap-title">从单次处理，长成课题组的实验库。</h2>
      </div>
      <div class="nl-resource-grid">
        <a :href="withBase('/roadmap/')" class="nl-resource-item">
          <span>现在 · v0.8</span>
          <strong>实验数据预处理</strong>
          <p>导入、清洗、批量处理、交付 Origin，加上模板与脚本的共享。</p>
        </a>
        <a :href="withBase('/roadmap/')" class="nl-resource-item">
          <span>近期</span>
          <strong>串起一次完整实验</strong>
          <p>把配方、样品、原始数据和处理结果连成一条记录，从结果能倒查回当初的配方。</p>
        </a>
        <a :href="withBase('/roadmap/')" class="nl-resource-item">
          <span>远期</span>
          <strong>课题组自己的实验库</strong>
          <p>桌面端跑数据，组内服务器存账号、记录与文件，一组人多年的数据可以一起检索。</p>
        </a>
      </div>
    </section>

    <section class="nl-final" aria-label="下一步">
      <div>
        <p class="nl-section-label">下一步</p>
        <h2>打开教程，跟着做完第一组样品。</h2>
        <p>想先动手就跟着基础教程做一遍；想了解后续计划，再翻 Roadmap。</p>
      </div>
      <div class="nl-actions">
        <a class="nl-btn nl-btn-primary" :href="withBase('/tutorials/basic-processing')">开始基础教程</a>
        <a class="nl-btn nl-btn-secondary" :href="withBase('/roadmap/')">查看路线图</a>
      </div>
    </section>
  </main>
</template>

<style scoped>
:global(.VPContent) {
  padding-top: 0;
}

:global(.VPPage) {
  padding-bottom: 0;
}

:global(:root) {
  --nl-ink: #17191f;
  --nl-muted: #667085;
  --nl-line: rgba(23, 25, 31, 0.1);
  --nl-brand: #e85d2c;
  --nl-brand-dark: #bf4519;
  --nl-bg: #fff;
  --nl-bg-gradient: linear-gradient(180deg, rgba(232, 93, 44, 0.08) 0, rgba(255, 255, 255, 0) 360px);
  --nl-panel: #fff;
  --nl-panel-hover: #fff8f5;
  --nl-soft-panel: #f4f7fb;
  --nl-window-bar: #eceff3;
  --nl-window-title: #7f8794;
  --nl-secondary-bg: rgba(255, 255, 255, 0.82);
  --nl-secondary-hover-border: rgba(23, 25, 31, 0.24);
  --nl-body-copy: #4b5565;
  --nl-note: #7a8291;
  --nl-tab-text: #697386;
  --nl-tab-muted: #9aa3b2;
  --nl-shadow: 0 24px 60px rgba(27, 39, 64, 0.16), 0 4px 10px rgba(27, 39, 64, 0.06);
}

.nl-home {
  color: var(--nl-ink);
  background: var(--nl-bg-gradient), var(--nl-bg);
  margin: 0 calc(50% - 50vw);
  overflow: hidden;
}

:global(html.dark) {
  --nl-ink: #f4f7fb;
  --nl-muted: #a9b3c4;
  --nl-line: rgba(255, 255, 255, 0.12);
  --nl-brand: #ff7a45;
  --nl-brand-dark: #ff9a6f;
  --nl-bg: #0d1117;
  --nl-bg-gradient: linear-gradient(180deg, rgba(232, 93, 44, 0.16) 0, rgba(13, 17, 23, 0) 360px);
  --nl-panel: #111827;
  --nl-panel-hover: #18202d;
  --nl-soft-panel: #151d29;
  --nl-window-bar: #1d2633;
  --nl-window-title: #a8b2c2;
  --nl-secondary-bg: rgba(255, 255, 255, 0.06);
  --nl-secondary-hover-border: rgba(255, 255, 255, 0.24);
  --nl-body-copy: #c4ccd8;
  --nl-note: #98a2b3;
  --nl-tab-text: #b8c2d2;
  --nl-tab-muted: #8390a3;
  --nl-shadow: 0 24px 70px rgba(0, 0, 0, 0.38), 0 4px 14px rgba(0, 0, 0, 0.24);
}

@media (prefers-color-scheme: dark) {
  :global(:root) {
    --nl-ink: #f4f7fb;
    --nl-muted: #a9b3c4;
    --nl-line: rgba(255, 255, 255, 0.12);
    --nl-brand: #ff7a45;
    --nl-brand-dark: #ff9a6f;
    --nl-bg: #0d1117;
    --nl-bg-gradient: linear-gradient(180deg, rgba(232, 93, 44, 0.16) 0, rgba(13, 17, 23, 0) 360px);
    --nl-panel: #111827;
    --nl-panel-hover: #18202d;
    --nl-soft-panel: #151d29;
    --nl-window-bar: #1d2633;
    --nl-window-title: #a8b2c2;
    --nl-secondary-bg: rgba(255, 255, 255, 0.06);
    --nl-secondary-hover-border: rgba(255, 255, 255, 0.24);
    --nl-body-copy: #c4ccd8;
    --nl-note: #98a2b3;
    --nl-tab-text: #b8c2d2;
    --nl-tab-muted: #8390a3;
    --nl-shadow: 0 24px 70px rgba(0, 0, 0, 0.38), 0 4px 14px rgba(0, 0, 0, 0.24);
  }
}

.nl-hero,
.nl-section,
.nl-final {
  width: min(1180px, calc(100vw - 48px));
  margin: 0 auto;
}

.nl-hero {
  display: grid;
  grid-template-columns: minmax(460px, 0.98fr) minmax(520px, 1.12fr);
  gap: 48px;
  align-items: center;
  padding: 96px 0 72px;
}

.nl-hero-copy {
  max-width: 580px;
  animation: nl-rise 560ms ease-out both;
}

.nl-kicker,
.nl-section-label {
  margin: 0 0 12px;
  color: var(--nl-brand-dark);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: none;
}

.nl-hero h1 {
  margin: 0;
  max-width: 580px;
  font-size: clamp(48px, 7.8vw, 92px);
  line-height: 0.98;
  font-weight: 800;
  letter-spacing: 0;
  white-space: nowrap;
}

.nl-lead {
  margin: 24px 0 0;
  max-width: 500px;
  color: var(--nl-body-copy);
  font-size: 19px;
  line-height: 1.7;
}

.nl-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}

.nl-btn {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 0 22px;
  font-size: 15px;
  font-weight: 650;
  text-decoration: none;
  white-space: nowrap;
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
}

.nl-btn:hover {
  transform: translateY(-1px);
  text-decoration: none;
}

.nl-btn-primary {
  background: var(--nl-brand);
  color: #fff;
  box-shadow: 0 12px 28px rgba(232, 93, 44, 0.22);
}

.nl-btn-primary:hover {
  color: #fff;
  background: var(--nl-brand-dark);
}

.nl-btn-secondary {
  border: 1px solid var(--nl-line);
  color: var(--nl-ink);
  background: var(--nl-secondary-bg);
}

.nl-btn-secondary:hover {
  color: var(--nl-ink);
  border-color: var(--nl-secondary-hover-border);
}

.nl-note {
  margin: 18px 0 0;
  color: var(--nl-note);
  font-size: 13px;
}

.nl-proof-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
}

.nl-proof-row span {
  border: 1px solid var(--nl-line);
  border-radius: 999px;
  background: var(--nl-secondary-bg);
  color: var(--nl-muted);
  font-size: 12px;
  font-weight: 650;
  line-height: 1;
  padding: 9px 12px;
}

.nl-product {
  min-width: 0;
  animation: nl-rise 680ms 90ms ease-out both;
}

.nl-tabs {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-bottom: 16px;
}

.nl-tab {
  border: 1px solid transparent;
  border-radius: 999px;
  background: transparent;
  color: var(--nl-tab-text);
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  font-weight: 650;
  padding: 9px 16px;
  overflow: hidden;
  position: relative;
  white-space: nowrap;
  transition: background 180ms ease, border-color 180ms ease, color 180ms ease;
}

.nl-tab span {
  margin-right: 6px;
  color: var(--nl-tab-muted);
  font-size: 11px;
  font-weight: 800;
}

.nl-tab:hover,
.nl-tab.active {
  background: var(--nl-panel);
  border-color: var(--nl-line);
  color: var(--nl-ink);
  box-shadow: 0 1px 4px rgba(23, 25, 31, 0.08);
}

.nl-tab.active span {
  color: var(--nl-brand);
}

.nl-tab i {
  position: absolute;
  right: 12px;
  bottom: 0;
  left: 12px;
  height: 2px;
  border-radius: 999px;
  background: var(--nl-brand);
  transform: scaleX(0);
  transform-origin: left center;
  animation: nl-tab-progress 5200ms linear forwards;
}

.nl-tabs.paused .nl-tab i {
  animation-play-state: paused;
}

.nl-window {
  border: 1px solid var(--nl-line);
  border-radius: 14px;
  overflow: hidden;
  background: var(--nl-soft-panel);
  box-shadow: var(--nl-shadow);
}

.nl-window-bar {
  height: 34px;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 0 13px;
  background: var(--nl-window-bar);
  border-bottom: 1px solid var(--nl-line);
}

.nl-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.nl-dot.red { background: #ff5f57; }
.nl-dot.yellow { background: #febc2e; }
.nl-dot.green { background: #28c840; }

.nl-window-title {
  margin-left: auto;
  margin-right: auto;
  color: var(--nl-window-title);
  font-size: 11px;
  font-weight: 650;
}

.nl-screen {
  aspect-ratio: 2559 / 1379;
  background: var(--nl-soft-panel);
  overflow: hidden;
}

.nl-screen img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top left;
}

.nl-fade-enter-active,
.nl-fade-leave-active {
  transition: opacity 280ms ease, transform 280ms ease;
}

.nl-fade-enter-from {
  opacity: 0;
  transform: translateY(4px);
}

.nl-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.nl-caption {
  min-height: 24px;
  margin: 16px auto 0;
  max-width: 620px;
  color: var(--nl-muted);
  font-size: 14px;
  line-height: 1.7;
  text-align: center;
}

.nl-section {
  display: grid;
  grid-template-columns: 0.72fr 1.28fr;
  gap: 56px;
  padding: 86px 0;
  border-top: 1px solid var(--nl-line);
}

.nl-section h2,
.nl-final h2 {
  margin: 0;
  max-width: 560px;
  font-size: clamp(30px, 4vw, 48px);
  line-height: 1.12;
  font-weight: 760;
  letter-spacing: 0;
}

.nl-flow,
.nl-resource-grid,
.nl-audience-grid {
  display: grid;
  gap: 1px;
  background: var(--nl-line);
  border: 1px solid var(--nl-line);
  border-radius: 14px;
  overflow: hidden;
}

.nl-flow {
  grid-template-columns: repeat(4, 1fr);
}

.nl-flow-item,
.nl-resource-item,
.nl-audience-grid div {
  background: var(--nl-panel);
  padding: 26px;
}

.nl-flow-item,
.nl-resource-item {
  color: var(--nl-ink);
  text-decoration: none;
  transition: background 180ms ease;
}

.nl-flow-item:hover,
.nl-resource-item:hover {
  background: var(--nl-panel-hover);
  text-decoration: none;
}

.nl-flow-item span,
.nl-resource-item span {
  color: var(--nl-brand);
  font-size: 12px;
  font-weight: 800;
}

.nl-flow-item strong,
.nl-resource-item strong,
.nl-audience-grid strong {
  display: block;
  margin-top: 12px;
  font-size: 17px;
  font-weight: 730;
}

.nl-flow-item p,
.nl-resource-item p,
.nl-audience-grid p,
.nl-final p {
  margin: 10px 0 0;
  color: var(--nl-muted);
  font-size: 14px;
  line-height: 1.75;
}

.nl-resource-grid {
  grid-template-columns: repeat(3, 1fr);
}

.nl-audience-grid {
  grid-template-columns: 1fr;
}

.nl-audience-grid strong {
  margin-top: 0;
}

.nl-final {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 48px;
  padding: 76px 0 96px;
  border-top: 1px solid var(--nl-line);
}

.nl-final .nl-actions {
  flex: 0 0 auto;
}

@keyframes nl-rise {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes nl-tab-progress {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

@media (max-width: 1120px) {
  .nl-hero {
    grid-template-columns: 1fr;
    padding-top: 48px;
  }

  .nl-hero-copy {
    max-width: 760px;
  }

  .nl-lead {
    max-width: 760px;
  }

  .nl-section,
  .nl-final {
    grid-template-columns: 1fr;
    display: block;
  }

  .nl-flow,
  .nl-resource-grid {
    grid-template-columns: 1fr;
    margin-top: 32px;
  }

  .nl-audience-grid {
    margin-top: 32px;
  }

  .nl-final .nl-actions {
    margin-top: 30px;
  }
}

@media (max-width: 640px) {
  .nl-hero,
  .nl-section,
  .nl-final {
    width: min(100vw - 32px, 1180px);
  }

  .nl-hero {
    gap: 34px;
    padding: 36px 0 58px;
  }

  .nl-hero h1 {
    font-size: clamp(42px, 12vw, 46px);
  }

  .nl-lead {
    font-size: 16px;
  }

  .nl-actions,
  .nl-tabs {
    align-items: stretch;
    flex-direction: column;
  }

  .nl-btn,
  .nl-tab {
    width: 100%;
  }

  .nl-window {
    border-radius: 10px;
  }

  .nl-caption {
    text-align: left;
  }

  .nl-section,
  .nl-final {
    padding: 60px 0;
  }

  .nl-section h2,
  .nl-final h2 {
    font-size: 31px;
  }
}
</style>
