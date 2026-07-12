export interface Tarefa {
  id: string
  title: string
  description: string
  completed: boolean
  atividades: Atividade[]
  updatedAt: string
}


export interface Atividade {
  id: string
  texto: string
  concluida: boolean
}

