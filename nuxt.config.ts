// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ['@nuxt/content', "nuxt-icon"],
  compatibilityDate: "2024-12-18",

  app: {
    head: {
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }, // Primary SVG favicon
        { rel: "icon", type: "image/png", href: "/favicon.png", sizes: "32x32" }, // PNG fallback
      ]
    }
  }
});