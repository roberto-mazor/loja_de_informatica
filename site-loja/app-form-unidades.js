function fnLimparCampos() {
    document.getElementById("formUnidade").reset()
}

// ===============================
// Função para mostrar Toast
// ===============================
function mostrarToast(mensagem, tipo = "success") {

    const toastElement = document.getElementById("toastMensagem");
    const toastBody = document.getElementById("toast-body");

    // Remove classes anteriores
    toastElement.classList.remove("text-bg-success", "text-bg-danger");

    if (tipo === "success") {
        toastElement.classList.add("text-bg-success");
    } else {
        toastElement.classList.add("text-bg-danger");
    }

    toastBody.textContent = mensagem;

    const toast = new bootstrap.Toast(toastElement);
    toast.show();
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
            throw new Error("Erro ao salvar no servidor");
        }
        return resposta.json();
    })
    .then((dados) => {
        fnLimparCampos();
        mostrarToast("Produto cadastrado com sucesso! ✅", "success");
        console.log(dados);
    })
    .catch((erro) => {
        mostrarToast("Erro ao cadastrar produto ❌", "danger");
        console.error(erro.message);
    });
}

document
  .getElementById("formUnidade")
  .addEventListener("submit", function (e) {
      e.preventDefault()
      fnCadastrarUnidade()
  })
