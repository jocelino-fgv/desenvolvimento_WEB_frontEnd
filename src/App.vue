    <!-- //***Passo 3*** Rotas: criar router-link -->
<script setup lang="ts">
</script>

<template>
  <div id="app">

    <nav>
      <router-link to="/"> Principal</router-link> |
      <router-link to="profile"> Perfil</router-link> |

    </nav>  
    <router-view />
  </div>
  
</template>
