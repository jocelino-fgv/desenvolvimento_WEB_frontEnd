import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue' //***Passo 9 - Instaçaõ  e ligar o Pinia no vue 

import router from './routes' // ***Passo 1*** - Criação Rotas
const app = createApp(App) // Passo 1 - Criação Rotas
app.use(createPinia())  //***Passo 9 - Instaçaõ  e ligar o Pinia no vue 
app.use(router) // Passo 1 - Criação Rotas
app.mount('#app') // Passo 1 - Criação Rotas
