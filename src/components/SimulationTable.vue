<template>
  <div class="overflow-x-auto mt-6">
    <h2 class="text-lg font-semibold mb-2">Simulación paso a paso:</h2>

    <table class="min-w-full table-auto border-collapse border border-gray-300">
      <thead class="bg-gray-200">
        <tr>
          <th class="border px-4 py-2">Paso</th>
          <th class="border px-4 py-2">Página Referenciada</th>
          <th class="border px-4 py-2">¿Fallo de página?</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(step, index) in steps"
          :key="index"
          :class="step.hit === '❌' ? 'bg-red-100' : 'bg-green-100'"
        >
          <td class="border px-4 py-2 text-center font-medium">{{ index + 1 }}</td>
          <td class="border px-4 py-2 text-center">{{ step.page }}</td>
          <td
            v-for="(frame, i) in step.memory"
            :key="i"
            class="border px-4 py-2 text-center"
          >
            {{ frame }}
          </td>
          <td class="border px-4 py-2 text-center text-xl">
            {{ step.hit }}
          </td>
        </tr>
      </tbody>
    </table>
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
