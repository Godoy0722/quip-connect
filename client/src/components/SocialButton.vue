<template>
  <v-btn 
    icon 
    variant="text" 
    :aria-label="label" 
    :href="url" 
    target="_blank" 
    rel="noopener noreferrer" 
    density="comfortable"
  >
    <v-icon aria-hidden="true">{{ icon }}</v-icon>
  </v-btn>
</template>

<script setup>
// eslint-disable-next-line
defineProps({
  icon: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});
</script> 