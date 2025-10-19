export function showBooksOnShelf(booksArray, bookShelf) {
  bookShelf.innerHTML = "";
  booksArray.forEach((book) => {
    let disponivel = book.quantidade > 0 ? "livro__imagens" : "indisponivel";
    bookShelf.innerHTML += `<div class="livro">
      <img class=${disponivel} src=${book.imagem} alt=${book.alt} />
      <h2 class="livro__titulo">
${book.titulo}
      </h2>
      <p class="livro__descricao">${book.autor}</p>
      <p class="livro__preco" id="preco">R$${book.preco}</p>
      <div class="tags">
        <span class="tag">${book.categoria}</span>
      </div>
    </div>`;
  });
}

function verificarDisponibilidade(item) {
  if (item.quantidade > 0) {
    return "livro__imagens";
  } else {
    return "indisponivel";
  }
}
