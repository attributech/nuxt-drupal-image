import { fileURLToPath } from 'node:url'
import { defineConfig } from '@playwright/test'
import type { ConfigOptions } from '@nuxt/test-utils/playwright'

/* See https://playwright.dev/docs/test-configuration. */
export default defineConfig<ConfigOptions>({
  testDir: './test/e2e',
  use: {
    nuxt: {
      rootDir: fileURLToPath(new URL('./playground', import.meta.url)),
    },
  },
})
