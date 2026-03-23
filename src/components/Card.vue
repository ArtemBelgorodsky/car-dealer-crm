<template>
  <div
    :class="[
      'card',
      { 'card-hover': hoverable }
    ]"
  >
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>
    
    <div class="card-body">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  hoverable?: boolean
}>()
</script>

<style scoped>
.card {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.card-hover {
  transition: all 0.2s;
  cursor: pointer;
}

.card-hover:hover {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  border-color: #2563eb;
}

.card-header {
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e2e8f0;
}

.card-body {
  margin-bottom: 16px;
}

.card-footer {
  border-top: 1px solid #e2e8f0;
  padding-top: 12px;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}
</style>
