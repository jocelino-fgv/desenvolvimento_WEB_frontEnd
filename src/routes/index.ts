// ***Passo 2**  - Criação da pasta routes em src e confs e imports do roteador 
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Principal from '../pages/Principal.vue';
import Profile from '../pages/Profile.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'principal',
        component: Principal
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile
    },    
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;