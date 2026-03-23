<template>
  <div :class="['alert', `alert-${variant}`]">
    <div class="alert-content">
      <slot />
    </div>
    <button
      v-if="closable"
      class="alert-close"
      aria-label="Close alert"
      @click="emit('close')"
    >
      ✕
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'success' | 'warning' | 'danger' | 'info'
  closable?: boolean
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<style scoped>
.alert {
  padding: 12px 16px;
  border-radius: 8px;
  border-left: 4px solid;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.alert-content {
  flex: 1;
}

.alert-success {
  background-color: #ecfdf5;
  border-color: #10b981;
  color: #065f46;
}

.alert-warning {
  background-color: #fffbeb;
  border-color: #f59e0b;
  color: #92400e;
}

.alert-danger {
  background-color: #fef2f2;
  border-color: #ef4444;
  color: #7f1d1d;
}

.alert-info {
  background-color: #eff6ff;
  border-color: #2563eb;
  color: #0c2d6b;
}

.alert-close {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: currentColor;
  opacity: 0.7;
  transition: opacity 0.2s;
  padding: 0;
  margin-left: 12px;
}

.alert-close:hover {
  opacity: 1;
}
</style>
