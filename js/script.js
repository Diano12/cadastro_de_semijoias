// Armazenamento local para histórico
function initializeLocalStorage() {
    if (!localStorage.getItem('historicoAneis')) {
        localStorage.setItem('historicoAneis', JSON.stringify([]));
    }
    if (!localStorage.getItem('historicoArgolas')) {
        localStorage.setItem('historicoArgolas', JSON.stringify([]));
    }
    if (!localStorage.getItem('historicoBrincosTar')) {
        localStorage.setItem('historicoBrincosTar', JSON.stringify([]));
    }
    if (!localStorage.getItem('historicoBrincosInf')) {
        localStorage.setItem('historicoBrincosInf', JSON.stringify([]));
    }
    if (!localStorage.getItem('historicoPulseiras')) {
        localStorage.setItem('historicoPulseiras', JSON.stringify([]));
    }
}

// Função para mudar o slide do carrossel
function changeSlide(tabName) {
    const carouselItems = document.querySelectorAll('.carousel-item');
    carouselItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-tab') === tabName) {
            item.classList.add('active');
        }
    });
}

// Função principal para alternar entre abas
function openTab(tabName) {
    // Esconder todos os conteúdos de abas
    const tabContents = document.querySelectorAll(".tab-content");
    tabContents.forEach(tab => {
        tab.classList.remove("active");
    });

    // Remover classe active de todos os botões
    const tabButtons = document.querySelectorAll(".tab-button");
    tabButtons.forEach(button => {
        button.classList.remove("active");
    });

    // Mostrar a aba selecionada
    document.getElementById(tabName).classList.add("active");
    
    // Ativar o botão correspondente
    const activeButton = document.querySelector(`.tab-button[data-tab="${tabName}"]`);
    if (activeButton) activeButton.classList.add("active");
    
    // Mudar a imagem do carrossel
    changeSlide(tabName);
    
    // Atualizar histórico
    atualizarHistorico(tabName);
}

// Função para limpar campos
function limparCampos(tipo) {
    document.getElementById(`valor-${tipo}`).value = '';
    document.getElementById(`peso-${tipo}`).value = '';
    document.getElementById(`resultado-${tipo}`).innerText = '';
}

// Função para adicionar ao histórico
function adicionarAoHistorico(tipo, valor, peso, resultado) {
    const historicoKey = `historico${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`;
    const historico = JSON.parse(localStorage.getItem(historicoKey)) || [];
    
    const novoItem = {
        data: new Date().toLocaleString(),
        valor: valor,
        peso: peso,
        resultado: resultado
    };
    
    historico.unshift(novoItem);
    if (historico.length > 5) historico.pop();
    
    localStorage.setItem(historicoKey, JSON.stringify(historico));
    atualizarHistorico(tipo);
}

// Função para atualizar o histórico na tela
function atualizarHistorico(tipo) {
    const historicoKey = `historico${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`;
    const historico = JSON.parse(localStorage.getItem(historicoKey)) || [];
    const historicoElement = document.getElementById(`historico-${tipo}`);
    
    historicoElement.innerHTML = '';
    
    if (historico.length === 0) {
        historicoElement.innerHTML = '<div class="history-item">Nenhum cálculo recente</div>';
        return;
    }
    
    historico.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'history-item';
        itemElement.innerHTML = `
            <div><strong>${item.data}</strong></div>
            <div>Valor: R$ ${parseFloat(item.valor).toFixed(2)} | Peso: ${parseFloat(item.peso).toFixed(2)}g</div>
            <div>Resultado: R$ ${parseFloat(item.resultado).toFixed(2)}</div>
        `;
        historicoElement.appendChild(itemElement);
    });
}

// Funções de cálculo para cada tipo
function calcularAnéis() {
    const valor = parseFloat(document.getElementById('valor-aneis').value) || 0;
    const peso = parseFloat(document.getElementById('peso-aneis').value) || 0;
    const parte1 = valor + (6 / 100) * valor + 0.12;
    const parte2 = peso * 0.58 * 17.5;
    const resultadoParcial = parte1 + parte2;
    const resultadoFinal = resultadoParcial + (120 / 100) * resultadoParcial;
    
    document.getElementById('resultado-aneis').innerText = `Resultado: R$ ${resultadoFinal.toFixed(2)}`;
    adicionarAoHistorico('aneis', valor, peso, resultadoFinal);
}

function calcularArgolas() {
    const valor = parseFloat(document.getElementById('valor-argolas').value) || 0;
    const peso = parseFloat(document.getElementById('peso-argolas').value) || 0;
    const parte1 = valor + (6 / 100) * valor + 0.12;
    const parte2 = peso * 0.58 * 5.5;
    const resultadoParcial = parte1 + parte2;
    const resultadoFinal = resultadoParcial + (120 / 100) * resultadoParcial;
    
    document.getElementById('resultado-argolas').innerText = `Resultado: R$ ${resultadoFinal.toFixed(2)}`;
    adicionarAoHistorico('argolas', valor, peso, resultadoFinal);
}

function calcularBrincosTar() {
    const valor = parseFloat(document.getElementById('valor-brincosTar').value) || 0;
    const peso = parseFloat(document.getElementById('peso-brincosTar').value) || 0;
    const parte1 = valor + (6 / 100) * valor + 0.12 + 0.06;
    const parte2 = peso * 0.58 * 5.5;
    const resultadoParcial = parte1 + parte2;
    const resultadoFinal = resultadoParcial + (120 / 100) * resultadoParcial;
    
    document.getElementById('resultado-brincosTar').innerText = `Resultado: R$ ${resultadoFinal.toFixed(2)}`;
    adicionarAoHistorico('brincosTar', valor, peso, resultadoFinal);
}

function calcularBrincosInf() {
    const valor = parseFloat(document.getElementById('valor-brincosInf').value) || 0;
    const peso = parseFloat(document.getElementById('peso-brincosInf').value) || 0;
    const parte1 = valor + (6 / 100) * valor + 0.12 + 0.15;
    const parte2 = peso * 0.58 * 5.5;
    const resultadoParcial = parte1 + parte2;
    const resultadoFinal = resultadoParcial + (120 / 100) * resultadoParcial;
    
    document.getElementById('resultado-brincosInf').innerText = `Resultado: R$ ${resultadoFinal.toFixed(2)}`;
    adicionarAoHistorico('brincosInf', valor, peso, resultadoFinal);
}

function calcularPulseiras() {
    const valor = parseFloat(document.getElementById('valor-pulseiras').value) || 0;
    const peso = parseFloat(document.getElementById('peso-pulseiras').value) || 0;
    const parte1 = valor + (6 / 100) * valor + 0.12;
    const parte2 = peso * 0.58 * 16.5;
    const resultadoParcial = parte1 + parte2;
    const resultadoFinal = resultadoParcial + (120 / 100) * resultadoParcial;
    
    document.getElementById('resultado-pulseiras').innerText = `Resultado: R$ ${resultadoFinal.toFixed(2)}`;
    adicionarAoHistorico('pulseiras', valor, peso, resultadoFinal);
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeLocalStorage();
    
    // Ativar a primeira aba e o primeiro item do carrossel
    openTab('aneis');
    
    // Configurar event listeners para os botões das abas
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            openTab(this.getAttribute('data-tab'));
        });
    });

    // Configurar event listeners para os campos de entrada (tecla Enter)
    document.getElementById('valor-aneis').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') document.getElementById('peso-aneis').focus();
    });
    document.getElementById('peso-aneis').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') document.getElementById('calcular-aneis').focus();
    });

    document.getElementById('valor-argolas').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') document.getElementById('peso-argolas').focus();
    });
    document.getElementById('peso-argolas').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') document.getElementById('calcular-argolas').focus();
    });

    document.getElementById('valor-brincosTar').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') document.getElementById('peso-brincosTar').focus();
    });
    document.getElementById('peso-brincosTar').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') document.getElementById('calcular-brincosTar').focus();
    });

    document.getElementById('valor-brincosInf').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') document.getElementById('peso-brincosInf').focus();
    });
    document.getElementById('peso-brincosInf').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') document.getElementById('calcular-brincosInf').focus();
    });

    document.getElementById('valor-pulseiras').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') document.getElementById('peso-pulseiras').focus();
    });
    document.getElementById('peso-pulseiras').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') document.getElementById('calcular-pulseiras').focus();
    });

    // Configurar event listeners para os botões de calcular e limpar
    document.getElementById('calcular-aneis').addEventListener('click', calcularAnéis);
    document.querySelector('#aneis .clear-btn').addEventListener('click', () => limparCampos('aneis'));

    document.getElementById('calcular-argolas').addEventListener('click', calcularArgolas);
    document.querySelector('#argolas .clear-btn').addEventListener('click', () => limparCampos('argolas'));

    document.getElementById('calcular-brincosTar').addEventListener('click', calcularBrincosTar);
    document.querySelector('#brincosTar .clear-btn').addEventListener('click', () => limparCampos('brincosTar'));

    document.getElementById('calcular-brincosInf').addEventListener('click', calcularBrincosInf);
    document.querySelector('#brincosInf .clear-btn').addEventListener('click', () => limparCampos('brincosInf'));

    document.getElementById('calcular-pulseiras').addEventListener('click', calcularPulseiras);
    document.querySelector('#pulseiras .clear-btn').addEventListener('click', () => limparCampos('pulseiras'));
});