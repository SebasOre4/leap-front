import "vuestic-ui/css";
import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from "pinia";
import { vuestic } from './plugins/vuestic'
import FontAwesomeIcon from './plugins/fontawesome';

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia();

app.component("fa-icon", FontAwesomeIcon)
app.use(pinia)
app.use(router)
app.use(vuestic);
app.mount('#app')
