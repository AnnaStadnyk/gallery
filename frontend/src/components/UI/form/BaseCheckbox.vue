<template>
  <div class="flex items-start gap-3">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      @focus="$emit('cancel-error')"
      class="checked:after:transorm relative top-1 h-5 min-w-5 appearance-none border-2 checked:after:absolute checked:after:-top-2 checked:after:left-[6px] checked:after:h-5 checked:after:w-3 checked:after:rotate-45 checked:after:border-b-2 checked:after:border-r-2 checked:after:border-headline"
      :id="id"
      :class="{ 'border-headline': error === '', 'border-brand': error !== '' }"
    />
    <label v-if="label" :for="id">{{ label }}</label>
  </div>
  <BaseErrorMessage v-if="error"> {{ error }}</BaseErrorMessage>
</template>

<script>
import BaseErrorMessage from '@/components/UI/form/BaseErrorMessage.vue'
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
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    }
  }
}
</script>
