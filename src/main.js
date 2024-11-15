import './assets/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useKakao } from 'vue3-kakao-maps';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

useKakao('a55f2a7d9703cdee565c4c05eca9def0', ['clusterer', 'services', 'drawing']); // 각 라이브러리는 ',(콤마)'로 구분합니다.
app.mount('#app')
