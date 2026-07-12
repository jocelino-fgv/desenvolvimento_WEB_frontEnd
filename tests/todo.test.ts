import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTarefasStore } from '@/stores/tarefas'
import api from '@/services/api'


vi.mock('@/services/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn()
  }
}))

describe('store de tarefas (useTarefasStore)', () => {
  beforeEach(() => {

    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('lista as tarefas vindas da API (buscarTarefas)', async () => {
    const tarefasMock = [
      { id: '1', title: 'Estudar APIs REST', description: '', completed: false, atividades: [], updatedAt: '2026-01-01T00:00:00.000Z' }
    ]
    vi.mocked(api.get).mockResolvedValue({ data: tarefasMock })

    const store = useTarefasStore()
    await store.buscarTarefas()

    expect(api.get).toHaveBeenCalledWith('/lista')
    expect(store.tarefas).toEqual(tarefasMock)
    expect(store.totalTarefas).toBe(1)
  })

  it('cria uma nova tarefa (adicionarTarefa)', async () => {
    const novaTarefa = {
      id: '2',
      title: 'Nova tarefa',
      description: 'Descrição de teste',
      completed: false,
      atividades: [],
      updatedAt: '2026-01-02T00:00:00.000Z'
    }
    vi.mocked(api.post).mockResolvedValue({ data: novaTarefa })

    const store = useTarefasStore()
    await store.adicionarTarefa({
      title: 'Nova tarefa',
      description: 'Descrição de teste',
      completed: false,
      atividades: []
    })

    expect(api.post).toHaveBeenCalledWith('/lista', expect.objectContaining({ title: 'Nova tarefa' }))
    expect(store.tarefas).toHaveLength(1)
    expect(store.tarefas[0].title).toBe('Nova tarefa')
  })

  it('marca uma tarefa como concluída (marcarTarefaConcluida)', async () => {
    const store = useTarefasStore()
    store.tarefas.push({
      id: '3',
      title: 'Tarefa pendente',
      description: '',
      completed: false,
      atividades: [],
      updatedAt: '2026-01-03T00:00:00.000Z'
    })
    vi.mocked(api.patch).mockResolvedValue({ data: {} })

    await store.marcarTarefaConcluida('3')

    expect(api.patch).toHaveBeenCalledWith('/lista/3', expect.objectContaining({ completed: true }))
    expect(store.tarefas[0].completed).toBe(true)
    expect(store.tarefasConcluidas).toBe(1)
  })

  it('remove uma tarefa (removerTarefa)', async () => {
    const store = useTarefasStore()
    store.tarefas.push({
      id: '4',
      title: 'Tarefa a remover',
      description: '',
      completed: false,
      atividades: [],
      updatedAt: '2026-01-04T00:00:00.000Z'
    })
    vi.mocked(api.delete).mockResolvedValue({ data: {} })

    await store.removerTarefa('4')

    expect(api.delete).toHaveBeenCalledWith('/lista/4')
    expect(store.tarefas).toHaveLength(0)
  })
})