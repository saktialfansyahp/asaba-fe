<template>
  <div class="my-2 container mx-auto">
    <form @submit.prevent="addBarang">
      <div class="space-y-12 mx-4">
        <div class="ms-4">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Stok Barang
          </h2>
          <p
            class="border-b border-gray-900/10 pb-10 mt-1 text-sm leading-6 text-gray-600"
          >
            Pilih barang yang akan diubah jumlahnya.
          </p>

          <div
            class="border-b border-gray-900/10 mt-4 pb-4"
            v-for="(barang, index) in barangs"
            :key="index"
          >
            <h2 class="font-semibold text-gray-900">
              Pilih Barang {{ index + 1 }}
            </h2>
            <div
              class="mt-4 mb-4 grid grid-cols-1 gap-4 gap-y-8 sm:grid-cols-2"
            >
              <Listbox as="div" v-model="selectedList[index]">
                <ListboxLabel
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Barang</ListboxLabel
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
                        v-if="selectedList[index]"
                        class="ml-3 block truncate capitalize"
                      >
                        {{ selectedList[index].nama }}</span
                      >
                      <span v-else class="ml-3 block truncate capitalize">
                        Pilih Barang</span
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
                        v-for="person in sortedList"
                        :key="person.id"
                        :value="person"
                        v-slot="{ active, selected }"
                        @click="handleSelect(person)"
                      >
                        <li
                          :class="[
                            active
                              ? 'bg-indigo-600 text-white'
                              : 'text-gray-900',
                            'relative cursor-default select-none py-2 pl-3 pr-9',
                          ]"
                        >
                          <div class="flex items-center">
                            <span
                              :class="[
                                selected ? 'font-semibold' : 'font-normal',
                                'ml-3 block truncate capitalize',
                              ]"
                              >{{ person.code }}</span
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
            <div
              class="mt-4 mb-4 grid grid-cols-1 gap-4 gap-y-8 sm:grid-cols-2"
            >
              <Listbox as="div" v-model="selectedTipe[index]">
                <ListboxLabel
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Tipe</ListboxLabel
                >
                <div class="relative mt-2">
                  <ListboxButton
                    class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  >
                    <span class="flex items-center">
                      <span
                        v-if="selectedTipe[index]"
                        class="ml-3 block truncate capitalize"
                      >
                        {{ selectedTipe[index].tipe }}</span
                      >
                      <span v-else class="ml-3 block truncate capitalize">
                        Pilih Tipe</span
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
                        v-for="person in tipe"
                        :key="person.id"
                        :value="person"
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
                          <div class="flex items-center">
                            <span
                              :class="[
                                selected ? 'font-semibold' : 'font-normal',
                                'ml-3 block truncate capitalize',
                              ]"
                              >{{ person.tipe }}</span
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
            <div
              class="mt-4 mb-4 grid grid-cols-1 gap-4 gap-y-8 sm:grid-cols-2"
            >
              <div class="">
                <label
                  :for="'jumlah-' + barang.id"
                  class="block text-sm font-medium leading-6 text-gray-900 capitalize"
                  >Jumlah</label
                >
                <div class="mt-2">
                  <input
                    type="number"
                    name="jumlah"
                    v-model="barang.jumlah"
                    :id="'jumlah-' + barang.id"
                    autocomplete="given-name"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 mb-4 ms-8 me-8 flex items-center justify-between">
        <div class="flex gap-x-6">
          <button
            type="button"
            @click="tambahFormInput"
            class="text-sm font-semibold text-white bg-gray-900 border border-white-300 hover:bg-white hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-white rounded-md text-sm px-5 py-2 text-center inline-flex items-center"
          >
            Tambah Form
          </button>
          <button
            type="button"
            @click="hapusFormInput"
            class="text-sm font-semibold text-gray-900 bg-white border border-gray-300 hover:bg-gray-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-md text-sm px-3 py-2 text-center inline-flex items-center"
          >
            Hapus Form
          </button>
        </div>
        <div class="flex gap-x-6">
          <button
            type="button"
            @click="navigate"
            class="text-sm font-semibold leading-6 text-sm font-semibold text-gray-900 bg-white border border-gray-300 hover:bg-gray-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-md text-sm px-3 py-2 text-center inline-flex items-center"
          >
            Batal
          </button>
          <button
            type="submit"
            class="text-sm font-semibold text-white bg-gray-900 border border-white-300 hover:bg-white hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-white rounded-md text-sm px-3 py-2 text-center inline-flex items-center"
          >
            Simpan
          </button>
        </div>
      </div>
    </form>
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @close="closeModals()">
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
  </div>
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
      tipe: [
        { bool: true, tipe: "masuk" },
        { bool: false, tipe: "keluar" },
      ],
      color: [],
      selectedKategori: "",
      selectedStatus: "",
      selectedItems: [],
      selectAll: false,
      formattedPrice: "",
      image: "",
      barang: {},
      selectedList: [],
      list: [],
      selectedTipe: [],
      formInput: 1,
      barangs: [
        {
          id: this.formInput,
          code: "",
          nama: "",
          jumlah: "",
          deskripsi: "",
          isActive: "",
        },
      ],
      message: "",
      success: true,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  computed: {
    sortedList() {
      const sort = this.list.sort((a, b) => a.nama.localeCompare(b.nama));
      return sort;
    },
  },
  methods: {
    handleSelect(person) {
      const indexToRemove = this.list.findIndex(
        (item) => item.id === person.id
      );

      if (indexToRemove !== -1) {
        this.list.splice(indexToRemove, 1);
      }

      this.selectedList[this.index] = person;
    },
    updateStatus() {
      for (let i = 0; i < this.barangs.length; i++) {
        this.barangs[i].status_id = this.selectedKategori.id;
      }
      console.log(this.selectedKategori.id);
    },
    addBarang() {
      const stok = this.barangs.map((barang, index) => ({
        code: this.selectedList[index] ? this.selectedList[index].code : null,
        tipe: this.selectedTipe[index] ? this.selectedTipe[index].tipe : null,
        jumlah: barang.jumlah,
      }));
      axios
        .post("/api/stok", stok)
        .then((response) => {
          console.log(response);
          this.message = "Stok berhasil di perbarui.";
          this.success = true;
          this.open = true;
        })
        .catch((error) => {
          this.message = "Jumlah barang tidak cukup.";
          this.open = true;
          this.success = false;
          console.log(stok);
        });
    },
    fetchData() {
      axios
        .get("/api/barang")
        .then((response) => {
          this.list = response.data.data;
          console.log(this.barang);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    tambahFormInput() {
      const newFormInput = {
        id: this.formInput,
        code: "",
        nama: "",
        jumlah: "",
        deskripsi: "",
        isActive: "",
      };

      this.formInput++;

      this.barangs.push(newFormInput);
    },
    hapusFormInput() {
      this.barangs.pop();
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
