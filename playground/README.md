# Nuxt Drupal Image Playground

This is a playground for testing and demonstrating the `@attributech/nuxt-drupal-image` module.

## Features

- Basic examples of the DrupalImage component
- Advanced usage examples with custom image styles
- Responsive image examples
- Mock API for simulating Drupal image data

## Getting Started

1. Clone the repository
2. Run the setup script: `npm run setup` (this will install dependencies and download sample images)
3. Run the development server: `npm run dev`
4. Open your browser at: `http://localhost:3000`

Alternatively, you can run these steps manually:
1. Install dependencies: `npm install`
2. Download sample images: `npm run download-images`
3. Run the development server: `npm run dev`

## Structure

- `pages/`: Example pages demonstrating different use cases
  - `index.vue`: Basic usage examples
  - `advanced.vue`: Advanced configuration examples
  - `responsive.vue`: Responsive image examples
- `components/`: Custom components for the playground
  - `ExampleCard.vue`: Component to display examples with code
- `public/images/`: Sample images for testing
- `server/api/`: Mock API endpoints
  - `images.ts`: Mock image data API

## Configuration

The module is configured in `nuxt.config.ts` with the following options:

```ts
drupalImage: {
  serverUrl: 'https://example.com',
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
}
```

## Notes

- This playground uses mock image data with `public://` URIs to simulate Drupal's image system
- The module's `useImageUrl` composable transforms these URIs into proper URLs
- In a real Drupal setup, you would set the `serverUrl` to your Drupal site's URL
