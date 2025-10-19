export function createAndAddTag(tagNamae, listToAdd) {
  const listItem = document.createElement("li");
  listItem.className = "tag";
  const listItemName = document.createElement("p");
  listItemName.className = "tag__name";
  listItemName.textContent = tagNamae;
  const listItemRemoveIcon = document.createElement("img");
  listItemRemoveIcon.src = "img/close-black.svg";
  listItemRemoveIcon.className = "tag__remove";
  listItem.append(listItemName, listItemRemoveIcon);
  listToAdd.append(listItem);
}
