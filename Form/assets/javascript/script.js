function limpa_formulario_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('endereco').value = ('');
    document.getElementById('bairro').value = ('');
    document.getElementById('cidade').value = ('');
    document.getElementById('estado').value = ('');
}

function pesquisacep(valor) {
    // Remove caracteres não numéricos
    valor = valor.replace(/\D/g, '');

    // Verifica se o CEP é válido
    if (valor.length != 8) {
        alert('CEP inválido');
        document.getElementById('endereco').value = '';
        document.getElementById('bairro').value = '';
        document.getElementById('cidade').value = '';
        document.getElementById('estado').value = '';
        return;
    }

    // Cria a requisição para a API do ViaCEP
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://viacep.com.br/ws/' + valor + '/json/');
    xhr.onload = function () {
        if (xhr.status === 200) {
            var endereco = JSON.parse(xhr.responseText);
            if (endereco.logradouro === undefined) {
                alert("CEP não encontrado");
                limpa_formulario_cep();
                return;
            }
            document.getElementById('endereco').value = endereco.logradouro;
            document.getElementById('bairro').value = endereco.bairro;
            document.getElementById('cidade').value = endereco.localidade;
            document.getElementById('estado').value = endereco.uf;
        } else {
            alert('CEP não encontrado');
            limpa_formulario_cep();
        }
    }
    xhr.onerror = function () {
        alert('Erro ao buscar CEP');
        limpa_formulario_cep();
    };
    xhr.send();
}
