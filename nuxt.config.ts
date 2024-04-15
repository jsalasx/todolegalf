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
      BaseApiUrl: "http://a95f04efd65364329b8d72d808b56d4e-614062416.us-east-2.elb.amazonaws.com/"

    }
  }
  
})
