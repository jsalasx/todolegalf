<script setup lang="ts">
import UserService from '~/services/UserService';

  const accessToken = await localStorage.getItem('accessToken');
  const refreshToken = await localStorage.getItem('refreshToken');
  console.log("ACCCESS")
  console.log(accessToken)
  if (accessToken) {
    const isLogged = await UserService.getUserByToken(accessToken)
    console.log(isLogged)
    if (!isLogged) {
      console.log("r1")
      await navigateTo('/login')
    }
  } else {
    console.log("r2")
    await navigateTo('/login')
  }

</script>
<template>
 <h1>Home Works 11</h1>
</template>

