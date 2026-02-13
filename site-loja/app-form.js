// ===============================
// Função para alterar imagem de fundo
// ===============================
function fnAlterarFoto() {
    if (foto.value !== '') {
        document.getElementById("fundo-imagem").style.backgroundImage = `url('${foto.value}')`;
    } else {
        document.getElementById("fundo-imagem").style.backgroundImage =
            `url('https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`;
    }
    console.log(foto.value);
}

// ===============================
// Função para limpar campos
// ===============================
function fnLimparCampos() {
    document.getElementById("form-produtos").reset();
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

// ===============================
// Função para cadastrar produto
// ===============================
function fnCadastrarProdutos() {

    let formDados = {
        titulo: document.getElementById("titulo").value,
        foto: document.getElementById("foto").value,
        preco: document.getElementById("preco").value,
        avaliacao: document.getElementById("avaliacao").value,
        categoria: document.getElementById("categoria").value,
        descricao: document.getElementById("descricao").value
    };

    console.dir(formDados);

    fetch('http://localhost:3000/produto/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

// ===============================
// Eventos
// ===============================
let foto = document.getElementById("foto");
let btn_salvar = document.getElementById("btn-salvar-produto");

foto.addEventListener("blur", function () {
    fnAlterarFoto();
});

btn_salvar.addEventListener("click", function () {
    fnCadastrarProdutos();
});