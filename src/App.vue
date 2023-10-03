<template>
  <v-app>
    <v-card style="min-height: 100vh">
      <header>
        <Disclosure as="nav" class="mx-auto bg-gray-800" v-slot="{ open }">
          <div class="mx-auto mb-4 max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
              <div
                class="absolute inset-y-0 left-0 flex items-center sm:hidden"
              >
                <DisclosureButton
                  class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span class="absolute -inset-0.5" />
                  <span class="sr-only">Open main menu</span>
                  <Bars3Icon
                    v-if="!open"
                    class="block h-6 w-6"
                    aria-hidden="true"
                  />
                  <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
                </DisclosureButton>
              </div>
              <div
                class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
              >
                <div class="flex flex-shrink-0 items-center">
                  <img
                    class="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div class="hidden sm:ml-6 sm:block">
                  <div class="flex space-x-4">
                    <!-- <a
                      v-for="item in navigation"
                      :key="item.name"
                      :href="item.href"
                      :class="[
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium',
                      ]"
                      :aria-current="item.current ? 'page' : undefined"
                      >{{ item.name }}</a
                    > -->
                    <router-link
                      to="/"
                      class="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-white"
                      active-class="bg-gray-900 text-white"
                    >
                      Home
                    </router-link>
                    <router-link
                      to="/barang"
                      class="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-white"
                      active-class="bg-gray-900 text-white"
                    >
                      Barang
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DisclosurePanel class="sm:hidden">
            <div class="space-y-1 px-2 pb-3 pt-2">
              <DisclosureButton
                v-for="item in navigation"
                :key="item.name"
                as="a"
                :href="item.href"
                :class="[
                  item.current
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium',
                ]"
                :aria-current="item.current ? 'page' : undefined"
                >{{ item.name }}</DisclosureButton
              >
            </div>
          </DisclosurePanel>
        </Disclosure>
      </header>
      <router-view></router-view>
    </v-card>
  </v-app>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
</script>

<script>
export default {
  data() {
    return {
      menu: false,
    };
  },
  computed: {
    navigation() {
      return this.$router.options.routes.map((route) => {
        return {
          name: route.name,
          href: route.path,
          current: this.$route.name === route.name,
        };
      });
    },
  },
};
</script>
