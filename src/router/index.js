import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../components/LandingPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage
    },
    {
      path: '/voting',
      name: 'VotingPage',
      component: () => import('../components/VotingPage.vue')
    },
    {
      path: '/accreditation',
      name: 'Accreditation',
      component: () => import('../components/AccreditationPage.vue')
    },
    {
      path: '/candidates',
      name: 'Candidate',
      component: () => import('../components/CandidatePage.vue')
    },
    {
      path: '/stats',
      name: 'VotingStats',
      component: () => import('../components/ElectionStats.vue')
    }
  ]
})

export default router
