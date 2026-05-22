import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import Watch from '../pages/Watch.vue'
import Search from '../pages/Search.vue'
import Shorts from '../pages/Shorts.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      component: Home,
    },

    {
      path: '/watch/:id',
      component: Watch,
    },

    {
      path: '/results',
      component: Search,
    },

    {
      path: '/shorts',
      component: Shorts,
    },
  ],
})

export default router
