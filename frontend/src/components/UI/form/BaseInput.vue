<template>
  <label :for="id" v-if="label" class="block text-sm/6 font-medium text-gray-900">{{
    label
  }}</label>
  <div class="mt-2">
    <input v-bind="$attrs" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
      @focus="$emit('cancel-error')" :id="id"
      class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
    <BaseErrorMessage v-if="error"> {{ error }}</BaseErrorMessage>
  </div>
</template>

<script>
import BaseErrorMessage from './BaseErrorMessage.vue'

export default {
  components: {
    BaseErrorMessage
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: null
    },
    error: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    }
  },
  computed: {
    getPlaceholder() {
      if (this.placeholder) return this.placeholder
      else return `Enter Your ${this.label} ...`
    }
  }
}
</script>
