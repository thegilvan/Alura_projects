import criarItemDaLista from "./scripts/criarItemDaLista.js";
import { listaCompradosVazia } from "./scripts/verifyIfListaVazia.js";

const inputItem = document.getElementById("input-item");
const listaCompras = document.getElementById("lista-de-compras");
const listaComprados = document.getElementById("lista-comprados");
const addItemBtn = document.getElementById("adicionar-item");
const form = document.querySelector("form");

listaCompradosVazia(listaComprados);

form.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
    addItemBtn.click();
  }
});

addItemBtn.addEventListener("click", () => {
  if (inputItem.value.trim()) {
    criarItemDaLista(listaCompras, listaComprados);
  } else {
    alert("insira um item válido!");
  }
  inputItem.value = "";
});

// Drag and drop ------------------------------------------------------------->

[listaCompras, listaComprados].forEach((list) => {
  list.addEventListener("dragover", (e) => {
    e.preventDefault();
    const dragging = document.querySelector(".dragging");
    if (!dragging) return;
    const afterElement = getDragAfterElement(list, e.clientY);
    if (afterElement == null) {
      list.appendChild(dragging);
    } else {
      list.insertBefore(dragging, afterElement);
    }
  });
});

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll("li:not(.dragging)")];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2; //aqui o valor do box sendo negativo menos o valor negativo do box.height/2 eles vão se somar e o resultado vai ser o middle point do child
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child }; //como vai retornar um object o .element no final do reduce garante que que será avaliado depois seja o key element com o value child
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
// End of Drag and drop------------------------------------------------------>
