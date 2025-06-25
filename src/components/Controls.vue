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