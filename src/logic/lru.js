export function lru(pages, frameCount) {
  const memory = [];
  const lastUsed = new Map();
  const steps = [];

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const isHit = memory.includes(page);

    if (isHit) {
      lastUsed.set(page, i);
    } else {
      if (memory.length < frameCount) {
        memory.push(page);
      } else {
        let lruPage = null;
        let minIndex = Infinity;

        for (const p of memory) {
          const lastIndex = lastUsed.get(p) ?? -1;
          if (lastIndex < minIndex) {
            minIndex = lastIndex;
            lruPage = p;
          }
        }

        const indexToReplace = memory.indexOf(lruPage);
        memory[indexToReplace] = page;
      }

      lastUsed.set(page, i); // 🔥 este es el punto clave
    }

    steps.push({
      page,
      memory: [...memory],
      hit: isHit ? '✔️' : '❌',
    });
  }

  return steps;
}
