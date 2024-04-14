import { useFetch } from "#app";
type useFetchType = typeof useFetch
import { useAuthStore } from '~/stores/auth'

    
export const useFetchApi: useFetchType = (path, options = {}) => {
    const authStore = useAuthStore()
    const baseApiUrl = useRuntimeConfig().public.BaseApiUrl;
    // console.log("BASE API")
    // console.log(baseApiUrl);
    const token = authStore.token
    // console.log("TOKEN->" + token)
    options.baseURL = baseApiUrl
    options.headers = {
        ...options.headers,
        'Authorization': 'Bearer ' + token
    }
    return useFetch(path, options)
}