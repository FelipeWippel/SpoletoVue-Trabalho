<script setup lang="ts">
import HeaderGeral from './components/HeaderGeral.vue'
import FooterGeral from './components/FooterGeral.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <HeaderGeral />
    <main class="content">
      <RouterView />
    </main>
    <FooterGeral />
  </div>
</template>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* ocupa 100% da altura da tela */
}

.content {
  flex: 1; /* ocupa o espaço entre o header e o footer */
}
</style>
