<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useTarefasStore } from '@/stores/tarefas'

const store = useTarefasStore()

const novoTitulo = ref('')
const novaDescricao = ref('')

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

  novoTitulo.value = ''
  novaDescricao.value = ''

</script>

<template>
  <div class="todo-page">
    <h2>📋 Minhas Tarefas</h2>

    <p v-if="store.carregando">Carregando tarefas...</p>

    <p v-else-if="store.erro" class="erro">{{ store.erro }}</p>

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
          placeholder="Descrição"
        />
        <button type="submit">➕ Adicionar</button>
      </form>

      <ul>
        <li v-for="tarefa in store.tarefas" :key="tarefa.id">
          <span :class="{ concluida: tarefa.completed }">
            {{ tarefa.title }}
          
          <button @click="store.removerTarefa(tarefa.id)">
            🗑️ Excluir
          </button>
          </span>
          
          <ul>
            <li v-for="atividade in tarefa.atividades" :key="atividade.id">
              <span :class="{ concluida: tarefa.completed }">
                {{ atividade.texto }}
              </span>
          <button @click="store.marcarComoConcluida(tarefa.id)">
            {{ tarefa.completed ? '↩️ Desfazer' : '✅ Concluir' }}
          </button>
                    <button @click="store.removerTarefa(tarefa.id)">
            🗑️ Excluir
          </button>

            </li>

          </ul>
          


        </li>
      </ul>

    </div>
  </div>
</template>

<style scoped>
.form-nova-tarefa {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.concluida {
  text-decoration: line-through;
  opacity: 0.6;
}

.erro {
  color: red;
}
</style>