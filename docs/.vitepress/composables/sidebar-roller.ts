// ====================================================
// NebulaLab Docs - 3D Snapping Cylinder Sidebar Roller Engine
// ====================================================

let targetPos = 0
let currentPos = 0
let wheelItems: HTMLElement[] = []
let isInitialized = false
let snapTimeout: ReturnType<typeof setTimeout> | null = null

function highlightActiveSidebarItem() {
  const currentPath = window.location.pathname.toLowerCase()
  let pageSlug = 'index'
  if (currentPath.includes('concepts')) pageSlug = 'concepts'
  else if (currentPath.includes('data-preparation')) pageSlug = 'data-preparation'
  else if (currentPath.includes('community')) pageSlug = 'community'
  else if (currentPath.includes('workflow')) pageSlug = 'workflow'
  else if (currentPath.includes('pro')) pageSlug = 'pro'

  const links = document.querySelectorAll('.VPSidebar .VPLink')
  links.forEach(link => {
    const href = (link.getAttribute('href') || '').toLowerCase()
    if (!href) return
    let linkSlug = 'index'
    if (href.includes('concepts')) linkSlug = 'concepts'
    else if (href.includes('data-preparation')) linkSlug = 'data-preparation'
    else if (href.includes('community')) linkSlug = 'community'
    else if (href.includes('workflow')) linkSlug = 'workflow'
    else if (href.includes('pro')) linkSlug = 'pro'

    const parent = link.closest('.VPSidebarItem') as HTMLElement | null
    if (parent) {
      parent.classList.remove('is-active', 'active')
      const textEl = parent.querySelector('.text') as HTMLElement | null
      if (textEl) textEl.classList.remove('active-text')

      if (pageSlug === linkSlug) {
        parent.classList.add('is-active', 'active')
        if (textEl) textEl.classList.add('active-text')
      }
    }
  })
}

function init3DWheel() {
  const itemsContainer = document.querySelector('.VPSidebarItem.level-0 .items') as HTMLElement | null
  if (!itemsContainer) return

  wheelItems = Array.from(itemsContainer.querySelectorAll('.VPSidebarItem.level-1')) as HTMLElement[]
  if (wheelItems.length === 0) return

  // Identify active index based on route
  const currentPath = window.location.pathname.toLowerCase()
  let activeIndex = 0
  if (currentPath.includes('concepts')) {
    activeIndex = 1
  } else if (currentPath.includes('data-preparation')) {
    activeIndex = 2
  } else if (currentPath.includes('community') || currentPath.includes('workflow')) {
    activeIndex = 3
  } else if (currentPath.includes('pro')) {
    activeIndex = 4
  }

  targetPos = activeIndex
  currentPos = activeIndex

  // Bind wheel event to sidebar
  const sidebarNav = (document.querySelector('.VPSidebar') as HTMLElement) || itemsContainer
  sidebarNav.addEventListener('wheel', handleWheelScroll as EventListener, { passive: false })

  // Click supporting smooth snapping
  sidebarNav.style.cursor = 'pointer'
  sidebarNav.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement | null
    if (target && target.closest('.level-0 > .item[role="button"]')) return

    const clickY = e.clientY
    let minIndex = 0
    let minDeviation = Infinity

    wheelItems.forEach((item, i) => {
      const rect = item.getBoundingClientRect()
      const centerY = rect.top + rect.height / 2
      const deviation = Math.abs(clickY - centerY)

      if (deviation < minDeviation) {
        minDeviation = deviation
        minIndex = i
      }
    })

    if (minDeviation > 110) return

    e.preventDefault()
    e.stopPropagation()

    const targetItem = wheelItems[minIndex]
    const link = targetItem.querySelector('.VPLink') as HTMLAnchorElement | null
    if (!link) return

    const resolvedHref = link.getAttribute('href')
    if (!resolvedHref) return

    targetPos = minIndex

    setTimeout(() => {
      window.location.href = resolvedHref
    }, 220)
  })

  isInitialized = true
  animateWheel()
  alignCylinderWithButton()

  window.addEventListener('resize', alignCylinderWithButton)
  setTimeout(alignCylinderWithButton, 50)
  setTimeout(alignCylinderWithButton, 150)
  setTimeout(alignCylinderWithButton, 350)
  setTimeout(alignCylinderWithButton, 750)
  setTimeout(alignCylinderWithButton, 1500)
}

function handleWheelScroll(e: WheelEvent) {
  if (!isInitialized) return

  e.preventDefault()

  const speed = 0.0028
  targetPos += e.deltaY * speed

  targetPos = Math.max(0, Math.min(wheelItems.length - 1, targetPos))

  if (snapTimeout) clearTimeout(snapTimeout)
  snapTimeout = setTimeout(() => {
    targetPos = Math.round(targetPos)
  }, 160)
}

function animateWheel() {
  let diff = targetPos - currentPos
  if (Math.abs(diff) > 0.001) {
    currentPos += diff * 0.16
  } else {
    currentPos = targetPos
  }

  wheelItems.forEach((item, i) => {
    const itemDiff = i - currentPos
    const absDiff = Math.abs(itemDiff)

    const translateY = itemDiff * 78
    const rotateX = itemDiff * -17
    const translateZ = -absDiff * 8
    const scale = 1.22 - Math.min(0.42, absDiff * 0.18)
    const opacity = 1.0 - Math.min(0.68, absDiff * 0.32)

    item.style.transform = `translateY(${translateY}px) rotateX(${rotateX}deg) translateZ(${translateZ}px) scale(${scale})`
    item.style.opacity = String(opacity)
    item.style.pointerEvents = 'auto'

    const textEl = item.querySelector('.text') as HTMLElement | null
    if (textEl) {
      if (absDiff < 0.45) {
        item.classList.add('is-active', 'active')
        textEl.classList.add('active-text')
      } else {
        item.classList.remove('is-active', 'active')
        textEl.classList.remove('active-text')
      }
    }
  })

  requestAnimationFrame(animateWheel)
}

function alignCylinderWithButton() {
  const btn = document.getElementById('sidebar-toggle-btn') as HTMLElement | null
  const container = document.querySelector('.VPSidebarItem.level-0 .items') as HTMLElement | null
  if (!btn || !container) return

  container.style.setProperty('margin-top', '0px', 'important')

  const btnRect = btn.getBoundingClientRect()
  const btnCenterY = btnRect.top + btnRect.height / 2

  const itemsRect = container.getBoundingClientRect()
  const itemsCenterY = itemsRect.top + itemsRect.height / 2

  const diffY = btnCenterY - itemsCenterY
  container.style.setProperty('margin-top', diffY + 'px', 'important')
}

// ====================================================
// Sub-drawer Engine
// ====================================================

let drawerHideTimeout: ReturnType<typeof setTimeout> | null = null

function initSubDrawer() {
  const sidebar = document.querySelector('.VPSidebar')
  if (!sidebar || document.getElementById('sidebar-sub-drawer')) return

  const drawer = document.createElement('div')
  drawer.id = 'sidebar-sub-drawer'
  drawer.className = 'sidebar-sub-drawer'
  document.body.appendChild(drawer)

  function showDrawer() {
    if (drawerHideTimeout) clearTimeout(drawerHideTimeout)
    if (!document.documentElement.classList.contains('sidebar-collapsed')) {
      drawer.classList.add('show')
    }
  }

  function hideDrawer() {
    drawerHideTimeout = setTimeout(() => {
      drawer.classList.remove('show')
    }, 200)
  }

  sidebar.addEventListener('mouseenter', showDrawer)
  sidebar.addEventListener('mouseleave', hideDrawer)
  drawer.addEventListener('mouseenter', showDrawer)
  drawer.addEventListener('mouseleave', hideDrawer)

  buildSubDrawerItems()
}

function buildSubDrawerItems() {
  const drawer = document.getElementById('sidebar-sub-drawer')!
  if (!drawer) return

  drawer.innerHTML = '<div class="sub-drawer-title">本页目录</div>'

  const h2s = Array.from(document.querySelectorAll('.vp-doc h2'))
  if (h2s.length === 0) {
    drawer.classList.remove('show')
    return
  }

  h2s.forEach((h2) => {
    const text = h2.textContent?.trim() || ''
    const item = document.createElement('a')
    item.className = 'sub-drawer-item'
    item.textContent = text
    item.href = '#' + (h2.id || '')
    item.addEventListener('click', (e) => {
      e.preventDefault()
      const yOffset = -90
      const rect = h2.getBoundingClientRect()
      const top = rect.top + window.pageYOffset + yOffset
      window.scrollTo({ top: top, behavior: 'smooth' })
    })
    drawer.appendChild(item)
  })

  setupScrollSpy(h2s)
}

function setupScrollSpy(h2s: Element[]) {
  const drawer = document.getElementById('sidebar-sub-drawer')
  if (!drawer) return

  function onScroll() {
    const scrollPos = window.scrollY + 120
    let activeIdx = -1

    for (let i = 0; i < h2s.length; i++) {
      const rect = h2s[i].getBoundingClientRect()
      const top = rect.top + window.scrollY
      if (scrollPos >= top) {
        activeIdx = i
      } else {
        break
      }
    }

    const items = drawer.querySelectorAll('.sub-drawer-item')
    items.forEach((item, idx) => {
      if (idx === activeIdx) {
        item.classList.add('active')
      } else {
        item.classList.remove('active')
      }
    })
  }

  window.addEventListener('scroll', onScroll)
  onScroll()
}

// ====================================================
// Sidebar Toggle
// ====================================================

function initSidebarToggle() {
  if (document.getElementById('sidebar-toggle-btn')) {
    syncButtonState()
    highlightActiveSidebarItem()
    return
  }

  const btn = document.createElement('button')
  btn.id = 'sidebar-toggle-btn'
  btn.className = 'sidebar-toggle-btn'
  btn.setAttribute('aria-label', '切换侧边栏')
  btn.innerHTML = '<svg class="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="15 18 9 12 15 6"></polyline></svg>'

  document.body.appendChild(btn)
  syncButtonState()
  highlightActiveSidebarItem()

  btn.addEventListener('click', () => {
    const isCollapsed = document.documentElement.classList.toggle('sidebar-collapsed')
    localStorage.setItem('sidebar-collapsed', String(isCollapsed))
    syncButtonState()
  })
}

function syncButtonState() {
  const btn = document.getElementById('sidebar-toggle-btn') as HTMLElement | null
  if (!btn) return
  const isCollapsed = document.documentElement.classList.contains('sidebar-collapsed')
  if (isCollapsed) {
    btn.classList.add('collapsed')
  } else {
    btn.classList.remove('collapsed')
  }
}

// ====================================================
// Initialization
// ====================================================

export function setupSidebarRoller() {
  // Restore collapsed state from localStorage
  const collapsed = localStorage.getItem('sidebar-collapsed') === 'true'
  if (collapsed) {
    document.documentElement.classList.add('sidebar-collapsed')
  }

  function initAll() {
    initSidebarToggle()
    highlightActiveSidebarItem()
    init3DWheel()
    initSubDrawer()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll)
  } else {
    initAll()
  }

  // Backup triggers for late hydration
  setTimeout(initSidebarToggle, 50)
  setTimeout(initSubDrawer, 70)
  setTimeout(highlightActiveSidebarItem, 100)
  setTimeout(init3DWheel, 120)
  setTimeout(highlightActiveSidebarItem, 300)
}