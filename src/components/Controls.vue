<template>
  <div class="controls-container">
    <button
      :disabled="!canStart"
      @click="$emit('simulate')"
      class="btn-champions"
    >
      🚀 Ejecutar simulación
    </button>

    <button @click="$emit('reset')" class="btn-champions secondary">
      ♻️ Reiniciar
    </button>

    <button @click="$emit('show-documentation')" class="btn-champions tertiary">
      📚 Documentación
    </button>
  </div>
</template>

<script setup>
defineProps({
  canStart: Boolean
});

// Agregamos el emit para el nuevo evento
defineEmits(['simulate', 'reset', 'show-documentation']);
</script>

<style scoped>
.btn-champions.tertiary {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  margin-left: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  /* Estilos para que combine con el tema */
  background-color: #004D98; /* Azul oscuro para el botón de docs */
  color: #fff;
  box-shadow: 0 0 0px rgba(0, 77, 152, 0.6);
}
.btn-champions.tertiary:hover {
  background-color: #003366; /* Un azul más oscuro al pasar el mouse */
  box-shadow: 0 0 20px rgba(0, 77, 152, 0.9), 0 0 30px rgba(0, 77, 152, 0.5);
  transform: scale(1.05);
}

/* Ajustes para el modo claro */
body.light .btn-champions.tertiary {
  background-color: #2196f3; /* Un azul más claro para el modo claro */
  color: #fff;
}
body.light .btn-champions.tertiary:hover {
  background-color: #1976d2;
}
</style>