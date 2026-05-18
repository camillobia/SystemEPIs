<template>
  <div>
    <header class="header">
      <button
        type="button"
        class="hamburger"
        :class="{ active: menuOpen }"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="header-actions">
        <button
          type="button"
          class="auth-button"
          @click="handleAuthAction"
          :title="session ? 'Sair do sistema' : 'Entrar no sistema'"
        >
          <User
            v-if="session"
            class="auth-icon"
          />

          <LogIn
            v-else
            class="auth-icon"
          />
        </button>
      </div>
    </header>

    <aside
      class="sidebar"
      :class="{ open: menuOpen }"
    >
      <p @click="goToRelatorio">
        Relatórios
      </p>

      <p @click="goTocadastroFuncionario">
        Cadastro de Funcionários
      </p>

      <p @click="goTocadastroEPI">
        Cadastro de EPIs
      </p>

      <p @click="goTocadastroEntrega">
        Cadastro de Entregas
      </p>
    </aside>

    <div
      v-if="menuOpen"
      class="overlay"
      @click="closeMenu"
    ></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSupabase } from '../composable/useSupabase'
import { User, LogIn } from 'lucide-vue-next'

const router = useRouter()
const menuOpen = ref(false)

const { session, supabase } = useSupabase()

async function handleAuthAction() {
  if (session.value) {
    await supabase.auth.signOut()
    closeMenu()
    router.push('/login')
    return
  }

  closeMenu()
  router.push('/login')
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function goToRelatorio() {
  closeMenu()
  router.push('/relatorio')
}

function goTocadastroFuncionario() {
  closeMenu()
  router.push('/cadastro')
}

function goTocadastroEPI() {
  closeMenu()
  router.push('/cadastro-epi')
}

function goTocadastroEntrega() {
  closeMenu()
  router.push('/cadastro-entrega')
}
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #0e2238;
  padding: 0 20px;
  height: 75px;
}

.hamburger {
  width: 30px;
  height: 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  background: none;
  border: none;
}

.hamburger span {
  height: 3px;
  width: 100%;
  background: #ffffff;
  border-radius: 2px;
  transition: 0.3s;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

.sidebar {
  position: fixed;
  top: 0;
  left: -250px;
  width: 250px;
  height: 100%;
  background: #0e2238;
  color: #e8e8ee;
  padding: 20px;
  transition: 0.3s;
  z-index: 1000;
  font-family: 'Inter', sans-serif;
}

.sidebar.open {
  left: 0;
}

.sidebar p {
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 400;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  z-index: 999;
}

.header-actions {
  display: flex;
  align-items: center;
}

.auth-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 999px;
  color: #ffffff;
  background: rgba(255,255,255,0.08);
  cursor: pointer;
}

.auth-icon {
  width: 18px;
  height: 18px;
}

@media (max-width: 600px) {
  .auth-button {
    width: 40px;
    height: 40px;
  }
}

</style>