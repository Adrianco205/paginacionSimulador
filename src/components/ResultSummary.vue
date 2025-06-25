<template>
  <div class="summary-container">
    <h2 class="title">Resumen de la simulación</h2>

    <div class="summary-cards">
      <div class="card card-red">
        <p class="big-number">{{ pageFaults }}</p>
        <p>Fallos de página</p>
      </div>

      <div class="card card-green">
        <p class="big-number">{{ hits }}</p>
        <p>Aciertos</p>
      </div>

      <div class="card card-blue">
        <p class="big-number">{{ total }}</p>
        <p>Total de referencias</p>
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
