<template>
  <Listbox
    :modelValue="modelValue"
    @update:modelValue="(value) => this.$emit('update:modelValue', value)"
    by="id"
  >
    <ListboxLabel
      :for="id"
      v-if="label"
      class="mb-3 block text-sm font-semibold text-headline lg:mb-4"
      >{{ label }}
    </ListboxLabel>
    <div class="relative">
      <ListboxButton
        @focus="this.$emit('cancel-error')"
        class="relative w-full cursor-default rounded-full border-2 bg-white px-8 py-2.5 text-left outline-0 transition duration-300 ease-in focus:border-brand focus-visible:border-brand xl:py-3"
        :class="{ 'border-brand': error !== '' }"
      >
        <span class="block truncate">{{ modelValue.name }}</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon class="h-8 w-8 text-primary" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 max-h-36 w-full overflow-auto rounded-xl border-2 bg-white focus:outline-none"
        >
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="item in items"
            :key="item.name"
            :value="item"
            as="template"
          >
            <li
              :class="[
                active ? 'bg-primary-light text-headline' : 'text-base',
                'relative cursor-default select-none px-8 py-2'
              ]"
            >
              <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{
                item.name
              }}</span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
  <BaseErrorMessage v-if="error"> {{ error }}</BaseErrorMessage>
</template>

<script>
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption
} from '@headlessui/vue'
import { ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import BaseErrorMessage from '@/components/UI/form/BaseErrorMessage.vue'
export default {
  components: {
    Listbox,
    ListboxLabel,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    ChevronUpDownIcon,
    BaseErrorMessage
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: { type: Object, required: false },
    items: { type: Array, required: false },
    error: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue']
}
</script>
