import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import type { ImageStyle } from './types'

export interface ModuleOptions {
  /**
   * Base URL of the Drupal server
   * @default ''
   */
  serverUrl?: string

  /**
   * Default image styles configuration
   * @default undefined
   */
  defaultImageStyles?: ImageStyle[]
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@attributech/nuxt-drupal-image',
    configKey: 'drupalImage',
    compatibility: {
      nuxt: '^2.16.0 || ^3.0.0',
    },
  },
  defaults: {},
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Add composables and components auto-import
    nuxt.hook('imports:dirs', (dirs) => {
      dirs.push(resolver.resolve('./composables'))
      dirs.push(resolver.resolve('./runtime/components'))
    })

    // Add plugin to support Nuxt 2 with Bridge
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
