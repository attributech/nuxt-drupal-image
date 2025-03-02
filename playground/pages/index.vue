<template>
  <div>
    <h2>Basic Examples</h2>
    <p>These examples demonstrate the basic usage of the DrupalImage component.</p>

    <div v-if="pending">
      Loading images...
    </div>
    <div v-else-if="error">
      Error loading images: {{ error }}
    </div>
    <div v-else>
      <ExampleCard
        title="Basic Usage"
        description="Simple usage of DrupalImage component with default settings"
        :code="basicCode"
      >
        <DrupalImage
          v-if="images.length > 0"
          :uri="images[0].uri"
          :alt="images[0].alt"
        />
      </ExampleCard>

      <ExampleCard
        title="With Width and Height"
        description="Setting explicit width and height attributes"
        :code="withDimensionsCode"
      >
        <DrupalImage
          v-if="images.length > 1"
          :uri="images[1].uri"
          :alt="images[1].alt"
          :width="images[1].width"
          :height="images[1].height"
        />
      </ExampleCard>

      <ExampleCard
        title="Custom Alt Text"
        description="Using custom alt text and fallback"
        :code="altTextCode"
      >
        <DrupalImage
          v-if="images.length > 2"
          :uri="images[2].uri"
          alt="Custom alt text"
          alt-fallback="Fallback alt text if main alt is empty"
        />
      </ExampleCard>
    </div>
  </div>
</template>

<script setup lang="ts">
// Type declarations for Nuxt and Vue composables
declare const useFetch: (url: string) => any
declare const computed: (getter: () => any) => any

const { data: imageData, pending, error } = useFetch('/api/images')
const images = computed(() => imageData.value?.images || [])

// Code examples for display
const basicCode = `<DrupalImage 
  uri="public://sample1.jpg"
  alt="A sample image for testing"
/>`

const withDimensionsCode = `<DrupalImage 
  uri="public://sample2.jpg"
  alt="Another sample image"
  :width="800"
  :height="600"
/>`

const altTextCode = `<DrupalImage 
  uri="public://sample3.jpg"
  alt="Custom alt text"
  altFallback="Fallback alt text if main alt is empty"
/>`
</script>

<style scoped>
h2 {
  margin-top: 0;
  margin-bottom: 10px;
}

p {
  margin-bottom: 30px;
  color: #666;
}
</style>
