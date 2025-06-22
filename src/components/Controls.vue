<template>
  <div class="mb-6">
    <button
      :disabled="!canStart"
      @click="$emit('simulate')"
      class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
    >
      Ejecutar simulación
    </button>
    <button
      @click="$emit('reset')"
      class="ml-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
    >
      Reiniciar
    </button>
  </div>
</template>

<script setup>
defineProps({
  canStart: Boolean
});
</script>
