import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faEdit, faBars } from '@fortawesome/free-solid-svg-icons'
import dayjsPlugin from './dayjs'

library.add(faTrash, faEdit, faBars)


const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(dayjsPlugin) 
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
