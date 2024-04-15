// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  runtimeConfig: {
    public: {
      BaseApiUrl: "https://k8s-nstodole-webnginx-69400ae802-1980802023.us-east-2.elb.amazonaws.com/"

    }
  }
  
})
