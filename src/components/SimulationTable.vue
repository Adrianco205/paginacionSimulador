<template>
  <div class="simulation-table">
    <h2 class="title">Simulación paso a paso:</h2>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Paso</th>
            <th>Página Referenciada</th>
            <th v-for="i in frames" :key="i">
              Marco {{ i }}
            </th>
            <th>¿Fallo de página?</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(step, index) in steps"
            :key="index"
            :class="step.hit === '❌' ? 'fail' : 'hit'"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ step.page }}</td>
              <td v-for="i in frames" :key="i">
                {{ step.memory[i - 1] !== null && step.memory[i - 1] !== undefined ? step.memory[i - 1] : '-' }}
              </td>
            <td class="icon">{{ step.hit }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  steps: {
    type: Array,
    required: true
  },
  frames: {
    type: Number,
    required: true
  }
});
</script>
