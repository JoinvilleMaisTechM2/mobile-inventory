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
