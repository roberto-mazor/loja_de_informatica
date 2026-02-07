function fnMontarCardProduto(produto){
    let cartao = `
        <div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-3">
                <div class="card">
                    <img src="${produto.foto}"
                        class="card-img-top" alt="${produto.nome}">
                    <div class="card-body">
                        <h5 class="card-title">${produto.titulo}</h5>
                        <p class="card-text">${produto.descricao}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 mb-0">R$ ${produto.preco}</span>
                            <div>
                                <i class="bi bi-star-fill text-warning"></i>
                                <i class="bi bi-star-fill text-warning"></i>
                                <i class="bi bi-star-fill text-warning"></i>
                                <i class="bi bi-star-fill text-warning"></i>
                                <i class="bi bi-star text-warning"></i>
                                <small class="text-muted">(${produto.avaliacao})</small>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-between bg-light">
                        <button class="btn btn-primary btn-sm">Comprar</button>
                        <button class="btn btn-outline-secondary btn-sm"><i class="bi bi-heart"></i></button>
                    </div>
                </div>
            </div>
    `
    document.querySelector(".lista-produtos").innerHTML += cartao
}

function fnMontarOrdem(produto){
    let ordemProduto = `
    <div class="d-flex gap-3 mb-4 justify-content-center">
        <span>Ordenar por:</span>
        <a id="link-preco" class="btn btn-sm btn-outline-primary" href="produtos.html?categoria=${produto.categoria}&ordem=preco">Preço</a>
        <a id="link-titulo" class="btn btn-sm btn-outline-primary" href="produtos.html?categoria=${produto.categoria}&ordem=titulo">Título</a>
    </div>
    `
    document.querySelector("#ordemProduto").innerHTML = ordemProduto
}

function fnCarregarDados(){
    const parametros = new URLSearchParams(window.location.search)
    const existe_categoria = parametros.has('categoria')
    const existe_ordem = parametros.has('ordem')

    let rota_categoria = ""
    if (existe_categoria){
        rota_categoria = parametros.get('categoria') + "/"
    }

    let rota_ordem = ""
    if (existe_ordem){
        rota_ordem = parametros.get('ordem') + "/"
    }

    console.log(rota_categoria, rota_ordem)

    fetch('http://localhost:3000/produtos/' + rota_categoria + rota_ordem, { method: 'GET'})
    .then(response => response.json())
    .then((produtos) => {
        produtos.forEach(produto => {
            fnMontarCardProduto(produto)
            fnMontarOrdem(produto)
        });
    })
    .catch(erro => console.log(erro.message))
}

fnCarregarDados()


// function ajustarLinksOrdenacao() {
//     const parametros = new URLSearchParams(window.location.search);
//     const categoriaAtual = parametros.get('categoria');
    
//     // Seleciona todos os links que tenham "ordem=" no href
//     const linksOrdem = document.querySelectorAll('a[href*="ordem="]');

//     linksOrdem.forEach(link => {
//         const urlLink = new URL(link.href);
//         const ordemDesejada = urlLink.searchParams.get('ordem');
        
//         // Se houver uma categoria selecionada, mantém ela. Se não, limpa.
//         if (categoriaAtual) {
//             link.href = `produtos.html?categoria=${categoriaAtual}&ordem=${ordemDesejada}`;
//         } else {
//             link.href = `produtos.html?ordem=${ordemDesejada}`;
//         }
//     });
// }

// // Chame a função no final do arquivo
// ajustarLinksOrdenacao();