import { defineNuxtModule, installModule, addImports, createResolver, addComponent } from '@nuxt/kit'
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

    // Register the DrupalImage component
    addComponent({
      name: 'DrupalImage',
      filePath: resolver.resolve('./runtime/components/DrupalImage.vue'),
    })

    // Add imports
    addImports({
      name: 'useImageUrl',
      from: resolver.resolve('runtime/composables'),
    })

    // Install and configure nuxt-lazyimages module
    installModule('nuxt-lazyimages', {
      expFactor: 10,
      loadMode: 3,
      loadHidden: false,
    })
  },
})
