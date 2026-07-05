<script setup>
import Principal from './pages/Principal.vue';
import Profile from './pages/Profile.vue';
</script>

<template>
  <div id="app">
    <!-- //***Passo 3*** Rotas: criar router-link -->
    <nav>
      <router-link to="/"> Principal</router-link> |
      <router-link to="profile"> Perfil</router-link> |

    </nav>  
    <router-view />
  </div>
  
</template>
