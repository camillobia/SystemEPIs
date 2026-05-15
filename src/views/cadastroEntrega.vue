<template>
  <header_2 />

  <div class="page">
    <div class="container">

      <div class="header-title">
        <h1 class="title">Relatórios de Entregas</h1>
      </div>

      

      <div class="top-actions">

        <div class="buttons">
          <button class="btn btn-primary" @click="openCreate">
            <UserPlus class="icon" />
            Nova Entrega
          </button>

          <button class="btn btn-outline" @click="refreshList">
            <RefreshCcw class="icon" />
            Atualizar
          </button>
        </div>

        <div class="filters">

          <div class="search-box">
            <input
              v-model="searchTerm"
              placeholder="Buscar funcionário ou EPI..."
            />
          </div>

          <select class="select-filter" v-model="dateFilter">
            <option>Últimos 7 dias</option>
            <option>Últimos 30 dias</option>
            <option>Últimos 90 dias</option>
          </select>

          <button class="btn btn-outline">
            Exportar
          </button>

        </div>

      </div>

      <div class="table-box">

        <div class="table-header-dark">
          <h2>Listagem de Entregas</h2>
        </div>

        <div class="table-wrapper">

          <table class="table">

            <thead>
              <tr>
                <th>FUNCIONÁRIO</th>
                <th>EPI</th>
                <th>DATA ENTREGA</th>
                <th>QUANTIDADE</th>
                <th>AÇÕES</th>
              </tr>
            </thead>

            <tbody>

              <tr
                v-for="entrega in filteredEntregas"
                :key="entrega.id"
              >
                <td class="name-cell">
                  {{ entrega.funcionario }}
                </td>

                <td class="epi-cell">
                  {{ entrega.epi }}
                </td>

                <td>
                  {{ entrega.data }}
                </td>

                <td>
                  <span class="quantity-badge">
                    {{ entrega.quantidade }}
                  </span>
                </td>

                <td class="actions-cell">

                  <div class="menu-wrapper">

                    <button
                      class="dots"
                      @click="toggleMenu(entrega.id)"
                    >
                      ⋮
                    </button>

                    <div
                      v-if="openMenuId === entrega.id"
                      class="dropdown"
                    >
                      <button @click="editEntrega(entrega)">
                        Editar
                      </button>

                      <button
                        class="danger"
                        @click="deleteEntrega(entrega.id)"
                      >
                        Excluir
                      </button>
                    </div>

                  </div>

                </td>

              </tr>

              <tr v-if="filteredEntregas.length === 0">
                <td colspan="5" class="empty-state">
                  Nenhuma entrega encontrada
                </td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>

    <div v-if="openDialog" class="modal-overlay">

      <div class="modal">

        <div class="modal-header">

          <h3>
            {{ editing ? 'Editar Entrega' : 'Nova Entrega' }}
          </h3>

          <button @click="closeDialog">
            ✕
          </button>

        </div>

        <div class="form">

          <div class="grid">

            <div>
              <label>Funcionário</label>
              <select v-model="form.funcionarioId">
                <option value="" disabled>Selecione um funcionário</option>
                <option
                  v-for="func in _funcionarios"
                  :key="func.id"
                  :value="func.id"
                >
                  {{ func.nome }}
                </option>
              </select>
            </div>

            <div>
              <label>EPI</label>
              <select v-model="form.epiId">
                <option value="" disabled>Selecione um EPI</option>
                <option
                  v-for="item in _epis"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.nome }} (disponível: {{ item.quantidade }})
                </option>
              </select>
              <div v-if="selectedEpi" class="info-text">
                Disponível: {{ selectedEpi.quantidade }} unidades
              </div>
            </div>

          </div>

          <div class="grid">

            <div>
              <label>Data da Entrega</label>

              <input
                type="date"
                v-model="form.data"
              />
            </div>

            <div>
              <label>Quantidade</label>

              <input
                type="number"
                v-model="form.quantidade"
              />
            </div>

          </div>

        </div>

        <div class="modal-actions">

          <button
            class="btn btn-outline"
            @click="closeDialog"
          >
            Cancelar
          </button>

          <button
            class="btn btn-primary"
            @click="saveEntrega"
          >
            Salvar
          </button>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../composable/useSupabase'
import header_2 from '../components/header_2.vue'
import { UserPlus, RefreshCcw } from 'lucide-vue-next'

const searchTerm = ref('')
const dateFilter = ref('Últimos 30 dias')

const openDialog = ref(false)
const openMenuId = ref(null)

const editing = ref(false)
const editId = ref(null)

const entregas = ref([])

const _funcionarios = ref([])
const _epis = ref([])

onMounted(async () => {
  const { data: fdata, error: ferr } = await supabase.from('funcionario').select('*')
  if (ferr) console.error('Erro ao buscar funcionários', ferr)
  _funcionarios.value = (fdata || []).map(f => ({
    id: f.id_funcionario ?? f.Id_funcionario,
    nome: f.nome_funcionario ?? f.Nome_funcionario ?? '',
    email: f.email_funcionario ?? f.Email_funcionario ?? '',
    turno: f.turno_funcionario ?? f.Turno_funcionario ?? ''
  }))

  const { data: edata, error: eerr } = await supabase.from('epi').select('*')
  if (eerr) console.error('Erro ao buscar EPIs', eerr)
  _epis.value = (edata || []).map(e => ({
    id: e.id_epis ?? e.Id_epis,
    nome: e.nome_epis ?? e.Nome_epis ?? '',
    ca: e.ca_epis ?? e.CA_epis ?? null,
    quantidade: e.qtd_epis ?? e.Qtd_epis ?? 0,
    categoria: e.categoria_epis ?? e.Categoria_epis ?? ''
  }))

  const { data: entregasData, error: entregErr } = await supabase.from('entrega').select('*')
  if (entregErr) {
    console.error('Erro ao buscar entregas', entregErr)
    return
  }
  entregas.value = (entregasData || []).map(it => ({
    id: it.id_entrega ?? it.Id_entrega,
    funcionarioId: it.id_funcionario ?? it.Id_funcionario,
    epiId: it.id_epi,
    funcionario: (_funcionarios.value.find(f => f.id === (it.id_funcionario ?? it.Id_funcionario)) || {}).nome || String(it.id_funcionario ?? it.Id_funcionario),
    epi: (_epis.value.find(e => e.id === it.id_epi) || {}).nome || String(it.id_epi),
    data: it.dt_entrega ? new Date(it.dt_entrega).toLocaleDateString() : '',
    quantidade: it.quantidade || 1,
    status: it.dt_devolucao ? 'Devolvido' : 'Entregue'
  }))
})

const form = ref({
  funcionarioId: '',
  epiId: '',
  funcionario: '',
  epi: '',
  data: '',
  quantidade: 1,
  status: 'Entregue'
})

const filteredEntregas = computed(() => {
  return entregas.value.filter(item =>
    item.funcionario
      .toLowerCase()
      .includes(searchTerm.value.toLowerCase()) ||

    item.epi
      .toLowerCase()
      .includes(searchTerm.value.toLowerCase())
  )
})

const selectedEpi = computed(() => {
  return _epis.value.find(e => e.id === form.value.epiId)
})

const entregasPendentes = computed(() => {
  return entregas.value.filter(
    e => e.status === 'Pendente'
  ).length
})

const entregasRealizadas = computed(() => {
  return entregas.value.filter(
    e => e.status === 'Entregue'
  ).length
})

function openCreate() {
  editing.value = false

  form.value = {
    funcionario: '',
    epi: '',
    data: '',
    quantidade: 1,
    status: 'Entregue'
  }

  openDialog.value = true
}

function closeDialog() {
  openDialog.value = false
}

async function saveEntrega() {
  const funcionario = _funcionarios.value.find(f => f.id === form.value.funcionarioId)
  const epi = _epis.value.find(e => e.id === form.value.epiId)
  const quantValue = parseInt(form.value.quantidade, 10)

  if (!funcionario) {
    console.error('Selecione um funcionário válido')
    return
  }

  if (!epi) {
    console.error('Selecione um EPI válido')
    return
  }

  if (Number.isNaN(quantValue) || quantValue <= 0) {
    console.error('Quantidade deve ser maior que zero')
    return
  }

  const available = epi.quantidade
  if (quantValue > available) {
    console.error('Quantidade solicitada maior que o disponível')
    return
  }

  if (editing.value) {
    const currentEntrega = entregas.value.find(e => e.id === editId.value)
    const quantityDelta = quantValue - (currentEntrega?.quantidade || 0)
    const newStock = epi.quantidade - quantityDelta

    if (newStock < 0) {
      console.error('Não há EPI suficiente para essa alteração')
      return
    }

    const { data, error } = await supabase.from('entrega')
      .update({
        id_funcionario: funcionario.id,
        id_epi: epi.id,
        dt_entrega: form.value.data,
        quantidade: quantValue
      })
      .eq('id_entrega', editId.value)
      .select()

    if (error) {
      console.error('Erro ao atualizar entrega', error)
      return
    }

    if (quantityDelta !== 0) {
      await supabase.from('epi')
        .update({ qtd_epis: newStock })
        .eq('id_epis', epi.id)

      const epiIndex = _epis.value.findIndex(item => item.id === epi.id)
      if (epiIndex !== -1) {
        _epis.value[epiIndex].quantidade = newStock
      }
    }

    entregas.value = entregas.value.map(e =>
      e.id === editId.value
        ? {
            ...e,
            funcionarioId: funcionario.id,
            epiId: epi.id,
            funcionario: funcionario.nome,
            epi: epi.nome,
            data: form.value.data ? new Date(form.value.data).toLocaleDateString() : e.data,
            quantidade: quantValue
          }
        : e
    )
  } else {
    const insertObj = {
      id_funcionario: funcionario.id,
      id_epi: epi.id,
      dt_entrega: form.value.data,
      dt_devolucao: null,
      assinatura: false,
      observacao: null,
      quantidade: quantValue
    }

    const { data, error } = await supabase.from('entrega').insert([insertObj]).select()
    if (error) {
      console.error('Erro ao inserir entrega', error)
      return
    }

    const it = data[0]
    entregas.value.push({
      id: it.id_entrega,
      funcionarioId: funcionario.id,
      epiId: epi.id,
      funcionario: funcionario.nome,
      epi: epi.nome,
      data: it.dt_entrega ? new Date(it.dt_entrega).toLocaleDateString() : form.value.data,
      quantidade: quantValue,
      status: 'Entregue'
    })

    await supabase.from('epi')
      .update({ qtd_epis: available - quantValue })
      .eq('id_epis', epi.id)

    const epiIndex = _epis.value.findIndex(item => item.id === epi.id)
    if (epiIndex !== -1) {
      _epis.value[epiIndex].quantidade = available - quantValue
    }
  }

  closeDialog()
}

function editEntrega(entrega) {
  editing.value = true

  editId.value = entrega.id

  form.value = {
    funcionarioId: entrega.funcionarioId,
    epiId: entrega.epiId,
    funcionario: entrega.funcionario,
    epi: entrega.epi,
    data: entrega.data ? new Date(entrega.data.split('/').reverse().join('-')).toISOString().slice(0, 10) : '',
    quantidade: entrega.quantidade,
    status: entrega.status
  }

  openDialog.value = true

  openMenuId.value = null
}

async function deleteEntrega(id) {
  const entrega = entregas.value.find(e => e.id === id)
  if (!entrega) return

  const { error } = await supabase.from('entrega').delete().eq('id_entrega', id)
  if (error) {
    console.error('Erro ao deletar entrega', error)
    return
  }

  const epi = _epis.value.find(item => item.id === entrega.epiId)
  if (epi) {
    const newStock = epi.quantidade + entrega.quantidade
    await supabase.from('epi').update({ qtd_epis: newStock }).eq('id_epis', epi.id)
    epi.quantidade = newStock
  }

  entregas.value = entregas.value.filter(e => e.id !== id)
  openMenuId.value = null
}

function toggleMenu(id) {
  openMenuId.value =
    openMenuId.value === id
      ? null
      : id
}

function refreshList() {
  entregas.value = [...entregas.value]
}
</script>

<style scoped>

*{
  box-sizing:border-box;
  margin:0;
  padding:0;
}

.page{
  min-height:100vh;
  background:#eef2f7;
  padding: 30px;
  font-family:'Inter',sans-serif;
}

.container{
  max-width:1400px;
  margin:0 auto;
}

.header-title{
  margin-bottom:30px;
}

.title {
  font-size: 2.4rem;
  font-weight: 700;
  color: #0f172a;
}


.top-actions{
  display:flex;
  flex-direction:column;
  gap:18px;
  margin-bottom:24px;
}

.buttons{
  display:flex;
  gap:12px;
}

.filters{
  display:flex;
  gap:12px;
  align-items:center;
  flex-wrap:wrap;
}

.search-box{
  width:350px;
}

.search-box input{
  width:100%;
  height:50px;
  border-radius:14px;
  border:1px solid #dbe2ea;
  padding:0 16px;
  font-size:15px;
  outline:none;
  background:white;
}

.select-filter{
  height:50px;
  border-radius:14px;
  border:1px solid #dbe2ea;
  padding:0 16px;
  background:white;
  font-size:15px;
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


.btn:hover{
  transform:translateY(-1px);
}

.btn-primary{
  background:#0f172a;
  color:white;
}

.btn-outline{
  background-color:white;
  border:1px solid #dbe2ea;
  color:#0f172a;
}

.icon{
  width:20px;
  height:20px;
}

.table-box{
  background:white;
  border-radius:22px;
  overflow:hidden;
  box-shadow:0 4px 20px rgba(0,0,0,.04);
}

.table-header-dark{
  background:#0f172a;
  padding:22px;
}

.table-header-dark h2 {
  color: white;
  font-size: 1.25rem;
  font-weight: 500;
 font-family: 'Inter', sans-serif;
}


.table{
  width:100%;
  border-collapse:collapse;
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


.table td{
  padding:18px;
  border-top:1px solid #eef2f7;
  font-size:15px;
}

.name-cell{
  font-weight:600;
}

.epi-cell{
  color:#475569;
}

.quantity-badge{
  background:#dbeafe;
  color:#1d4ed8;
  padding:6px 14px;
  border-radius:10px;
  font-weight:600;
}

.actions-cell{
  position:relative;
}

.dots{
  background:none;
  border:none;
  font-size:22px;
  cursor:pointer;
}

.menu-wrapper{
  position:relative;
}

.dropdown{
  position:absolute;
  top:30px;
  right:0;
  background:white;
  border:1px solid #e5e7eb;
  border-radius:12px;
  min-width:130px;
  overflow:hidden;
  z-index:20;
  box-shadow:0 6px 20px rgba(0,0,0,.08);
}

.dropdown button{
  width:100%;
  padding:12px;
  border:none;
  background:none;
  text-align:left;
  cursor:pointer;
}

.dropdown button:hover{
  background:#f3f4f6;
}

.danger{
  color:#ef4444;
}

.empty-state{
  text-align:center;
  padding:40px;
  color:#64748b;
}

.modal-overlay{
  position:fixed;
  inset:0;
  background:rgba(0,0,0,.5);
  display:flex;
  justify-content:center;
  align-items:center;
  z-index:100;
}

.modal{
  width:560px;
  max-width:95%;
  background:white;
  border-radius:20px;
  padding:24px;
}

.modal-header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:24px;
}

.modal-header h3{
  font-size:1.2rem;
  color:#0f172a;
}

.modal-header button{
  background:none;
  border:none;
  font-size:20px;
  cursor:pointer;
}

.form{
  display:flex;
  flex-direction:column;
  gap:18px;
}

.grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:14px;
}

label{
  display:block;
  margin-bottom:8px;
  font-size:14px;
  color:#334155;
}

input{
  width:100%;
  height:48px;
  border-radius:12px;
  border:1px solid #dbe2ea;
  padding:0 12px;
  outline:none;
}

.modal-actions{
  display:flex;
  justify-content:flex-end;
  gap:12px;
  margin-top:28px;
}

@media(max-width:900px){

  .cards{
    grid-template-columns:1fr;
  }

  .filters{
    flex-direction:column;
    align-items:stretch;
  }

  .search-box{
    width:100%;
  }

  .grid{
    grid-template-columns:1fr;
  }

}
</style>