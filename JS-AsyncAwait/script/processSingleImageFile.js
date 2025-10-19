export async function processSingleFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({ name: file.name, dataUrl: reader.result });
    };
    reader.onerror = () => {
      reject(alert("Erro no carregamento do arquivo"));
    };
    reader.readAsDataURL(file);
  });
}
