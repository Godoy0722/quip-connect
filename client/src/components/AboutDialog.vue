<template>
  <v-dialog
    v-model="dialog"
    max-width="600"
    role="dialog"
    aria-labelledby="about-dialog-title"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        icon
        variant="text"
        v-bind="props"
        aria-label="About QuipConnect"
      >
        <v-icon aria-hidden="true">mdi-information-outline</v-icon>
      </v-btn>
    </template>
    
    <v-card>
      <v-card-title id="about-dialog-title" class="text-h5 font-weight-bold d-flex align-center">
        <v-icon size="32" color="primary" class="me-2" aria-hidden="true">mdi-message-text</v-icon>
        About QuipConnect
      </v-card-title>
      
      <v-card-text>
        <section aria-labelledby="about-description">
          <h3 id="about-description" class="visually-hidden">Description</h3>
          <p class="mb-4">
            QuipConnect is a real-time humorous response system built with Vue.js and Node.js using Socket.IO.
          </p>
        </section>
        
        <section aria-labelledby="about-features">
          <h3 id="about-features" class="font-weight-bold mb-2">Features:</h3>
          <ul class="mb-4 ps-5">
            <li>Real-time messaging with Socket.IO</li>
            <li>Modern, minimalist UI with Vuetify</li>
            <li>Dark mode with system preference detection</li>
            <li>Accessibility-friendly design</li>
            <li>Responsive layout for all devices</li>
          </ul>
        </section>
        
        <section aria-labelledby="about-usage">
          <h3 id="about-usage" class="font-weight-bold mb-2">How to Use:</h3>
          <ol class="mb-4 ps-5">
            <li>Type any message in the input field</li>
            <li>Receive a funny response instantly</li>
            <li>Toggle dark/light mode using the theme button</li>
          </ol>
        </section>
        
        <section aria-labelledby="about-status">
          <h3 id="about-status" class="visually-hidden">Status Information</h3>
          <div class="d-flex align-center mb-2">
            <v-icon class="me-2" aria-hidden="true">mdi-theme-light-dark</v-icon>
            <span class="font-weight-bold">Theme:</span>
            <span class="ms-2">{{ isDark ? 'Dark' : 'Light' }} Mode</span>
          </div>
          
          <div class="d-flex align-center mb-2">
            <v-icon class="me-2" aria-hidden="true">mdi-connection</v-icon>
            <span class="font-weight-bold">Status:</span>
            <v-chip :color="connected ? 'success' : 'warning'" size="small" class="ms-2" pill>
              {{ connected ? 'Connected' : 'Connecting...' }}
            </v-chip>
          </div>
        </section>
      </v-card-text>
      
      <v-divider></v-divider>
      
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          variant="text"
          @click="dialog = false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { useThemeStore } from '../store/theme';

// eslint-disable-next-line
defineProps({
  connected: {
    type: Boolean,
    default: false
  }
});

const { isDark } = useThemeStore();

const dialog = ref(false);
</script>

<style scoped>
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style> 