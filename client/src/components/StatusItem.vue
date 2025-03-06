<template>
  <div class="d-flex align-center mb-2">
    <v-icon class="me-2" aria-hidden="true">{{ icon }}</v-icon>
    <span class="font-weight-bold">{{ label }}:</span>
    <v-chip v-if="chip" :color="chipColor" size="small" class="ms-2" pill>{{ value }}</v-chip>
    <span v-else class="ms-2">{{ value }}</span>
  </div>
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
  value: {
    type: String,
    required: true
  },
  chip: {
    type: Boolean,
    default: false
  },
  chipColor: {
    type: String,
    default: 'primary'
  }
});
</script> 