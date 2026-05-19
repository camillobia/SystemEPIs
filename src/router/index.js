import { createRouter, createWebHistory } from 'vue-router'
import { useSupabase } from '../composable/useSupabase'

import home from '../views/home.vue'
import login from '../views/login.vue'
import cadastro from '../views/cadastroFuncionario.vue'
import relatorio from '../views/relatorio.vue'
import cadastroEPI from '../views/cadastroEPI.vue'
import cadastroEntrega from '../views/cadastroEntrega.vue'
import perfil from '../views/perfil.vue'

const routes = [
  {
    path: '/',
    component: home,
    meta: { requiresAuth: false }
  },

  {
    path: '/login',
    component: login,
    meta: { requiresAuth: false }
  },

  {
    path: '/perfil',
    component: perfil,
    meta: { requiresAuth: true }
  },

  {
    path: '/cadastro',
    component: cadastro,
    meta: { requiresAuth: true }
  },

  {
    path: '/relatorio',
    component: relatorio,
    meta: { requiresAuth: true }
  },

  {
    path: '/cadastro-epi',
    component: cadastroEPI,
    meta: { requiresAuth: true }
  },

  {
    path: '/cadastro-entrega',
    component: cadastroEntrega,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const { session, loadingSession } = useSupabase()

  if (loadingSession.value) {
    await new Promise(resolve => {
      const interval = setInterval(() => {
        if (!loadingSession.value) {
          clearInterval(interval)
          resolve()
        }
      }, 50)
    })
  }

  const requiresAuth = to.meta.requiresAuth
  const isAuthenticated = !!session.value?.user

  if (requiresAuth && !isAuthenticated) {
    next('/login')
    return
  }

  if (to.path === '/login' && isAuthenticated) {
    next('/perfil')
    return
  }

  next()
})

export default router