<template>
  <div class="mt-6 p-4 bg-gray-50 rounded border">
    <h2 class="text-lg font-semibold mb-2">Resumen de la simulación</h2>

    <div class="flex flex-col sm:flex-row gap-4">
      <div class="flex-1 bg-red-100 border border-red-300 rounded p-3 text-center">
        <p class="text-xl font-bold text-red-700">{{ pageFaults }}</p>
        <p class="text-gray-700">Fallos de página</p>
      </div>

      <div class="flex-1 bg-green-100 border border-green-300 rounded p-3 text-center">
        <p class="text-xl font-bold text-green-700">{{ hits }}</p>
        <p class="text-gray-700">Aciertos</p>
      </div>

      <div class="flex-1 bg-blue-100 border border-blue-300 rounded p-3 text-center">
        <p class="text-xl font-bold text-blue-700">{{ total }}</p>
        <p class="text-gray-700">Total de referencias</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  steps: {
    type: Array,
    required: true
  }
});

const pageFaults = computed(() => props.steps.filter(s => s.hit === '❌').length);
const hits = computed(() => props.steps.filter(s => s.hit === '✔️').length);
const total = computed(() => props.steps.length);
</script>
