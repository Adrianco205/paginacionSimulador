<template>
  <div class="algorithm-selector">
    <label class="label-title">Selecciona el algoritmo:</label>
    <div class="radio-group">
      <label class="radio-option">
        <input type="radio" value="fifo" v-model="selected" />
        <span>FIFO</span>
      </label>
      <label class="radio-option">
        <input type="radio" value="lru" v-model="selected" />
        <span>LRU</span>
      </label>
    </div>
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
