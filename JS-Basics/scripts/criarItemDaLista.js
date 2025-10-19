import thisMomentDate from "./thisMomentDate.js";
import { listaCompradosVazia, listaComprasVazia } from "./verifyIfListaVazia.js";

const inputItem = document.getElementById("input-item");
let counter = 0;

function criarItemDaLista(listaCompras, listaComprados) {
  const listItem = document.createElement("li");
  listItem.className = "lista-item";
  const listItemInnerContainer = document.createElement("div");
  listItemInnerContainer.className = "lista-item-container";
  const listItemCheckbox = document.createElement("input");
  listItemCheckbox.type = "checkbox";
  listItemCheckbox.id = "checkbox-" + counter++;
  listItemCheckbox.style.display = "none";

  listItemCheckbox.addEventListener("click", () => {
    if (listItemCheckbox.checked) {
      listItemName.style.textDecoration = "line-through";
      listItemName.style.color = "grey";
      listItemDate.style.color = "grey";
      listItemCustomCheckbox.classList.add("checked");
      listaComprados.append(listItem);
      listaCompradosVazia(listaComprados); // Ensure visibility updates when item is moved
      listaComprasVazia(listaCompras);
    } else {
      listItemName.style.textDecoration = "none";
      listItemName.style.color = "black";
      listItemDate.style.color = "black";
      listItemCustomCheckbox.classList.remove("checked");
      listaCompras.append(listItem);
      listaCompradosVazia(listaComprados); // Ensure visibility updates when item is moved back
      listaComprasVazia(listaCompras);
    }
  });

  const listItemCustomCheckboxLabel = document.createElement("label");
  listItemCustomCheckboxLabel.htmlFor = listItemCheckbox.id;
  const listItemCustomCheckbox = document.createElement("div");
  listItemCustomCheckbox.className = "checkbox-customizado";
  const listItemName = document.createElement("p");
  listItemName.textContent = inputItem.value;

  const listItemBtnWrappper = document.createElement("span");
  listItemBtnWrappper.className = "item-lista-button-wrapper";
  const listItemDelBtn = document.createElement("button");
  listItemDelBtn.id = "btn-del";
  listItemDelBtn.className = "item-lista-button";
  const listItemDelBtnImg = document.createElement("img");
  listItemDelBtnImg.src = "img/delete.svg";

  listItemDelBtn.addEventListener("click", () => {
    const confirmation = confirm("Tem certeza que deseja excluir este item?");
    if (confirmation) {
      listItem.remove();
      listaComprasVazia(listaCompras);
      listaCompradosVazia(listaComprados);
    }
  });

  const listItemEditBtn = document.createElement("button");
  listItemEditBtn.id = "btn-edit";
  listItemEditBtn.className = "item-lista-button";
  const listItemEditBtnImg = document.createElement("img");
  listItemEditBtnImg.src = "img/edit.svg";

  listItemEditBtn.addEventListener("click", () => {
    const promptNovoNome = prompt("Qual o novo nome do item?");
    if (promptNovoNome) {
      listItemName.textContent = promptNovoNome;
      listItemDate.textContent = thisMomentDate();
    }
  });

  const listItemDate = document.createElement("p");
  listItemDate.className = "texto-data";
  const dateValue = thisMomentDate();
  listItemDate.innerText = dateValue;

  listaCompras.append(listItem);
  listItem.append(listItemInnerContainer, listItemDate);
  listItemInnerContainer.append(
    listItemCheckbox,
    listItemCustomCheckboxLabel,
    listItemName,
    listItemBtnWrappper
  );
  listItemBtnWrappper.append(listItemDelBtn, listItemEditBtn);
  listItemDelBtn.append(listItemDelBtnImg);
  listItemEditBtn.append(listItemEditBtnImg);
  listItemCustomCheckboxLabel.append(listItemCustomCheckbox);
  listaComprasVazia(listaCompras);

  // DRAG AND DROP
  listItem.draggable = true;
  listItem.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", null); // for Firefox compatibility
    listItem.classList.add("dragging");
    // window.draggedItem = listItem;
  });
  listItem.addEventListener("dragend", () => {
    listItem.classList.remove("dragging");
    listaComprasVazia(listaCompras);
    listaCompradosVazia(listaComprados);
    // window.draggedItem = null;
    if (listItem.closest("ul").id == "lista-de-compras") {
      listItemCheckbox.checked = false;
      listItemName.style.textDecoration = "none";
      listItemName.style.color = "black";
      listItemDate.style.color = "black";
      listItemCustomCheckbox.classList.remove("checked");
    } else {
      listItemCheckbox.checked = true;
      listItemName.style.textDecoration = "line-through";
      listItemName.style.color = "grey";
      listItemDate.style.color = "grey";
      listItemCustomCheckbox.classList.add("checked");
    }
  });
}

export default criarItemDaLista;
