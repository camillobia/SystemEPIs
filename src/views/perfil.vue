<template>
    <header_2 />

    <div class="app">

        <div class="container">

            <div class="profile-card">

                <div class="profile-banner">
                    <h1>Perfil do Usuário</h1>
                </div>

                <div class="profile-avatar-wrapper">

                    <div v-if="profileImage" class="profile-image">
                        <img :src="profileImage" alt="Foto do perfil" />
                    </div>

                    <div v-else class="profile-placeholder">
                        <Camera :size="42" />
                    </div>

                    <label for="profile-upload" class="upload-button">
                        <Camera :size="18" />
                    </label>

                    <input
                        id="profile-upload"
                        type="file"
                        accept="image/*"
                        @change="handleImageChange"
                        hidden
                    />

                </div>

                <div class="profile-info">
                    <h2>{{ email }}</h2>
                </div>

                <div class="divider"></div>

                <div class="form-group full-width">

                    <label>E-mail</label>

                    <div class="input-wrapper">

                        <Mail class="icon" :size="20" />

                        <input
                            type="email"
                            v-model="email"
                            @input="handleFieldChange"
                        />

                    </div>
                </div>

                <div class="form-grid">

                    <div class="form-group">

                        <label>Senha Atual</label>

                        <div class="input-wrapper">

                            <Lock class="icon" :size="20" />

                            <input
                                :type="showCurrentPassword ? 'text' : 'password'"
                                v-model="currentPassword"
                                @input="handleFieldChange"
                            />

                            <button
                                type="button"
                                class="toggle-button"
                                @click="showCurrentPassword = !showCurrentPassword"
                            >
                                <EyeOff v-if="showCurrentPassword" :size="20" />
                                <Eye v-else :size="20" />
                            </button>

                        </div>
                    </div>

                    <div class="form-group">

                        <label>Nova Senha</label>

                        <div class="input-wrapper">

                            <Lock class="icon" :size="20" />

                            <input
                                :type="showNewPassword ? 'text' : 'password'"
                                v-model="newPassword"
                                @input="handleFieldChange"
                            />

                            <button
                                type="button"
                                class="toggle-button"
                                @click="showNewPassword = !showNewPassword"
                            >
                                <EyeOff v-if="showNewPassword" :size="20" />
                                <Eye v-else :size="20" />
                            </button>

                        </div>
                    </div>

                    <div class="form-group">

                        <label>Confirmar Senha</label>

                        <div class="input-wrapper">

                            <Lock class="icon" :size="20" />

                            <input
                                :type="showConfirmPassword ? 'text' : 'password'"
                                v-model="confirmPassword"
                                @input="handleFieldChange"
                            />

                            <button
                                type="button"
                                class="toggle-button"
                                @click="showConfirmPassword = !showConfirmPassword"
                            >
                                <EyeOff v-if="showConfirmPassword" :size="20" />
                                <Eye v-else :size="20" />
                            </button>

                        </div>
                    </div>

                </div>

                <div class="actions-footer">

                    <router-link to="/relatorio" class="back-button">
                        Voltar
                    </router-link>

                    <button
                        class="save-button"
                        @click="updateProfile"
                        :disabled="loading"
                    >
                        {{ loading ? 'Salvando...' : 'Salvar' }}
                    </button>

                </div>

            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import { useSupabase } from '../composable/useSupabase'

import header_2 from '../components/header_2.vue'

import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    Camera
} from 'lucide-vue-next'

const { supabase, session } = useSupabase()

const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const email = ref('')
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const userName = ref('Usuário')
const profileImage = ref(null)
const isEdited = ref(false)
const loading = ref(false)

function handleFieldChange() {
    isEdited.value = true
}

async function loadUser() {

    const user = session.value?.user

    if (!user) return

    email.value = user.email
    userName.value = user.user_metadata?.name || 'Usuário'
    profileImage.value = user.user_metadata?.avatar_url || null
}

async function updateProfile() {

    const user = session.value?.user

    if (!user) return

    if (
        newPassword.value &&
        newPassword.value !== confirmPassword.value
    ) {
        alert('As senhas não conferem')
        return
    }

    loading.value = true

    const { error } = await supabase.auth.updateUser({
        email: email.value,
        password: newPassword.value || undefined,
        data: {
            avatar_url: profileImage.value
        }
    })

    loading.value = false

    if (error) {
        console.error(error)
        alert('Erro ao atualizar perfil')
        return
    }

    isEdited.value = false

    alert('Perfil atualizado com sucesso!')
}

function handleImageChange(event) {

    const file = event.target.files[0]

    if (!file) return

    const reader = new FileReader()

    reader.onload = (e) => {
        profileImage.value = e.target.result
        isEdited.value = true
    }

    reader.readAsDataURL(file)
}

onMounted(loadUser)
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.app {
    min-height: 100vh;
    background: #eef2f7;
    font-family: 'Inter', sans-serif;
    padding: 16px;
}

.container {
    width: 100%;
    max-width: 620px;
    margin: 0 auto;
}

.profile-card {
    background: white;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 4px 18px rgba(15, 23, 42, 0.06);
}

.profile-banner {
    height: 105px;
    background: #082241;
    position: relative;
}


.profile-banner h1 {
    position: absolute;
    left: 28px;
    bottom: 30px;
    color: white;
    font-size: 26px;
    font-weight: 700;
}

.profile-avatar-wrapper {
    width: 88px;
    height: 88px;
    border-radius: 50%;
    background: white;
    position: relative;
    margin: -44px auto 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.profile-image,
.profile-placeholder {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    background: #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #64748b;
}

.profile-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.upload-button {
    position: absolute;
    right: 2px;
    bottom: 2px;

    width: 28px;
    height: 28px;

    border-radius: 50%;

    background: #0b223d;
    color: white;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    border: 2px solid white;

    transition: .2s;
}

.upload-button:hover {
    background: #16375f;
}

.profile-info {
    text-align: center;
    margin-bottom: 12px;
}

.profile-info h2 {
    font-size: 17px;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    color: #0f2744;
}

.divider {
    width: calc(100% - 64px);
    height: 1px;

    background: #d9d9d9;

    margin: 0 auto 16px;
}

.full-width {
    padding: 0 32px;
    margin-bottom: 12px;
}

.form-grid {
    padding: 0 32px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.form-group label {
    display: block;

    margin-bottom: 8px;

    font-size: 14px;
    font-family: 'Inter', sans-serif;
    font-weight: 600;

    color: #0f2744;
}

.input-wrapper {
    width: 100%;
    height: 42px;

    border-radius: 10px;

    background: #dcdcdc;

    padding: 0 14px;

    display: flex;
    align-items: center;
    gap: 10px;
}

.icon {
    color: #757575;
    flex-shrink: 0;
}

.input-wrapper input {
    flex: 1;

    border: none;
    outline: none;

    background: transparent;

    font-size: 13px;
    font-weight: 500;

    color: #0f2744;
}

.input-wrapper input::placeholder {
    color: #6e6e6e;
}

.toggle-button {
    border: none;
    background: transparent;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    color: #757575;
}

.actions-footer {
    display: flex;
    justify-content: center;
    gap: 14px;
    margin-top: 10px;
    padding: 20px 32px 30px;
}

.back-button,
.save-button {
    width: 280px;
    height: 46px;

    border: none;
    border-radius: 12px;

    display: flex;
    align-items: center;
    justify-content: center;

    text-decoration: none;

    font-size: 16px;
    font-family: 'Inter', sans-serif;
    font-weight: 600;

    cursor: pointer;

    transition: .2s;
}

.back-button {
    background: #082241;
    color: white;
}

.save-button {
    background: #25a81c;
    color: white;
}

.back-button:hover,
.save-button:hover {
    opacity: .92;
}

@media (max-width: 768px) {

    .container {
        max-width: 100%;
    }

    .profile-banner {
        height: 90px;
    }

    .profile-banner h1 {
        font-size: 22px;
        left: 22px;
        bottom: 24px;
    }

    .full-width,
    .form-grid {
        padding-left: 20px;
        padding-right: 20px;
    }

    .actions-footer {
        flex-direction: column;
        padding: 20px;
        
    }

    .back-button,
    .save-button {
        width: 100%;
    }
}
</style>