<template>
  <div class="simulation-table">
    <h2 class="title">Simulación paso a paso:</h2>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Paso</th>
            <th>Página Referenciada</th>
            <th v-for="(f, i) in steps[0]?.memory.length" :key="i">
              Marco {{ i + 1 }}
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
            <td
              v-for="(frame, i) in step.memory"
              :key="i"
            >
              {{ frame !== undefined ? frame : '-' }}
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
  }
});
</script>
