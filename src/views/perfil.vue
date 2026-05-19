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
    font-family: 'Poppins', sans-serif;
    padding: 18px;
}

.container {
    width: 100%;
    max-width: 760px;
    margin: 0 auto;
}

.profile-card {
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 6px 20px rgba(15,23,42,0.08);
}

.profile-banner {
    height: 105px;
    background: linear-gradient(90deg, #0b223d, #123962);
    position: relative;
}

.profile-banner h1 {
    position: absolute;
    left: 30px;
    bottom: 24px;
    color: white;
    font-size: 30px;
    font-weight: 700;
}

.profile-avatar-wrapper {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: white;
    position: relative;
    margin: -50px auto 14px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.profile-image,
.profile-placeholder {
    width: 92px;
    height: 92px;
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
    right: 4px;
    bottom: 4px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #0b223d;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 3px solid white;
    transition: .2s;
}

.upload-button:hover {
    background: #16375f;
}

.profile-info {
    text-align: center;
    margin-bottom: 14px;
}

.profile-info h2 {
    font-size: 18px;
    font-weight: 700;
    color: #0b223d;
}

.divider {
    height: 1px;
    background: #dbe3ee;
    margin: 0 28px 18px;
}

.form-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 14px;
    padding: 0 28px;
}

.form-group {
    margin-bottom: 2px;
}

.full-width {
    padding: 0 28px;
    margin-bottom: 18px;
}

.form-group label {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 700;
    color: #0b223d;
}

.input-wrapper {
    height: 48px;
    border: 1px solid #dbe3ee;
    border-radius: 12px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: .2s;
    box-shadow: none;
    background: white;
}

.input-wrapper:focus-within {
    border-color: #123962;
    box-shadow: none;
}

.icon {
    color: #415a77;
    flex-shrink: 0;
}

.input-wrapper input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 15px;
    color: #0b223d;
    box-shadow: none;
}

.input-wrapper input:focus {
    outline: none;
    box-shadow: none;
}

.input-wrapper input::placeholder {
    color: #94a3b8;
}

.toggle-button {
    border: none;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #415a77;
}

.toggle-button:hover {
    color: #0b223d;
}

.actions-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding: 22px 28px 28px;
}

.back-button,
.save-button {
    width: 150px;
    height: 48px;
    border: none;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: .2s;
}

.back-button {
    background: linear-gradient(90deg, #1d3f72, #17335c);
    color: white;
}

.back-button:hover {
    opacity: .92;
}

.save-button {
    background: linear-gradient(90deg, #059669, #16a34a);
    color: white;
}

.save-button:hover {
    opacity: .92;
}

@media (max-width: 768px) {

    .app {
        padding: 14px;
    }

    .container {
        max-width: 100%;
    }

    .profile-banner {
        height: 90px;
    }

    .profile-banner h1 {
        font-size: 24px;
        left: 22px;
        bottom: 20px;
    }

    .profile-avatar-wrapper {
        width: 90px;
        height: 90px;
        margin-top: -45px;
    }

    .profile-image,
    .profile-placeholder {
        width: 82px;
        height: 82px;
    }

    .form-grid,
    .full-width {
        padding-left: 20px;
        padding-right: 20px;
    }

    .divider {
        margin-left: 20px;
        margin-right: 20px;
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