<template>
  <header_2 />
  <div class="page">
    <div class="container">
      <div class="header">
        <button class="hamburger":class="{ active: menuOpen }"
         @click="toggleMenu" >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div class="header-title">
          <h1 class="title">Relatórios de EPIs</h1>
        </div>
      </div>

      <div class="cards">
        <div class="card">
          <div class="card-top">
            <span class="card-title">EPIs Vencidos</span>
            <span class="icon-box danger">⚠</span>
             </div>

          <div class="card-value danger-text">14</div>
           </div>

        <div class="card">
          <div class="card-top">
            <span class="card-title">Próximos ao Vencimento</span>
            <span class="icon-box warning">◔</span>
             </div>

          <div class="card-value warning-text">40</div>
           </div>

         <div class="card">
          <div class="card-top">
            <span class="card-title">Estoque Total</span>
            <span class="icon-box primary">◫</span>
              </div>

          <div class="card-value primary-text">1.050</div>
           </div>

        <div class="card">
          <div class="card-top">
            <span class="card-title">Em Promoção</span>
            <span class="icon-box success">🏷</span>
          </div>

          <div class="card-value success-text"> 425</div>
          </div>

        <div class="card">
          <div class="card-top">
            <span class="card-title">Para Descarte</span>
            <span class="icon-box neutral">🗑</span>
          </div>

          <div class="card-value neutral-text">152</div>
          </div>
        </div>

   
      <div class="actions">
       <div class="search-box">
          <input
            v-model="search"
            type="text"
            placeholder="Buscar por nome ou código do EPI..."/>
              </div>

        <select v-model="dateFilter" class="select">
          <option value="7">Últimos 7 dias</option>
          <option value="30">Últimos 30 dias</option>
          <option value="90">Últimos 90 dias</option>
          <option value="365">Último ano</option>
          </select>

        <button class="btn btn-outline">Filtros</button>

        <button class="btn btn-primary">Exportar</button>
        </div>

      
      <div class="table-box">
       <div class="table-header-dark">
         <h2>Listagem de Estoque</h2>
          </div>

        <div class="table-wrapper">
         <table class="table">
         <thead>
              <tr>
                <th>Nome</th>
                <th>Código</th>
                <th>Data Validade</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
          <tr v-for="item in filteredInventory":key="item.id">
          <td class="name-cell"> {{ item.nome }}</td>
          <td class="code-cell">{{ item.id }}</td>
          <td>{{ item.vencimento }}</td>
          <td>
          <span class="quantity-badge">{{ item.quantidade }}</span>
           </td>
            </tr>

        <tr v-if="filteredInventory.length === 0">
          <td colspan="4"class="empty-state">Nenhum EPI encontrado</td>
          </tr>
         </tbody>
        </table>
       </div>
     </div>
   </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import header_2 from '../components/header_2.vue'

const dateFilter = ref('30')
const search = ref('')
const inventoryList = [
{id: 'EPI-001', nome: 'Capacete de Segurança Classe B', vencimento: '14/02/2026', quantidade: 45,},

{id: 'EPI-002', nome: 'Luva de Proteção Térmica', vencimento: '19/01/2026', quantidade: 120,},

{id: 'EPI-003', nome: 'Óculos de Proteção Antirrisco', vencimento: '09/03/2026', quantidade: 85, },

{id: 'EPI-004', nome: 'Protetor Auricular de Inserção', vencimento: '04/01/2026', quantidade: 200, },
]

const filteredInventory = computed(() => {
return inventoryList.filter(item =>
item.nome.toLowerCase().includes(search.value.toLowerCase()) ||
item.id.toLowerCase().includes(search.value.toLowerCase())
  )
})
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.page {
  min-height: 100vh;
  background: #eef2f7;
  padding: 18px;
}

.container {
  max-width: 1380px;
 margin: 0 auto;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 29px;
}

.header-title {
  text-align: left;
  width: 100%;
  margin-top: 16px;
}

.title {
  font-size: 2.4rem;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -1px;
}


.cards {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;
  margin-bottom: 22px;
}

.card {
  background: white;
  border-radius: 16px;
  padding: 18px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.05);
  transition: .2s ease;
}

.card:hover {
  transform: translateY(-2px);
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.card-title {
  font-size: 16px;
  font-weight: 400;
  font-family: 'Inter', sans-serif;
  color: #000000;
  margin-top: -19px;
}

.icon-box {
  width: 40px;
  height: 45px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
}

.card-value {
  font-size: 2.1rem;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  line-height: 1;
}

.danger {
  background: #fdeaea;
  color: #ef4444;
}

.warning {
  background: #fff6db;
  color: #f4b400;
}

.primary {
  background: #ececf2;
  color: #0e2238;
}

.success {
  background: #e7f8f1;
  color: #10b981;
}

.neutral {
  background: #eeeeef;
  color: #6b7280;
}

.primary-text {
  color: #0e2238;
}

.success-text {
  color: #10b981;
}

.warning-text {
  color: #f4b400;
}

.danger-text {
  color: #ef4444;
}

.neutral-text {
  color: #6b7280;
}

.actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.search-box {
  width: 350px;
}

.search-box input {
  width: 100%;
  height: 53px;
  padding: 0 13px;
  border-radius: 12px;
  border: 1px solid #dbe2ea;
  background: white;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  outline: none;
  transition: .2s;
}

.search-box input::placeholder {
  color: #000000d6;
}

.search-box input:focus {
  border-color: #0f172a;
  box-shadow: 0 0 0 4px rgba(15, 23, 42, 0.08);
}

.select {
  height: 42px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid #dbe2ea;
  background: white;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  color: #0e2238;
  outline: none;
}

.btn {
  height: 42px;
  padding: 0 18px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: .2s;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn-outline {
  background: white;
  border: 1px solid #dbe2ea;
  color: #0e2238;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
}

.btn-primary {
  background: #0e2238;
  color: white;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
}

.table-box {
  background: white;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid #dfe6ee;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.05);
}

.table-header-dark {
  background: #0f172a;
  padding: 18px 22px;
}

.table-header-dark h2 {
  color: white;
  font-size: 1.25rem;
  font-weight: 500;
 font-family: 'Inter', sans-serif;
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
  color: #0e2238;
  font-size: 16px;
  font-weight: 800;
  font-family: 'Inter', sans-serif;
  text-transform: uppercase;
  letter-spacing: .04em;
  padding: 14px 18px;
  text-align: left;
}

.table td {
  padding: 16px 18px;
  border-top: 1px solid #eef2f7;
  font-size: 17px;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
}

.table tbody tr {
  transition: .2s;
}

.table tbody tr:hover {
  background: #fafcff;
}

.name-cell {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  color: #000000; 
}

.code-cell {
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  color: #494949;
}

.quantity-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  height: 30px;
  padding: 0 10px;
  background:#dbeafe;
  border-radius: 8px;
  font-size: 13px;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  color: #0e2238;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #64748b;
}

@media (max-width: 1200px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .page {
    padding: 14px;
  }

  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 0.9rem;
  }

  .cards {
    grid-template-columns: 1fr;
  }

  .actions {
    flex-direction: column;
    align-items: stretch;
  }

  .search-box {
    min-width: 100%;
  }

  .table {
    min-width: 650px;
  }
}
</style>