import { addDataListOptions } from "./addDataListOptions.js";
import { createAndAddTag } from "./createAndAddTag.js";
import { fetchTags } from "./fetchTags.js";
import { processSingleFile } from "./processSingleImageFile.js";
import { publishProject } from "./publishProject.js";

const uploadInput = document.getElementById("upload-input");
const uploadButton = document.getElementById("upload-button");
const projectNameInput = document.getElementById("input-project-name");
const projectDescriptionInput = document.getElementById("input-project-description");
const projectTagInput = document.getElementById("input-project-tag");
const projectDiscardBtn = document.getElementById("project-discard");
const projectPublishBtn = document.getElementById("project-publish");
const uploadPreview = document.querySelector(".upload__preview");
const uploadName = document.querySelector(".upload__name");
const tagDataList = document.getElementById("tag-possible");
const tagList = document.querySelector(".project__tag-list");
let possibleTags = await fetchTags();
addDataListOptions(possibleTags, tagDataList);

uploadButton.addEventListener("click", () => {
  uploadInput.click();
});

uploadInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  try {
    const processedFile = await processSingleFile(file);
    uploadPreview.src = processedFile.dataUrl;
    uploadName.textContent = processedFile.name;
  } catch (error) {
    alert("Erro ao carregar o arquivo - " + error);
  }
});

projectTagInput.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    const tag = projectTagInput.value;
    if (!possibleTags.includes(tag)) {
      alert("Favor insira uma tag válida.");
      projectTagInput.value = "";
      return;
    }

    const tagList = document.querySelector(".project__tag-list");
    createAndAddTag(tag, tagList);
    projectTagInput.value = "";
  }
});

projectPublishBtn.addEventListener("click", async () => {
  const projectName = projectNameInput.value;
  const projectDescription = projectDescriptionInput.value;
  const projectTags = Array.from(
    document.querySelector(".project__tag-list").querySelectorAll("p")
  ).map((tag) => tag.textContent);
  try {
    await publishProject(projectName, projectDescription, projectTags);
    alert("Deu tudo certo!");
  } catch (error) {
    console.error("Erro ao publicar o projeto: " + error.message);
  }
});

projectDiscardBtn.addEventListener("click", () => {
  const form = document.querySelector("form");
  form.reset();
  tagList.querySelectorAll("li").forEach((element) => {
    element.remove();
  });
  uploadPreview.src = "img/imagem1.png";
  uploadName.textContent = "image_projeto.png";
});

//event Listener na lista de tags para remover uma tag ao clicar no ícone de remoção
//  é mais eficiente do que adicionar um evento de clique em cada tag individualmente.
tagList.addEventListener("click", (e) => {
  if (e.target.classList.contains("tag__remove")) {
    e.target.closest("li").remove();
  }
});
