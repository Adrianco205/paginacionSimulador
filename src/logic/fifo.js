export function fifo(pages, frameCount) {
  const memory = [];
  const queue = [];
  const steps = [];

  for (const page of pages) {
    const isHit = memory.includes(page);

    if (!isHit) {
      if (memory.length < frameCount) {
        memory.push(page);
        queue.push(page);
      } else {
        const toRemove = queue.shift();            // FIFO: primero en entrar
        const index = memory.indexOf(toRemove);
        if (index !== -1) {
          memory.splice(index, 1);                 // eliminar de memoria
        }
        memory.push(page);                         // agregar nuevo
        queue.push(page);                          // mantener orden
      }
    }

    steps.push({
      page,
      memory: [...memory],
      hit: isHit ? '✔️' : '❌'
    });
  }

  return steps;
}
