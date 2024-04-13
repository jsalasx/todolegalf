<script setup lang="ts">



// import UserService from '~/services/UserService';

// import { computed } from 'vue';
// import { useAuthStore } from '~/stores/auth';
// const authStore = useAuthStore();
// const accessToken = await computed( () => authStore.token)
// const refreshToken = await computed( () => authStore.refresh)
//   console.log("ACCCESS")
//   console.log(accessToken.value)
//   if (accessToken) {
//     const isLogged = await UserService.getUserByToken(accessToken.value)
//     console.log(isLogged)
//     if (!isLogged) {
//       console.log("r1")
//       await navigateTo('/login')
//     }
//   } else {
//     console.log("r2")
//     await navigateTo('/login')
//   }

</script>
<template>
  <h1>Hola</h1>
  <lista-tareas-component></lista-tareas-component>
</template>

