<script setup>
import { reactive } from 'vue'
import BaseInput from '../../components/UI/form/BaseInput.vue'
import { PhotoIcon } from '@heroicons/vue/24/solid'
import { useImageStore } from '../../stores/image';
import BaseErrorMessage from '../../components/UI/form/BaseErrorMessage.vue';

let data = reactive({
  files: [],
  description: ''
});

function onFileChange(event) {
  // for (const file of files) {
  //   data.images.push(file);
  // }
  imageStore.cancelError('files')
  data.files = event.target.files || []
}

const imageStore = useImageStore()
</script>

<template>
  <form class="h-full" @submit.prevent="imageStore.upload(data)">
    <div class="space-y-12">
      <!-- <div class="border-b border-gray-900/10 pb-12"> -->
      <div class="col-span-full">
        <label for="cover-photo" class="block text-sm/6 font-medium text-gray-900">Image</label>
        <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div class="text-center">
            <PhotoIcon class="mx-auto size-12 text-gray-300" aria-hidden="true" />
            <div class="mt-4 flex text-sm/6 text-gray-600">
              <label for="file-upload"
                class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                <span>Upload a file</span>
                <!-- <input id="file-upload" name="file-upload" type="file" class="sr-only" accept="image/*"
                  @change="onFileChange" multiple /> -->
                <input id="file-upload" name="file-upload[]" type="file" class="sr-only" accept="image/*"
                  @change="onFileChange" @click="imageStore.cancelError('files')" multiple />
              </label>
              <p class="pl-1">or drag and drop</p>
            </div>
            <p class="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
        <BaseErrorMessage>{{ imageStore.errors?.files }}</BaseErrorMessage>
        <!-- <BaseErrorMessage v-for="(error, i) in imageStore.errors?.files" :key="i">{{ error }}</BaseErrorMessage> -->
      </div>

      <div>
        <BaseInput v-model.trim="data.description" label="Description" type="text"
          :error="imageStore.errors?.description" id="description"
          @cancel-error="imageStore.cancelError('description')" />
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button type="button" class="text-sm/6 font-semibold text-gray-900">Cancel</button>
      <button type="submit"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
    </div>
    <!-- </div> -->
  </form>
</template>
