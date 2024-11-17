// Seleção de elementos
const cepInput = document.getElementById('cep');
const buscarButton = document.getElementById('buscar');
const resultado = document.getElementById('info');

// Função para buscar CEP
const buscarCEP = async () => {
    const cep = cepInput.value.trim();
    
    // Validação do CEP
    if (!/^\d{8}$/.test(cep)) {
        resultado.textContent = 'Por favor, insira um CEP válido com 8 dígitos.';
        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;
    
    try {
        // Requisição à API
        const response = await fetch(url);
        const data = await response.json();

        // Verificar se houve erro
        if (data.erro) {
            resultado.textContent = 'CEP não encontrado. Verifique e tente novamente.';
        } else {
            // Exibir dados formatados
            resultado.textContent = `
                Logradouro: ${data.logradouro || 'Não disponível'}
                Bairro: ${data.bairro || 'Não disponível'}
                Cidade: ${data.localidade || 'Não disponível'}
                Estado: ${data.uf || 'Não disponível'}
            `;
        }
    } catch (error) {
        resultado.textContent = 'Erro ao buscar o CEP. Tente novamente mais tarde.';
    }
};

// Evento de clique no botão
buscarButton.addEventListener('click', buscarCEP);
