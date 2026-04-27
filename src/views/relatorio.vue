<template>
  <header_2 />
   <div class="page">
    <div class="container">
     <div class="header">
        <button 
          class="hamburger" 
          :class="{ active: menuOpen }"
          @click="toggleMenu"
        >
          <span></span>
           <span></span>
            <span></span> 
              </button>

        <div class="header-title">
          <h1 class="title">Relatórios de EPIs</h1>
          <p class="subtitle">
            Gestão e controle de Equipamentos de Proteção Individual
          </p>
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
              <div class="card-value success-text">425</div>
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
        <div class="table-header">
          <h2>Listagem de Estoque</h2>
          <p>Todos os EPIs disponíveis no inventário</p>
        </div>

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
            <tr v-for="item in inventoryList" :key="item.id">
              <td>{{ item.nome }}</td>
              <td>{{ item.id }}</td>
              <td>{{ item.vencimento }}</td>
              <td>{{ item.quantidade }}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import header_2 from '../components/header_2.vue'

const dateFilter = ref('30')

const inventoryList = [
  {
    id: 'EPI-001',
    nome: 'Capacete de Segurança Classe B',
    vencimento: '14/02/2026',
    quantidade: 45,
  },
  {
    id: 'EPI-002',
    nome: 'Luva de Proteção Térmica',
    vencimento: '19/01/2026',
    quantidade: 120,
  },
  {
    id: 'EPI-003',
    nome: 'Óculos de Proteção Antirrisco',
    vencimento: '09/03/2026',
    quantidade: 85,
  },
  {
    id: 'EPI-004',
    nome: 'Protetor Auricular de Inserção',
    vencimento: '04/01/2026',
    quantidade: 200,
  },
]
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.page {
  min-height: 100vh;
  background: #e8e8ee;
  padding: 20px 16px;
}

.container {
  max-width: 1350px;
  margin: 0 auto;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}

.header-title {
  text-align: center;
  width: 100%;
}

.title {
  font-size: 2.6rem;
  font-weight: 700;
  color: #0e2238;
  margin: 0;
}

.subtitle {
  font-size: 1.25rem;
  color: #0e2238;
  opacity: 0.75;
  margin-top: 8px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 16px;
  margin: 18px 0 22px 0;
}

.card {
  background: #fff;
  border: 1px solid #dde3eb;
  border-radius: 18px;
  padding: 18px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
}

.card-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  color: #0e2238;
}

.icon-box {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.card-value {
  font-size: 36px;
  font-weight: 600;
  line-height: 1;
}

.danger { background: #fdeaea; color: #ef4444; }
.warning { background: #fff6db; color: #f4b400; }
.primary { background: #ececf2; color: #0e2238; }
.success { background: #e7f8f1; color: #10b981; }
.neutral { background: #eeeeef; color: #6b7280; }

.primary-text { color: #0e2238; }
.success-text { color: #10b981; }
.warning-text { color: #f4b400; }
.danger-text { color: #ef4444; }
.neutral-text { color: #6b7280; }

.actions {
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 10px 0 26px 0;
}

.select {
  height: 42px;
  width: 12rem;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid #d9dee7;
  background: #fff;
  font-size: 15px;
  color: #0e2238;
}

.btn {
  height: 42px;
  padding: 0 16px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  border: none;
}

.btn-outline {
  background: #fff;
  border: 1px solid #d9dee7;
  color: #0e2238;
}

.btn-primary {
  background: #0e2238;
  color: #fff;
}

.table-box {
  background: #fff;
  border: 1px solid #dde3eb;
  border-radius: 18px;
  padding: 22px;
  margin-top: 10px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
}

.table-header h2 {
  margin: 0;
  font-size: 24px;
  color: #0e2238;
}

.table-header p {
  margin: 6px 0 18px;
  font-size: 15px;
  color: #5c667a;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 14px;
  font-size: 15px;
  text-align: left;
}

.table th {
  font-weight: 600;
  color: #0e2238;
}

.table td {
  border-bottom: 1px solid #e8edf3;
  color: #1f2937;
}

.table tbody tr:hover {
  background: #fafbfc;
}

@media (max-width: 1200px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .cards {
    grid-template-columns: 1fr;
  }

  .table-box {
    overflow-x: auto;
  }

  .table {
    min-width: 650px;
  }
}
</style>