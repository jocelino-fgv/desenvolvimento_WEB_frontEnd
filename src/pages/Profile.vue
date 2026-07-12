<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTarefasStore } from '@/stores/tarefas'

const store = useTarefasStore()
const router = useRouter()

// Sem sistema de autenticação no projeto - dados fixos de usuário
const usuario = {
  nome: 'Jocelino',
  email: 'jocelino@example.com'
}

onMounted(() => {
  if (store.tarefas.length === 0) {
    store.buscarTarefas()
  }
})

function voltar() {
  router.push('/')
}
</script>

<template>
  <div class="profile-page">
    <header class="page-header">
      <h1>Meu Perfil</h1>
    </header>

    <section class="user-card">
      <div class="avatar">{{ usuario.nome.charAt(0) }}</div>
      <div class="user-info">
        <p class="user-nome">{{ usuario.nome }}</p>
        <p class="user-email">{{ usuario.email }}</p>
      </div>
    </section>

    <section class="stats-grid">
      <div class="stat-card">
        <span class="stat-valor">{{ store.totalTarefas }}</span>
        <span class="stat-label">Total</span>
      </div>
      <div class="stat-card">
        <span class="stat-valor">{{ store.tarefasConcluidas }}</span>
        <span class="stat-label">Concluídas</span>
      </div>
      <div class="stat-card">
        <span class="stat-valor">{{ store.tarefasPendentes }}</span>
        <span class="stat-label">Pendentes</span>
      </div>
    </section>

    <button class="btn btn-voltar" @click="voltar">← Voltar para tarefas</button>
  </div>
</template>

<style scoped>
.profile-page {
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

.page-header h1 {
  font-size: 1.9rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0 0 28px;
}

.user-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
  margin-bottom: 20px;
}

.avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--accent);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 700;
  flex-shrink: 0;
}

.user-nome {
  font-weight: 600;
  font-size: 1.05rem;
  margin: 0;
}

.user-email {
  color: var(--text-muted);
  font-size: 0.88rem;
  margin: 2px 0 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 28px;
}

.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 18px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-valor {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--accent);
}

.stat-label {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.btn {
  border: none;
  border-radius: 10px;
  padding: 10px 18px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s ease;
}

.btn-voltar {
  background: var(--accent-light);
  color: var(--accent);
}

.btn-voltar:hover {
  opacity: 0.85;
}
</style>