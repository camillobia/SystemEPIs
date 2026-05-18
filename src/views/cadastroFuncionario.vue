<template>
  <header_2 />

  <div class="page">
    <div class="container">
      <div class="header-title">
        <h1 class="title">Cadastro de Funcionários</h1>
      </div>

      <div class="actions">
        <div class="buttons">
          <button
            type="button"
            class="btn btn-primary"
            @click.prevent="openCreate"
          >
            <UserPlus class="icon" />
            Cadastrar
          </button>

          <button
            type="button"
            class="btn btn-outline"
            @click.prevent="refreshList"
          >
            <RefreshCcw class="icon" />
            Atualizar
          </button>
        </div>
      </div>

      <div class="search-box">
        <input
          v-model="searchTerm"
          placeholder="Buscar funcionário..."
        />
      </div>

      <div class="table-box">
        <div class="table-header-dark">
          <h2>Funcionários</h2>
        </div>

        <div class="table-wrapper">
          <table class="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Setor</th>
                <th>Turno</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="emp in filteredEmployees"
                :key="emp.id"
              >
                <td class="name-cell">
                  {{ emp.nome }}
                </td>

                <td class="code-cell">
                  {{ emp.setor }}
                </td>

                <td>
                  {{ emp.turno }}
                </td>

                <td>
                  <span
                    :class="
                      emp.status === 'Ativo'
                        ? 'status-active'
                        : 'status-inactive'
                    "
                  >
                    {{ emp.status }}
                  </span>
                </td>

                <td class="actions-cell">
                  <div class="menu-wrapper">
                    <button
                      type="button"
                      class="dots"
                      @click.prevent="toggleMenu(emp.id)"
                    >
                      ⋮
                    </button>

                    <div
                      v-if="openMenuId === emp.id"
                      class="dropdown"
                    >
                      <button
                        type="button"
                        @click.prevent="editEmployee(emp)"
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        class="danger"
                        @click.prevent="deleteEmployee(emp.id)"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </td>
              </tr>

              <tr v-if="filteredEmployees.length === 0">
                <td
                  colspan="5"
                  class="empty-state"
                >
                  Nenhum funcionário encontrado
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div
      v-if="openDialog"
      class="modal-overlay"
    >
      <div class="modal">
        <div class="modal-header">
          <h3>
            {{
              editing
                ? 'Editar Funcionário'
                : 'Cadastrar Funcionário'
            }}
          </h3>

          <button
            type="button"
            @click.prevent="closeDialog"
          >
            ✕
          </button>
        </div>

        <div class="form">
          <div class="grid">
            <div>
              <label>Nome</label>
              <input v-model="form.nome" />
            </div>

            <div>
              <label>Setor</label>
              <input v-model="form.setor" />
            </div>
          </div>

          <div class="grid">
            <div>
              <label>Turno</label>

              <select v-model="form.turno">
                <option>Manhã</option>
                <option>Tarde</option>
                <option>Noite</option>
              </select>
            </div>

            <div>
              <label>Status</label>

              <select v-model="form.status">
                <option>Ativo</option>
                <option>Inativo</option>
              </select>
            </div>
          </div>
        </div>

        <div class="modal-actions">
          <button
            type="button"
            class="btn btn-outline"
            @click.prevent="closeDialog"
          >
            Cancelar
          </button>

          <button
            type="button"
            class="btn btn-primary"
            @click.prevent="saveEmployee"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { supabase } from '../composable/useSupabase'
import header_2 from '../components/header_2.vue'
import { UserPlus, RefreshCcw } from 'lucide-vue-next'

const employees = ref([])

const searchTerm = ref('')
const openDialog = ref(false)
const openMenuId = ref(null)
const editing = ref(false)
const editId = ref(null)

const form = ref({
  nome: '',
  setor: '',
  turno: '',
  status: 'Ativo'
})

async function loadEmployees() {
  const { data, error } = await supabase
    .from('funcionario')
    .select('*')

  if (error) {
    console.error('Erro ao buscar funcionários', error)
    return
  }

  employees.value = data.map(f => ({
    id: f.id_funcionario,
    nome: f.nome_funcionario,
    setor: f.setor_funcionario,
    turno: f.turno_funcionario,
    status: f.status_funcionario
  }))
}

onMounted(() => {
  loadEmployees()
  document.addEventListener('click', closeMenuOnOutsideClick)
})

function closeMenuOnOutsideClick(event) {
  const isMenuButton = event.target.closest('.dots')
  const isDropdown = event.target.closest('.dropdown')

  if (!isMenuButton && !isDropdown && openMenuId.value !== null) {
    openMenuId.value = null
  }
}

onBeforeUnmount(() => {
  document.removeEventListener('click', closeMenuOnOutsideClick)
})

const filteredEmployees = computed(() => {
  return employees.value.filter(e =>
    e.nome.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    e.setor.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

function openCreate() {
  editing.value = false

  form.value = {
    nome: '',
    setor: '',
    turno: '',
    status: 'Ativo'
  }

  openDialog.value = true
}

function closeDialog() {
  openDialog.value = false
}

async function saveEmployee() {
  if (editing.value) {
    const { error } = await supabase
      .from('funcionario')
      .update({
        nome_funcionario: form.value.nome,
        setor_funcionario: form.value.setor,
        turno_funcionario: form.value.turno,
        status_funcionario: form.value.status
      })
      .eq('id_funcionario', editId.value)

    if (error) {
      console.error('Erro ao atualizar funcionário', error)
      return
    }
  } else {
    const { error } = await supabase
      .from('funcionario')
      .insert([{
        nome_funcionario: form.value.nome,
        setor_funcionario: form.value.setor,
        turno_funcionario: form.value.turno,
        status_funcionario: form.value.status
      }])

    if (error) {
      console.error('Erro ao inserir funcionário', error)
      return
    }
  }

  await loadEmployees()
  closeDialog()
}

function editEmployee(emp) {
  editing.value = true
  editId.value = emp.id

  form.value = {
    nome: emp.nome,
    setor: emp.setor,
    turno: emp.turno,
    status: emp.status
  }

  openDialog.value = true
  openMenuId.value = null
}

async function deleteEmployee(id) {
  const { error } = await supabase
    .from('funcionario')
    .delete()
    .eq('id_funcionario', id)

  if (error) {
    console.error('Erro ao deletar funcionário', error)
    return
  }

  employees.value = employees.value.filter(
    emp => emp.id !== id
  )

  openMenuId.value = null
}

function toggleMenu(id) {
  openMenuId.value =
    openMenuId.value === id ? null : id
}

async function refreshList() {
  await loadEmployees()
}
</script>
<style scoped>

* {
  box-sizing: border-box;
}

.page {
  min-height: 100vh;
  background: #eef2f7;
  padding: 24px;
  font-family: 'Inter', sans-serif;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.header-title {
  margin-bottom: 30px;
}

.title {
  font-size: 2.3rem;
  font-weight: 700;
  color: #0f172a;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 25px;
}

.buttons {
  display: flex;
  gap: 12px;
}

.btn {
  width: 190px;
  height: 55px;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding-left: 22px;
  font-size: 17px;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  transition: .2s;
}

.icon {
  width: 24px;
  height: 24px;
  margin-right: 6px;
}

.btn-primary {
  background: #0f172a;
  color: white;
}

.btn-primary:hover {
  opacity: .9;
}

.btn-outline {
  background: white;
  border: 1px solid #dbe2ea;
  color: #0f172a;
}

.btn-outline:hover {
  background: #f8fafc;
}

.search-box {
  width: 350px;
  margin-bottom: 25px;
}

.search-box input {
  width: 100%;
  height: 52px;
  padding: 0 16px;
  border-radius: 14px;
  border: 1px solid #dbe2ea;
  background: white;
  font-size: 15px;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  outline: none;
  color: #000000;
}

.search-box input::placeholder {
  color: #000000cd;
}

.search-box input:focus {
  border-color: #0f172a;
}

.table-box {
  background: white;
  border-radius: 22px;
  overflow: visible;
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);
}

.table-header-dark {
  background: #0f172a;
  padding: 22px;
  border-top-left-radius: 22px;
  border-top-right-radius: 22px;
}

.table-header-dark h2 {
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
}

.table-wrapper {
  overflow: visible;
}

.table {
  width: 100%;
  border-collapse: collapse;
  overflow: visible;
}

.table th {
  background: #f8fafc;
  padding: 18px;
  text-align: left;
  font-size: 17px;
  font-weight: 800;
  font-family: 'Inter', sans-serif;
  color: #0e2238;
}

.table td {
  padding: 18px;
  border-top: 1px solid #eef2f7;
  font-size: 17px;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
}

.name-cell {
  font-size: 20px;
  font-weight: 400;
  color: #0f172a;
}

.code-cell {
  color: #475569;
}

.status-active {
  background: #dcfce7;
  color: #166534;
  padding: 7px 12px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
}

.status-inactive {
  background: #fee2e2;
  color: #991b1b;
  padding: 7px 12px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
}

.actions-cell {
  position: relative;
  overflow: visible;
}

.menu-wrapper {
  position: static;
}

.dots {
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  margin-left: 25px;
}

.dropdown {
  position: absolute;
  top: 10px;
  right: 80px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  min-width: 140px;
  z-index: 99999;
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
}

.dropdown button {
  width: 100%;
  padding: 12px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
}

.dropdown button:hover {
  background: #f3f4f6;
}

.danger {
  color: #ef4444;
}

.empty-state {
  text-align: center;
  padding: 45px;
  color: #64748b;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal {
  width: 520px;
  max-width: 95%;
  background: white;
  border-radius: 20px;
  padding: 24px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.modal-header h3 {
  font-size: 1.2rem;
  color: #0f172a;
}

.modal-header button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #334155;
}

input,
select {
  width: 100%;
  height: 48px;
  padding: 0 12px;
  border-radius: 12px;
  border: 1px solid #dbe2ea;
  outline: none;
}

input:focus,
select:focus {
  border-color: #0f172a;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 28px;
}

@media (max-width: 768px) {
  .title {
    font-size: 1.8rem;
  }

  .actions {
    flex-direction: column;
    align-items: stretch;
  }

  .search-box {
    width: 100%;
  }

  .btn {
    width: 100%;
  }

  .grid {
    grid-template-columns: 1fr;
  }
}

</style>