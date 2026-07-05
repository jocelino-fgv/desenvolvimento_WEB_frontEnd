import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from './routes' // ***Passo 1*** - Criação Rotas
const app = createApp(App) // Passo 1 - Criação Rotas
app.use(router) // Passo 1 - Criação Rotas
app.mount('#app') // Passo 1 - Criação Rotas