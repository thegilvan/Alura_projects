export function updateTotalPrice() {
  const pricePreview = document.getElementById("valor");
  const allPricesAtMoment = Array.from(document.querySelectorAll("#preco")).map((item) =>
    parseFloat(item.textContent.split("$")[1])
  );
  const reducedPrices = allPricesAtMoment.reduce((acc, current) => acc + current);
  pricePreview.textContent = reducedPrices.toFixed(2);
}

export function updateTotalPrice2(books) {
  return books.reduce((acc, curr) => acc + parseFloat(curr.preco), 0);
}
