<script setup>
import { onMounted, reactive } from 'vue'
import FormHeader from '../../components/FormHeader.vue'
import BaseInput from '../../components/UI/form/BaseInput.vue'
import BaseButton from '../../components/UI/form/BaseButton.vue'
import { useAuthStore } from '../../stores/auth';

let data = reactive({
  email: '',
  password: ''
});

const authStore = useAuthStore()

onMounted(() => {
  authStore.deleteErrors()
})
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <FormHeader>Sign in to your account</FormHeader>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="authStore.login(data)">
        <div>
          <BaseInput v-model.trim="data.email" label="Email address" type="email" :error="authStore.errors?.email"
            id="email" autocomplete="email" @cancel-error="authStore.cancelError('email')" />
        </div>

        <div>
          <BaseInput v-model.trim="data.password" label="Password" type="password" :error="authStore.errors?.password"
            id="password" autocomplete="current-password" @cancel-error="authStore.cancelError('password')" />
        </div>

        <div>
          <BaseButton type="submit">Log in</BaseButton>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Not a member?
        {{ ' ' }}
        <RouterLink :to="{ name: 'register' }" class="font-semibold text-indigo-600 hover:text-indigo-500">Start a 14
          day
          free trial</RouterLink>
      </p>
    </div>
  </div>
</template>
