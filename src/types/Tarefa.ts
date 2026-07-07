export interface Tarefa {
  id: string
  title: string
  completed: boolean
  atividades: Atividade[]
}


export interface Atividade {
  id: string
  texto: string
  concluida: boolean
}

