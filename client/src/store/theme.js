import { ref, computed } from 'vue';

const isDark = ref(false);

const theme = computed(() => isDark.value ? 'dark' : 'light');

const initTheme = () => {
  const savedTheme = localStorage.getItem('theme-preference');
  
  const prefersDark = window.matchMedia && 
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    isDark.value = savedTheme === 'dark';
  } else if (prefersDark) {
    isDark.value = true;
  }
  
  return theme.value;
}

const toggleTheme = () => {
  isDark.value = !isDark.value;
  
  localStorage.setItem('theme-preference', theme.value);
  
  return theme.value;
}

export function useThemeStore() {
  return {
    isDark,
    theme,
    initTheme,
    toggleTheme
  };
} 