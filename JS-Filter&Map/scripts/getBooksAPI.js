export async function getBooksAPI(endPoint, array) {
  const res = await fetch(endPoint);
  const resJson = await res.json();
  array.push(...resJson);
  return array;
}

export async function getBooksAPI2(endPoint) {
  const res = await fetch(endPoint);
  const resJson = await res.json();
  return resJson;
}
