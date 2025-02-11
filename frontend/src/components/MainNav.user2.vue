<script setup>
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  TransitionRoot, TransitionChild,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel, Menu, MenuButton, MenuItem, MenuItems
} from '@headlessui/vue'
import {
  Bars3Icon,
  XMarkIcon,
  CubeIcon,
  UserIcon,
  ArrowRightStartOnRectangleIcon
} from '@heroicons/vue/24/outline'
import { RouterLink, useRouter } from 'vue-router'
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

// const userNavigation = [
//   { name: 'Profile', to: { name: 'profile' } },
//   { name: 'Log out', to: { name: 'signout' } },
// ]

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
            class="text-sm/6 font-semibold hover:text-gray-500">
            {{ item.name }}
          </RouterLink>
        </div>
      </div>

      <div class="hidden lg:flex lg:flex-1 items-center lg:justify-end text-gray-900">
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
            class="text-sm/6 font-semibold hover:text-gray-400">
            Log in
            <span aria-hidden="true">&rarr;</span>
          </RouterLink>
          <RouterLink :to="{ name: 'register' }" v-show="router.currentRoute.value.name === 'register'"
            class="text-sm/6 font-semibold hover:text-gray-400">
            Sign up
            <span aria-hidden="true">&rarr;</span>
          </RouterLink>
        </div>

        <!-- Profile dropdown -->
        <div v-else class="hidden md:block">

          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3">
            <div>
              <MenuButton class="relative flex items-center -m-1.5 p-1.5">
                <!-- <span class="absolute -inset-1.5" /> -->
                <span class="sr-only">Open user menu</span>
                <!-- <img class="size-8 rounded-full" :src="user.imageUrl" alt="" /> -->
                <UserCircleIcon class="size-8 text-gray-300" />
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 focus:outline-hidden">
                <MenuItem v-slot="{ active }">
                <a href="/profile"
                  :class="[active ? 'bg-gray-100 outline-hidden' : '', 'block px-4 py-2 text-sm text-gray-700']">
                  Profile
                </a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                <button @click="authStore.logout()"
                  :class="[active ? 'bg-gray-100 outline-hidden' : '', 'block w-full text-left px-4 py-2 text-sm text-gray-700']">Log
                  out</button>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>

        </div>
        <!-- <PopoverGroup v-else class="hidden lg:flex lg:gap-x-12">
          <Popover class="relative flex items-center -m-1.5 p-1.5">
            <PopoverButton>
              <UserCircleIcon class="size-8 text-gray-300" />
            </PopoverButton>

            <Transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
              <PopoverPanel v-slot="{ close }"
                class="absolute top-full right-0 z-10 mt-3 w-screen max-w-xs overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5">
                <div class="p-4">
                  <div class="group relative flex items-center gap-x-4 rounded-lg px-4 py-2 text-sm/6 hover:bg-gray-50">
                    <div
                      class="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <UserIcon class="size-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                    </div>
                    <div class="flex-auto">
                      <RouterLink :to="{ name: 'profile' }" @click="close()" class="block font-semibold text-gray-900">
                        {{ authStore.user.name }}
                        <span class="absolute inset-0" />
                      </RouterLink>
                      <p class="mt-0.5 text-gray-600">{{ authStore.user.email }}</p>
                    </div>
                  </div>
                  <div class="group relative flex items-center gap-x-4 rounded-lg px-4 py-2 text-sm/6 hover:bg-gray-50">
                    <div
                      class="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <ArrowRightStartOnRectangleIcon class="size-6 text-gray-600 group-hover:text-indigo-600"
                        aria-hidden="true" />
                    </div>
                    <div class="flex-auto">
                      <button @click="handleLogout(close)" class="block font-semibold text-gray-900">
                        Log Out
                        <span class="absolute inset-0" />
                      </button>
                    </div>
                  </div>
                </div>
              </PopoverPanel>
            </Transition>
          </Popover>
        </PopoverGroup> -->
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
                    class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    {{ item.name }}
                  </RouterLink>
                </div>

                <!-- Auth links -->
                <div v-if="!authStore.isLoggedIn" class="space-y-2 py-6">
                  <RouterLink :to="{ name: 'login' }" @click="mobileMenuOpen = false"
                    v-show="router.currentRoute.value.name !== 'register'"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    Log in
                  </RouterLink>
                  <RouterLink :to="{ name: 'register' }" @click="mobileMenuOpen = false"
                    v-show="router.currentRoute.value.name === 'register'"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
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
                    class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
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
