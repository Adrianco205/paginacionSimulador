<template>
  <div class="controls-container">
    <button
      :disabled="!canStart"
      @click="$emit('simulate')"
      class="btn-champions"
    >
      🚀 Ejecutar simulación
    </button>

    <button @click="$emit('reset')" class="btn-champions secondary">
      ♻️ Reiniciar
    </button>
  </div>
</template>

<script setup>
defineProps({
  canStart: Boolean
});
</script>

<style scoped>
.btn-champions.tertiary {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  margin-left: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}
.btn-champions.tertiary:hover {
  background-color: #45a049;
}
</style>

