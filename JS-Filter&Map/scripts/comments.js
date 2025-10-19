getBooksAPI2(endPointAPI).then((books3) => {
  //good solution for older browsers that do not support top-level await
  // console.log(books3);
});
await getBooksAPI(endPointAPI, books); //returns the books array filled with data from the API but the top-level(global)await only works on module type scripts and updated browsers

const books2 = getBooksAPI2(endPointAPI); //without await: returns only the promise not the data/result
window.books = { books, books2 };
