<template>
  <div>
    <header class="header">


      <button 
        class="hamburger" 
        :class="{ active: menuOpen }"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

     
    </header>

    <aside class="sidebar" :class="{ open: menuOpen }">
      <p @click="goTologin">Login</p>
      <p @click="goToRelatorio">Relatórios</p>
      <p @click="goTocadastroFuncionario">Funcionários</p>
      <p @click="goTocadastroEPI">Cadastro de EPIs</p>
    </aside>

    <div v-if="menuOpen" class="overlay" @click="closeMenu"></div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

const goTologin = () => {
  
  router.push('/login')
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

</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'inter', sans-serif;
   font-size: 23px;
  font-weight: 300;
}

.header {
  display: flex;
  align-items: center;
  gap: 20px;
  background: #0e2238;
  padding: 0 20px;
  height: 75px;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-icon img {
  width: 50px;
}

.logo-text {
  font-weight: bold;
  font-size: 18px;
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
}

.sidebar.open {
  left: 0;
}

.sidebar p {
  margin-bottom: 20px;
  cursor: pointer;
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


@media (max-width: 600px) {
  .logo-text {
    font-size: 14px;
  }

  .logo-icon img {
    width: 40px;
  }
}

</style>