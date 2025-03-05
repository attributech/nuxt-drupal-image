import { fileURLToPath } from 'node:url'
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    environmentOptions: {
      nuxt: {
        rootDir: fileURLToPath(new URL('./playground', import.meta.url)),
        domEnvironment: 'happy-dom',
      },
    },
    exclude: [
      'test/e2e/**',
      'node_modules/**',
      'playground/node_modules/**',
    ],
    coverage: {
      exclude: [
        '**virtual**',
        '**/.nuxt',
        'node_modules',
        'playground',
        'test',
      ],
    },
  },
})
