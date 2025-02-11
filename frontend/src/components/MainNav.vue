<script setup>
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  TransitionRoot, TransitionChild,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel
} from '@headlessui/vue'
import {
  Bars3Icon,
  XMarkIcon,
  CubeIcon
} from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth';
import { UserCircleIcon } from '@heroicons/vue/24/solid'

const router = useRouter()

const authStore = useAuthStore()

function handleLogout(close) {
  authStore.logout()
  close()
}

function handleMobileLogout() {
  authStore.logout()
  mobileMenuOpen.value = false
}

const navigation = [
  { name: 'New Image', to: { name: 'uploadFile' } },
  { name: 'Gallery', to: { name: 'gallery' } },
]

const mobileMenuOpen = ref(false)
</script>

<template>
  <header class="bg-white">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <!-- Company Logo -->
      <div class="flex lg:flex-1">
        <RouterLink :to="{ name: 'home' }" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <!-- <img class="h-8 w-auto" src="" alt="" /> -->
          <CubeIcon class="size-8 text-indigo-600" />
        </RouterLink>
      </div>

      <div v-if="authStore.isLoggedIn" class="hidden lg:block">
        <div class="flex items-center gap-x-4 text-gray-900">
          <RouterLink v-for="item in navigation" :key="item.name" :to="item.to"
            class="text-sm/6 font-semibold hover:text-gray-400" activeClass="text-gray-400">
            {{ item.name }}
          </RouterLink>
        </div>
      </div>

      <div class="hidden lg:flex lg:flex-1 lg:justify-end text-gray-900">
        <!-- Auth links -->
        <!-- <div v-if="!authStore.isLoggedIn">
          <RouterLink :to="{ name: 'login' }" v-show="router.currentRoute.value.name !== 'register'"
            class="flex items-center text-sm/6 gap-x-1 font-semibold hover:text-gray-400">
            Log in
            <ArrowRightEndOnRectangleIcon class="size-8" />
          </RouterLink>
          <RouterLink :to="{ name: 'register' }" v-show="router.currentRoute.value.name === 'register'"
            class="flex items-center gap-x-1 text-sm/6 font-semibold hover:text-gray-400">
            Sign up
            <ArrowRightEndOnRectangleIcon class="size-8" />
          </RouterLink>
        </div> -->
        <div v-if="!authStore.isLoggedIn">
          <RouterLink :to="{ name: 'login' }" v-show="router.currentRoute.value.name !== 'register'"
            class="text-sm/6 font-semibold hover:text-gray-400" activeClass="text-gray-400">
            Log in
            <span aria-hidden="true">&rarr;</span>
          </RouterLink>
          <RouterLink :to="{ name: 'register' }" v-show="router.currentRoute.value.name === 'register'"
            class="text-sm/6 font-semibold hover:text-gray-400" activeClass="text-gray-400">
            Sign up
            <span aria-hidden="true">&rarr;</span>
          </RouterLink>
        </div>

        <!-- Profile dropdown -->
        <PopoverGroup v-else class="hidden lg:flex lg:gap-x-12">
          <Popover class="relative flex items-center -m-1.5 p-1.5">
            <PopoverButton>
              <UserCircleIcon class="size-8 text-gray-300" />
            </PopoverButton>

            <Transition enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <PopoverPanel v-slot="{ close }"
                class="absolute top-full w-48 right-1.5 z-10 mt-2 rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 focus:outline-hidden">
                <div class="py-1">
                  <div class="relative">
                    <RouterLink :to="{ name: 'profile' }" @click="close()"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:outline-hidden"
                      activeClass="bg-gray-100">
                      Profile
                      <span class="absolute inset-0" />
                    </RouterLink>
                  </div>
                  <div class="relative">
                    <button @click="handleLogout(close)"
                      class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:outline-hidden">
                      Log out
                      <span class="absolute inset-0" />
                    </button>
                  </div>
                </div>
              </PopoverPanel>
            </Transition>
          </Popover>
        </PopoverGroup>
      </div>

      <!-- Mobile menu button -->
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="mobileMenuOpen = true">
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="size-6" aria-hidden="true" />
        </button>
      </div>
    </nav>

    <!-- Mobile menu -->
    <TransitionRoot :show="mobileMenuOpen" as="template">
      <Dialog class="lg:hidden" @close="mobileMenuOpen = false">
        <TransitionChild enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
          leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 z-10 bg-black/10" />
        </TransitionChild>
        <TransitionChild as="template" enter-from="translate-x-full" enter="transition-transform duration-300 ease-out"
          enter-to="translate-x-0" leave-from="translate-x-0" leave="transition-transform duration-300 ease-in"
          leave-to="translate-x-full">
          <DialogPanel
            class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <!-- Company Logo / Mobile menu button -->
            <div class="flex items-center justify-between">
              <RouterLink :to="{ name: 'home' }" class="-m-1.5 p-1.5" @click="mobileMenuOpen = false">
                <span class="sr-only">Your Company</span>
                <!-- <img class="h-8 w-auto" src=""
                  alt="" /> -->
                <CubeIcon class="size-8 text-indigo-600" />
              </RouterLink>
              <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
                <span class="sr-only">Close menu</span>
                <XMarkIcon class="size-6" aria-hidden="true" />
              </button>
            </div>

            <div class="mt-6 flow-root">
              <div class="-my-6 divide-y divide-gray-500/10">
                <div v-if="authStore.isLoggedIn" class="space-y-2 py-6">
                  <RouterLink v-for="item in navigation" :key="item.name" :to="item.to" @click="mobileMenuOpen = false"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    activeClass="bg-gray-100 outline-hidden">
                    {{ item.name }}
                  </RouterLink>
                </div>

                <!-- Auth links -->
                <div v-if="!authStore.isLoggedIn" class="space-y-2 py-6">
                  <RouterLink :to="{ name: 'login' }" @click="mobileMenuOpen = false"
                    v-show="router.currentRoute.value.name !== 'register'"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    activeClass="bg-gray-100 outline-hidden">
                    Log in
                  </RouterLink>
                  <RouterLink :to="{ name: 'register' }" @click="mobileMenuOpen = false"
                    v-show="router.currentRoute.value.name === 'register'"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    activeClass="bg-gray-100 outline-hidden">
                    Sign up
                  </RouterLink>
                </div>

                <!-- Profile -->
                <div v-else class="space-y-2 py-6">
                  <div class="relative flex items-center gap-x-4 rounded-lg -px-3 py-2 text-sm/6 ">
                    <div class="flex size-11 flex-none items-center justify-center rounded-lg">
                      <UserCircleIcon class="size-12 text-gray-300" aria-hidden="true" />
                    </div>
                    <div class="flex-auto">
                      <div class="block font-semibold text-gray-900">
                        {{ authStore.user.name }}
                        <span class="absolute inset-0" />
                      </div>
                      <p class="text-gray-600">{{ authStore.user.email }}</p>
                    </div>
                  </div>
                  <RouterLink :to="{ name: 'profile' }" @click="mobileMenuOpen = false"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    activeClass="bg-gray-100 outline-hidden">
                    Profile
                  </RouterLink>
                  <button @click="handleMobileLogout(close)"
                    class="-mx-3 w-[calc(100%+24px)] block text-left rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    Log out
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </TransitionRoot>
  </header>
</template>
