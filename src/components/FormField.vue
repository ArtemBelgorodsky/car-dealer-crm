<template>
  <div class="form-group">
    <label v-if="label" class="form-label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>
    
    <input
      v-if="type !== 'textarea' && type !== 'select'"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      class="form-input"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />

    <select
      v-else-if="type === 'select'"
      :value="modelValue"
      :disabled="disabled"
      :required="required"
      class="form-input"
      @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option value="">{{ placeholder || 'Выберите значение' }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    
    <textarea
      v-else
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      class="form-textarea"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
    
    <p v-if="error" class="form-error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  modelValue?: string | number
  type?: string
  label?: string
  placeholder?: string
  options?: Array<{ label: string; value: string }>
  error?: string
  required?: boolean
  disabled?: boolean
}>(), {
  type: 'text',
  options: () => []
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()
</script>

<style scoped>
.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #1e293b;
  font-size: 14px;
}

.required {
  color: #ef4444;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-family: inherit;
  font-size: 14px;
  transition: all 0.2s;
  color: #1e293b;
  background-color: #ffffff;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-input:disabled,
.form-textarea:disabled {
  background-color: #f8fafc;
  cursor: not-allowed;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.form-error {
  color: #ef4444;
  font-size: 12px;
  margin-top: 4px;
}
</style>
