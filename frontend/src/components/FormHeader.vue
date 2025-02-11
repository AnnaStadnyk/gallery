<script setup>
import { CubeIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <RouterLink :to="{ name: 'home' }">
      <!-- <img class="mx-auto h-10 w-auto" src=""
        alt="Your Company" /> -->
      <CubeIcon class="mx-auto size-10 text-indigo-600" />
    </RouterLink>
    <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
      <slot></slot>
    </h2>
  </div>
</template>