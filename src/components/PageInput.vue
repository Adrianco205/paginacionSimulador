<template>
  <div class="form-wrapper">
    <label>Secuencia de páginas (separadas por coma):</label>
    <input
      v-model="pageInput"
      type="text"
      placeholder="Ej: 7, 0, 1, 2, 0, 3"
    />

    <label>Número de marcos:</label>
    <input
      v-model.number="frames"
      type="number"
      min="1"
    />

    <button
      @click="emitData"
      class="btn-champions mt-4"
    >
      ✅ Confirmar datos
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const pageInput = ref('');
const frames = ref(3);

const emit = defineEmits(['set-data']);

function emitData() {
  const pages = pageInput.value
    .split(',')
    .map(p => parseInt(p.trim()))
    .filter(p => !isNaN(p));

  emit('set-data', { pages, frames: frames.value });
}
</script>
