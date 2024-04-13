<template>
  <div class="grid grid-cols-1 h-[100vh] min-w-full place-items-center px-6 py-12 lg:px-8">
    <div>
      <div class="sm:mx-auto sm:w-full sm:max-w-sm ">
        <img class="mx-auto h-10 w-50 w-auto" src="@/assets/logo.png" alt="TodoLegal" />
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Ingresa los
          datos de tu cuenta</h2>
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
          <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Registrate
            aquí</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import type { ApiResponseI } from '../../interface/ApiResponseI';
import type { AccessTokenRequestI, BearerTokenI, LoginI, UserI } from '../../interface/UserI';
import axios from 'axios';
const { $toast } = useNuxtApp();

const authStore = useAuthStore();


const credentials = {
  email: '',
  password: ''
}
const apiUrl = "http://localhost:8000";

async function login() {
  const res = await ApiLogin()
  if (!res.error) {
    const accessTokenRequest = {
      username: res.data.username,
      password: credentials.password
    }
    const tokenData = await getAccessToken(accessTokenRequest)
    localStorage.setItem('accessToken', tokenData.access);
    localStorage.setItem('refreshToken', tokenData.refresh);
    console.log(res);
    if (res.data) {
      authStore.setToken('mi-token-secreto');
      goToHomePage();
    }
  } else {
    $toast.error(res.errorMsg.join(', '));
  }

}

async function ApiLogin(): Promise<ApiResponseI<UserI>> {
  const data: LoginI = credentials
  const dataUser: UserI = {
    id: 0,
    username: "",
    email: ""
  }
  let resp: ApiResponseI<UserI> = {
    error: false,
    errorMsg: [],
    data: dataUser
  }
  resp = await axios.post<ApiResponseI<UserI>>(apiUrl + "/login/", data)
    .then(response => {
      console.log(response.data)
      return response.data;
    })
    .catch(error => {
      console.error('Error en login:', error.response.data);
      return error.response.data;
    });
  return resp
}
async function goToHomePage() {
  //await navigateTo('/')
}

async function getAccessToken(accessTokenData: AccessTokenRequestI): Promise<BearerTokenI> {
  let tokenData: BearerTokenI = {
    refresh: "",
    access: ""
  };
  tokenData = await axios.post<BearerTokenI>(apiUrl + "/api/token/", accessTokenData)
    .then(response => {
      console.log(response.data)
      return response.data;
    })
    .catch(error => {
      console.error('There was an error fetching the users:', error);
      return error.response.data;
    });
  return tokenData;
}
</script>