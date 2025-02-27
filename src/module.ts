import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit';

export interface ModuleOptions {
  // Define module options here if needed
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@attributech/nuxt-drupal-image',
    configKey: 'drupalImage',
    compatibility: {
      nuxt: '^2.16.0 || ^3.0.0'
    }
  },
  defaults: {},
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Add composables auto-import
    nuxt.hook('imports:dirs', (dirs) => {
      dirs.push(resolver.resolve('./composables'))
    })

    // Add plugin to support Nuxt 2 with Bridge
    addPlugin(resolver.resolve('./runtime/plugin.js'))
  }
})
