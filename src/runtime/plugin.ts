import useImageUrl from '../composables/useImageUrl.js';

// Type declarations for Nuxt plugin system
declare const defineNuxtPlugin: (fn: (nuxtApp: any) => void) => any

export default defineNuxtPlugin((nuxtApp: any) => {
  // Make composables available via the nuxtApp instance
  // This is mainly for Nuxt 2 compatibility
  nuxtApp.provide('useImageUrl', useImageUrl)
})
