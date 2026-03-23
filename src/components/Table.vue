<template>
  <div class="table-wrapper">
    <table class="table">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column">
            {{ column }}
          </th>
          <th v-if="$slots.actions">Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, idx) in rows" :key="idx">
          <td v-for="(column, colIdx) in columns" :key="colIdx">
            <slot :name="`cell-${column}`" :row="row" :column="column">
              {{ row[column as keyof typeof row] }}
            </slot>
          </td>
          <td v-if="$slots.actions" class="actions-cell">
            <slot name="actions" :row="row" />
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="rows.length === 0" class="empty-state">
      <p>Нет данных для отображения</p>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
defineProps<{
  columns: string[]
  rows: T[]
}>()
</script>

<style scoped>
.table-wrapper {
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
}

.table thead {
  background-color: #f8fafc;
  border-bottom: 2px solid #e2e8f0;
}

.table th {
  padding: 12px;
  text-align: left;
  font-weight: 600;
  color: #1e293b;
  font-size: 12px;
  text-transform: uppercase;
}

.table td {
  padding: 12px;
  border-bottom: 1px solid #e2e8f0;
  color: #64748b;
}

.table tbody tr:hover {
  background-color: #f8fafc;
}

.actions-cell {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #64748b;
}
</style>
