<template>
  <div class="my-2 container mx-auto">
    <div class="relative mx-4 overflow-x-auto shadow-md sm:rounded-lg">
      <div class="pb-4 bg-white dark:bg-gray-900 mx-2 my-2">
        <h5 class="ms-2 mt-2 font-medium">History</h5>
      </div>
      <div
        v-if="products.length < 1"
        class="ms-2 border-b border-gray-900/10 pb-10"
      >
        <h2 class="text-base font-semibold leading-7 text-gray-900 text-center">
          History not available
        </h2>
      </div>
      <table
        v-else
        class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="p-4">
              <div class="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  v-model="selectAll"
                  @change="toggleSelectAll"
                />
                <label for="checkbox-all-search" class="sr-only"
                  >checkbox</label
                >
              </div>
            </th>
            <th scope="col" class="px-6 py-3">Code</th>
            <th scope="col" class="px-6 py-3">Tipe</th>
            <th scope="col" class="px-6 py-3">Jumlah</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in products"
            :key="item.id"
            @click="detail(item.id_produk)"
            class="w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
          >
            <td class="w-4 p-4">
              <div class="flex items-center">
                <input
                  :id="'checkbox-table-' + item.id"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  v-model="selectedItems"
                  @change="selectItems"
                  :value="item.id"
                />
                <label :for="'checkbox-table-' + item.id" class="sr-only"
                  >checkbox</label
                >
              </div>
            </td>
            <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">
              {{ item.code }}
            </td>
            <td class="px-6 py-4 capitalize">
              {{ item.tipe }}
            </td>
            <td class="px-6 py-4 capitalize">
              {{ item.jumlah }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @click="open = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-300"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div class="relative w-full max-w-md max-h-full">
                <div
                  class="relative bg-white rounded-lg shadow dark:bg-gray-700"
                >
                  <button
                    type="button"
                    class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="popup-modal"
                  >
                    <svg
                      class="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                  <div class="p-6 text-center">
                    <svg
                      class="animate-bounce mx-auto mt-4 mb-4 text-red-600 w-12 h-12 dark:text-gray-200"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <h3
                      class="mb-5 text-lg font-normal text-black-500 dark:text-gray-400"
                    >
                      Are you sure you want to delete this item?
                    </h3>
                    <div
                      class="bg-white-50 px-2 py-1 sm:flex sm:flex-row-reverse sm:px-6"
                    >
                      <button
                        type="button"
                        class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        @click="deleteProduct"
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        @click="open = false"
                        ref="cancelButtonRef"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import {
  Dialog,
  TransitionChild,
  TransitionRoot,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";

import { ChevronDownIcon } from "@heroicons/vue/20/solid";
</script>

<script>
import axios from "axios";

export default {
  name: "BarangView",
  data() {
    return {
      searchQuery: "",
      showOptions: [
        { name: "All Product", href: "#", current: true },
        { name: "Sale Product", href: "#", current: false },
      ],
      sortOptions: [
        { name: "Ascending", href: "#", current: true },
        { name: "Descending", href: "#", current: false },
      ],
      products: [],
      selectedItems: [],
      selectAll: false,
      message: "",
      product_id: "",
      open: false,
      selectedSortOption: "",
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    changeProductShow(selectedOption) {
      console.log(selectedOption);
      if (selectedOption.name === "All Product") {
        this.fetchData();
      } else if (selectedOption.name === "Sale Product") {
        this.fetchSale();
      }
      this.showOptions.forEach((option) => {
        option.current = option === selectedOption;
      });
    },
    changeProductSort(selectedOption) {
      this.selectedSortOption = selectedOption;
      this.sortOptions.forEach((option) => {
        option.current = option === selectedOption;
      });
    },
    detail(id) {
      console.log(id);
    },
    openModals(id, event) {
      event.stopPropagation();
      this.product_id = id;
      this.open = true;
      console.log(this.product_id);
    },
    navigate() {
      this.$store.state.history = this.$route.name;
      this.$router.push("/addbarang");
    },
    navigateStock() {
      this.$router.push("/addstok");
    },
    fetchData() {
      axios
        .get("/api/stok")
        .then((response) => {
          this.products = response.data.data;
          this.products.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
          });
          console.log(this.products);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchSale() {
      axios
        .get("/api/sale")
        .then((response) => {
          this.products = response.data.data;
          console.log(this.products);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    toggleSelectAll() {
      if (this.selectAll) {
        this.selectedItems = this.products.map((item) => item.id);
      } else {
        this.selectedItems = [];
      }
    },
    selectItems() {
      if (this.selectedItems.length == this.products.length) {
        this.selectAll = true;
      } else {
        this.selectAll = false;
      }
    },
  },
};
</script>
