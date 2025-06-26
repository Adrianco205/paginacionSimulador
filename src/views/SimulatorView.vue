<template>
  <main class="simulator-container" style="max-width: 1600px; margin: auto;">
    <PageInput @set-data="handleData" />

    <AlgorithmSelector @set-algo="algo = $event" />

    <Controls
      :canStart="canSimulate"
      @simulate="runSimulation"
      @simulate-both="runBothSimulations"
      @reset="resetSimulation"
      @show-documentation="showDocumentation = true"
    />


<section
  v-if="steps.length > 0 && algo !== 'both'"
  class="result-section"
>
  <h2>
    {{ algo === 'fifo' ? '🟡 Resultado FIFO' : '🔵 Resultado LRU' }}
  </h2>
  <SimulationTable :steps="steps" :frames="frames" />
  <ResultSummary :steps="steps" />
</section>

<div
  v-if="stepsFIFO.length > 0 || stepsLRU.length > 0"
  class="results-row"
>
  <section class="result-column">
    <h2>🟡 Resultado FIFO</h2>
    <SimulationTable :steps="stepsFIFO" :frames="frames" />
    <ResultSummary :steps="stepsFIFO" />
  </section>

  <section class="result-column">
    <h2>🔵 Resultado LRU</h2>
    <SimulationTable :steps="stepsLRU" :frames="frames" />
    <ResultSummary :steps="stepsLRU" />
  </section>
</div>

<DocumentationModal :isVisible="showDocumentation" @close="showDocumentation = false" />

  </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import PageInput from '../components/PageInput.vue';
import AlgorithmSelector from '../components/AlgorithmSelector.vue';
import Controls from '../components/Controls.vue';
import SimulationTable from '../components/SimulationTable.vue';
import ResultSummary from '../components/ResultSummary.vue';
import DocumentationModal from '../components/DocumentationModal.vue'; // ¡Importamos el nuevo componente!

import { fifo } from '../logic/fifo.js';
import { lru } from '../logic/lru.js';

const pages = ref([]);
const frames = ref(0);
const algo = ref('fifo');
const steps = ref([]);
const stepsFIFO = ref([]);
const stepsLRU = ref([]);
const currentStepFIFO = ref(0);
const currentStepLRU = ref(0);
const showDocumentation = ref(false); // ¡Nueva variable de estado para el modal!

async function runBothSimulations() {
  const fifoResult = fifo(pages.value, frames.value);
  const lruResult = lru(pages.value, frames.value);

  steps.value = [];
  stepsFIFO.value = [];
  stepsLRU.value = [];
  currentStepFIFO.value = 0;
  currentStepLRU.value = 0;

  const maxSteps = Math.max(fifoResult.length, lruResult.length);

  for (let i = 0; i < maxSteps; i++) {
    await new Promise(res => setTimeout(res, 600));

    if (i < fifoResult.length) {
      stepsFIFO.value = [...stepsFIFO.value, fifoResult[i]];
      currentStepFIFO.value = i + 1;
    }

    if (i < lruResult.length) {
      stepsLRU.value = [...stepsLRU.value, lruResult[i]];
      currentStepLRU.value = i + 1;
    }
  }
}

function handleData(data) {
  pages.value = data.pages;
  frames.value = data.frames;
}

const canSimulate = computed(() => pages.value.length > 0 && frames.value > 0);

function runSimulation() {
  stepsFIFO.value = [];
  stepsLRU.value = [];
  steps.value = [];

  if (algo.value === 'fifo') {
    steps.value = fifo(pages.value, frames.value);
  } else if (algo.value === 'lru') {
    steps.value = lru(pages.value, frames.value);
  } else if (algo.value === 'both') {
    runBothSimulations();
  }
}

function resetSimulation() {
  pages.value = [];
  frames.value = 0;
  algo.value = 'fifo';
  steps.value = [];
  stepsFIFO.value = [];
  stepsLRU.value = [];
  currentStepFIFO.value = 0;
  currentStepLRU.value = 0;
}
</script>

<style scoped>
.result-section {
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #444;
  border-radius: 8px;
  background-color: #1f1f1f;
  color: white;
}

.results-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.result-column {
  background-color: var(--result-bg);
  color: var(--result-text);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}


/* Variables para tema claro */
:root {
  --result-bg: #f8f8f8;
  --result-text: #000000;
}

/* Variables para tema oscuro */
@media (prefers-color-scheme: dark) {
  :root {
    --result-bg: #1f1f1f;
    --result-text: #ffffff;
  }
}

</style>