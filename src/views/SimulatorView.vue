<template>
  <main class="simulator-container">
    <!-- Entrada de datos -->
    <PageInput @set-data="handleData" />

    <!-- Selector de algoritmo -->
    <AlgorithmSelector @set-algo="algo = $event" />

    <!-- Controles -->
    <Controls
      :canStart="canSimulate"
      @simulate="runSimulation"
      @reset="resetSimulation"
    />

    <!-- Resultados -->
    <SimulationTable v-if="steps.length" :steps="steps" :frames="frames" />
    <ResultSummary v-if="steps.length" :steps="steps" />
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import PageInput from '../components/PageInput.vue';
import AlgorithmSelector from '../components/AlgorithmSelector.vue';
import Controls from '../components/Controls.vue';
import SimulationTable from '../components/SimulationTable.vue';
import ResultSummary from '../components/ResultSummary.vue';

import { fifo } from '../logic/fifo.js';
import { lru } from '../logic/lru.js';

const pages = ref([]);
const frames = ref(0);
const algo = ref('fifo');
const steps = ref([]);

function handleData(data) {
  pages.value = data.pages;
  frames.value = data.frames;
}

const canSimulate = computed(() => pages.value.length > 0 && frames.value > 0);

function runSimulation() {
  steps.value = algo.value === 'fifo'
    ? fifo(pages.value, frames.value)
    : lru(pages.value, frames.value);
}

function resetSimulation() {
  pages.value = [];
  frames.value = 0;
  algo.value = 'fifo';
  steps.value = [];
}
</script>
