import { createApp } from 'vue'
import { stateSymbol, createState } from './store';
import App from './App.vue'
import './index.css'
import {router} from './router'

const app = createApp(App)
app.use(router)
app.provide(stateSymbol, createState());
app.mount('#app')
