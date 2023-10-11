import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddBarang from "../views/AddBarang.vue";
import AddStok from "../views/AddStok.vue";
import BarangView from "../views/BarangView.vue";
import StokView from "../views/StokView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/addbarang",
    name: "Add Barang",
    component: AddBarang,
  },
  {
    path: "/addstok",
    name: "Add Stok",
    component: AddStok,
  },
  {
    path: "/barang",
    name: "Barang",
    component: BarangView,
  },
  {
    path: "/stok",
    name: "Stok",
    component: StokView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
