<template>
<div class="mb-4">
    <label class="block font-semibold">Secuencia de páginas (separadas por coma):</label>
    <input
    v-model="pageInput"
    type="text"
    class="w-full border rounded px-2 py-1 mt-1"
    placeholder="Ej: 7, 0, 1, 2, 0, 3"
    />

    <label class="block font-semibold mt-4">Número de marcos:</label>
    <input
    v-model.number="frames"
    type="number"
    class="w-24 border rounded px-2 py-1 mt-1"
    min="1"
    />

    <button
    @click="emitData"
    class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
    Confirmar datos
    </button>
</div>
</template>

<script setup>
import { ref } from 'vue';

const pageInput = ref('');
const frames = ref(3);

const emit = defineEmits(['set-data']);

function emitData() {
const pages = pageInput.value
    .split(',')
    .map(p => parseInt(p.trim()))
    .filter(p => !isNaN(p));

emit('set-data', { pages, frames: frames.value });
}
</script>
