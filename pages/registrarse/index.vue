<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
const { $toast } = useNuxtApp();

const authStore = useAuthStore();


const credentials = {
  username: '',
  email: '',
  password: ''
}
async function registrarUsuarioNuevo() {
  const baseApiUrl = await useRuntimeConfig().public.BaseApiUrl;
  const respRegistro = await useFetch(baseApiUrl + "users/new/", {
    method: 'post',
    body: credentials
  })
    console.log(respRegistro.error.value)
  if (respRegistro.error.value) {
    if (respRegistro.error.value.data.error == true) {
      const respError = respRegistro.error.value.data.errorMsg.join(', ');
      $toast.error(respError);
      return false;
    } else {
      $toast.error("Error intente mas tarde.");
      return false;
    }
  }
  if (respRegistro.data.value) {
        console.log("respuesta signin")
        console.log(respRegistro.data.value)
        $toast.success("Usuario registrado satisfactoriamente.");
        setTimeout(() => { goToHomePage() }, 1000);

  }

}

async function goToHomePage() {
  await navigateTo('/')
}

</script>
<template>
  <div class="grid grid-cols-1 h-[100vh] min-w-full place-items-center px-6 py-12 lg:px-8">
    <div>
      <div class="sm:mx-auto sm:w-full sm:max-w-sm ">
        <img class="mx-auto h-10 w-50 w-auto" src="@/assets/logo.png" alt="TodoLegal" />
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Registro Nuevo Usuario </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" @submit.prevent="registrarUsuarioNuevo">
            <div>
            <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Usuario:</label>
            <div class="mt-2">
              <input id="username" name="username" v-model="credentials.username" type="text" autocomplete="username"
                required="true"
                class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email:</label>
            <div class="mt-2">
              <input id="email" name="email" v-model="credentials.email" type="email" autocomplete="email"
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
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

