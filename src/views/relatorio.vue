<template>
  <div class="page">
    <div class="container">
      <div class="header">
        <div>
          <h1 class="title">Relatórios de EPIs</h1>
          <p class="subtitle">
            Gestão e controle de Equipamentos de Proteção Individual
          </p>
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
      </div>

      <div class="cards">
        <div class="card">
          <div class="card-top">
            <span class="card-title">EPIs Vencidos</span>
            <span class="icon-box danger">⚠</span>
          </div>
          <div class="card-value danger-text">14</div>
          <div class="card-change danger-text">↓ -12.5% vs mês anterior</div>
        </div>

        <div class="card">
          <div class="card-top">
            <span class="card-title">Próximos ao Vencimento</span>
            <span class="icon-box warning">◔</span>
          </div>
          <div class="card-value warning-text">40</div>
          <div class="card-change success-text">↑ +5.2% vs mês anterior</div>
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
          <div class="card-change success-text">↑ +15.8% vs mês anterior</div>
        </div>

        <div class="card">
          <div class="card-top">
            <span class="card-title">Para Descarte</span>
            <span class="icon-box neutral">🗑</span>
          </div>
          <div class="card-value neutral-text">152</div>
          <div class="card-change danger-text">↓ -8.3% vs mês anterior</div>
        </div>
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
  background: #f3f4f6;
  padding: 40px 24px;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.title {
  font-size: 42px;
  font-weight: 700;
  color: #17145c;
  margin: 0 0 10px;
}

.subtitle {
  margin: 0;
  font-size: 22px;
  color: #5c667a;
}

.actions {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.select {
  height: 52px;
  padding: 0 18px;
  border: 1px solid #d9dee7;
  border-radius: 14px;
  background: #fff;
  font-size: 18px;
  color: #17145c;
  outline: none;
}

.btn {
  height: 52px;
  padding: 0 22px;
  border-radius: 14px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;
  border: none;
}

.btn-outline {
  background: #fff;
  color: #17145c;
  border: 1px solid #d9dee7;
}

.btn-outline:hover {
  border-color: #17145c;
}

.btn-primary {
  background: #17145c;
  color: #fff;
}

.btn-primary:hover {
  background: #231d7a;
}

.cards {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 22px;
  margin-bottom: 34px;
}

.card {
  background: #fff;
  border: 1px solid #dde3eb;
  border-radius: 22px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 26px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #334155;
  line-height: 1.4;
}

.icon-box {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
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
  color: #17145c;
}

.success {
  background: #e7f8f1;
  color: #10b981;
}

.neutral {
  background: #eeeeef;
  color: #6b7280;
}

.card-value {
  font-size: 50px;
  line-height: 1;
  font-weight: 500;
  margin-bottom: 12px;
}

.card-change {
  font-size: 16px;
}

.primary-text {
  color: #17145c;
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

.table-box {
  background: #fff;
  border: 1px solid #dde3eb;
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05);
}

.table-header h2 {
  margin: 0 0 8px;
  color: #17145c;
  font-size: 34px;
}

.table-header p {
  margin: 0 0 24px;
  color: #5c667a;
  font-size: 20px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
}

.table thead tr {
  background: #f3f5f7;
}

.table th,
.table td {
  padding: 20px;
  text-align: left;
}

.table th {
  color: #17145c;
  font-size: 20px;
  font-weight: 700;
}

.table td {
  font-size: 18px;
  color: #1f2937;
  border-bottom: 1px solid #e8edf3;
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
    font-size: 30px;
  }

  .subtitle {
    font-size: 18px;
  }

  .cards {
    grid-template-columns: 1fr;
  }

  .table-box {
    overflow-x: auto;
  }

  .table {
    min-width: 700px;
  }
}
</style>