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
});
botaoTema.addEventListener("click", () => {
  const temaAtual = document.body.classList.contains("tema-escuro") ? "escuro" : "claro";
  aplicarTema(temaAtual === "escuro" ? "claro" : "escuro");
});
const tbody = document.getElementById("tabela-corpo");
const btnCadastrar = document.getElementById("btn-cadastrar");
function carregarTabela() {
  const celulares = JSON.parse(localStorage.getItem("celulares")) || [];
  tbody.innerHTML = "";
  celulares.forEach((celular, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${celular.marca}</td>
      <td>${celular.modelo}</td>
      <td>${celular.cor}</td>
      <td>R$ ${parseFloat(celular.valor).toFixed(2)}</td>
      <td>${celular.condicao}</td>
      <td>${celular.infos}</td>
      <td>
        <button onclick="editar(${index})">Alterar</button>
        <button onclick="excluir(${index})">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}
function excluir(index) {
  const lista = JSON.parse(localStorage.getItem("celulares")) || [];
  lista.splice(index, 1);
  localStorage.setItem("celulares", JSON.stringify(lista));
  carregarTabela();
}
function editar(index) {
  localStorage.setItem("indiceEdicao", index);
  window.location.href = "cadastro.html";
}
btnCadastrar.addEventListener("click", () => {
  localStorage.removeItem("indiceEdicao");
  window.location.href = "cadastro.html";
});
carregarTabela();