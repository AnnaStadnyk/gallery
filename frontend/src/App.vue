<script setup>
import MainNav from './components/MainNav.vue'
import { useAuthStore } from './stores/auth';
const userStore = useAuthStore()
userStore.tryLogin()
</script>

<template>
  <header>
    <MainNav />
  </header>
  <main>
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <RouterView />
    </div>
  </main>
</template>

<style scoped></style>
