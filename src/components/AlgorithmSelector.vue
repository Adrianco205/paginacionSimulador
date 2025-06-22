<template>
<div class="mb-4">
    <label class="block font-semibold mb-2">Selecciona el algoritmo:</label>
    <label class="mr-4">
    <input type="radio" value="fifo" v-model="selected" /> FIFO
    </label>
    <label>
    <input type="radio" value="lru" v-model="selected" /> LRU
    </label>
</div>
</template>

<script setup>
import { ref, watch } from 'vue';

const selected = ref('fifo');
const emit = defineEmits(['set-algo']);

watch(selected, (val) => {
emit('set-algo', val);
});
</script>
