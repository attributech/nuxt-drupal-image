import useImageUrl from '../composables/useImageUrl.js';
import { DrupalImage } from './components/index.js';

// Type declarations for Nuxt plugin system
declare const defineNuxtPlugin: (fn: (nuxtApp: any) => void) => any

export default defineNuxtPlugin((nuxtApp: any) => {
  // Make composables and components available via the nuxtApp instance
  // This is mainly for Nuxt 2 compatibility
  nuxtApp.provide('useImageUrl', useImageUrl)
  nuxtApp.vueApp?.component('DrupalImage', DrupalImage)
})
