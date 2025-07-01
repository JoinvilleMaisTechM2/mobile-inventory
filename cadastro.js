const form = document.querySelector("form");
const salvarBtn = document.getElementById("salvar");
const voltarBtn = document.getElementById("voltar");

const marca = document.getElementById("marca");
const modelo = document.getElementById("modelo");
const cor = document.getElementById("cor");
const valor = document.getElementById("valor");
const infos = document.getElementById("infos");
const radios = document.querySelectorAll("input[name='condicao']");

const indiceEdicao = localStorage.getItem("indiceEdicao");

if (indiceEdicao !== null) {
  const lista = JSON.parse(localStorage.getItem("celulares")) || [];
  const celular = lista[indiceEdicao];

  if (celular) {
    marca.value = celular.marca;
    modelo.value = celular.modelo;
    cor.value = celular.cor;
    valor.value = celular.valor;
    infos.value = celular.infos;
    document.querySelector(`input[name="condicao"][value="${celular.condicao}"]`).checked = true;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const condicaoSelecionada = [...radios].find(r => r.checked)?.value;

  const celular = {
    marca: marca.value,
    modelo: modelo.value,
    cor: cor.value,
    valor: valor.value,
    condicao: condicaoSelecionada,
    infos: infos.value
  };

  const lista = JSON.parse(localStorage.getItem("celulares")) || [];

  if (indiceEdicao !== null) {
    lista[indiceEdicao] = celular;
    localStorage.removeItem("indiceEdicao");
  } else {
    lista.push(celular);
  }

  localStorage.setItem("celulares", JSON.stringify(lista));
  alert("Celular salvo com sucesso!");
  window.location.href = "index.html";
});

voltarBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});
