<template>
  <header_2 />

  <div class="page">
   <div class="container">
    <div class="header-title">
     <h1 class="title">Cadastro de EPIs</h1>
      </div>

   <div class="actions">
    <div class="buttons">
     <button class="btn btn-primary" @click="openCreate">
      <UserPlus class="icon" />Cadastrar</button>

     <button class="btn btn-outline" @click="refreshList">
      <RefreshCcw class="icon" />Atualizar</button>
       </div>
        </div>

  <div class="search-box">
    <input v-model="searchTerm" placeholder="Buscar um EPI..."/>
     </div>

  <div class="table-box">
   <div class="table-header-dark"><h2>EPIs</h2>
    </div>

  <div class="table-wrapper">
   <table class="table">
    <thead>
      <tr><th>NOME</th>
          <th>CA</th>
          <th>TAMANHO</th>
          <th>QUANTIDADE</th>
          <th>STATUS</th>
          <th>AÇÕES</th>
          </tr>
           </thead>
            <tbody>
           
      <tr v-for="epi in filteredEpis":key="epi.id">
        <td class="name-cell">{{ epi.nome }}</td>

        <td class="code-cell">{{ epi.ca }}</td>

        <td><span class="size-text">{{ epi.tamanho }}</span>
         </td>

        <td><span class="quantity-number">{{ epi.quantidade }}</span>
         </td>
               
        <td> <span :class="epi.status === 'Disponível'
                    ? 'status-active': epi.status === 'Baixo estoque'
                    ? 'status-warning' : 'status-inactive' ">{{ epi.status }}</span>
          </td>

       <td class="actions-cell">
        <div class="menu-wrapper">
         <button class="dots"@click="toggleMenu(epi.id)">⋮</button>

        <div
         v-if="openMenuId === epi.id"class="dropdown">
          <button @click="editEmployee(epi)">Editar</button>
          <button class="danger"@click="deleteEmployee(epi.id)">Excluir</button>
            </div>
             </div>
              </td>
               </tr>

      <tr v-if="filteredEpis.length === 0">
      <td colspan="6" class="empty-state">Nenhum EPI encontrado</td>
          </tr>
           </tbody>
            </table>
              </div>
               </div>
                </div>

    <div v-if="openDialog"class="modal-overlay">
     <div class="modal">
      <div class="modal-header"><h3>{{ editing ? 'Editar EPI' : 'Cadastrar EPI' }}</h3>
        <button @click="closeDialog">✕</button>
         </div>

   <div class="form">
    <div class="grid">
     <div><label>Nome do EPI</label>
     <input v-model="form.nome" />
      </div>

   <div>
    <label>CA</label>
    <input v-model="form.ca" />
     </div>
      </div>

  <div class="grid">
   <div>
   <label>Tamanho</label>
    <select v-model="form.tamanho"><option>P</option>
                                   <option>M</option>
                                   <option>G</option>
                                   <option>GG</option>
      </select>
       </div>

  <div>
  <label>Quantidade</label>
   <input type="number"
   v-model="form.quantidade"/>
    </div>
     </div>
      </div>

  <div class="modal-actions">
   <button class="btn btn-outline" @click="closeDialog">Cancelar</button>
   <button class="btn btn-primary"@click="saveEmployee">Salvar</button>
    </div>
     </div>
      </div>
       </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import header_2 from '../components/header_2.vue'
import { UserPlus, RefreshCcw } from 'lucide-vue-next'

const epis = ref([
  { id: 1, nome: 'Capacete', ca: '12345',tamanho: 'M',quantidade: 20,status: 'Disponível'},
  { id: 2, nome: 'Luva', ca: '54321', tamanho: 'G', quantidade: 8, status: 'Baixo estoque' },
  { id: 3, nome: 'Óculos de proteção', ca: '67890', tamanho: 'Único', quantidade: 0, status: 'Indisponível' }
])

const searchTerm = ref('')
const openDialog = ref(false)
const openMenuId = ref(null)
const editing = ref(false)
const editId = ref(null)

const form = ref({
  nome: '',
  ca: '',
  tamanho: '',
  quantidade: 0,
  status: 'Disponível'
})

const filteredEpis = computed(() => {
  return epis.value.filter(e =>
    e.nome.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    e.ca.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

function openCreate() {
  editing.value = false
  form.value = {
    nome: '',
    ca: '',
    tamanho: '',
    quantidade: 0,
    status: 'Disponível'
  }
  openDialog.value = true
}

function closeDialog() {
  openDialog.value = false
}

function saveEmployee() {
 if (editing.value) {
  epis.value = epis.value.map(e =>
      e.id === editId.value
        ? { ...e, ...form.value }
        : e
    )

  } else {
   epis.value.push({
   id: Date.now(),
   ...form.value
  })
}
 closeDialog()
}

function editEmployee(epi) {
  editing.value = true
  editId.value = epi.id
  form.value = { ...epi }
  openDialog.value = true
  openMenuId.value = null
}

function deleteEmployee(id) {
  epis.value = epis.value.filter(e => e.id !== id)
  openMenuId.value = null
}

function toggleMenu(id) {
  openMenuId.value =
    openMenuId.value === id
      ? null
      : id
}

function refreshList() {
  epis.value = [...epis.value]
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

.header-title {
  margin-bottom: 30px;
}

.title {
  font-size: 2.3rem;
  font-weight: 700;
  color: #0e2238;
}

.actions {
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
}

.search-box input::placeholder {
  color: #64748b;
}

.search-box input:focus {
  border-color: #0f172a;
}

.table-box {
  background: white;
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,.04);
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
 font-size: 16px;
 font-weight: 800;
 color: #0e2238;
}

.table td {
  padding: 18px;
  border-top: 1px solid #eef2f7;
  font-size: 16px; 
  font-weight: 400;
  vertical-align: middle;
}

.table th,
.table td {
  white-space: nowrap;
}

.name-cell {
  font-size: 17px;
  font-weight: 600;
  color: #0f172a;
}

.code-cell {
  color: #475569;
}

.quantity-number {
  display: inline-block;
  margin-left: 40px;
}

.size-text {
  display: inline-block;
  margin-left: 38px;
}

.status-active {
  background: #dcfce7;
  color: #166534;
  padding: 7px 12px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
}

.status-warning {
  background: #fef3c7;
  color: #92400e;
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
  padding-left: 0;
}

.menu-wrapper {
  position: relative;
}

.dots {
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  margin-left: 20px;
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
  box-shadow: 0 6px 20px rgba(0,0,0,.08);
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
  width: 580px;
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
  justify-content: center;
  align-items: center;
  gap: 14px;
  margin-top: 30px;
}

.modal-actions .btn {
  width: 150px;
  height: 48px;
  justify-content: center;
  padding-left: 0;
  font-size: 15px;
}

@media (max-width: 768px) {
  .title {
    font-size: 1.8rem;
  }
  .buttons {
    flex-direction: column;
  }
  .btn {
    width: 100%;
  }
  .search-box {
    width: 100%;
  }
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>