// app-admin.js

function fnMontarLinhaProdutos(produto) {
  const linha = `
    <tr>
      <td><img src="${produto.foto}" class="card-img-top imgProd" width="50" alt="${produto.nome}"></td>
      <td>${produto.id}</td>
      <td>${produto.titulo.substring(0, 20)}</td>
      <td>${produto.descricao.substring(0, 50)}</td>
      <td>${produto.categoria}</td>
      <td>${produto.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
      <td>${"⭐".repeat(produto.avaliacao)}</td>
      <td class="acoes">
        <a href="um-produto.html?id=${produto.id}" class="btn" alt="Ver produto"><img width="15" height="15" src="https://img.icons8.com/ios-filled/50/search--v1.png" alt="search--v1"/></a>
        <a href="editar-produto.html?id=${produto.id}" class="btn"alt="editar produto"><img width="15" height="15" src="https://img.icons8.com/deco-glyph/48/pencil.png" alt="pencil"/></a>
        <button type="button" class="btn" alt="Excluir produto"> <img width="15" height="15" src="https://img.icons8.com/material-sharp/24/trash.png" alt="trash"/></button>
     </td>
    </tr>
  `;

  document.querySelector("#lista-produtos").innerHTML += linha;
}

function fnCarregarDados() {
  fetch("http://localhost:3000/produtos/", { method: "GET" })
    .then((resposta) => resposta.json())
    .then((produtos) => {
      produtos.forEach((produto) => {
        fnMontarLinhaProdutos(produto);
      });
    })
    .catch((erro) => console.log(erro.message));
}

fnCarregarDados();