<script setup>
import { onMounted, ref, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useImageStore } from '../../stores/image';
import Pagination from '../../components/UI/Pagination.vue';
import BaseLoader from '../../components/UI/BaseLoader.vue';
import { TrashIcon } from '@heroicons/vue/24/outline';

const route = useRoute()
const imageStore = useImageStore()

onMounted(async () => {
  await imageStore.getImages(+route.query.page || 1)
})

watch(route, async () => {
  await imageStore.getImages(+route.query.page || 1)
  page.value = +route.query.page
})

const page = ref(+route.query.page || 1)

// watchEffect(async () => { // instead onMounted + watch(route, async ())
//   const page = ref(+route.query.page || 1)
//   await imageStore.getImages(route.query.page)
// })

// watch(route, async () => { // the same as watchEffect(async ())
//   const page = ref(+route.query.page || 1)
//   await imageStore.getImages(route.query.page)
// }, { immediate: true })

</script>

<template>
  <BaseLoader v-if="imageStore.isLoading" />
  <template v-else>

    <!-- <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      <a target="_blank" v-for="image in imageStore.images.data" :key="image.id" :href="image.src"
        class="group relative">
        <img :src="image.src" :alt="image.id"
          class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]" />
        <div
          class="p-2 justify-between items-center hidden group-hover:flex absolute inset-x-0 bottom-0 bg-gray-200 opacity-75">
          <p class="mt-1 text-lg font-medium text-gray-900">{{ image.id }} {{ image.description }}</p>
          <button class="text-indigo-600 hover:text-indigo-500" @click="imageStore.deleteImage(image.id)">
            <span class="sr-only">Delete Image</span>
            <TrashIcon class="size-6" aria-hidden="true" />
          </button>
        </div>
      </a>
    </div> -->
    <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      <div v-for="image in imageStore.images.data" :key="image.id" class="relative group">
        <a target="_blank" :href="image.src">
          <img :src="image.src" :alt="image.id"
            class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]" />
        </a>
        <div
          class="p-2 justify-between items-center hidden group-hover:flex absolute inset-x-0 bottom-0 bg-gray-200 opacity-75">
          <p class="mt-1 text-lg font-medium text-gray-900">{{ image.id }} {{ image.description }}</p>
          <button v-if="image.can.delete" class="text-indigo-600 hover:text-indigo-500"
            @click="imageStore.deleteImage(image.id, page)">
            <span class="sr-only">Delete Image</span>
            <TrashIcon class="size-6" aria-hidden="true" />
          </button>
        </div>
      </div>

    </div>

    <Pagination :links="imageStore.images.links" :from="imageStore.images.from" :to="imageStore.images.to"
      :total="imageStore.images.total" class="mt-6" />
  </template>
</template>