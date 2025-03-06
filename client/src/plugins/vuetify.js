import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const lightTheme = {
  dark: false,
  colors: {
    primary: '#128C7E',
    secondary: '#25D366',
    accent: '#34B7F1',
    error: '#E91E63',
    info: '#2196F3',
    success: '#25D366',
    warning: '#FB8C00',
    background: '#e0e0e0',
    surface: '#ffffff',
    'message-sent': '#9de1a5',
    'message-received': '#83add6',
    'text-primary': '#111827',
    'text-secondary': '#4b5563',
    'text-sent': '#0e3816',
    'text-received': '#111827',
  }
}

const darkTheme = {
  dark: true,
  colors: {
    primary: '#00A884',
    secondary: '#00D9BB',
    accent: '#0EABF4',
    error: '#F44336',
    info: '#2196F3',
    success: '#00D26A',
    warning: '#FFA726',
    background: '#1f2c34',
    surface: '#2f4350',
    'message-sent': '#06865c',
    'message-received': '#343f46',
    'text-primary': '#e9edef',
    'text-secondary': '#8696a0',
    'text-sent': '#e9ffef',
    'text-received': '#e4e6eb',
  }
}

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
  },
})

export default vuetify 