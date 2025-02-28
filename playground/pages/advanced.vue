<template>
  <div>
    <h2>Advanced Examples</h2>
    <p>These examples demonstrate more advanced usage of the DrupalImage component.</p>

    <div v-if="pending">Loading images...</div>
    <div v-else-if="error">Error loading images: {{ error }}</div>
    <div v-else>
      <ExampleCard 
        title="Custom Image Styles" 
        description="Using custom image styles instead of the defaults"
        :code="customStylesCode"
      >
        <DrupalImage 
          v-if="images.length > 0"
          :uri="images[0].uri"
          :alt="images[0].alt"
          :imageStyles="customImageStyles"
        />
      </ExampleCard>

      <ExampleCard 
        title="Portrait Image" 
        description="Handling portrait orientation images"
        :code="portraitCode"
      >
        <DrupalImage 
          v-if="images.length > 3"
          :uri="images[3].uri"
          :alt="images[3].alt"
          :width="images[3].width"
          :height="images[3].height"
        />
      </ExampleCard>

      <ExampleCard 
        title="Square Image" 
        description="Handling square images"
        :code="squareCode"
      >
        <DrupalImage 
          v-if="images.length > 4"
          :uri="images[4].uri"
          :alt="images[4].alt"
          :width="images[4].width"
          :height="images[4].height"
        />
      </ExampleCard>
    </div>
  </div>
</template>

<script setup lang="ts">
// Type declarations for Nuxt and Vue composables
declare const useFetch: (url: string) => any
declare const computed: (getter: () => any) => any
declare const ref: (value: any) => any
declare interface ImageStyle { name: string; width: number }

const { data: imageData, pending, error } = useFetch('/api/images')
const images = computed(() => imageData.value?.images || [])

// Custom image styles for demonstration
const customImageStyles: ImageStyle[] = [
  { name: 'custom_small', width: 400 },
  { name: 'custom_medium', width: 800 },
  { name: 'custom_large', width: 1200 },
  { name: 'custom_xlarge', width: 1600 }
]

// Code examples for display
const customStylesCode = `<DrupalImage 
  uri="public://sample1.jpg"
  alt="A sample image for testing"
  :imageStyles="[
    { name: 'custom_small', width: 400 },
    { name: 'custom_medium', width: 800 },
    { name: 'custom_large', width: 1200 },
    { name: 'custom_xlarge', width: 1600 }
  ]"
/>`

const portraitCode = `<DrupalImage 
  uri="public://portrait.jpg"
  alt="A portrait orientation image"
  :width="768"
  :height="1024"
/>`

const squareCode = `<DrupalImage 
  uri="public://square.jpg"
  alt="A square image"
  :width="500"
  :height="500"
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
