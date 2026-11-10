const preparacao = document.getElementById('preparacao_lista');
const pedidoBtn = document.getElementById('pedido_btn');

let cont = 0;

function fazerPedido() {
    cont += 1;

    const item = document.createElement('div');
    item.classList.add('pedido-item');

    const botao = document.createElement('button');
    botao.type = 'button';
    botao.textContent = '✓';

    const texto = document.createElement('span');
    texto.textContent = `Pedido #${cont}`;

    const acoes = document.createElement('div');
    acoes.classList.add('pedido-acoes');

    const cancelarBtn = document.createElement('button');
    cancelarBtn.type = 'button';
    cancelarBtn.textContent = 'X';

    acoes.append(botao, cancelarBtn);
    item.append(texto, acoes);
    preparacao.appendChild(item);
}

pedidoBtn.addEventListener('click', fazerPedido);