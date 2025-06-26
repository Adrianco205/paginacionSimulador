export function fifo(pages, frameCount) {
  const memory = Array(frameCount).fill(null); // marcos fijos
  const queue = []; // mantiene el orden FIFO
  const steps = [];

  for (const page of pages) {
    const isHit = memory.includes(page);

    if (!isHit) {
      if (queue.length < frameCount) {
        // Hay espacio libre
        const emptyIndex = memory.indexOf(null);
        memory[emptyIndex] = page;
        queue.push(page);
      } else {
        // Reemplazo FIFO
        const toRemove = queue.shift();
        const indexToReplace = memory.indexOf(toRemove);
        memory[indexToReplace] = page;
        queue.push(page);
      }
    }

    steps.push({
      page,
      memory: [...memory], // estado completo fijo
      hit: isHit ? '✔️' : '❌'
    });
  }

  return steps;
}
