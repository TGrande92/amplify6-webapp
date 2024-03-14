import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { Amplify } from 'aws-amplify';
import amplifyconfig from './amplifyconfiguration.json';

//call this first to set up the Amplify library
Amplify.configure(amplifyconfig);

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
