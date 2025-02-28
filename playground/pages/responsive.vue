<template>
  <div>
    <h2>Responsive Examples</h2>
    <p>These examples demonstrate responsive behavior of the DrupalImage component.</p>

    <div v-if="pending">Loading images...</div>
    <div v-else-if="error">Error loading images: {{ error }}</div>
    <div v-else>
      <ExampleCard 
        title="Responsive Container" 
        description="Image in a responsive container that changes width"
        :code="responsiveContainerCode"
      >
        <div class="responsive-container">
          <DrupalImage 
            v-if="images.length > 0"
            :uri="images[0].uri"
            :alt="images[0].alt"
          />
        </div>
      </ExampleCard>

      <ExampleCard 
        title="Custom Sizes Attribute" 
        description="Using a custom sizes attribute for responsive loading"
        :code="customSizesCode"
      >
        <DrupalImage 
          v-if="images.length > 1"
          :uri="images[1].uri"
          :alt="images[1].alt"
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </ExampleCard>

      <ExampleCard 
        title="Grid Layout" 
        description="Multiple images in a responsive grid layout"
        :code="gridLayoutCode"
      >
        <div class="image-grid">
          <div v-for="(image, index) in images.slice(0, 3)" :key="index" class="grid-item">
            <DrupalImage 
              :uri="image.uri"
              :alt="image.alt"
            />
            <p class="image-caption">{{ image.title }}</p>
          </div>
        </div>
      </ExampleCard>
    </div>
  </div>
</template>

<script setup lang="ts">
// Type declarations for Nuxt and Vue composables
declare const useFetch: (url: string) => any
declare const computed: (getter: () => any) => any
declare const ref: (value: any) => any

const { data: imageData, pending, error } = useFetch('/api/images')
const images = computed(() => imageData.value?.images || [])

// Code examples for display
const responsiveContainerCode = `<div class="responsive-container">
  <DrupalImage 
    uri="public://sample1.jpg"
    alt="A sample image for testing"
  />
</div>

<style>
.responsive-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid #ddd;
}
</style>`

const customSizesCode = `<DrupalImage 
  uri="public://sample2.jpg"
  alt="Another sample image"
  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>`

const gridLayoutCode = `<div class="image-grid">
  <div v-for="(image, index) in images" :key="index" class="grid-item">
    <DrupalImage 
      :uri="image.uri"
      :alt="image.alt"
    />
    <p class="image-caption">{{ image.title }}</p>
  </div>
</div>

<style>
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.grid-item {
  border: 1px solid #eee;
  padding: 10px;
}

.image-caption {
  margin-top: 10px;
  text-align: center;
  font-size: 0.9em;
}
</style>`
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

.responsive-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid #ddd;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.grid-item {
  border: 1px solid #eee;
  padding: 10px;
}

.image-caption {
  margin-top: 10px;
  text-align: center;
  font-size: 0.9em;
}
</style>
