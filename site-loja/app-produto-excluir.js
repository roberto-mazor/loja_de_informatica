function fnExcluirProduto(id, elemento) {

    const confirmar = confirm("Tem certeza que deseja excluir este produto?");

    if (!confirmar) {
        return; // Se clicar em Cancelar, não faz nada
    }

    fetch('http://localhost:3000/produto/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(resposta => resposta.json())
    .then((dados) => {
        console.dir(dados);
        elemento.closest("tr").remove()
        fnToast("Produto excluído com sucesso!", "bg-success");
    })
    .catch(erro => {
        console.log(erro.message);
        fnToast("Erro ao excluir produto!", "bg-danger");
    });
};

function fnToast(mensagem, classe) {

    const toastContainer = document.getElementById("toast-container");

    const toastHTML = `
        <div class="toast align-items-center text-white ${classe} border-0 mb-2" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    ${mensagem}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;

    toastContainer.innerHTML = toastHTML;

    const toastElement = toastContainer.querySelector('.toast');
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
}