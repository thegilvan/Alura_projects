export function addDataListOptions(arrayToAdd, dataList) {
  arrayToAdd.forEach((element) => {
    const newOption = document.createElement("option");
    newOption.textContent = element;
    dataList.appendChild(newOption);
  });
}
