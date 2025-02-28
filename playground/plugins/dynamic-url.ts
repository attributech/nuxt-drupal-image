/**
 * Plugin to dynamically set the server URL in the runtime config
 * This ensures that images are loaded from the correct local URL
 */

// Type declarations for Nuxt
declare const defineNuxtPlugin: (fn: (nuxtApp: any) => any) => any
declare const useRuntimeConfig: () => any

export default defineNuxtPlugin((nuxtApp) => {
  // Get the runtime config
  const config = useRuntimeConfig()
  
  // Determine the base URL dynamically
  let baseUrl = ''
  
  if (process.server) {
    // On server-side, use environment variable or default to localhost
    baseUrl = process.env.BASE_URL || 'http://localhost:3000'
  } else {
    // On client-side, use the current window location
    baseUrl = window.location.origin
  }
  
  // Set the serverUrl in the runtime config
  config.public.serverUrl = baseUrl
  
  // Log the detected URL (for debugging)
  console.log(`[dynamic-url] Server URL set to: ${baseUrl}`)
  
  return {
    provide: {
      dynamicServerUrl: baseUrl
    }
  }
})
