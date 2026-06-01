import DefaultTheme from 'vitepress/theme'
import { h, onMounted } from 'vue'
import NavControls from './components/NavControls.vue'
import NavScreenControls from './components/NavScreenControls.vue'
import { setupSidebarRoller } from '../composables/sidebar-roller'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(NavControls),
      'nav-screen-content-after': () => h(NavScreenControls)
    })
  },
  setup() {
    onMounted(() => {
      setupSidebarRoller()
    })
  }
}