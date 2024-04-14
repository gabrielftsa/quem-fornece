document.addEventListener('DOMContentLoaded', function () {

    $(document).ready(function(){
        $('#cnpj').mask('00.000.000/0000-00', {reverse: true});
        $('#contato').mask('(00) 0000-0000');
    });

    const fornecedorForm = document.getElementById('fornecedor-form');
    const listaFornecedores = document.getElementById('lista-fornecedores');

    fornecedorForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const local = document.getElementById('local').value;
        const contato = document.getElementById('contato').value;
        const descricao = document.getElementById('descricao').value;

        adicionarFornecedor(nome, local, contato, descricao);

        fornecedorForm.reset();
    });

    function adicionarFornecedor(nome, local, contato, descricao) {
        const fornecedorItem = document.createElement('li');
        fornecedorItem.innerHTML = `
            <strong>${nome}</strong> - ${local}<br>
            Contato: ${contato}<br>
            Descrição: ${descricao}
            <button class="remover-fornecedor">Remover</button>
        `;
        listaFornecedores.appendChild(fornecedorItem);
    }

    listaFornecedores.addEventListener('click', function (event) {
        if (event.target.classList.contains('remover-fornecedor')) {
            const fornecedorItem = event.target.parentElement;
            fornecedorItem.remove();
        }
    });
});
