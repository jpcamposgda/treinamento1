import { createApp } from 'vue'

import App from './App.vue'

import Toast, { POSITION } from "vue-toastification";

import router from './router'

import './assets/css/tailwind.css'

import './assets/css/fonts.css'

import 'animate.css';
import './assets/tailwind.css'

import "vue-toastification/dist/index.css";

createApp(App)
.use(router)
.use(Toast, {position: POSITION.BOTTOM_RIGHT})
.mount('#app')
