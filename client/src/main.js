import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { useThemeStore } from './store/theme'

const app = createApp(App)

const { initTheme } = useThemeStore();
const initialTheme = initTheme();
vuetify.theme.global.name = initialTheme;

app.use(vuetify)

app.mount('#app')
