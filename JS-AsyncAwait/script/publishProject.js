export async function publishProject(name, description, tags) {
  return new Promise((resolve, reject) => {
    const random = Math.random();
    setTimeout(() => {
      if (random > 0.5) {
        resolve();
      } else {
        reject(new Error("Falha simulada"));
      }
    }, 1000);
  });
}
