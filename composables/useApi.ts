import { useFetch } from "#app";
type useFetchType = typeof useFetch
import { useAuthStore } from '~/stores/auth'

    
export const useFetchApi: useFetchType = (path, options = {}) => {
    const authStore = useAuthStore()
    let baseApiUrl = useRuntimeConfig().public.BaseApiUrl;
    if (baseApiUrl == undefined || baseApiUrl == null || baseApiUrl == '') {
        baseApiUrl = "https://k8s-nstodole-webnginx-69400ae802-1980802023.us-east-2.elb.amazonaws.com/";
    }
    const router = useRouter()
    // console.log("BASE API")
    console.log(baseApiUrl);
    const token = authStore.token
    if (token == '') {
        router.push({ path: "/login" })
    }
    console.log("TOKEN->" + token)
    options.baseURL = baseApiUrl
    options.headers = {
        ...options.headers,
        'Authorization': 'Bearer ' + token
    }
    return useFetch(path, options)
}