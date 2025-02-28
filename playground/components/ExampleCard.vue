<template>
  <div class="example-card">
    <h3 v-if="title">{{ title }}</h3>
    <p v-if="description">{{ description }}</p>
    
    <div class="example-content">
      <slot></slot>
    </div>
    
    <div v-if="code" class="code-block">
      <pre><code>{{ code }}</code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  code?: string
}>()
</script>

<style scoped>
.example-card {
  margin-bottom: 30px;
  border: 1px solid #eaeaea;
  border-radius: 6px;
  overflow: hidden;
}

h3 {
  margin: 0;
  padding: 15px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #eaeaea;
  font-size: 1.2em;
}

p {
  padding: 0 15px;
  color: #666;
}

.example-content {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
  min-height: 200px;
}

.code-block {
  background-color: #2d2d2d;
  color: #f8f8f2;
  padding: 15px;
  overflow-x: auto;
  font-family: 'Fira Code', 'Courier New', Courier, monospace;
  font-size: 0.9em;
}

pre {
  margin: 0;
}
</style>
