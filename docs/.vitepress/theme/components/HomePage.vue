<script setup>
import { computed, h, onMounted, onUnmounted, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import { useNebulaPreferences } from '../composables/preferences'

const releaseUrl = 'https://github.com/TshyGO/NebulaLab-Releases/releases/latest'

const { theme, isDark } = useData()
const appVersion = computed(() => theme.value.appVersion || '')
const { language: selectedLanguage, initPreferences } = useNebulaPreferences()

const iconShapes = {
  import: [
    { type: 'path', d: 'M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4' },
    { type: 'path', d: 'M12 3v11' },
    { type: 'path', d: 'm7 9 5 5 5-5' },
    { type: 'path', d: 'M6 4h12' }
  ],
  workflow: [
    { type: 'circle', cx: '6', cy: '6', r: '3' },
    { type: 'circle', cx: '18', cy: '6', r: '3' },
    { type: 'circle', cx: '12', cy: '18', r: '3' },
    { type: 'path', d: 'M8.6 7.6 11 10a3.4 3.4 0 0 1 1 2.4V15' },
    { type: 'path', d: 'M15.4 7.6 13 10a3.4 3.4 0 0 0-1 2.4V15' }
  ],
  batch: [
    { type: 'path', d: 'm12 3 8 4.5-8 4.5-8-4.5Z' },
    { type: 'path', d: 'm4 12 8 4.5 8-4.5' },
    { type: 'path', d: 'm4 16.5 8 4.5 8-4.5' }
  ],
  export: [
    { type: 'path', d: 'M4 19V5a2 2 0 0 1 2-2h7' },
    { type: 'path', d: 'M14 3h6v6' },
    { type: 'path', d: 'm11 12 9-9' },
    { type: 'path', d: 'M7 15h3l2-3 3 4 2-2' }
  ],
  plugin: [
    { type: 'path', d: 'M8 3h8v5h2a3 3 0 1 1 0 6h-2v7H8v-7H6a3 3 0 1 1 0-6h2Z' },
    { type: 'path', d: 'M10 8h4' }
  ],
  community: [
    { type: 'path', d: 'M16 20v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' },
    { type: 'circle', cx: '10', cy: '7', r: '4' },
    { type: 'path', d: 'M20 20v-2.2a3.2 3.2 0 0 0-2.4-3.1' },
    { type: 'path', d: 'M16.5 3.4a4 4 0 0 1 0 7.2' }
  ],
  sample: [
    { type: 'path', d: 'M5 4h14v5H5Z' },
    { type: 'path', d: 'M7 9v11' },
    { type: 'path', d: 'M17 9v11' },
    { type: 'path', d: 'M4 20h16' },
    { type: 'path', d: 'M9 13h6' }
  ],
  history: [
    { type: 'path', d: 'M3 12a9 9 0 1 0 3-6.7' },
    { type: 'path', d: 'M3 4v5h5' },
    { type: 'path', d: 'M12 7v5l3 2' }
  ],
  origin: [
    { type: 'path', d: 'M12 21a9 9 0 1 0-9-9' },
    { type: 'path', d: 'M3 12h6' },
    { type: 'path', d: 'M12 3v6' },
    { type: 'path', d: 'M15 12h6' },
    { type: 'path', d: 'M12 15v6' }
  ],
  theme: [
    { type: 'circle', cx: '13', cy: '12', r: '8' },
    { type: 'path', d: 'M7.5 6.5h.01' },
    { type: 'path', d: 'M6 12h.01' },
    { type: 'path', d: 'M9 17h.01' },
    { type: 'path', d: 'M14 8h.01' },
    { type: 'path', d: 'M15 16h1a3 3 0 0 0 0-6h-1' }
  ],
  formula: [
    { type: 'path', d: 'M4 5h16' },
    { type: 'path', d: 'M7 5v14' },
    { type: 'path', d: 'M17 5v14' },
    { type: 'path', d: 'M4 19h16' },
    { type: 'path', d: 'M9.5 9h5' },
    { type: 'path', d: 'M10 13h4' }
  ],
  database: [
    { type: 'ellipse', cx: '12', cy: '5', rx: '7', ry: '3' },
    { type: 'path', d: 'M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5' },
    { type: 'path', d: 'M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6' }
  ],
  server: [
    { type: 'rect', x: '4', y: '4', width: '16', height: '6', rx: '2' },
    { type: 'rect', x: '4', y: '14', width: '16', height: '6', rx: '2' },
    { type: 'path', d: 'M8 7h.01' },
    { type: 'path', d: 'M8 17h.01' },
    { type: 'path', d: 'M12 10v4' }
  ],
  file: [
    { type: 'path', d: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z' },
    { type: 'path', d: 'M14 3v5h5' },
    { type: 'path', d: 'M8 13h8' },
    { type: 'path', d: 'M8 17h5' }
  ],
  chart: [
    { type: 'path', d: 'M4 19V5' },
    { type: 'path', d: 'M4 19h16' },
    { type: 'path', d: 'm7 15 4-5 3 3 5-7' }
  ],
  package: [
    { type: 'path', d: 'm12 3 8 4.5v9L12 21l-8-4.5v-9Z' },
    { type: 'path', d: 'M12 12 4 7.5' },
    { type: 'path', d: 'm12 12 8-4.5' },
    { type: 'path', d: 'M12 12v9' }
  ],
  share: [
    { type: 'circle', cx: '18', cy: '5', r: '3' },
    { type: 'circle', cx: '6', cy: '12', r: '3' },
    { type: 'circle', cx: '18', cy: '19', r: '3' },
    { type: 'path', d: 'm8.6 13.5 6.8 4' },
    { type: 'path', d: 'm15.4 6.5-6.8 4' }
  ]
}

const IconGlyph = (props) => {
  const shapes = iconShapes[props.name] || iconShapes.workflow
  return h(
    'svg',
    { viewBox: '0 0 24 24', 'aria-hidden': 'true' },
    shapes.map(({ type, ...attrs }) => h(type, attrs))
  )
}

const showcaseSlides = [
  {
    id: 'prepare',
    icon: 'import',
    image: '/01-data.png',
    darkImage: '/数据-深色.png',
    alt: 'Nebula Lab data preparation workspace',
    label: 'Prepare',
    title: 'Prepare instrument files before plotting.',
    zhTitle: '先整理仪器导出的数据文件。'
  },
  {
    id: 'process',
    icon: 'workflow',
    image: '/02-plot.png',
    darkImage: '/绘图-深色.png',
    alt: 'Nebula Lab processing and plotting workspace',
    label: 'Process',
    title: 'Tune one sample, then apply the workflow to its group.',
    zhTitle: '先处理一个样品，再套用到整组。'
  },
  {
    id: 'export',
    icon: 'export',
    image: '/03-export.png',
    darkImage: '/导出-深色.png',
    alt: 'Nebula Lab Origin export preview',
    label: 'Export',
    title: 'Export selected groups to Origin with templates and themes.',
    zhTitle: '把选中的样品组连同模板和主题导出到 Origin。'
  },
  {
    id: 'plugins',
    icon: 'plugin',
    image: '/插件.png',
    darkImage: '/插件深色.png',
    alt: 'Nebula Lab plugin marketplace workspace',
    label: 'Plugins',
    title: 'Install plugins to extend data-processing workflows.',
    zhTitle: '安装插件，扩展数据处理流程。'
  },
  {
    id: 'community',
    icon: 'community',
    image: '/社区.png',
    darkImage: '/社区深色.png',
    alt: 'Nebula Lab community resources workspace',
    label: 'Community',
    title: 'Browse shared workflows, Origin templates, themes, and scripts.',
    zhTitle: '浏览共享的处理流程、Origin 模板、主题和科研脚本。'
  }
]

const copy = {
  en: {
    badge: 'Scientific workflow workspace',
    version: 'Latest release',
    heroTitle: 'Nebula Lab',
    heroAccent: 'Link samples, workflows, and results today. Experiment records are planned next.',
    heroLead:
      'Nebula Lab is a desktop workspace for experimental work. Today it handles grouped instrument files, reusable workflows, Origin export, plugins, and community resources. Recipes, experiment records, and searchable databases are planned next.',
    primaryCta: 'Download for Windows',
    secondaryCta: 'Read the manual',
    proof: ['Grouped samples', 'Reusable workflows', 'Recipes (planned)', 'Records (planned)', 'Plugin ecosystem'],
    heroPanelTitle: 'Workspace layers',
    heroPanelLead: 'A unified workspace, designed to grow from data handling into a broader lab workflow.',
    heroHighlights: [
      { icon: 'import', title: 'Import files', text: 'Bring instrument tables into sample groups.' },
      { icon: 'workflow', title: 'Process groups', text: 'Tune once, then reuse the workflow.' },
      { icon: 'export', title: 'Export results', text: 'Produce data, images, project files, and files ready for Origin.' },
      { icon: 'plugin', title: 'Extend tools', text: 'Add plugins, themes, and community resources.' },
      {
        icon: 'formula',
        title: 'Plan recipes',
        text: 'Formula calculation and saved recipes are planned.',
        status: 'Planned'
      },
      {
        icon: 'database',
        title: 'Build records',
        text: 'Searchable experiment history is planned.',
        status: 'Planned'
      }
    ],
    featureKicker: 'Core capabilities',
    featureTitle: 'Follow the same path from import to export.',
    features: [
      {
        icon: 'import',
        tint: 'orange',
        title: 'Import instrument files',
        text: 'Load CSV, TXT, and Excel files, configure parsing, choose sheets, and organize them into sample groups.'
      },
      {
        icon: 'workflow',
        tint: 'blue',
        title: 'Build reusable workflows',
        text: 'Save the current group’s recorded steps, parameters, axis mapping, and plot defaults so similar datasets can reuse the same flow.'
      },
      {
        icon: 'batch',
        tint: 'green',
        title: 'Apply steps to a group',
        text: 'Tune the workflow on a single sample, then replay the same steps from raw data across the rest of the group.'
      },
      {
        icon: 'export',
        tint: 'violet',
        title: 'Export to Origin',
        text: 'Send selected sample groups to Origin, with optional graph templates, Origin themes, and image output settings.'
      },
      {
        icon: 'plugin',
        tint: 'amber',
        title: 'Extend with plugins',
        text: 'Install official or community plugins from the plugin store to add analysis, export, visualization, and workflow tools.'
      },
      {
        icon: 'community',
        tint: 'pink',
        title: 'Share through the community',
        text: 'Publish and browse workflows, Origin graph templates, Origin themes, and research scripts shared by other users.'
      }
    ],
    howKicker: 'How it works',
    howTitle: 'From raw measurements to reusable results.',
    howLead:
      'Nebula Lab keeps import settings, processing steps, sample groups, and exports in one workflow, with experiment records planned next.',
    inputLabel: 'Inputs',
    coreLabel: 'Nebula Lab',
    coreRole: 'Workflow workspace',
    flowSteps: [
      { icon: 'chart', text: 'Import and map data' },
      { icon: 'workflow', text: 'Apply workflow' },
      { icon: 'package', text: 'Export or save results' }
    ],
    inputs: [
      { icon: 'file', text: 'Instrument files' },
      { icon: 'chart', text: 'Measurement curves' },
      { icon: 'sample', text: 'Grouped samples' },
      { icon: 'package', text: 'Nebula project files' }
    ],
    outputLabel: 'Outputs',
    outputs: [
      { icon: 'origin', text: 'Origin workbook and graph' },
      { icon: 'file', text: 'CSV exports' },
      { icon: 'chart', text: 'PNG / JPG / SVG images' },
      { icon: 'package', text: 'Nebula project files' }
    ],
    advantagesKicker: 'Why Nebula Lab',
    advantagesTitle: 'Designed for repeated experimental work.',
    advantages: [
      {
        icon: 'sample',
        title: 'Sample groups are the core unit',
        text: 'Imported files can stay together as one group or be split into separate groups, so related measurements are handled consistently.'
      },
      {
        icon: 'history',
        title: 'Processing steps stay visible',
        text: 'Pipeline steps and workflow execution records show what happened before export, which makes repeat work easier to check.'
      },
      {
        icon: 'origin',
        title: 'Built to work with Origin',
        text: 'Nebula Lab prepares the grouped data, template choice, theme choice, and style settings before sending the result to Origin.'
      },
      {
        icon: 'community',
        title: 'Shared assets stay reusable',
        text: 'Community resources include workflows, Origin graph templates, Origin themes, and scripts, with metadata that helps others find them.'
      }
    ],
    screenshotsKicker: 'Product views',
    screenshotsTitle: 'Real screens, organized around the work you repeat.',
    screenshotBullets: [
      'Organize data groups before processing.',
      'Preview each operation on actual samples.',
      'Export selected groups to Origin with template and theme options.',
      'Install plugins and browse shared community assets.'
    ],
    roadmapKicker: 'Roadmap',
    roadmapTitle: "The next step isn't more buttons; it's connecting every experiment end to end.",
    roadmap: [
      {
        icon: 'formula',
        label: 'Recipe',
        title: 'Recipe calculation and saving',
        text: 'Recipe work starts before data processing: calculate a recipe once, save it, and reuse ratios, target amounts, and addition order.'
      },
      {
        icon: 'file',
        label: 'Record',
        title: 'Experiment records',
        text: 'Each experiment should link back to a recipe and sample group, with conditions, operations, and outputs recorded together.'
      },
      {
        icon: 'database',
        label: 'Archive',
        title: 'Raw data attached to experiments',
        text: 'Imported instrument files will attach to the related experiment instead of living as disconnected project files.'
      },
      {
        icon: 'chart',
        label: 'Result',
        title: 'Processed results written back',
        text: 'Processed curves, key metrics, and conclusions will flow back into the experiment record for later review.'
      },
      {
        icon: 'history',
        label: 'Search',
        title: 'History lookup',
        text: 'Search past recipes, conditions, samples, results, and their original data across projects.'
      },
      {
        icon: 'server',
        label: 'Team',
        title: 'Self-hosted lab server',
        text: 'Today, sharing uses cloud community organizations. Longer term, lab-owned servers can manage accounts, permissions, records, file indexes, sharing, and backups.'
      }
    ],
    finalKicker: 'Start here',
    finalTitle: 'Prepare one sample group, then reuse the workflow.',
    finalLead:
      'Start with a small dataset, check the import settings, apply a few processing steps, then export the selected group or save it as a reusable project.',
    tutorialCta: 'Open the first tutorial',
    roadmapCta: 'View the roadmap'
  },
  zh: {
    badge: '实验流程工作台',
    version: '最新版本',
    heroTitle: 'Nebula Lab',
    heroAccent: '当前先串起样品、流程和结果，实验记录在下一步规划中。',
    heroLead: 'Nebula Lab 是面向实验工作的桌面工作台。当前支持成组仪器文件、可复用处理流程、Origin 导出、插件和社区资源。配方、实验记录和可检索数据库在规划中。',
    primaryCta: '下载 Windows 版',
    secondaryCta: '阅读用户手册',
    proof: ['成组样品', '流程复用', '配方（规划中）', '记录（规划中）', '插件生态'],
    heroPanelTitle: '能力一览',
    heroPanelLead: '先从数据处理入手，再逐步延伸到完整实验工作流。',
    heroHighlights: [
      { icon: 'import', title: '导入文件', text: '把仪器表格整理成样品组。' },
      { icon: 'workflow', title: '处理分组', text: '先调一个，再复用到整组。' },
      { icon: 'export', title: '导出结果', text: '输出数据、图片、工程文件，并可导出到 Origin。' },
      { icon: 'plugin', title: '扩展工具', text: '接入插件、主题和社区资源。' },
      { icon: 'formula', title: '规划配方', text: '规划配方计算和保存功能。', status: '规划中' },
      { icon: 'database', title: '建立记录库', text: '规划可检索的实验历史。', status: '规划中' }
    ],
    featureKicker: '核心能力',
    featureTitle: '从导入到导出，按真实流程推进。',
    features: [
      {
        icon: 'import',
        tint: 'orange',
        title: '导入仪器文件',
        text: '读取 CSV、TXT 和 Excel 文件，检查解析设置，选择工作表，并把导入文件整理成样品组。'
      },
      {
        icon: 'workflow',
        tint: 'blue',
        title: '复用处理流程',
        text: '保存当前分组的处理步骤、参数、轴映射和绘图默认设置，后续可套用到相似数据。'
      },
      {
        icon: 'batch',
        tint: 'green',
        title: '应用到整组',
        text: '先在单个样品上调好流程，确认后从原始数据把同一套步骤重放到整组。'
      },
      {
        icon: 'export',
        tint: 'violet',
        title: '导出到 Origin',
        text: '把选中的样品组发送到 Origin，并可选择图形模板、Origin 主题和图片导出设置。'
      },
      {
        icon: 'plugin',
        tint: 'amber',
        title: '插件扩展',
        text: '从插件商店安装官方或社区插件，扩展分析、导出、可视化和工作区工具。'
      },
      {
        icon: 'community',
        tint: 'pink',
        title: '社区共享',
        text: '发布和浏览工作流、Origin 绘图模板、Origin 主题和科研脚本。'
      }
    ],
    howKicker: '工作方式',
    howTitle: '从仪器原始数据到可复用结果。',
    howLead: 'Nebula Lab 把导入设置、处理步骤、样品分组和导出内容放在同一条流程里，实验记录会在后续接入。',
    inputLabel: '输入',
    coreLabel: 'Nebula Lab',
    coreRole: '工作流工作台',
    flowSteps: [
      { icon: 'chart', text: '导入并映射数据' },
      { icon: 'workflow', text: '应用处理流程' },
      { icon: 'package', text: '导出或保存结果' }
    ],
    inputs: [
      { icon: 'file', text: '仪器文件' },
      { icon: 'chart', text: '测试曲线' },
      { icon: 'sample', text: '成组样品' },
      { icon: 'package', text: 'Nebula 工程文件' }
    ],
    outputLabel: '输出',
    outputs: [
      { icon: 'origin', text: 'Origin 工作簿与图形' },
      { icon: 'file', text: 'CSV 导出' },
      { icon: 'chart', text: 'PNG / JPG / SVG 图片' },
      { icon: 'package', text: 'Nebula 工程文件' }
    ],
    advantagesKicker: '核心优势',
    advantagesTitle: '面向需要重复处理的实验数据。',
    advantages: [
      {
        icon: 'sample',
        title: '以样品组为单位',
        text: '导入时可以把文件合并成一组，也可以拆成多个分组，便于统一处理相关样品。'
      },
      {
        icon: 'history',
        title: '处理步骤可追踪',
        text: '处理流水线和执行记录会保留导出前的操作，便于复用和检查。'
      },
      {
        icon: 'origin',
        title: '继续配合 Origin',
        text: '在发送到 Origin 前准备好分组数据、模板、主题和样式设置。'
      },
      {
        icon: 'community',
        title: '社区资源可复用',
        text: '社区资源覆盖工作流、Origin 绘图模板、Origin 主题和科研脚本，并保留便于检索的元数据。'
      }
    ],
    screenshotsKicker: '产品截图',
    screenshotsTitle: '为重复工作而设计的真实界面。',
    screenshotBullets: ['先整理数据分组。', '在真实样品上预览处理步骤。', '把选中的样品组导出到 Origin，支持选择模板和主题。', '安装插件并浏览社区资源。'],
    roadmapKicker: '未来规划',
    roadmapTitle: '下一步不是多做几个按钮，而是把一次实验串起来。',
    roadmap: [
      {
        icon: 'formula',
        label: '配方',
        title: '配方计算与保存',
        text: '配方计算在数据处理之前进行：算好配方、保存下来，后续直接复用比例、目标量和添加顺序。'
      },
      {
        icon: 'file',
        label: '记录',
        title: '实验记录',
        text: '每次实验绑定到一个配方和一组样品，记录条件、操作过程和产物信息。'
      },
      {
        icon: 'database',
        label: '归档',
        title: '原始数据接入实验',
        text: '现有数据处理能力继续保留；接入实验记录后，原始文件会关联到对应的实验记录。'
      },
      {
        icon: 'chart',
        label: '结果',
        title: '处理结果回流',
        text: '处理后的曲线、关键指标和结论写回实验记录，方便以后复查。'
      },
      {
        icon: 'history',
        label: '检索',
        title: '历史实验检索',
        text: '支持检索配方使用次数、特定条件下的样品结果，以及原始数据的位置。'
      },
      {
        icon: 'server',
        label: '课题组',
        title: '课题组自有服务器',
        text: '现阶段共享通过云端社区组织完成；更远期由课题组自有服务器管理账号、权限、实验记录、文件索引、共享和备份。'
      }
    ],
    finalKicker: '开始使用',
    finalTitle: '先处理一个样品组，再复用这套流程。',
    finalLead: '从小数据集开始，检查导入设置，套用几个处理步骤，再导出选中的样品组或保存为可复用工程。',
    tutorialCta: '打开基础教程',
    roadmapCta: '查看路线图'
  }
}

const t = computed(() => copy[selectedLanguage.value])
const releaseText = computed(() =>
  appVersion.value ? `${t.value.version} ${appVersion.value}` : t.value.version
)
const showcaseActive = ref(0)
const reduceMotion = ref(false)
let showcaseTimer
let revealObserver

function getShowcasePosition(index) {
  const last = showcaseSlides.length - 1
  const previous = showcaseActive.value === 0 ? last : showcaseActive.value - 1
  const next = showcaseActive.value === last ? 0 : showcaseActive.value + 1

  if (index === showcaseActive.value) return 'active'
  if (index === previous) return 'previous'
  if (index === next) return 'next'
  return 'hidden'
}

function stopShowcase() {
  window.clearInterval(showcaseTimer)
}

function startShowcase() {
  stopShowcase()
  if (reduceMotion.value) return
  showcaseTimer = window.setInterval(() => {
    showcaseActive.value = (showcaseActive.value + 1) % showcaseSlides.length
  }, 4600)
}

function selectShowcase(index) {
  if (index === showcaseActive.value) return
  showcaseActive.value = index
  startShowcase()
}

function moveShowcase(direction) {
  const next = showcaseActive.value + direction
  showcaseActive.value = (next + showcaseSlides.length) % showcaseSlides.length
  startShowcase()
}

function resolveSlideImage(slide) {
  return isDark.value && slide.darkImage ? slide.darkImage : slide.image
}

function setupRevealAnimations() {
  const elements = Array.from(
    document.querySelectorAll(
      '.nl-card, .nl-flow-map, .nl-advantage-list, .nl-showcase-carousel, .nl-roadmap-card, .nl-final'
    )
  )

  if (!elements.length) return

  elements.forEach((element) => element.classList.add('nl-reveal'))

  if (reduceMotion.value || !('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('is-visible'))
    return
  }

  revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    },
    {
      rootMargin: '0px 0px -12% 0px',
      threshold: 0.16
    }
  )

  elements.forEach((element) => revealObserver.observe(element))
}

onMounted(() => {
  initPreferences()
  reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  startShowcase()
  setupRevealAnimations()
})

onUnmounted(() => {
  stopShowcase()
  revealObserver?.disconnect()
})
</script>

<template>
  <main class="nl-home">
    <section class="nl-hero">
      <div class="nl-hero-inner">
        <p class="nl-hero-kicker">{{ t.badge }}</p>
        <h1>{{ t.heroTitle }}</h1>
        <p class="nl-hero-accent">{{ t.heroAccent }}</p>
        <p class="nl-lead">{{ t.heroLead }}</p>
        <div class="nl-actions" aria-label="Primary actions">
          <a class="nl-btn nl-btn-primary" :href="releaseUrl" target="_blank" rel="noreferrer">
            {{ t.primaryCta }}
          </a>
          <a class="nl-btn nl-btn-secondary" :href="withBase('/manual/')">
            {{ t.secondaryCta }}
          </a>
        </div>
        <div class="nl-proof-row" aria-label="Product capabilities">
          <span v-for="item in t.proof" :key="item">{{ item }}</span>
        </div>
        <p class="nl-release-line">{{ releaseText }}</p>
      </div>

      <div class="nl-hero-panel" aria-label="Nebula Lab workspace layers">
        <div class="nl-hero-panel-head">
          <span>{{ t.heroPanelTitle }}</span>
          <p>{{ t.heroPanelLead }}</p>
        </div>
        <div class="nl-hero-panel-grid">
          <article v-for="item in t.heroHighlights" :key="item.title">
            <i aria-hidden="true"><IconGlyph :name="item.icon" /></i>
            <strong>
              {{ item.title }}
              <em v-if="item.status">{{ item.status }}</em>
            </strong>
            <span>{{ item.text }}</span>
          </article>
        </div>
      </div>
    </section>

    <section class="nl-section nl-features" aria-labelledby="features-title">
      <div class="nl-section-heading">
        <p>{{ t.featureKicker }}</p>
        <h2 id="features-title">{{ t.featureTitle }}</h2>
      </div>
      <div class="nl-feature-grid">
        <article v-for="item in t.features" :key="item.title" class="nl-card">
          <span class="nl-icon" :class="`nl-${item.tint}`" aria-hidden="true">
            <IconGlyph :name="item.icon" />
          </span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </article>
      </div>
    </section>

    <section class="nl-section nl-how" aria-labelledby="how-title">
      <div class="nl-section-heading">
        <p>{{ t.howKicker }}</p>
        <h2 id="how-title">{{ t.howTitle }}</h2>
        <span>{{ t.howLead }}</span>
      </div>
      <div class="nl-flow-map">
        <div class="nl-flow-column">
          <strong>{{ t.inputLabel }}</strong>
          <span v-for="item in t.inputs" :key="item.text" class="nl-flow-chip">
            <i aria-hidden="true"><IconGlyph :name="item.icon" /></i>
            <b>{{ item.text }}</b>
          </span>
        </div>

        <div class="nl-flow-engine">
          <div class="nl-flow-engine-head">
            <b>{{ t.coreLabel }}</b>
            <span>{{ t.coreRole }}</span>
          </div>
          <ol>
            <li v-for="item in t.flowSteps" :key="item.text">
              <span aria-hidden="true"><IconGlyph :name="item.icon" /></span>
              <strong>{{ item.text }}</strong>
            </li>
          </ol>
        </div>

        <div class="nl-flow-column">
          <strong>{{ t.outputLabel }}</strong>
          <span v-for="item in t.outputs" :key="item.text" class="nl-flow-chip">
            <i aria-hidden="true"><IconGlyph :name="item.icon" /></i>
            <b>{{ item.text }}</b>
          </span>
        </div>
      </div>
    </section>

    <section class="nl-section nl-advantages" aria-labelledby="advantages-title">
      <div class="nl-section-heading">
        <p>{{ t.advantagesKicker }}</p>
        <h2 id="advantages-title">{{ t.advantagesTitle }}</h2>
      </div>
      <div class="nl-advantage-list">
        <article v-for="item in t.advantages" :key="item.title">
          <span class="nl-advantage-icon" aria-hidden="true"><IconGlyph :name="item.icon" /></span>
          <div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </div>
        </article>
      </div>
    </section>

    <section class="nl-section nl-showcase" aria-labelledby="screens-title">
      <div class="nl-section-heading">
        <p>{{ t.screenshotsKicker }}</p>
        <h2 id="screens-title">{{ t.screenshotsTitle }}</h2>
        <ul>
          <li v-for="item in t.screenshotBullets" :key="item">{{ item }}</li>
        </ul>
      </div>
      <div class="nl-showcase-carousel" aria-label="Product screenshot carousel" @mouseenter="stopShowcase" @mouseleave="startShowcase">
        <button class="nl-showcase-arrow previous" type="button" aria-label="Previous screenshot" @click="moveShowcase(-1)">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <div class="nl-showcase-stage">
          <article
            v-for="(slide, index) in showcaseSlides"
            :key="slide.id"
            :class="getShowcasePosition(index)"
            :role="index === showcaseActive ? undefined : 'button'"
            :tabindex="getShowcasePosition(index) === 'hidden' || index === showcaseActive ? -1 : 0"
            :aria-current="index === showcaseActive ? 'true' : undefined"
            :aria-hidden="getShowcasePosition(index) === 'hidden' ? 'true' : undefined"
            :aria-label="selectedLanguage === 'zh' ? slide.zhTitle : slide.title"
            @click="selectShowcase(index)"
            @keydown.enter.prevent="selectShowcase(index)"
            @keydown.space.prevent="selectShowcase(index)"
          >
            <img
              :key="`${slide.id}-${isDark ? 'dark' : 'light'}`"
              :src="withBase(resolveSlideImage(slide))"
              :alt="slide.alt"
              width="2559"
              height="1379"
              decoding="async"
              :loading="index === showcaseActive ? 'eager' : 'lazy'"
            >
            <div>
              <span class="nl-showcase-icon" aria-hidden="true"><IconGlyph :name="slide.icon" /></span>
              <strong>{{ selectedLanguage === 'zh' ? slide.zhTitle : slide.title }}</strong>
            </div>
          </article>
        </div>
        <button class="nl-showcase-arrow next" type="button" aria-label="Next screenshot" @click="moveShowcase(1)">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
        </button>
        <div class="nl-showcase-dots" aria-label="Choose screenshot">
          <button
            v-for="(slide, index) in showcaseSlides"
            :key="`${slide.id}-dot`"
            type="button"
            :class="{ active: index === showcaseActive }"
            :aria-label="selectedLanguage === 'zh' ? slide.zhTitle : slide.title"
            @click="selectShowcase(index)"
          ></button>
        </div>
      </div>
    </section>

    <section class="nl-section nl-roadmap" aria-labelledby="roadmap-title">
      <div class="nl-section-heading">
        <p>{{ t.roadmapKicker }}</p>
        <h2 id="roadmap-title">{{ t.roadmapTitle }}</h2>
      </div>
      <div class="nl-roadmap-grid">
        <a v-for="item in t.roadmap" :key="item.title" :href="withBase('/roadmap/')" class="nl-roadmap-card">
          <span class="nl-roadmap-icon" aria-hidden="true"><IconGlyph :name="item.icon" /></span>
          <span class="nl-roadmap-label">{{ item.label }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </a>
      </div>
    </section>

    <section class="nl-final" aria-label="Start using Nebula Lab">
      <div>
        <p>{{ t.finalKicker }}</p>
        <h2>{{ t.finalTitle }}</h2>
        <span>{{ t.finalLead }}</span>
      </div>
      <div class="nl-actions">
        <a class="nl-btn nl-btn-primary" :href="withBase('/tutorials/basic-processing')">
          {{ t.tutorialCta }}
        </a>
        <a class="nl-btn nl-btn-secondary" :href="withBase('/roadmap/')">
          {{ t.roadmapCta }}
        </a>
      </div>
    </section>
  </main>
</template>

<style>
.VPContent {
  padding-top: 0;
}

.VPPage {
  padding-bottom: 0;
}

:root {
  --nl-ink: #17130f;
  --nl-muted: #6f665f;
  --nl-subtle: #9b8f84;
  --nl-line: rgba(88, 63, 43, 0.14);
  --nl-brand: #f97316;
  --nl-brand-strong: #ea580c;
  --nl-brand-soft: #fff1e7;
  --nl-bg: #fffaf5;
  --nl-bg-2: #ffffff;
  --nl-panel: rgba(255, 255, 255, 0.86);
  --nl-panel-solid: #ffffff;
  --nl-panel-hover: #fff7ed;
  --nl-soft-panel: #f8efe6;
  --nl-card-shadow: 0 8px 20px rgba(144, 80, 28, 0.04);
  --nl-card-shadow-hover: 0 24px 56px rgba(249, 115, 22, 0.18), 0 0 0 1px rgba(249, 115, 22, 0.1);
  --nl-flow-shadow: 0 24px 64px rgba(249, 115, 22, 0.14), 0 0 0 8px rgba(249, 115, 22, 0.04);
  --nl-showcase-shadow: 0 14px 32px rgba(144, 80, 28, 0.09);
  --nl-showcase-shadow-hover: 0 28px 68px rgba(249, 115, 22, 0.16), 0 0 0 1px rgba(249, 115, 22, 0.08);
  --nl-sheen: rgba(255, 255, 255, 0.46);
  --nl-type-xs: 12px;
  --nl-type-sm: 14px;
  --nl-type-base: 16px;
  --nl-type-xl: 20px;
  --nl-type-3xl: 30px;
  --nl-type-4xl: 36px;
  --nl-type-5xl: 48px;
  --nl-type-8xl: 92px;
}

html.dark {
  --nl-ink: #fff7ed;
  --nl-muted: #d9c9bd;
  --nl-subtle: #a99687;
  --nl-line: rgba(255, 255, 255, 0.14);
  --nl-brand: #fb923c;
  --nl-brand-strong: #ffb86b;
  --nl-brand-soft: rgba(251, 146, 60, 0.16);
  --nl-bg: #101114;
  --nl-bg-2: #17151a;
  --nl-panel: rgba(29, 29, 34, 0.88);
  --nl-panel-solid: #1b1b20;
  --nl-panel-hover: #252228;
  --nl-soft-panel: #202026;
  --nl-card-shadow: 0 14px 28px rgba(0, 0, 0, 0.2);
  --nl-card-shadow-hover: 0 26px 64px rgba(249, 115, 22, 0.14), 0 0 0 1px rgba(251, 146, 60, 0.14);
  --nl-flow-shadow: 0 26px 70px rgba(0, 0, 0, 0.34), 0 0 0 8px rgba(251, 146, 60, 0.06);
  --nl-showcase-shadow: 0 18px 42px rgba(0, 0, 0, 0.24);
  --nl-showcase-shadow-hover: 0 30px 76px rgba(249, 115, 22, 0.14), 0 0 0 1px rgba(251, 146, 60, 0.12);
  --nl-sheen: rgba(255, 237, 213, 0.22);
}

.nl-home {
  position: relative;
  margin: 0 calc(50% - 50vw);
  overflow: hidden;
  color: var(--nl-ink);
  background:
    radial-gradient(circle at 50% 2%, rgba(249, 115, 22, 0.2), transparent 360px),
    linear-gradient(180deg, var(--nl-bg) 0, var(--nl-bg-2) 46%, var(--nl-bg) 100%);
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", sans-serif;
}

.nl-home::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(249, 115, 22, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(249, 115, 22, 0.08) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.42), transparent 900px);
}

.nl-hero,
.nl-section,
.nl-final {
  position: relative;
  width: min(1180px, calc(100vw - 48px));
  margin: 0 auto;
}

.nl-hero {
  padding: 86px 0 82px;
  text-align: center;
}

.nl-hero-inner {
  max-width: 910px;
  margin: 0 auto;
  animation: nl-rise 560ms ease-out both;
}

.nl-hero-kicker,
.nl-section-heading > p,
.nl-final p {
  display: inline-flex;
  margin: 0;
  color: var(--nl-brand-strong);
  font-size: var(--nl-type-sm);
  font-weight: 800;
}

.nl-hero-kicker {
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(249, 115, 22, 0.22);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.62);
  box-shadow: 0 10px 28px rgba(249, 115, 22, 0.08);
  font-size: 15px;
  padding: 8px 13px;
}

html.dark .nl-hero-kicker {
  background: rgba(255, 255, 255, 0.06);
}

.nl-hero-kicker::before {
  content: "";
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--nl-brand);
  box-shadow: 0 0 0 5px rgba(249, 115, 22, 0.13);
}

.nl-hero h1 {
  margin: 18px 0 0;
  font-size: clamp(58px, 10vw, 86px);
  line-height: 0.98;
  font-weight: 800;
  letter-spacing: 0;
}

.nl-hero-accent {
  margin: 20px auto 0;
  max-width: 780px;
  font-size: clamp(26px, 3vw, 34px);
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: 0;
}

.nl-lead,
.nl-section-heading > span,
.nl-final span {
  margin: 22px auto 0;
  max-width: 720px;
  color: var(--nl-muted);
  font-size: 18px;
  line-height: 1.65;
}

.nl-actions {
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-top: 32px;
}

.nl-btn {
  display: inline-flex;
  min-height: 46px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 800;
  padding: 0 22px;
  text-decoration: none;
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease, box-shadow 180ms ease;
}

.nl-btn:hover {
  transform: translateY(-2px);
  text-decoration: none;
}

.nl-btn-primary {
  background: var(--nl-brand);
  box-shadow: 0 16px 34px rgba(249, 115, 22, 0.26);
  color: #fff;
}

.nl-btn-primary:hover {
  color: #fff;
}

.nl-btn-secondary {
  border: 1px solid var(--nl-line);
  background: rgba(255, 255, 255, 0.76);
  color: var(--nl-ink);
}

html.dark .nl-btn-secondary {
  background: rgba(29, 29, 34, 0.9);
}

.nl-proof-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 24px;
}

.nl-proof-row span {
  border: 1px solid var(--nl-line);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.68);
  color: var(--nl-muted);
  font-size: 13px;
  font-weight: 700;
  padding: 8px 12px;
}

html.dark .nl-proof-row span {
  background: rgba(255, 255, 255, 0.05);
}

.nl-release-line {
  margin: 18px 0 0;
  color: var(--nl-subtle);
  font-size: 13px;
}

.nl-hero-panel {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  max-width: 860px;
  margin: 54px auto 0;
  border: 1px solid rgba(249, 115, 22, 0.2);
  border-radius: 24px;
  background:
    radial-gradient(circle at 50% 0%, rgba(249, 115, 22, 0.16), transparent 58%),
    var(--nl-panel);
  box-shadow: var(--nl-flow-shadow);
  text-align: left;
  animation: nl-rise 680ms 120ms ease-out both;
}

.nl-hero-panel::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image:
    linear-gradient(rgba(249, 115, 22, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(249, 115, 22, 0.08) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: radial-gradient(circle at 50% 20%, rgba(0, 0, 0, 0.7), transparent 68%);
}

.nl-hero-panel > * {
  position: relative;
  z-index: 1;
}

.nl-hero-panel-head {
  display: grid;
  gap: 8px;
  border-bottom: 1px solid var(--nl-line);
  padding: 22px 24px;
}

.nl-hero-panel-head span {
  color: var(--nl-brand-strong);
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
}

.nl-hero-panel-head p {
  margin: 0;
  color: var(--nl-muted);
  font-size: 15px;
  line-height: 1.6;
}

.nl-hero-panel-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  background: var(--nl-line);
}

.nl-hero-panel-grid article {
  display: grid;
  gap: 9px;
  background: var(--nl-panel);
  padding: 20px;
}

.nl-hero-panel-grid i {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border-radius: 11px;
  background: var(--nl-brand-soft);
  color: var(--nl-brand-strong);
}

.nl-hero-panel-grid svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.9;
}

.nl-hero-panel-grid strong {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  color: var(--nl-ink);
  font-size: 16px;
  line-height: 1.35;
  font-weight: 800;
}

.nl-hero-panel-grid em {
  display: inline-flex;
  border: 1px solid rgba(249, 115, 22, 0.26);
  border-radius: 999px;
  background: rgba(249, 115, 22, 0.1);
  color: var(--nl-brand-strong);
  font-size: 11px;
  font-style: normal;
  font-weight: 800;
  line-height: 1;
  padding: 4px 7px;
}

.nl-hero-panel-grid span {
  color: var(--nl-muted);
  font-size: 14px;
  line-height: 1.55;
}

.nl-section {
  padding: 88px 0;
  border-top: 1px solid var(--nl-line);
}

.nl-section-heading {
  max-width: 820px;
  margin: 0 auto;
  text-align: center;
}

.nl-section-heading h2,
.nl-final h2 {
  margin: 0;
  font-size: clamp(30px, 2.65vw, 42px);
  line-height: 1.18;
  font-weight: 800;
  letter-spacing: 0;
}

.nl-section-heading ul {
  display: grid;
  justify-content: center;
  margin: 22px auto 0;
  padding: 0;
  list-style: none;
}

.nl-section-heading li {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  color: var(--nl-muted);
  font-size: 16px;
  line-height: 1.6;
}

.nl-section-heading li::before {
  content: "";
  width: 7px;
  height: 7px;
  flex: 0 0 auto;
  margin-top: 10px;
  border-radius: 50%;
  background: var(--nl-brand);
}

.nl-feature-grid,
.nl-roadmap-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: 42px;
}

.nl-card,
.nl-roadmap-card {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  min-height: 230px;
  border: 1px solid var(--nl-line);
  border-radius: 18px;
  background: var(--nl-panel);
  box-shadow: var(--nl-card-shadow);
  color: var(--nl-ink);
  padding: 26px;
  text-decoration: none;
  transition: transform 200ms ease, border-color 200ms ease, background 200ms ease, box-shadow 200ms ease;
}

.nl-reveal {
  opacity: 0;
  transform: translateY(26px);
}

.nl-reveal.is-visible {
  animation: nl-section-rise 620ms ease-out both;
}

.nl-card.nl-reveal:nth-child(2),
.nl-roadmap-card.nl-reveal:nth-child(2),
.nl-showcase-carousel.nl-reveal {
  animation-delay: 70ms;
}

.nl-card.nl-reveal:nth-child(3),
.nl-roadmap-card.nl-reveal:nth-child(3) {
  animation-delay: 120ms;
}

.nl-card.nl-reveal:nth-child(4),
.nl-roadmap-card.nl-reveal:nth-child(4) {
  animation-delay: 170ms;
}

.nl-card.nl-reveal:nth-child(5),
.nl-roadmap-card.nl-reveal:nth-child(5) {
  animation-delay: 220ms;
}

.nl-card.nl-reveal:nth-child(6),
.nl-roadmap-card.nl-reveal:nth-child(6) {
  animation-delay: 270ms;
}

.nl-card:hover,
.nl-roadmap-card:hover {
  border-color: rgba(249, 115, 22, 0.58);
  background: var(--nl-panel-hover);
  box-shadow: var(--nl-card-shadow-hover);
  transform: translateY(-6px);
  text-decoration: none;
}

.nl-card > *,
.nl-roadmap-card > *,
.nl-flow-chip > *,
.nl-advantage-list article > *,
.nl-showcase-stage article > * {
  position: relative;
  z-index: 1;
}

.nl-card::before,
.nl-roadmap-card::before,
.nl-flow-chip::before,
.nl-advantage-list article::before,
.nl-showcase-stage article::before {
  content: "";
  position: absolute;
  inset: -1px;
  z-index: 0;
  border-radius: inherit;
  background:
    radial-gradient(circle at 18% 0%, rgba(255, 255, 255, 0.8), transparent 30%),
    radial-gradient(circle at 50% 0%, rgba(249, 115, 22, 0.34), transparent 38%),
    linear-gradient(135deg, rgba(249, 115, 22, 0.2), transparent 52%);
  opacity: 0;
  transition: opacity 220ms ease;
}

html.dark .nl-card::before,
html.dark .nl-roadmap-card::before,
html.dark .nl-flow-chip::before,
html.dark .nl-advantage-list article::before,
html.dark .nl-showcase-stage article::before {
  background:
    radial-gradient(circle at 18% 0%, rgba(255, 237, 213, 0.2), transparent 30%),
    radial-gradient(circle at 50% 0%, rgba(251, 146, 60, 0.22), transparent 38%),
    linear-gradient(135deg, rgba(251, 146, 60, 0.16), transparent 52%);
}

.nl-card::after,
.nl-roadmap-card::after,
.nl-flow-chip::after,
.nl-advantage-list article::after,
.nl-showcase-stage article::after {
  content: "";
  position: absolute;
  top: -35%;
  bottom: -35%;
  left: -70%;
  z-index: 0;
  width: 44%;
  border-radius: inherit;
  background: linear-gradient(90deg, transparent, var(--nl-sheen), transparent);
  opacity: 0;
  transform: rotate(16deg) translateX(0);
  transition: opacity 220ms ease, transform 520ms ease;
}

.nl-card:hover::before,
.nl-roadmap-card:hover::before,
.nl-flow-chip:hover::before,
.nl-advantage-list article:hover::before,
.nl-showcase-stage article:hover::before {
  opacity: 1;
}

.nl-card:hover::after,
.nl-roadmap-card:hover::after,
.nl-flow-chip:hover::after,
.nl-advantage-list article:hover::after,
.nl-showcase-stage article:hover::after {
  opacity: 1;
  transform: rotate(16deg) translateX(360%);
}

.nl-icon,
.nl-roadmap-icon,
.nl-advantage-icon,
.nl-showcase-icon {
  display: inline-grid;
  place-items: center;
  border-radius: 14px;
  background: var(--nl-brand-soft);
  color: var(--nl-brand-strong);
}

.nl-icon {
  width: 54px;
  height: 54px;
}

.nl-roadmap-icon,
.nl-advantage-icon {
  width: 50px;
  height: 50px;
}

.nl-showcase-icon {
  width: 42px;
  height: 42px;
}

.nl-icon svg,
.nl-roadmap-icon svg,
.nl-advantage-icon svg,
.nl-showcase-icon svg,
.nl-flow-chip svg,
.nl-flow-engine svg {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.9;
}

.nl-orange { background: rgba(249, 115, 22, 0.14); color: #ea580c; }
.nl-blue { background: rgba(37, 99, 235, 0.12); color: #2563eb; }
.nl-green { background: rgba(22, 163, 74, 0.12); color: #16a34a; }
.nl-violet { background: rgba(124, 58, 237, 0.12); color: #7c3aed; }
.nl-amber { background: rgba(217, 119, 6, 0.14); color: #d97706; }
.nl-pink { background: rgba(219, 39, 119, 0.12); color: #db2777; }

.nl-card h3,
.nl-roadmap-card h3,
.nl-advantage-list h3 {
  margin: 22px 0 0;
  font-size: 20px;
  line-height: 1.38;
  font-weight: 800;
}

.nl-card p,
.nl-roadmap-card p,
.nl-advantage-list p {
  margin: 12px 0 0;
  color: var(--nl-muted);
  font-size: 16px;
  line-height: 1.62;
}

.nl-flow-map {
  display: grid;
  grid-template-columns: minmax(180px, 1fr) minmax(260px, 320px) minmax(180px, 1fr);
  align-items: center;
  gap: 32px;
  min-height: 460px;
  margin-top: 48px;
}

.nl-flow-column {
  display: grid;
  gap: 14px;
}

.nl-flow-column strong {
  color: var(--nl-brand-strong);
  font-size: 12px;
  font-weight: 800;
}

.nl-flow-chip {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  display: grid;
  grid-template-columns: 38px 1fr;
  align-items: center;
  gap: 14px;
  border: 1px solid var(--nl-line);
  border-radius: 15px;
  background: var(--nl-panel);
  box-shadow: var(--nl-card-shadow);
  color: var(--nl-ink);
  font-size: 16px;
  font-weight: 700;
  padding: 18px;
  transition: transform 200ms ease, border-color 200ms ease, background 200ms ease, box-shadow 200ms ease;
}

.nl-flow-chip:hover {
  border-color: rgba(249, 115, 22, 0.5);
  background: var(--nl-panel-hover);
  box-shadow: var(--nl-card-shadow-hover);
  transform: translateX(4px) translateY(-2px);
}

.nl-flow-chip i,
.nl-flow-engine li span {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border-radius: 11px;
  background: var(--nl-brand-soft);
  color: var(--nl-brand-strong);
}

.nl-flow-engine {
  position: relative;
  border: 1px solid rgba(249, 115, 22, 0.32);
  border-radius: 22px;
  background:
    linear-gradient(180deg, rgba(255, 247, 237, 0.96), rgba(255, 255, 255, 0.94)),
    radial-gradient(circle at 50% 0%, rgba(249, 115, 22, 0.18), transparent 55%);
  box-shadow: var(--nl-flow-shadow);
  color: var(--nl-ink);
  padding: 18px;
}

html.dark .nl-flow-engine {
  background:
    linear-gradient(180deg, rgba(35, 34, 40, 0.96), rgba(25, 25, 30, 0.94)),
    radial-gradient(circle at 50% 0%, rgba(249, 115, 22, 0.18), transparent 55%);
}

.nl-flow-engine-head {
  border: 1px solid rgba(249, 115, 22, 0.22);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.74);
  padding: 16px;
}

html.dark .nl-flow-engine-head {
  border-color: rgba(251, 146, 60, 0.24);
  background: rgba(255, 255, 255, 0.1);
}

.nl-flow-engine-head b {
  display: block;
  font-size: 20px;
}

.nl-flow-engine-head span {
  display: block;
  margin-top: 4px;
  color: var(--nl-brand-strong);
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
}

.nl-flow-engine ol {
  display: grid;
  gap: 10px;
  margin: 14px 0 0;
  padding: 0;
  list-style: none;
}

.nl-flow-engine li {
  display: grid;
  grid-template-columns: 38px 1fr;
  align-items: center;
  gap: 12px;
  border: 1px solid var(--nl-line);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.82);
  padding: 12px;
}

html.dark .nl-flow-engine li {
  background: rgba(255, 255, 255, 0.08);
}

.nl-advantage-list {
  display: grid;
  gap: 1px;
  overflow: hidden;
  margin-top: 42px;
  border: 1px solid var(--nl-line);
  border-radius: 18px;
  background: var(--nl-line);
}

.nl-advantage-list article {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  display: grid;
  grid-template-columns: 58px 1fr;
  gap: 22px;
  background: var(--nl-panel);
  padding: 26px;
  transition: background 200ms ease, box-shadow 200ms ease, transform 200ms ease;
}

.nl-advantage-list article:hover {
  background: var(--nl-panel-hover);
  box-shadow: inset 4px 0 0 var(--nl-brand), 0 18px 40px rgba(249, 115, 22, 0.1);
  transform: translateX(4px);
}

.nl-advantage-list h3 {
  margin-top: 0;
}

.nl-showcase-carousel {
  position: relative;
  width: 100%;
  margin-top: 42px;
  overflow: hidden;
  padding: 10px 74px 54px;
}

.nl-showcase-stage {
  position: relative;
  height: clamp(430px, 50vw, 690px);
  margin: 0 auto;
}

.nl-showcase-stage article {
  position: absolute;
  top: 0;
  left: 50%;
  width: min(960px, 74vw);
  overflow: hidden;
  isolation: isolate;
  border: 1px solid var(--nl-line);
  border-radius: 18px;
  background: var(--nl-panel-solid);
  box-shadow: var(--nl-showcase-shadow);
  opacity: 0;
  pointer-events: none;
  transform: translateX(-50%) scale(0.78);
  transition: opacity 420ms ease, transform 520ms ease, border-color 220ms ease, box-shadow 220ms ease;
}

.nl-showcase-stage article.active {
  z-index: 3;
  opacity: 1;
  pointer-events: auto;
  transform: translateX(-50%) scale(1);
}

.nl-showcase-stage article.previous {
  z-index: 2;
  opacity: 0.44;
  pointer-events: auto;
  transform: translateX(-96%) scale(0.82);
  cursor: pointer;
}

.nl-showcase-stage article.next {
  z-index: 2;
  opacity: 0.44;
  pointer-events: auto;
  transform: translateX(-4%) scale(0.82);
  cursor: pointer;
}

.nl-showcase-stage article.hidden {
  transform: translateX(-50%) scale(0.72);
}

.nl-showcase-stage article:hover {
  border-color: rgba(249, 115, 22, 0.5);
  box-shadow: var(--nl-showcase-shadow-hover);
}

.nl-showcase-stage article.active:hover {
  transform: translateX(-50%) translateY(-5px) scale(1);
}

.nl-showcase-stage article.previous:hover {
  transform: translateX(-96%) translateY(-4px) scale(0.82);
}

.nl-showcase-stage article.next:hover {
  transform: translateX(-4%) translateY(-4px) scale(0.82);
}

.nl-showcase-stage article:hover img {
  transform: scale(1.02);
}

.nl-showcase-stage article:focus-visible {
  outline: 3px solid rgba(249, 115, 22, 0.48);
  outline-offset: 4px;
}

.nl-showcase-stage img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 2559 / 1379;
  background: var(--nl-soft-panel);
  object-fit: contain;
  object-position: top left;
  transform-origin: center top;
  transition: transform 360ms ease;
}

.nl-showcase-stage article > div {
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 18px 20px;
}

.nl-showcase-stage strong {
  color: var(--nl-ink);
  font-size: 16px;
  line-height: 1.5;
}

.nl-showcase-arrow {
  position: absolute;
  top: calc(50% - 32px);
  z-index: 5;
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  border: 1px solid var(--nl-line);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: var(--nl-card-shadow);
  color: var(--nl-brand-strong);
  cursor: pointer;
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease, box-shadow 180ms ease;
}

html.dark .nl-showcase-arrow {
  background: rgba(29, 29, 34, 0.92);
}

.nl-showcase-arrow.previous {
  left: 10px;
}

.nl-showcase-arrow.next {
  right: 10px;
}

.nl-showcase-arrow:hover {
  border-color: rgba(249, 115, 22, 0.5);
  background: var(--nl-panel-hover);
  box-shadow: var(--nl-card-shadow-hover);
  transform: translateY(-2px);
}

.nl-showcase-arrow svg {
  width: 22px;
  height: 22px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2.4;
}

.nl-showcase-dots {
  position: absolute;
  right: 74px;
  bottom: 12px;
  left: 74px;
  z-index: 5;
  display: flex;
  justify-content: center;
  gap: 9px;
}

.nl-showcase-dots button {
  width: 8px;
  height: 8px;
  border: 0;
  border-radius: 999px;
  background: rgba(249, 115, 22, 0.28);
  cursor: pointer;
  padding: 0;
  transition: width 220ms ease, background 220ms ease, transform 220ms ease;
}

.nl-showcase-dots button.active {
  width: 34px;
  background: var(--nl-brand);
}

.nl-showcase-dots button:hover {
  transform: translateY(-1px);
}

.nl-roadmap-label {
  display: block;
  margin-top: 18px;
  color: var(--nl-brand-strong);
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
}

.nl-final {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 48px;
  padding: 84px 0 104px;
  border-top: 1px solid var(--nl-line);
}

.nl-final > div:first-child {
  max-width: 720px;
}

.nl-final .nl-actions {
  flex: 0 0 auto;
  margin-top: 0;
}

@keyframes nl-rise {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes nl-section-rise {
  from {
    opacity: 0;
    transform: translateY(26px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 1ms !important;
    scroll-behavior: auto !important;
    transition-duration: 1ms !important;
  }
}

@media (max-width: 1080px) {
  .nl-final {
    display: block;
  }

  .nl-final .nl-actions {
    margin-top: 28px;
  }

  .nl-feature-grid,
  .nl-roadmap-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 820px) {
  .nl-hero,
  .nl-section,
  .nl-final {
    width: min(100vw - 32px, 1180px);
  }

  .nl-hero {
    padding: 54px 0 70px;
  }

  .nl-hero h1 {
    font-size: clamp(48px, 15vw, 64px);
  }

  .nl-hero-accent {
    font-size: clamp(24px, 7vw, 32px);
  }

  .nl-flow-map {
    grid-template-columns: 1fr;
  }

  .nl-flow-map {
    min-height: 0;
  }

  .nl-flow-engine {
    width: min(100%, 340px);
    margin: 12px auto;
  }

  .nl-showcase-carousel {
    padding: 8px 0 46px;
  }

  .nl-showcase-stage {
    height: clamp(300px, 88vw, 470px);
  }

  .nl-showcase-stage article {
    width: min(100%, 520px);
  }

  .nl-showcase-stage article.previous,
  .nl-showcase-stage article.next {
    opacity: 0;
    pointer-events: none;
    transform: translateX(-50%) scale(0.86);
  }

  .nl-showcase-arrow {
    top: auto;
    bottom: 0;
    width: 38px;
    height: 38px;
  }

  .nl-showcase-arrow.previous {
    left: calc(50% - 86px);
  }

  .nl-showcase-arrow.next {
    right: calc(50% - 86px);
  }

  .nl-showcase-dots {
    right: 64px;
    bottom: 14px;
    left: 64px;
  }

  .nl-section {
    padding: 68px 0;
  }

  .nl-final {
    padding: 70px 0 84px;
  }
}

@media (max-width: 640px) {
  .nl-feature-grid,
  .nl-roadmap-grid,
  .nl-hero-panel-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .nl-actions {
    align-items: stretch;
    flex-direction: column;
  }

  .nl-btn {
    width: 100%;
  }

  .nl-hero-panel {
    margin-top: 34px;
    border-radius: 18px;
  }

  .nl-hero-panel-grid article,
  .nl-card,
  .nl-roadmap-card,
  .nl-advantage-list article {
    padding: 22px;
  }

  .nl-advantage-list article {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}
</style>
