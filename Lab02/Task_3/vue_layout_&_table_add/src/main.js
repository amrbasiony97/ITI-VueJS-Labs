import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'toastr/build/toastr.min.css'
import jQuery from 'jquery'

window.$ = window.jQuery = jQuery

createApp(App).mount('#app')
