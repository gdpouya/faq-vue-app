import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles.css'
import './assets/Fonts/stylesheet.css'

createApp(App).use(router).mount('#app')
