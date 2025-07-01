const botaoTema = document.getElementById("toggle-tema");
function aplicarTema(tema) {
  if (tema === "escuro") {
    document.body.classList.add("tema-escuro");
    botaoTema.textContent = "Tema Claro";
  } else {
    document.body.classList.remove("tema-escuro");
    botaoTema.textContent = "Tema Escuro";
  }
  localStorage.setItem("tema", tema);
}
window.addEventListener("DOMContentLoaded", () => {
  const temaSalvo = localStorage.getItem("tema") || "claro";
  aplicarTema(temaSalvo);
  inicializarCadastro();
});
botaoTema.addEventListener("click", () => {
  const temaAtual = document.body.classList.contains("tema-escuro") ? "escuro" : "claro";
  aplicarTema(temaAtual === "escuro" ? "claro" : "escuro");
});
function inicializarCadastro() {
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
  function validarFormulario() {
    const condicaoSelecionada = [...radios].some(r => r.checked);
    const todosPreenchidos =
      marca.value &&
      modelo.value.trim() &&
      cor.value.trim() &&
      valor.value.trim() &&
      infos.value.trim() &&
      condicaoSelecionada;
    salvarBtn.disabled = !todosPreenchidos;
  }
  form.addEventListener("input", validarFormulario);
  form.addEventListener("change", validarFormulario);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const condicao = [...radios].find(r => r.checked).value;
    const novoCelular = {
      marca: marca.value,
      modelo: modelo.value,
      cor: cor.value,
      valor: parseFloat(valor.value).toFixed(2),
      condicao,
      infos: infos.value
    };
    const lista = JSON.parse(localStorage.getItem("celulares")) || [];
    if (indiceEdicao !== null) {
      lista[indiceEdicao] = novoCelular;
      localStorage.removeItem("indiceEdicao");
    } else {
      lista.push(novoCelular);
    }
    localStorage.setItem("celulares", JSON.stringify(lista));
    alert("Celular salvo com sucesso!");
    window.location.href = "index.html";
  });
  voltarBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
  validarFormulario();
}