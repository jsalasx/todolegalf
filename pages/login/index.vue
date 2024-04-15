<template>
  <div class="grid grid-cols-1 h-[100vh] min-w-full place-items-center px-6 py-12 lg:px-8">
    <div>
      <div class="sm:mx-auto sm:w-full sm:max-w-sm ">
        <img class="mx-auto h-10 w-50 w-auto" src="@/assets/logo.png" alt="TodoLegal" />
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Ingresa los
          datos de tu cuenta </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" @submit.prevent="login">
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email:</label>
            <div class="mt-2">
              <input id="email" name="email" v-model="credentials.email" type="text" autocomplete="email"
                required="true"
                class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
              <!-- <div class="text-sm">
                    <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                    </div> -->
            </div>
            <div class="mt-2">
              <input id="password" name="password" type="password" v-model="credentials.password"
                autocomplete="current-password" required="true"
                class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <button type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
              in</button>
          </div>
        </form>

        <p class="mt-10 text-center text-sm text-gray-500">
          No eres miembro ?
          {{ ' ' }}
          <button @click="goToRegistro" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Registrate
            aquí</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
const { $toast } = useNuxtApp();

const authStore = useAuthStore();

const apiURL =  useRuntimeConfig().public.BaseApiUrl;

const credentials = {
  email: '',
  password: ''
}
async function login() {
  const baseApiUrl = useRuntimeConfig().public.BaseApiUrl;
  const respLogin = await useFetch(baseApiUrl + "login/", {
    method: 'post',
    body: credentials
  })
  if (respLogin.error.value) {
    if (respLogin.error.value.data.error == true) {
      const respError = respLogin.error.value.data.errorMsg.join(', ');
      $toast.error(respError);
      return false;
    } else {
      $toast.error("Error intente mas tarde.");
      return false;
    }
  }
  if (respLogin.data.value) {
    const res = respLogin.data.value;
    const accessTokenRequest = {
      username: res.data.username,
      password: credentials.password
    }
    const respToken = await useFetch(baseApiUrl + "api/token/", {
      method: 'post',
      body: accessTokenRequest
    })

    if (respToken.error.value) {
      $toast.error("Error al obtener el token de autorizacion");
      return false;
    }

    if (respToken.data.value) {
      authStore.setToken(respToken.data.value.access);
      goToHomePage();
    }
  }
}

async function goToHomePage() {
  await navigateTo('/')
}
async function goToRegistro() {
  await navigateTo('/registrarse')
}
</script>