<template>
  <header_2 />
     <div class="page">
      <div class="container">
       <div class="header-title">
        <h1 class="title">Relatórios de EPIs</h1>
          </div>

      <div class="cards">
       <div class="card">
        <div class="card-top">
        <span class="card-title">EPIs Vencidos</span>
        <span class="icon-box danger">⚠</span>
         </div>

          <div class="card-value danger-text">
            {{ expiredCount }}
             </div>
              </div>

      <div class="card">
       <div class="card-top">
        <span class="card-title">Próximos ao Vencimento</span>

        <span class="icon-box warning">◔</span>
          </div>

          <div class="card-value warning-text">
            {{ expiringSoonCount }}
          </div>
        </div>

        <div class="card">
          <div class="card-top">
            <span class="card-title">Estoque Total</span>
            <span class="icon-box primary">◫</span>
          </div>

          <div class="card-value primary-text">
            {{ totalStock }}
          </div>
           </div>
            </div>

      <div class="actions">
       <div class="search-box">
        <input
          v-model="search"
          type="text"
          placeholder="Buscar por nome ou código do EPI..."/>
           </div>

        <select
          v-model="dateFilter"
          class="select">
          <option value="7">Próximos 7 dias</option>
          <option value="30">Próximos 30 dias</option>
          <option value="90">Próximos 90 dias</option>
          <option value="365">Próximo ano</option>
           </select>

        <button
          class="btn btn-outline"
          @click="loadInventory">
          Exportar
         </button>
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
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
             <tr
                v-for="item in filteredInventory"
                :key="item.id"
              >
                <td class="name-cell">
                  {{ item.nome }}
                </td>

                <td class="code-cell">
                  {{ item.id }}
                </td>

                <td>
                  {{ item.vencimento || 'Não informado' }}
                </td>

                <td>
                  <span class="quantity-badge">
                    {{ item.quantidade }}
                  </span>
                </td>

                <td>

                  <span
                    v-if="item.status === 'Vencido'"
                    class="status-danger"
                  >
                    Vencido
                  </span>

                  <span
                    v-else-if="item.status === 'Próximo ao vencimento'"
                    class="status-warning"
                  >
                    Próximo
                  </span>

                  <span
                    v-else
                    class="status-active"
                  >
                    Em dia
                  </span>

                </td>
              </tr>

              <tr v-if="filteredInventory.length === 0">
                <td
                  colspan="5"
                  class="empty-state"
                >
                  Nenhum EPI encontrado
                </td>
              </tr>

            </tbody>

          </table>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../composable/useSupabase'
import header_2 from '../components/header_2.vue'

const search = ref('')
const dateFilter = ref('30')
const inventoryList = ref([])

const expiredCount = computed(() => {
  const today = startOfDay(new Date())

  return inventoryList.value.filter(
    item =>
      item.expirationDate &&
      item.expirationDate < today
  ).length
})

const expiringSoonCount = computed(() => {
  const today = startOfDay(new Date())
  const limit = addDays(today, 30)

  return inventoryList.value.filter(
    item =>
      item.expirationDate &&
      item.expirationDate >= today &&
      item.expirationDate <= limit
  ).length
})

const totalStock = computed(() => {
  return inventoryList.value.reduce(
    (sum, item) => sum + item.quantidade,
    0
  )
})

const filteredInventory = computed(() => {
  const query = search.value.toLowerCase()

  let items = inventoryList.value.filter(
    item =>
      item.nome.toLowerCase().includes(query) ||
      item.id.toLowerCase().includes(query)
  )

  const days = Number(dateFilter.value)

  if (!Number.isNaN(days)) {
    const today = startOfDay(new Date())
    const limit = addDays(today, days)

    items = items.filter(item =>
      item.expirationDate
        ? item.expirationDate <= limit
        : true
    )
  }

  return items
})

onMounted(() => {
  loadInventory()
})

async function loadInventory() {
  const { data, error } = await supabase
    .from('epi')
    .select('*')

  if (error) {
    console.error('Erro ao buscar EPIs', error)
    return
  }

  inventoryList.value = (data || []).map(mapEpi)
}

function mapEpi(epi) {
  const id = String(
    epi.id_epis ??
    epi.Id_epis ??
    ''
  )

  const nome =
    epi.nome_epis ??
    epi.Nome_epis ??
    ''

  const quantidade = Number(
    epi.qtd_epis ?? 0
  )

  const validade =
    epi.data_val ??
    epi.data_validade ??
    epi.validade_epis ??
    epi.vencimento_epis ??
    null

  const expirationDate = parseDate(validade)

  let status = 'Em dia'

  if (expirationDate) {
    const today = startOfDay(new Date())
    const limit = addDays(today, 30)

    if (expirationDate < today) {
      status = 'Vencido'
    } else if (expirationDate <= limit) {
      status = 'Próximo ao vencimento'
    }
  }

  return {
    id,
    nome,
    quantidade,
    vencimento: expirationDate
      ? formatDate(expirationDate)
      : '',
    expirationDate,
    status
  }
}

function parseDate(value) {
  if (!value) return null

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  return startOfDay(date)
}

function formatDate(date) {
  const day = String(
    date.getDate()
  ).padStart(2, '0')

  const month = String(
    date.getMonth() + 1
  ).padStart(2, '0')

  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

function startOfDay(date) {
  const copy = new Date(date)

  copy.setHours(0, 0, 0, 0)

  return copy
}

function addDays(date, days) {
  const copy = new Date(date)

  copy.setDate(copy.getDate() + days)

  return copy
}
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
  padding: 20px;
}

.container {
  max-width: 1380px;
  margin: 0 auto;
}

.header-title {
  margin-bottom: 28px;
}

.title {
  font-size: 2.4rem;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  color: #0f172a;
}

.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-bottom: 24px;
}

.card {
  background: white;
  border-radius: 18px;
  padding: 20px;
  border: 1px solid #e2e8f0;
}

.card-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.card-title {
  font-size: 15px;
  font-family: 'Inter', sans-serif;
  color: #475569;
}

.card-value {
  font-size: 2rem;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
}

.icon-box {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.danger {
  background: #fee2e2;
}

.warning {
  background: #fef3c7;
}

.primary {
  background: #dbeafe;
}

.danger-text {
  color: #dc2626;
}

.warning-text {
  color: #d97706;
}

.primary-text {
  color: #2563eb;
}

.actions {
  display: flex;
  gap: 12px;
  margin-bottom: 22px;
  flex-wrap: wrap;
}

.search-box {
  width: 350px;
}

.search-box input {
  width: 100%;
  height: 50px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid #dbe2ea;
  outline: none;
}

.select {
  height: 50px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid #dbe2ea;
}

.btn {
  height: 50px;
  padding: 0 18px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 16px;
}

.btn-outline {
  background: #0e2238;
  border: 1px solid #dbe2ea;
  color: white;

}

.table-box {
  background: white;
  border-radius: 18px;
  overflow: hidden;
}

.table-header-dark {
  background: #0f172a;
  padding: 20px;
}

.table-header-dark h2 {
  color: white;
  font-family: 'Inter', sans-serif;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th {
  background: #f8fafc;
  padding: 16px;
  text-align: left;
  font-family: 'Inter', sans-serif;
}

.table td {
  padding: 16px;
  border-top: 1px solid #eef2f7;
  font-family: 'Inter', sans-serif;
}

.name-cell {
  font-weight: 600;
}

.code-cell {
  color: #475569;
}

.quantity-badge {
  background: #dbeafe;
  color: #1e3a8a;
  padding: 7px 12px;
  border-radius: 8px;
  font-weight: 700;
}

.status-active {
  background: #dcfce7;
  color: #166534;
  padding: 7px 12px;
  border-radius: 10px;
}

.status-warning {
  background: #fef3c7;
  color: #92400e;
  padding: 7px 12px;
  border-radius: 10px;
}

.status-danger {
  background: #fee2e2;
  color: #991b1b;
  padding: 7px 12px;
  border-radius: 10px;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #64748b;
}

@media (max-width: 768px) {

  .cards {
    grid-template-columns: 1fr;
  }

  .actions {
    flex-direction: column;
  }

  .search-box {
    width: 100%;
  }

}
</style>