const msgVazia = document.querySelector(".msg-vazia");

export function listaCompradosVazia(listaComprados) {
  if (listaComprados.querySelectorAll("li").length == 0) {
    listaComprados.closest("div").style.display = "none";
  } else {
    listaComprados.closest("div").style.display = "block";
  }
}

export function listaComprasVazia(...listas) {
  listas.forEach((lista) => {
    if (lista.querySelectorAll("li").length == 0) {
      msgVazia.style.display = "block";
    } else {
      msgVazia.style.display = "none";
    }
  });
}
