<template>
  <v-container class="my-2" fluid>
    <form @submit.prevent="addBarang">
      <div class="space-y-12 mx-4">
        <div class="ms-4">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Add New Barang
          </h2>
          <p
            class="border-b border-gray-900/10 pb-10 mt-1 text-sm leading-6 text-gray-600"
          >
            Provide the details for your new barang.
          </p>

          <div
            class="border-b border-gray-900/10 mt-4 pb-4"
            v-for="(barang, index) in barangs"
            :key="index"
          >
            <h2 class="font-semibold text-gray-900">Barang {{ index + 1 }}</h2>
            <div
              class="mt-4 mb-4 grid grid-cols-1 gap-4 gap-y-8 sm:grid-cols-3"
            >
              <div class="">
                <label
                  for="code-barang"
                  class="block text-sm font-medium leading-6 text-gray-900 capitalize"
                  >Code</label
                >
                <div class="mt-2">
                  <input
                    type="text"
                    name="code"
                    v-model="barang.code"
                    id="code-barang"
                    autocomplete="given-name"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>
              <div class="">
                <label
                  for="nama"
                  class="block text-sm font-medium leading-6 text-gray-900 capitalize"
                  >Nama</label
                >
                <div class="mt-2">
                  <input
                    type="text"
                    name="nama"
                    v-model="barang.nama"
                    id="nama"
                    autocomplete="given-name"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>
              <div class="">
                <label
                  for="jumlah"
                  class="block text-sm font-medium leading-6 text-gray-900 capitalize"
                  >Jumlah</label
                >
                <div class="mt-2">
                  <input
                    type="number"
                    name="jumlah"
                    v-model="barang.jumlah"
                    id="jumlah"
                    autocomplete="given-name"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

              <div class="">
                <label
                  for="deskripsi"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Deskripsi</label
                >
                <div class="mt-2">
                  <textarea
                    id="deskripsi"
                    name="deskripsi"
                    v-model="barang.deskripsi"
                    rows="3"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div class="">
                <Listbox as="div" v-model="barang.status_id">
                  <ListboxLabel
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >Status</ListboxLabel
                  >
                  <div class="relative mt-2">
                    <ListboxButton
                      class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    >
                      <span class="flex items-center">
                        <!-- <span
                          v-if="!barang.status_id"
                          class="ml-3 block truncate capitalize"
                          >Choose Status</span
                        > -->
                        <span
                          v-if="barang.status_id == true"
                          class="ml-3 block truncate capitalize"
                        >
                          Aktif</span
                        >
                        <span
                          v-else-if="barang.status_id == false"
                          class="ml-3 block truncate capitalize"
                        >
                          Tidak Aktif</span
                        >
                        <span v-else class="ml-3 block truncate capitalize">
                          Choose Status</span
                        >
                      </span>
                      <span
                        class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2"
                      >
                        <ChevronUpDownIcon
                          class="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </ListboxButton>

                    <transition
                      leave-active-class="transition ease-in duration-100"
                      leave-from-class="opacity-100"
                      leave-to-class="opacity-0"
                    >
                      <ListboxOptions
                        class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                      >
                        <ListboxOption
                          as="template"
                          v-for="person in status"
                          :key="person.id"
                          :value="person.id"
                          v-slot="{ active, selected }"
                        >
                          <li
                            :class="[
                              active
                                ? 'bg-indigo-600 text-white'
                                : 'text-gray-900',
                              'relative cursor-default select-none py-2 pl-3 pr-9',
                            ]"
                          >
                            <div
                              class="flex items-center"
                              v-if="person.id == true"
                            >
                              <span
                                :class="[
                                  selected ? 'font-semibold' : 'font-normal',
                                  'ml-3 block truncate capitalize',
                                ]"
                                >Aktif</span
                              >
                            </div>
                            <div
                              class="flex items-center"
                              v-if="person.id == false"
                            >
                              <span
                                :class="[
                                  selected ? 'font-semibold' : 'font-normal',
                                  'ml-3 block truncate capitalize',
                                ]"
                                >Tidak Aktif</span
                              >
                            </div>

                            <span
                              v-if="selected"
                              :class="[
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4',
                              ]"
                            >
                              <CheckIcon class="h-5 w-5" aria-hidden="true" />
                            </span>
                          </li>
                        </ListboxOption>
                      </ListboxOptions>
                    </transition>
                  </div>
                </Listbox>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 mb-4 me-4 flex items-center justify-end gap-x-6">
        <button
          type="button"
          @click="tambahFormInput"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Tambah Form Input
        </button>
        <button
          type="button"
          @click="navigate"
          class="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @close="closeModals">
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
                        stroke="currentStatus"
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
                      class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentStatus"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <h3
                      class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"
                    >
                      {{ message }}
                    </h3>
                    <button
                      data-modal-hide="popup-modal"
                      type="button"
                      @click="navigate"
                      class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                      Oke
                    </button>
                  </div>
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </v-container>
</template>

<script setup>
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
  Dialog,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
</script>

<script>
import axios from "axios";

export default {
  name: "AddBarang",
  data() {
    return {
      open: false,
      status: [
        { id: true, status: "Aktif" },
        { id: false, status: "Tidak Aktif" },
      ],
      color: [],
      selectedKategori: "",
      selectedStatus: "",
      selectedItems: [],
      selectAll: false,
      formattedPrice: "",
      image: "",
      barang: {},
      barangs: [
        {
          code: "",
          nama: "",
          jumlah: 0,
          deskripsi: "",
          status_id: "",
        },
      ],
      message: "",
      success: true,
    };
  },
  methods: {
    updateStatus() {
      for (let i = 0; i < this.barangs.length; i++) {
        this.barangs[i].status_id = this.selectedKategori.id;
      }
      console.log(this.selectedKategori.id);
    },
    addBarang() {
      //   for (let i = 0; i < this.barangs.length; i++) {
      //     this.barangs[i].status_id = this.selectedKategori.id;
      //   }
      axios
        .post("/api/barang", this.barangs)
        .then((response) => {
          console.log(response.data);
          this.message = "Barang data has been successfully saved.";
          this.success = true;
          this.open = true;
        })
        .catch((error) => {
          this.open = true;
          this.message = "Failed to add barang. Please try again.";
          this.success = false;
          console.log(this.selectedKategori);
          console.log(this.barangs);
        });
    },
    tambahFormInput() {
      const newFormInput = {
        code: "",
        nama: "",
        jumlah: 0,
        deskripsi: "",
        status_id: this.selectedKategori ? this.selectedKategori.id : null,
      };

      this.barangs.push(newFormInput);
    },
    navigate() {
      if (this.success == true) {
        this.open = false;
        this.$router.push("/barang");
      } else {
        this.open = false;
      }
    },
  },
};
</script>
