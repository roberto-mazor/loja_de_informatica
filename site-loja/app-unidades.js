function fnMontarCardUnidades(unidade){
    let cartao = `
                    <div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-3">
                        <div class="card h-100">
                            <img src="${unidade.foto}" 
                                class="card-img-top" alt="${unidade.nome_da_loja}">
                            <div class="card-body">
                                <h5 class="card-title">${unidade.nome_da_loja}</h5>
                                <p class="card-text">
                                    <strong>Endereço:</strong> ${unidade.endereco}<br>
                                    <strong>E-mail:</strong> ${unidade.email}<br>
                                    <strong>Tel:</strong> ${unidade.telefone}
                                </p>
                            </div>
                            <div class="card-footer d-flex justify-content-between bg-light">
                                <a href="https://www.google.com/maps?q=${unidade.latitude},${unidade.longitude}" 
                                target="_blank" class="btn btn-primary btn-sm">Ver no Mapa</a>
                                <button class="btn btn-outline-secondary btn-sm">
                                    <i class="bi bi-telephone"></i> Contato
                                </button>
                            </div>
                        </div>
                    </div>
    `
    document.querySelector(".lista-unidades").innerHTML += cartao
}

function fnCarregarDados(){
    fetch('http://localhost:3000/unidades/', { method: 'GET'})
    .then(response => response.json ())
    .then((unidades) => {
        unidades.forEach(unidade => {
            fnMontarCardUnidades(unidade)
        });
    })
    .catch(erro => console.log(erro.message))
}

fnCarregarDados()