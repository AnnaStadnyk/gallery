<script setup>
import { onMounted, reactive } from 'vue'
import FormHeader from '../../components/FormHeader.vue'
import BaseInput from '../../components/UI/form/BaseInput.vue'
import BaseButton from '../../components/UI/form/BaseButton.vue'
import { useAuthStore } from '../../stores/auth';

let data = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
});

const authStore = useAuthStore()

onMounted(() => {
  authStore.deleteErrors()
})
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <FormHeader>Create your account</FormHeader>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="authStore.register(data)" class="space-y-6">
        <div>
          <BaseInput v-model.trim="data.name" label="Full Name" type="text" :error="authStore.errors?.name" id="name"
            autocomplete="name" @cancel-error="authStore.cancelError('name')" />
        </div>

        <div>
          <BaseInput v-model.trim="data.email" label="Email address" type="email" :error="authStore.errors?.email"
            id="email" autocomplete="email" @cancel-error="authStore.cancelError('email')" />
        </div>

        <div>
          <BaseInput v-model.trim="data.password" label="Password" type="password" :error="authStore.errors?.password"
            id="password" autocomplete="new-password" @cancel-error="authStore.cancelError('password')" />
        </div>

        <div>
          <BaseInput v-model.trim="data.password_confirmation" label="Confirm Password" type="password"
            id="password_confirmation" autocomplete="new-password" />
        </div>

        <div>
          <BaseButton type="submit">Sign up</BaseButton>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Already have an account?
        {{ ' ' }}
        <RouterLink :to="{ name: 'login' }" class="font-semibold text-indigo-600 hover:text-indigo-500">Log In
        </RouterLink>
      </p>
    </div>
  </div>
</template>
