import { createRouter, createWebHistory } from 'vue-router'

import home from '../views/home.vue'
import login from '../views/login.vue'
import cadastro from '../views/cadastroFuncionario.vue'
import relatorio from '../views/relatorio.vue'
import cadastroEPI from '../views/cadastroEPI.vue'
import cadastroEntrega from '../views/cadastroEntrega.vue'

const routes = [
  { path: '/', component: home },
  { path: '/login', component: login },
  { path: '/cadastro', component: cadastro },
  { path: '/relatorio', component: relatorio },
  { path: '/cadastro-epi', component: cadastroEPI },
  { path: '/cadastro-entrega', component: cadastroEntrega }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router