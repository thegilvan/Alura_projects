export function addDiscount(array, discount) {
  return array.map((item) => ({
    ...item,
    preco: (item.preco * (1 - discount / 100)).toFixed(2),
  }));
}
