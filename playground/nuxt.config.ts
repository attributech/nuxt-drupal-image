// https://nuxt.com/docs/api/configuration/nuxt-config
// Type declaration for defineNuxtConfig
declare const defineNuxtConfig: (config: any) => any

export default defineNuxtConfig({
  // Enable the module we're testing
  modules: ['../src/module'],

  // Configure the module
  drupalImage: {
    // Will be set dynamically by the plugin
    serverUrl: '',
    defaultImageStyles: [
      { name: 'thumbnail', width: 100 },
      { name: 'medium', width: 220 },
      { name: 'large', width: 480 },
      { name: 'default_xs', width: 320 },
      { name: 'default_s', width: 640 },
      { name: 'default_m', width: 960 },
      { name: 'default_l', width: 1280 },
      { name: 'default_xl', width: 1440 },
      { name: 'default_xxl', width: 1920 },
      { name: 'default_xxxl', width: 2560 },
    ]
  },

  // Expose the serverUrl to the runtime config
  runtimeConfig: {
    public: {
      // Will be set dynamically by the plugin
      serverUrl: ''
    }
  },
  
  // Register plugins
  plugins: [
    '~/plugins/dynamic-url.ts'
  ],

  // Development settings
  devtools: { enabled: true },

  // For development, disable SSR to make testing easier
  ssr: false,

  compatibilityDate: '2025-02-28'
})
