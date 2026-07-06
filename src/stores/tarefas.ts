import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Tarefa } from '@/types/Tarefa'
import api from '@/services/api'

export const useTarefasStore = defineStore('tarefas', () => {

  // STATE
  const tarefas = ref<Tarefa[]>([])
  const carregando = ref<boolean>(false)
  const erro = ref<string | null>(null)

  // GETTERS
  const totalTarefas = computed(() => tarefas.value.length)
  const tarefasConcluidas = computed(() => tarefas.value.filter(t => t.completed).length)
  const tarefasPendentes = computed(() => tarefas.value.filter(t => !t.completed).length)

  // ACTIONS
  async function buscarTarefas() {
    carregando.value = true
    erro.value = null
    try {
      const response = await api.get<Tarefa[]>('/lista')
      tarefas.value = response.data
    } catch (e) {
      erro.value = 'Erro ao buscar tarefas. Tente novamente.'
      console.error(e)
    } finally {
      carregando.value = false
    }
  }

  async function adicionarTarefa(novaTarefa: Omit<Tarefa, 'id' | 'updatedAt'>) {
    carregando.value = true
    erro.value = null
    try {
      const tarefaCompleta: Omit<Tarefa, 'id'> = {
        ...novaTarefa,
        updatedAt: new Date().toISOString()
      }
      const response = await api.post<Tarefa>('/lista', tarefaCompleta)
      tarefas.value.push(response.data)
    } catch (e) {
      erro.value = 'Erro ao adicionar tarefa.'
      console.error(e)
    } finally {
      carregando.value = false
    }
  }

  async function marcarComoConcluida(id: string) {
    const tarefa = tarefas.value.find(t => t.id === id)
    if (!tarefa) return

    const statusAnterior = tarefa.completed
    tarefa.completed = !tarefa.completed

    try {
      await api.patch(`/lista/${id}`, {
        completed: tarefa.completed,
        updatedAt: new Date().toISOString()
      })
    } catch (e) {
      tarefa.completed = statusAnterior
      erro.value = 'Erro ao atualizar tarefa.'
      console.error(e)
    }
  }

  async function removerTarefa(id: string) {
    try {
      await api.delete(`/lista/${id}`)
      tarefas.value = tarefas.value.filter(t => t.id !== id)
    } catch (e) {
      erro.value = 'Erro ao remover tarefa.'
      console.error(e)
    }
  }

  return {
    tarefas,
    carregando,
    erro,
    totalTarefas,
    tarefasConcluidas,
    tarefasPendentes,
    buscarTarefas,
    adicionarTarefa,
    marcarComoConcluida,
    removerTarefa
  }
})