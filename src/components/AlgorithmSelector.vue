<template>
  <div class="algorithm-selector">
    <label class="label-title">Selecciona el algoritmo:</label>
    <div class="radio-group">
      <label class="radio-option">
        <input type="radio" value="fifo" v-model="selected" />
        <span>FIFO</span>
      </label>
      <label class="radio-option">
        <input type="radio" value="lru" v-model="selected" />
        <span>LRU</span>
      </label>
      <label class="radio-option">
        <input type="radio" value="both" v-model="selected" />
        <span>Simular ambos</span>
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
// Esto es una prueba
const selected = ref('fifo'); // Puedes iniciar vacío si quieres que el usuario elija obligatoriamente
const emit = defineEmits(['set-algo']);

watch(selected, (val) => {
  emit('set-algo', val);
});
</script>

<style scoped>
.algorithm-selector {
  margin-top: 1rem;
  padding: 1rem;
  background-color: var(--result-bg);
  color: var(--result-text);
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}

.label-title {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.radio-group {
  display: flex;
  gap: 2rem;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
