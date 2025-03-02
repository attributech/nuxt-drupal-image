import useImageUrl from '../composables/useImageUrl'
import { DrupalImage } from './components/index'
import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin((nuxtApp: any) => {
  // Make composables and components available via the nuxtApp instance
  // This is mainly for Nuxt 2 compatibility
  nuxtApp.provide('useImageUrl', useImageUrl)
  nuxtApp.vueApp?.component('DrupalImage', DrupalImage)
})
