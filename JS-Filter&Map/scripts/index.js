import { addDiscount } from "./addDiscount.js";
import { getBooksAPI, getBooksAPI2 } from "./getBooksAPI.js";
import { showBooksOnShelf } from "./showBooksOnShelf.js";
import { updateTotalPrice, updateTotalPrice2 } from "./updateTotalPrice.js";
const endPointAPI = "https://guilhermeonrails.github.io/casadocodigo/livros.json";
const bookShelf = document.getElementById("livros");
const filterBtnDisponiveis = document.getElementById("btnLivrosDisponiveis");
const sortBtnPreco = document.getElementById("btnOrdenarPorPreco");
const allFilterBtns = document.querySelectorAll("[id*='Filtrar']");
let books = await getBooksAPI2(endPointAPI);
console.table(books);
const discount = 40;
const booksDiscounted = addDiscount(books, discount);
const pricePreview = document.getElementById("valor");

showBooksOnShelf(booksDiscounted, bookShelf);
updateTotalPrice();

allFilterBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const filteredBooks = booksDiscounted.filter((book) => book.categoria == e.target.value);
    const filteredAndAvailable = filteredBooks.filter((book) => book.quantidade > 0);
    showBooksOnShelf(filteredBooks, bookShelf);
    pricePreview.textContent = updateTotalPrice2(filteredAndAvailable);
  });
});

filterBtnDisponiveis.addEventListener("click", () => {
  const filteredBooks = booksDiscounted.filter((book) => book.quantidade > 0);
  showBooksOnShelf(filteredBooks, bookShelf);
  updateTotalPrice();
});

sortBtnPreco.addEventListener("click", () => {
  const orderedBooks = booksDiscounted.sort((a, b) => a.preco - b.preco);
  showBooksOnShelf(orderedBooks, bookShelf);
  const filteredAndAvailable = filteredBooks.filter((book) => book.quantidade > 0);
  pricePreview.textContent = updateTotalPrice2(filteredAndAvailable);
});
