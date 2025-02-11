<template>
  <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
    <div class="flex flex-1 justify-between md:hidden">
      <RouterLink v-if="props.links[0]?.url !== null"
        :to="{ name: 'gallery', query: { page: String(String(props.links[0]?.url).split('?')).split('=')[1] } }"
        class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
        Previous</RouterLink>
      <span v-else
        class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
        Previous</span>
      <RouterLink v-if="props.links[N - 1]?.url !== null"
        :to="{ name: 'gallery', query: { page: String(String(props.links[N - 1]?.url).split('?')).split('=')[1] } }"
        class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
        Next</RouterLink>
      <span v-else
        class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
        Next</span>
    </div>

    <div class="hidden md:flex md:flex-1 md:items-center md:justify-center lg:justify-between">
      <div class="hidden lg:flex">
        <p class="text-sm text-gray-700">
          Showing
          {{ ' ' }}
          <span class="font-medium">{{ props.from }}</span>
          {{ ' ' }}
          to
          {{ ' ' }}
          <span class="font-medium">{{ props.to }}</span>
          {{ ' ' }}
          of
          {{ ' ' }}
          <span class="font-medium">{{ props.total }}</span>
          {{ ' ' }}
          results
        </p>
      </div>
      <div>
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">

          <template v-for="(link, i) in props.links" :key="i">
            <template v-if="i === 0">
              <RouterLink v-if="link.url !== null" class="relative inline-flex items-center p-2 text-sm font-semibold focus:z-20
                text-gray-900 ring-1 ring-inset ring-gray-300  focus:outline-offset-0 rounded-l-md"
                :class="link.active ? 'z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' : 'hover:bg-gray-50'"
                :to="{ name: 'gallery', query: { page: String(String(link.url).split('?')).split('=')[1] } }">
                <span class="sr-only">Previous</span>
                <ChevronLeftIcon class="size-5" aria-hidden="true" />
              </RouterLink>
              <div v-else
                class="relative inline-flex items-center p-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0 rounded-l-md">
                <span class="sr-only">Previous</span>
                <ChevronLeftIcon class="size-5" aria-hidden="true" />
              </div>
            </template>
            <template v-else-if="i === (N - 1)">
              <RouterLink v-if="link.url !== null" class="relative inline-flex items-center p-2 text-sm font-semibold focus:z-20
                text-gray-900 ring-1 ring-inset ring-gray-300  focus:outline-offset-0 rounded-r-md"
                :class="link.active ? 'z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' : 'hover:bg-gray-50'"
                :to="{ name: 'gallery', query: { page: String(String(link.url).split('?')).split('=')[1] } }">
                <span class="sr-only">Next</span>
                <ChevronRightIcon class="size-5" aria-hidden="true" />
              </RouterLink>
              <div v-else
                class="relative inline-flex items-center p-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0 rounded-r-md">
                <span class="sr-only">Next</span>
                <ChevronRightIcon class="size-5" aria-hidden="true" />
              </div>
            </template>
            <template v-else>
              <RouterLink v-if="link.url !== null" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20
                text-gray-900 ring-1 ring-inset ring-gray-300  focus:outline-offset-0" :class="[
                  link.active
                    ? 'z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    : 'hover:bg-gray-50']"
                :to="{ name: 'gallery', query: { page: String(String(link.url).split('?')).split('=')[1] } }"
                v-html="link.label" />
              <div v-else
                class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                v-html="link.label" />
            </template>
          </template>

        </nav>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
  links: { type: Array, default: [] },
  from: Number,
  to: Number,
  total: Number
})

const N = ref(props.links.length)
</script>