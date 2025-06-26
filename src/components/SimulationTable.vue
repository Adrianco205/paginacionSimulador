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
<style scoped>
.simulation-table {
  width: 100%;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  min-width: 600px;
}

th, td {
  border: 1px solid #444;
  padding: 0.75rem;
  text-align: center;
  word-wrap: break-word;
  color: #fff;
}

th {
  background-color: #003366;
  color: #fff;
}

td.icon {
  font-size: 1.3rem;
}

/* Suaviza el verde y rojo, números blancos */
.fail {
  background-color: #5a1c1c;  /* rojo oscuro suavizado */
  color: #fff;
}

.hit {
  background-color: #1e3b1e;  /* verde oscuro suavizado */
  color: #fff;
}

/* Mejora contraste del header */
.title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #eee;
}
</style>

