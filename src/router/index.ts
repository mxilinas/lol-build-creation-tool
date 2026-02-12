import { createRouter, createWebHashHistory } from 'vue-router'
import ChampionPage from '@/views/ChampionPage.vue'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/champion/:id',
    name: 'ChampionPage',
    component: ChampionPage,
    props: true,
  },
]

const router = createRouter({
  history: createWebHashHistory('/lol-build-creation-tool/'),
  routes,
})

export default router
