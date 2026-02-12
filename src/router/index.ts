import { createRouter, createWebHistory } from 'vue-router'
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
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
