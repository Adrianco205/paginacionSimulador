<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <button class="close-button" @click="closeModal">✖️</button>
      <h2>📚 Documentación del Simulador de Paginación</h2>

      <section>
        <h3>¿Cómo usar la página?</h3>
        <p>
          Este simulador te permite visualizar el funcionamiento de los algoritmos de reemplazo de páginas FIFO (First-In, First-Out) y LRU (Least Recently Used).
        </p>
        <ol>
          <li>
            <strong>Ingresa los datos:</strong> En la sección "Entrada de datos", introduce la secuencia de páginas (números separados por comas, ej: 1,2,3,4,1,2,5) y el número de marcos de memoria (un número entero, ej: 3).
          </li>
          <li>
            <strong>Selecciona el algoritmo:</strong> Elige entre FIFO, LRU o "Simular ambos" para comparar el rendimiento.
          </li>
          <li>
            <strong>Ejecuta la simulación:</strong> Haz clic en el botón "🚀 Ejecutar simulación" para ver el paso a paso.
          </li>
          <li>
            <strong>Reinicia:</strong> Usa el botón "♻️ Reiniciar" para limpiar los datos y comenzar una nueva simulación.
          </li>
        </ol>
      </section>

      <section>
        <h3>¿Cómo funciona el simulador? (Interfaz de Usuario)</h3>
        <p>
          El simulador te mostrará una tabla con cada paso de la simulación.
        </p>
        <ul>
          <li>
            <strong>Paso:</strong> El número de la operación actual.
          </li>
          <li>
            <strong>Página Referenciada:</strong> La página que está siendo solicitada en ese paso.
          </li>
          <li>
            <strong>Marco [X]:</strong> El contenido actual de cada marco de memoria.
          </li>
          <li>
            <strong>¿Fallo de página?:</strong> Indica si la página solicitada causó un fallo (❌) o si ya estaba en memoria (✔️).
          </li>
        </ul>
        <p>
          Al final de cada simulación (o ambas), se mostrará un resumen con el número total de fallos de página y aciertos, junto con los porcentajes correspondientes.
        </p>
      </section>

      <section>
        <h3>Análisis del Software: ¿Cómo funciona por dentro?</h3>
        <p>
          El simulador está construido como una aplicación de una sola página (SPA) utilizando el framework Vue.js. Su estructura modular facilita la gestión de la interfaz de usuario y la lógica de los algoritmos.
        </p>
        <h4>Componentes Clave:</h4>
        <ul>
          <li>
            <strong><code>App.vue</code>:</strong> Es el componente raíz que carga la vista principal.
          </li>
          <li>
            <strong><code>SimulatorView.vue</code>:</strong> Actúa como la vista principal de la aplicación. Contiene la lógica para coordinar los datos de entrada, la selección del algoritmo y la presentación de los resultados. Además, es responsable de llamar a las funciones de simulación y manejar el estado de los pasos.
          </li>
          <li>
            <strong><code>PageInput.vue</code>:</strong> Este componente se encarga de la entrada de la secuencia de páginas y el número de marcos de memoria por parte del usuario. Emite un evento <code>set-data</code> con los valores ingresados.
          </li>
          <li>
            <strong><code>AlgorithmSelector.vue</code>:</strong> Permite al usuario seleccionar el algoritmo de reemplazo de páginas (FIFO, LRU o ambos). Emite un evento <code>set-algo</code> con la opción seleccionada.
          </li>
          <li>
            <strong><code>Controls.vue</code>:</strong> Proporciona los botones para "Ejecutar simulación", "Reiniciar" y "Documentación". Emite eventos para cada acción.
          </li>
          <li>
            <strong><code>SimulationTable.vue</code>:</strong> Es responsable de renderizar la tabla paso a paso de la simulación. Recibe como props los pasos y el número de marcos.
          </li>
          <li>
            <strong><code>ResultSummary.vue</code>:</strong> Este componente sería el encargado de mostrar el resumen final de la simulación (fallos de página, aciertos, porcentajes).
          </li>
          <li>
            <strong><code>DocumentationModal.vue</code>:</strong> El componente actual, que muestra esta documentación.
          </li>
        </ul>
        <h4>Lógica de los Algoritmos:</h4>
        <ul>
          <li>
            <strong><code>fifo.js</code>:</strong> Contiene la implementación del algoritmo FIFO. Recibe la secuencia de páginas y el número de marcos, y devuelve un array de pasos que detallan el estado de la memoria en cada iteración, indicando si hubo un acierto o un fallo de página.
          </li>
          <li>
            <strong><code>lru.js</code>:</strong> Contiene la implementación del algoritmo LRU. Similar a FIFO, calcula y devuelve los pasos de la simulación, pero utilizando la lógica de "menos recientemente usado" para el reemplazo de páginas.
          </li>
        </ul>
        <h4>Flujo de Datos:</h4>
        <p>
          Los datos de entrada del usuario son capturados por <code>PageInput.vue</code> y enviados a <code>SimulatorView.vue</code>. La selección del algoritmo de <code>AlgorithmSelector.vue</code> también es recibida por <code>SimulatorView.vue</code>. Cuando el usuario presiona "Ejecutar simulación" en <code>Controls.vue</code>, <code>SimulatorView.vue</code> invoca la función del algoritmo (<code>fifo</code> o <code>lru</code>) correspondiente con los datos proporcionados. Los resultados de estas funciones (los pasos de la simulación) son luego pasados a <code>SimulationTable.vue</code> y <code>ResultSummary.vue</code> para su visualización.
        </p>
      </section>

      <section>
        <h3>Algoritmos implementados:</h3>
        <h4>FIFO (First-In, First-Out)</h4>
        <p>
          El algoritmo FIFO reemplaza la página que lleva más tiempo en la memoria. Es sencillo de implementar, pero no siempre es el más eficiente, ya que una página que lleva mucho tiempo puede seguir siendo usada activamente.
        </p>
        <h4>LRU (Least Recently Used)</h4>
        <p>
          El algoritmo LRU reemplaza la página que no ha sido utilizada durante el mayor período de tiempo. Es más eficiente que FIFO en muchos casos, ya que tiende a mantener las páginas más activas en memoria, pero su implementación es más compleja porque requiere rastrear el uso reciente de cada página.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal-content {
  background-color: var(--result-bg);
  color: var(--result-text);
  padding: 2.5rem;
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-align: left;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--result-text);
  padding: 5px;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.close-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #FDB913; /* Color de Champions */
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

h3, h4 {
  color: #004D98; /* Azul de Champions */
  margin-top: 1.5rem;
  margin-bottom: 0.8rem;
  font-size: 1.3rem;
}

p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

ul, ol {
  margin-bottom: 1rem;
  padding-left: 20px;
}

li {
  margin-bottom: 0.5rem;
}

/* Ajustes para modo claro */
body.light .modal-content {
  background-color: #fff;
  color: #333;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

body.light .close-button {
  color: #555;
}

body.light .close-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

body.light h2 {
  color: #d1a000; /* Un amarillo más oscuro para el modo claro */
}

body.light h3, body.light h4 {
  color: #003366; /* Un azul más oscuro para el modo claro */
}

</style>