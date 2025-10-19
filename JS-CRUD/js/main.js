import ui from "./ui.js";
import api from "./api.js";
//-------------------------------------------------------------------------------------------->
const pensamentosSet = new Set(); // como este script é do tipo modulo essa variavel não é reconhecida no dev tools
window.pensamentosSet = pensamentosSet; //com isso eu consigo acessar essa variavel no dev tools

async function adicionarChaveAoPensamento() {
  try {
    const pensamentos = await api.buscarPensamentos();
    pensamentos.forEach((pensamento) => {
      const chavePensamento = `${pensamento.conteudo
        .trim()
        .toLowerCase()}-${pensamento.autoria.trim().toLowerCase()}`;
      pensamentosSet.add(chavePensamento);
    });
  } catch (error) {
    alert("Erro ao adicionarChaveAoPensamento");
  }
}
//-------------------------------------------------------------------------------------------->
function removerEspacos(string) {
  return string.replaceAll(/\s+/g, "");
}

const regexConteudo = /^[A-Za-z\s]{10,}$/;
const regexAutoria = /^[A-Za-z]{3,15}$/;
window.regexVar = { regexAutoria, regexConteudo }; //e dessa forma eu consigo acessar quantas variaveis eu quiser atraves do objeto que eu criei

function validarConteudo(conteudo) {
  return regexConteudo.test(conteudo);
}
function validarAutoria(autoria) {
  return regexAutoria.test(autoria);
}

//-------------------------------------------------------------------------------------------->
document.addEventListener("DOMContentLoaded", () => {
  ui.renderizarPensamentos();
  adicionarChaveAoPensamento();
  const formularioPensamento = document.getElementById("pensamento-form");
  const botaoCancelar = document.getElementById("botao-cancelar");
  const inputBusca = document.getElementById("campo-busca");

  formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario);
  botaoCancelar.addEventListener("click", manipularCancelamento);
  inputBusca.addEventListener("input", manipularBusca);
});
//-------------------------------------------------------------------------------------------->
async function manipularSubmissaoFormulario(event) {
  event.preventDefault();
  const id = document.getElementById("pensamento-id").value;
  const conteudo = document.getElementById("pensamento-conteudo").value;
  const autoria = document.getElementById("pensamento-autoria").value;
  const data = document.getElementById("pensamento-data").value;

  const conteudoSemEspacos = removerEspacos(conteudo);
  const autoriaSemEspacos = removerEspacos(autoria);

  if (!validarConteudo(conteudoSemEspacos)) {
    alert("Utilizar somente letras e espaços com um min de 10 caracteres");
    return;
  }
  if (!validarAutoria(autoriaSemEspacos)) {
    alert("Utilizar somente letras com um min de 3 e max de 15 caracteres");
    return;
  }

  if (!validarData(data)) {
    // ou seja se a data inserida NÃO for menor que a data de hoje (data>hoje)
    alert("Não é permitido o cadastro de datas futuras");
    return;
  }

  const chaveNewThought = `${conteudo.trim().toLowerCase()}-${autoria
    .trim()
    .toLowerCase()}`;

  if (pensamentosSet.has(chaveNewThought)) {
    alert("Esse pensamento já existe");
    return;
  }

  try {
    if (id) {
      await api.editarPensamento({ id, conteudo, autoria, data });
    } else {
      await api.salvarPensamento({ conteudo, autoria, data });
    }
    ui.renderizarPensamentos();
  } catch {
    alert("Erro ao salvar pensamento");
  }
}
//-------------------------------------------------------------------------------------------->
function manipularCancelamento() {
  ui.limparFormulario();
}
//-------------------------------------------------------------------------------------------->
async function manipularBusca() {
  const termoBusca = document.getElementById("campo-busca").value;
  try {
    const pensamentosFiltrados = await api.buscarPensamentosPorTermo(
      termoBusca
    );
    ui.renderizarPensamentos(pensamentosFiltrados);
  } catch (error) {
    throw error;
  }
}
//-------------------------------------------------------------------------------------------->
function validarData(data) {
  const dataAtual = new Date();
  const dataInserida = new Date(data);
  return dataInserida <= dataAtual; // retorna true se a dataInserida for menor que a dataAtual
}
