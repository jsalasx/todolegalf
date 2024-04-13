import { useFetch } from "#app";
type useFetchType = typeof useFetch
import { useAuthStore } from '~/stores/auth'

    
export const useFetchApi: useFetchType = (path, options = {}) => {
    const authStore = useAuthStore()
    const baseApiUrl = useRuntimeConfig().public.BaseApiUrl;
    console.log("BASE API")
    console.log(baseApiUrl);
    const token = authStore.token
    console.log("TOKEN->" + token)
    if (token != '') {
        options.baseURL = baseApiUrl;
        options.headers = {
            ...options.headers,
            Authorizacion: 'Bearer ' + token
        }
    } else {
       navigateTo('/login')
    }
    
    return useFetch(path, options)
}