document.addEventListener('DOMContentLoaded', function () {
    $(document).ready(function(){
        $('#cnpj').mask('00.000.000/0000-00', {reverse: true});
        $('#contato').mask('(00) 00000-0000');
        $('#cep').mask('00000-000');
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
            <button class="remover-fornecedor"><i class="fas fa-trash-alt"></i></button>
        `;
        listaFornecedores.appendChild(fornecedorItem);
    }

    listaFornecedores.addEventListener('click', function (event) {
        if (event.target.classList.contains('remover-fornecedor')) {
            const fornecedorItem = event.target.parentElement;
            fornecedorItem.remove();
        }
    });

    document.getElementById('cep').addEventListener('blur', function() {
        const cep = this.value.replace(/\D/g, '');

        if (cep.length !== 8) {
            alert('CEP inválido');
            return;
        }

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    alert('CEP não encontrado');
                } else {
                    document.getElementById('local').value = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
                }
            })
            .catch(error => {
                console.error('Erro ao buscar o endereço:', error);
                alert('Erro ao buscar o endereço. Por favor, tente novamente mais tarde.');
            });
    });
    document.getElementById('ver-no-maps').addEventListener('click', function() {
        const endereco = document.getElementById('local').value;
        const enderecoFormatado = encodeURIComponent(endereco);
        const urlGoogleMaps = `https://www.google.com/maps/search/?api=1&query=${enderecoFormatado}`;

        // Abre uma nova aba ou janela do navegador com o endereço no Google Maps
        window.open(urlGoogleMaps, '_blank');
    });
    
});
