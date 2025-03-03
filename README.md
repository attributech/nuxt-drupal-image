# @attributech/nuxt-drupal-image

A Nuxt module for handling Drupal image styles.

## Features

- Compatible with Nuxt 2 (with Bridge) and Nuxt 3
- TypeScript support
- Auto-imports for the useImageUrl composable
- Simplifies working with Drupal image styles

## Installation

```bash
npm install @attributech/nuxt-drupal-image
```

## Setup

Add the module to your `nuxt.config.ts`:

### Nuxt 3

```ts
export default defineNuxtConfig({
  modules: [
    '@attributech/nuxt-drupal-image'
  ]
})
```

### Nuxt 2 with Bridge

```ts
import { defineNuxtConfig } from '@nuxt/bridge'

export default defineNuxtConfig({
  buildModules: [
    '@attributech/nuxt-drupal-image'
  ]
})
```

## Usage

### useImageUrl

A composable for building Drupal image style URLs.

```ts
const imageUrl = useImageUrl(imageUri, style)
```

#### Parameters

- `imageUri`: The Drupal image URI (e.g., 'public://image.jpg')
- `style`: The Drupal image style name (e.g., 'thumbnail', 'large')

#### Returns

- A string containing the complete URL to the styled image

#### Example

```vue
<template>
  <img :src="imageUrl" alt="My image" />
</template>

<script setup>
const imageUri = 'public://my-image.jpg'
const imageUrl = useImageUrl(imageUri, 'large')
</script>
```

#### Configuration

The composable uses the `serverUrl` from your Nuxt runtime config. Make sure to set this in your `nuxt.config.ts`:

```ts
// Nuxt 3
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      serverUrl: process.env.SERVER_URL || 'https://example.com'
    }
  }
})

// Nuxt 2 with Bridge
export default defineNuxtConfig({
  publicRuntimeConfig: {
    serverUrl: process.env.SERVER_URL || 'https://example.com'
  }
})
```

## Migration from existing code

### Migrating from util/imageUrl.js

If you're currently using the utility function from `util/imageUrl.js`, you can migrate to the composable as follows:

Before:
```js
import imageUrl from '@/util/imageUrl'

const url = imageUrl(imageUri, style, apiUrl)
```

After:
```js
import { useImageUrl } from '@attributech/nuxt-drupal-image'

// The apiUrl is now taken from the Nuxt runtime config
const url = useImageUrl(imageUri, style)
```

## Development and Testing

### Playground

This module includes a playground for testing and development. The playground is a Nuxt 3 application that demonstrates various use cases of the module.

To run the playground:

```bash
# Install dependencies
npm install

# Run the playground
npm run dev
```

This will start a development server at http://localhost:3000 with examples of the module in action.

The playground includes:
- Basic examples of the DrupalImage component
- Advanced usage examples with custom image styles
- Responsive image examples
- Mock API for simulating Drupal image data

For more details, see the [playground README](./playground/README.md).

### Testing

This module includes both unit tests and end-to-end (e2e) tests to ensure functionality works as expected.

#### Unit Tests

Unit tests are implemented using Vitest and test the core functionality of the module:

```bash
# Run unit tests
npm run test:unit

# Run unit tests in watch mode
npm run test:unit:watch
```

#### End-to-End Tests

E2E tests use Playwright to test the module in a real Nuxt application context:

```bash
# Run e2e tests
npm run test:e2e

# Run e2e tests with UI
npm run test:e2e:ui
```

#### Run All Tests

To run both unit and e2e tests:

```bash
npm run test:all
```

## License

MIT
