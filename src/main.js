import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/app.css";
import axios from "axios";

// axios.defaults.baseURL = "http://127.0.0.1:8080";
axios.defaults.baseURL = "https://asaba-be.vercel.app";
createApp(App).use(store).use(router).mount("#app");
