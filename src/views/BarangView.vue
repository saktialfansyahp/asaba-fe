<template>
  <div class="my-2 container mx-auto">
    <div class="relative mx-4 overflow-x-auto shadow-md sm:rounded-lg">
      <div class="pb-4 bg-white dark:bg-gray-900 mx-2 my-2">
        <label for="table-search" class="sr-only">Cari</label>
        <div class="relative flex justify-between items-center">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            id="table-search"
            class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Cari Barang"
          />
          <div class="relative">
            <Menu as="div" class="relative inline-block text-left">
              <div>
                <MenuButton
                  class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Urutkan
                  <ChevronDownIcon
                    class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </MenuButton>
              </div>

              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div class="py-1">
                    <MenuItem
                      v-for="option in sortOptions"
                      :key="option.name"
                      v-slot="{ active }"
                    >
                      <a
                        :href="option.href"
                        :class="[
                          option.current
                            ? 'font-medium text-gray-900'
                            : 'text-gray-500',
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm',
                        ]"
                        @click="changeProductSort(option)"
                        >{{ option.name }}</a
                      >
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
            <button
              type="button"
              @click="navigateStock"
              class="ms-4 text-gray-900 bg-white border border-gray-300 hover:bg-gray-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center mr-2"
            >
              Ubah Stok
            </button>
            <button
              @click="navigate"
              type="button"
              class="ms-2 mr-10 text-gray-900 bg-white border border-gray-300 hover:bg-gray-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center mr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-3.5 h-3.5 mr-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Tambah Barang
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="products.length < 1"
        class="ms-2 border-b border-gray-900/10 pb-10"
      >
        <h2 class="text-base font-semibold leading-7 text-gray-900 text-center">
          Product not available
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
            <th scope="col" class="px-6 py-3">Nama</th>
            <th scope="col" class="px-6 py-3">Deskripsi</th>
            <th scope="col" class="px-6 py-3">Jumlah</th>
            <th scope="col" class="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in filteredProducts"
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
              {{ item.nama }}
            </td>
            <td class="px-6 py-4 capitalize">
              {{ item.deskripsi }}
            </td>
            <td class="px-6 py-4 capitalize">
              {{ item.jumlah }}
            </td>
            <td v-if="item.isActive == true" class="px-6 py-4 capitalize">
              Aktif
            </td>
            <td v-if="item.isActive == false" class="px-6 py-4 capitalize">
              Tidak Aktif
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
  computed: {
    filteredProducts() {
      const searchTerm = this.searchQuery.toLowerCase();
      const searchJuml = parseInt(searchTerm, 10);
      let filter = this.products
        .filter((product) => {
          const isMatchingName = product.nama
            .toLowerCase()
            .includes(searchTerm);
          const isMatchingCode = product.code
            .toLowerCase()
            .includes(searchTerm);
          const isMatchingDesc = product.deskripsi
            .toLowerCase()
            .includes(searchTerm);
          const isMatchingJumlah =
            !isNaN(searchJuml) && product.jumlah === searchJuml;
          return (
            isMatchingName ||
            isMatchingCode ||
            isMatchingJumlah ||
            isMatchingDesc
          );
        })
        .sort((a, b) => a.nama.localeCompare(b.nama));

      if (this.selectedSortOption.name === "Ascending") {
        filter.sort((a, b) => a.nama.localeCompare(b.nama));
      } else if (this.selectedSortOption.name === "Descending") {
        filter.sort((b, a) => a.nama.localeCompare(b.nama));
      }
      return filter;
    },
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
    deleteProduct() {
      axios
        .delete(`/api/produk/${this.product_id}`)
        .then((response) => {
          console.log(response.data);
          this.open = false;
          this.fetchData();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    editProduct(id, event) {
      event.stopPropagation();
      this.$router.push("editproduct/" + id);
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
        .get("/api/barang")
        .then((response) => {
          this.products = response.data.data;
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
