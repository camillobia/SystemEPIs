<template>
  <div class="page">
    <div class="card">
      

      <section class="left">
        <div class="left-content">
          <div class="brand">
            <HardHat class="brand-icon" />
            <h1>System <span>EPI</span></h1>
          </div>

          <div class="visual">
            <div class="shield">
              <Lock class="lock" />
            </div>
          </div>

          <p class="left-text">
            Proteção e segurança para sua equipe.
            Gerencie seus EPIs de forma inteligente.
          </p>
        </div>
      </section>

      <!-- LADO DIREITO -->
      <section class="right">
        <div class="form-box">
          <h2>Bem-vindo de volta!</h2>
          <p class="subtitle">Faça login para continuar</p>

          <!-- EMAIL -->
          <div class="group">
            <label>E-mail</label>
            <div class="input">
              <Mail />
              <input 
                v-model="email"
                type="email"
                placeholder="seu@email.com" 
              />
            </div>
          </div>

          <!-- SENHA -->
          <div class="group">
            <label>Senha</label>
            <div class="input">
              <Lock />
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Digite sua senha"
              />
              <button type="button" @click="showPassword = !showPassword">
                <Eye v-if="!showPassword" />
                <EyeOff v-else />
              </button>
            </div>
            <a class="forgot">Esqueci minha senha</a>
          </div>

          <button 
            class="login-btn" 
            :disabled="loading"
            @click="handleLogin"
          >
            {{ loading ? 'Entrando...' : 'Entrar' }}
          </button>

          <p v-if="errorMessage" class="error">
            {{ errorMessage }}
          </p>

          <div class="divider"><span>ou</span></div>

          <p class="register">
            Não tem uma conta?
            <router-link to="/cadastro">Cadastre-se</router-link>
          </p>
        </div>
      </section>

    </div>
  </div>
</template>
 
<script setup lang="ts">
import { Mail, Lock, Eye, EyeOff, HardHat } from 'lucide-vue-next'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../composable/useSupabase'

const router = useRouter()
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')
const handleLogin = async () => {
  errorMessage.value = ''
  loading.value = true

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })

    if (error) throw error

    router.push('/relatorio')

  } catch (error) {
    console.error(error.message)

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
.page {
background: #eef2f7;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
 
.card {
  width: 100%;
  max-width: 1200px;
  height: 90vh;
  background: white;
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0,0,0,.2);
}
 
.left {
  width: 50%;
  background: linear-gradient(135deg, #1c2b44, #284060);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
 
.square {
  position: absolute;
  width: 26px;
  height: 26px;
  background: #ffc107;
  border-radius: 6px;
}
 
.left-content {
  text-align: center;
  color: white;
}
 
.brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 60px;
}
.brand-icon {
  width: 42px;
  height: 42px;
  color: #ffc107;
  margin-top: 4px;
  
}
.brand h1 {
 font-size: 29px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  margin-left: -5px;
}
.brand span {
  color: #ffffff;
  margin-left: -5px;
}
 
.visual {
  position: relative;
  margin-bottom: 40px;
}
.shield {
  width: 220px;
  height: 260px;
  border: 5px solid #ffc107;
  border-radius: 120px 120px 30px 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 45px;
}
.lock {
  width: 90px;
  height: 90px;
  color: #ffc107;
   transform: translateY(-5px);
}
 
.float {
  position: absolute;
  width: 20px;
  height: 20px;
  background: #ffc107;
  border-radius: 4px;
}

.left-text {
  font-size: 17px;
  color: #d1d5db;
  max-width: 320px;
  margin: auto;
  font-weight: 400;
  font-family: 'Inter', sans-serif;
}
 
.right {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
 
.form-box {
  width: 400px;
}
 
h2 {
 font-size: 30px;
  font-weight: 400;
  font-family: 'Inter', sans-serif;
  color: #0f172a;
  margin-bottom: 6px;
}
.subtitle {
  color: #64748b;
  margin-bottom: 32px;
  font-size: 14px;
  font-weight: 400;
  font-family: 'Inter', sans-serif;
}
 
.group {
  margin-bottom: 24px;
}
label {
  display: block;
 font-size: 18px;
  font-weight: 400;
  font-family: 'Inter', sans-serif;
  color: #0f172a;
  margin-bottom: 6px;
}
 
.input {
  position: relative;
}
.input svg {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
}
.input input {
  width: 100%;
  height: 52px;
  padding: 0 44px;
  border-radius: 12px;
  border: 1.5px solid #e2e8f0;
  font-size: 14px;
}
.input button {
  position: absolute;
  right: 45px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
}
 
.forgot {
  display: block;
  text-align: right;
  color: #ffc107;
  margin-top: 6px;
  font-size: 14px;
  font-weight: 400;
  font-family: 'Inter', sans-serif;
}
 
.login-btn {
  width: 100%;
  height: 52px;
  background: linear-gradient(180deg, #263b59, #0e2238);
  color: white;
  border-radius: 999px;
 font-size: 18px;
  font-weight: 400;
  font-family: 'Inter', sans-serif;
  margin-top: 10px;
}
 
.divider {
  margin: 28px 0;
  text-align: center;
  position: relative;
}
.divider::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  border-top: 1px solid #e2e8f0;
}
.divider span {
  background: white;
  padding: 0 12px;
  font-size: 16px;
  font-weight: 400;
  font-family: poppins, sans-serif;
  color: #64748b;
  position: relative;
}
 
.register {
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  font-family: poppins, sans-serif;
  color: #475569;
}
.register a {
  color: #ffc107;
  font-weight: 600;
}
</style>
