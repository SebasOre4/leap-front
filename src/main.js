import "vuestic-ui/css"
import './assets/main.scss'

import { createApp } from 'vue'
import { vuestic } from './plugins/vuestic'
import FontAwesomeIcon from './plugins/fontawesome'
import i18n from './plugins/i18n'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component("fa-icon", FontAwesomeIcon)
app.use(router)
app.use(i18n)
app.use(vuestic)
app.mount('#app')
