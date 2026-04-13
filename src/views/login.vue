<template>
  <div class="login-page">
    <!-- Área da ilustração -->
    <div class="illustration">
      <img src="../assets/foto_login.png" alt="foto da tela de login" />
    </div>

    <div class="login-container">
      <form @submit.prevent="handleLogin">
        <h2>System EPI</h2>

        <label for="Email_usuario">E-mail</label>
        <input
          id="Email_usuario"
          v-model="email"
          type="email"
          placeholder="seu@email.com"
          required
        />

        <label for="Senha-usuario">Senha</label>
        <input
          id="Senha-usuario"
          v-model="password"
          type="password"
          placeholder="Digite sua senha"
          required
        />

        <button :disabled="loading" type="submit">
          {{ loading ? 'Carregando...' : 'Entrar' }}
        </button>

        <p v-if="errorMessage" class="error">
          {{ errorMessage }}
        </p>

        <router-link to="/relatorio">
          Não tem conta? Cadastre-se
        </router-link>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../composable/useSupabase'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''
  loading.value = true

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })

    if (error) throw error

    console.log('Login realizado com sucesso:', data)
    router.push('/relatorio')
  } catch (error) {
    console.error('Erro ao logar:', error.message)
    errorMessage.value =
      error.message === 'Invalid login credentials'
        ? 'E-mail ou senha incorretos.'
        : 'Erro ao conectar com o servidor.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  background-color: #e8e8ee;
  font-family: 'Inter', sans-serif;
  padding: 0 5%;
}

.illustration {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.illustration img {
  max-width: 90%;
  height: auto;
}

.login-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 350px;
  padding: 30px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #1e2a5e;
  margin-bottom: 10px;
}

label {
  font-weight: bold;
  font-size: 0.9rem;
  color: #0e2238;
}

input {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  outline: none;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #667eea;
}

button {
  padding: 12px;
  border-radius: 8px;
  background: #0E2238;
  color: #fff;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.3s;
}

button:disabled {
  background: #aab7f1;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  opacity: 0.9;
}

.error {
  color: #e74c3c;
  font-size: 0.85rem;
  text-align: center;
  margin-top: 5px;
}

a {
  color: #667eea;
  text-decoration: none;
  text-align: center;
  font-size: 0.9rem;
  margin-top: 10px;
}

a:hover {
  text-decoration: underline;
}
</style>