<template>
  <div class="playground">
    <header>
      <h1>Nuxt Drupal Image Playground</h1>
      <nav>
        <NuxtLink to="/">Basic Examples</NuxtLink>
        <NuxtLink to="/advanced">Advanced Examples</NuxtLink>
        <NuxtLink to="/responsive">Responsive Examples</NuxtLink>
      </nav>
    </header>
    
    <main>
      <NuxtPage />
    </main>
    
    <footer>
      <p>@attributech/nuxt-drupal-image playground</p>
    </footer>
  </div>
</template>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 0;
  padding: 0;
  color: #333;
  background-color: #f5f5f5;
}

.playground {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  margin-bottom: 30px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
}

h1 {
  margin-top: 0;
  color: #2c3e50;
}

nav {
  display: flex;
  gap: 20px;
}

nav a {
  color: #3498db;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

nav a:hover {
  background-color: #e9f5ff;
}

nav a.router-link-active {
  font-weight: bold;
  color: #2980b9;
}

main {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

footer {
  margin-top: 30px;
  text-align: center;
  color: #7f8c8d;
  font-size: 0.9em;
}
</style>
