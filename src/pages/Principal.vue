<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { useTarefasStore } from '@/stores/tarefas'

const store = useTarefasStore()

const novoTitulo = ref('')
const novaDescricao = ref('')
const novasAtividades = reactive<Record<string, string>>({})

onMounted(() => {
  store.buscarTarefas()
})

async function handleAdicionarTarefa() {
  if (!novoTitulo.value.trim()) return

  await store.adicionarTarefa({
    title: novoTitulo.value,
    description: novaDescricao.value,
    completed: false,
    atividades: []
  })

  novoTitulo.value = ''
  novaDescricao.value = ''
}

async function handleAdicionarAtividade(tarefaId: string) {
  const texto = novasAtividades[tarefaId]
  if (!texto || !texto.trim()) return

  await store.adicionarAtividade(tarefaId, texto)
  novasAtividades[tarefaId] = ''
}
</script>

<template>
  <div class="todo-page">
    <header class="page-header">
      <h1>Minhas Tarefas</h1>
      <p class="subtitle" v-if="!store.carregando && !store.erro">
        {{ store.tarefasPendentes }} pendente(s) · {{ store.tarefasConcluidas }} concluída(s)
      </p>
    </header>

    <p v-if="store.carregando" class="status">Carregando tarefas...</p>
    <p v-else-if="store.erro" class="status erro">{{ store.erro }}</p>

    <div v-else>
      <form @submit.prevent="handleAdicionarTarefa" class="form-nova-tarefa">
        <input
          v-model="novoTitulo"
          type="text"
          placeholder="Título da tarefa"
          required
        />
        <input
          v-model="novaDescricao"
          type="text"
          placeholder="Descrição (opcional)"
        />
        <button type="submit" class="btn btn-primary">Adicionar</button>
      </form>

      <p v-if="store.tarefas.length === 0" class="empty-state">
        Nenhuma tarefa ainda. Crie a primeira acima.
      </p>

      <ul class="tarefas-lista">
        <li v-for="tarefa in store.tarefas" :key="tarefa.id" class="tarefa-card">
          <div class="tarefa-header">
            <span class="tarefa-titulo" :class="{ concluida: tarefa.completed }">
              {{ tarefa.title }}
            </span>
            <button
              class="btn-icon"
              title="Excluir tarefa"
              @click="store.removerTarefa(tarefa.id)"
            >
              🗑️
            </button>
          </div>

          <ul class="atividades-lista">
            <li v-for="atividade in tarefa.atividades" :key="atividade.id" class="atividade-item">
              <label class="atividade-checkbox">
                <input
                  type="checkbox"
                  :checked="atividade.concluida"
                  @change="store.marcarAtividadeConcluida(tarefa.id, atividade.id)"
                />
                <span :class="{ concluida: atividade.concluida }">
                  {{ atividade.texto }}
                </span>
              </label>
              <button
                class="btn-icon btn-icon-sm"
                title="Excluir atividade"
                @click="store.removerAtividade(tarefa.id, atividade.id)"
              >
                ✕
              </button>
            </li>
          </ul>

          <div class="nova-atividade">
            <input
              v-model="novasAtividades[tarefa.id]"
              placeholder="Nova atividade"
              @keyup.enter="handleAdicionarAtividade(tarefa.id)"
            />
            <button class="btn btn-secondary" @click="handleAdicionarAtividade(tarefa.id)">
              + Atividade
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.todo-page {
  --accent: #6d5efc;
  --accent-light: #efedff;
  --text: #1f2430;
  --text-muted: #767c8c;
  --border: #e6e7ec;
  --bg-card: #ffffff;
  --radius: 14px;

  max-width: 640px;
  margin: 0 auto;
  padding: 40px 20px 80px;
  font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
  color: var(--text);
}

.page-header {
  margin-bottom: 28px;
}

.page-header h1 {
  font-size: 1.9rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0;
}

.subtitle {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-top: 4px;
}

.status {
  color: var(--text-muted);
  padding: 24px 0;
}

.status.erro {
  color: #d1435b;
}

.form-nova-tarefa {
  display: flex;
  gap: 8px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.form-nova-tarefa input {
  flex: 1;
  min-width: 140px;
}

input {
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 0.92rem;
  background: var(--bg-card);
  color: var(--text);
  outline: none;
  transition: border-color 0.15s ease;
}

input:focus {
  border-color: var(--accent);
}

.btn {
  border: none;
  border-radius: 10px;
  padding: 10px 18px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.1s ease, opacity 0.15s ease;
}

.btn:active {
  transform: scale(0.97);
}

.btn-primary {
  background: var(--accent);
  color: white;
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-secondary {
  background: var(--accent-light);
  color: var(--accent);
}

.btn-secondary:hover {
  opacity: 0.85;
}

.empty-state {
  color: var(--text-muted);
  text-align: center;
  padding: 40px 0;
  border: 1px dashed var(--border);
  border-radius: var(--radius);
}

.tarefas-lista {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.tarefa-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 18px 20px;
  box-shadow: 0 1px 2px rgba(20, 20, 43, 0.03);
}

.tarefa-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.tarefa-titulo {
  font-weight: 600;
  font-size: 1.02rem;
}

.concluida {
  text-decoration: line-through;
  color: var(--text-muted);
  opacity: 0.7;
}

.btn-icon {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
  line-height: 1;
  padding: 6px;
  border-radius: 8px;
  opacity: 0.55;
  transition: opacity 0.15s ease, background 0.15s ease;
}

.btn-icon:hover {
  opacity: 1;
  background: var(--accent-light);
}

.btn-icon-sm {
  font-size: 0.75rem;
}

.atividades-lista {
  list-style: none;
  padding: 0;
  margin: 12px 0 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.atividade-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  border-radius: 8px;
}

.atividade-item:hover {
  background: #fafafc;
}

.atividade-checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.88rem;
  cursor: pointer;
}

.atividade-checkbox input[type='checkbox'] {
  accent-color: var(--accent);
  width: 16px;
  height: 16px;
  padding: 0;
}

.nova-atividade {
  display: flex;
  gap: 8px;
  margin-top: 14px;
}

.nova-atividade input {
  flex: 1;
  font-size: 0.85rem;
  padding: 8px 12px;
}

.nova-atividade .btn {
  padding: 8px 14px;
  font-size: 0.82rem;
  white-space: nowrap;
}
</style>