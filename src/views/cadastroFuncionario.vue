<template>
  <header_2 />
   <div class="page">
    <div class="container">
     <div class="header">
     </div>

    <div class="header-title">
      <h1 class="title">Cadastro de Funcionários</h1>
       </div>
      

    <div class="actions">
      <div class="buttons">
       <button class="btn btn-primary" @click="openCreate">
         <UserPlus class="icon" />Cadastrar</button>

      <button class="btn btn-outline" @click="refreshList">
      <RefreshCcw class="icon" />Atualizar</button>
        </div>
         </div>

    <div class="search-box"> <input v-model="searchTerm"
         placeholder="Buscar funcionário..." />
          </div>

    <div class="table-box">
     <div class="table-header-dark"><h2>Funcionários</h2>
      </div>

    <div class="table-wrapper">
     <table class="table">
       <thead><tr><th>Nome</th>
                  <th>Setor</th>
                  <th>Turno</th>
                  <th>Status</th>
                  <th>Ações</th>
       </tr>
        </thead>

     <tbody>
       <tr v-for="emp in filteredEmployees" :key="emp.id">
        <td class="name-cell">{{ emp.nome }}</td>
        <td class="code-cell">{{ emp.setor }}</td>
        <td><span>{{ emp.turno }}</span></td>
        <td><span :class="emp.status === 'Ativo' ? 'status-active' : 'status-inactive'">
                  {{ emp.status }}</span>
           </td>
                     
        <td class="actions-cell">
         <div class="menu-wrapper">
          <button class="dots" @click="toggleMenu(emp.id)">⋮</button>

        <div v-if="openMenuId === emp.id" class="dropdown">
         <button @click="editEmployee(emp)">Editar</button>
         <button class="danger" @click="deleteEmployee(emp.id)">Excluir</button>
          </div>
           </div>
            </td>
             </tr>

        <tr v-if="filteredEmployees.length === 0">
        <td colspan="5" class="empty-state">Nenhum funcionário encontrado</td>
         </tr>
          </tbody>
           </table>
            </div>
             </div>
              </div>

     <div v-if="openDialog" class="modal-overlay">
      <div class="modal">
       <div class="modal-header"><h3>{{ editing ? 'Editar Funcionário' : 'Cadastrar Funcionário' }}</h3>
        <button @click="closeDialog">✕</button>
         </div>

     <div class="form">
      <div class="grid">
       <div><label>Nome</label>
        <input v-model="form.nome" />
          </div>

      <div><label>Setor</label>
          <input v-model="form.setor" />
            </div>
             </div>

     <div class="grid">
      <div><label>Turno</label>
       <select v-model="form.turno"><option>Manhã</option>
                                     <option>Tarde</option>
                                     <option>Noite</option>
         </select>
          </div>

     <div><label>Status</label>
        <select v-model="form.status"><option>Ativo</option>
                                      <option>Inativo</option>
         </select>
          </div>
           </div>
            </div>

    <div class="modal-actions">
     <button class="btn btn-outline" @click="closeDialog">Cancelar</button>
     <button class="btn btn-primary" @click="saveEmployee">Salvar</button>
      </div>
       </div>
        </div>
          </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import header_2 from '../components/header_2.vue'
import { UserPlus, RefreshCcw } from 'lucide-vue-next'

const employees = ref([
  { id: 1, nome: 'João Silva', setor: 'Administração', turno: 'Manhã', status: 'Ativo' },
  { id: 2, nome: 'Maria Santos', setor: 'Vendas', turno: 'Tarde', status: 'Ativo' },
  { id: 3, nome: 'Pedro Costa', setor: 'Produção', turno: 'Noite', status: 'Inativo' }
])

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

const filteredEmployees = computed(() => {
  return employees.value.filter(e =>
    e.nome.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    e.setor.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

function openCreate() {
  editing.value = false
  form.value = { nome: '', setor: '', turno: '', status: 'Ativo' }
  openDialog.value = true
}

function closeDialog() {
  openDialog.value = false
}

function saveEmployee() {
  if (editing.value) {
    employees.value = employees.value.map(e =>
      e.id === editId.value ? { ...e, ...form.value } : e
    )
  } else {
    employees.value.push({ id: Date.now(), ...form.value })
  }
  closeDialog()
}

function editEmployee(emp) {
  editing.value = true
  editId.value = emp.id
  form.value = { ...emp }
  openDialog.value = true
  openMenuId.value = null
}

function deleteEmployee(id) {
  employees.value = employees.value.filter(e => e.id !== id)
  openMenuId.value = null
}

function toggleMenu(id) {
  openMenuId.value = openMenuId.value === id ? null : id
}

function refreshList() {
  employees.value = [...employees.value]
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

.hamburger {
  width: 45px;
  height: 45px;
  background: white;
  border: 1px solid #dbe2ea;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  padding: 8px;
}

.hamburger span {
  width: 100%;
  height: 3px;
  background: #0f172a;
  border-radius: 10px;
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

.search-box {
  width: 350px;
   margin-bottom: 25px;
}

.search-box input {
  width: 113%;
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

.table-box {
  background: white;
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);
}

.table-header-dark {
  background: #0f172a;
  padding: 22px;
}

.table-header-dark h2 {
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
}

.table-wrapper {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
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
  font-family: 'Inter', sans-serif;
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

.success-text {
  color: #10b981;
  font-weight: 600;
}

.danger-text {
  color: #ef4444;
  font-weight: 600;
}

.actions-cell {
  position: relative;
}

.menu-wrapper {
  position: relative;
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
  right: 0;
  top: 32px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  min-width: 140px;
  overflow: hidden;
  z-index: 20;
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