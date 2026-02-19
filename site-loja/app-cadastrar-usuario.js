function limparCampos() {
    document.getElementById("form-cadastro").reset();
}

function cadastrarUsuario() {

    const dados = {
        usuario: document.getElementById("usuario").value,
        senha: document.getElementById("senha").value,
        nome: document.getElementById("nome").value,
        sobrenome: document.getElementById("sobrenome").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value,
        permissao: document.getElementById("permissao").value
    };

    fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
    .then(res => res.status)
    .then(status => {

        if (status === 201) {
            alert("Usuário cadastrado com sucesso!");
            limparCampos();
        } else if (status === 400) {
            alert("Usuário já existe!");
        } else {
            alert("Erro ao cadastrar usuário.");
        }

    })
    .catch(erro => console.log(erro));
}

document.getElementById("btn-cadastrar")
    .addEventListener("click", cadastrarUsuario);