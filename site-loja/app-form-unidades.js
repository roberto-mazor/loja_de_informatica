function fnLimparCampos() {
    document.getElementById("formUnidade").reset()
}

function fnCadastrarUnidade() {

    let formDados = {
        nome_da_loja: document.getElementById("nome_da_loja").value.trim(),
        foto: document.getElementById("foto").value.trim(),
        endereco: document.getElementById("endereco").value.trim(),
        email: document.getElementById("email").value.trim(),
        telefone: document.getElementById("telefone").value.trim(),
        latitude: parseFloat(document.getElementById("latitude").value),
        longitude: parseFloat(document.getElementById("longitude").value)
    }

    console.dir(formDados)

    fetch('http://localhost:3000/unidades', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(formDados)
    })
    .then(resposta => {
        if (!resposta.ok) {
            throw new Error("Erro na requisição: " + resposta.status)
        }
        return resposta.json()
    })
    .then((dados) => {
        console.log("Salvo com sucesso:", dados)
        fnLimparCampos()
    })
    .catch(erro => {
        console.error("Erro ao cadastrar:", erro.message)
    })
}

document
  .getElementById("formUnidade")
  .addEventListener("submit", function (e) {
      e.preventDefault()
      fnCadastrarUnidade()
  })
