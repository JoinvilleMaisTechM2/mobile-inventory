document.addEventListener("DOMContentLoaded", () => {
  const paginaCadastro = document.title.includes("Cadastro");

  if (paginaCadastro) {
    const form = document.querySelector("form");
    const salvarBtn = document.getElementById("salvar");
    const voltarBtn = document.getElementById("voltar");

    const marca = document.getElementById("marca");
    const modelo = document.getElementById("modelo");
    const cor = document.getElementById("cor");
    const valor = document.getElementById("valor");
    const infos = document.getElementById("infos");
    const radios = document.querySelectorAll("input[name='condicao']");

    function validarFormulario() {
      const condicaoSelecionada = [...radios].some(r => r.checked);
      if (
        marca.value &&
        modelo.value.trim() &&
        cor.value.trim() &&
        valor.value.trim() &&
        infos.value.trim() &&
        condicaoSelecionada
      ) {
        salvarBtn.disabled = false;
      } else {
        salvarBtn.disabled = true;
      }
    }

    form.addEventListener("input", validarFormulario);
    form.addEventListener("change", validarFormulario);

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const condicao = [...radios].find(r => r.checked).value;
      const celular = {
        marca: marca.value,
        modelo: modelo.value,
        cor: cor.value,
        valor: parseFloat(valor.value).toFixed(2),
        condicao: condicao,
        infos: infos.value
      };

      const lista = JSON.parse(localStorage.getItem("celulares")) || [];
      lista.push(celular);
      localStorage.setItem("celulares", JSON.stringify(lista));

      alert("Dados salvos com sucesso!");
      form.reset();
      salvarBtn.disabled = true;
    });

    voltarBtn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  } else {
    const tabela = document.getElementById("tabela-listagem");
    const btnCadastrar = document.getElementById("btn-cadastrar");

    function carregarTabela() {
      const lista = JSON.parse(localStorage.getItem("celulares")) || [];
      tabela.innerHTML = "";

      lista.forEach((celular, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${celular.marca}</td>
          <td>${celular.modelo}</td>
          <td>${celular.cor}</td>
          <td>R$ ${celular.valor}</td>
          <td>${celular.condicao}</td>
          <td>${celular.infos}</td>
          <td><button data-index="${index}" class="excluir">Excluir</button></td>
        `;
        tabela.appendChild(tr);
      });
    }

    tabela.addEventListener("click", (e) => {
      if (e.target.classList.contains("excluir")) {
        const index = e.target.dataset.index;
        const lista = JSON.parse(localStorage.getItem("celulares")) || [];
        lista.splice(index, 1);
        localStorage.setItem("celulares", JSON.stringify(lista));
        carregarTabela();
      }
    });

    btnCadastrar.addEventListener("click", () => {
      window.location.href = "cadastro.html";
    });

    carregarTabela();
  }
});
