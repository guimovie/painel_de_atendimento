const historico = document.getElementById('historico-lista');
const pronto = document.getElementById('pronto-lista');
const preparacao = document.getElementById('preparacao-lista');
const pedidoBtn = document.getElementById('pedido-btn');

let cont = 0;
const pedidos = new Map();

function fazerPedido() {
    const pedidoId = ++cont;
    pedidos.set(pedidoId, { id: pedidoId, status: 'preparando' });

    const item = document.createElement('div');
    item.classList.add('pedido-item');
    item.dataset.pedidoId = pedidoId;

    const botao = document.createElement('button');
    botao.addEventListener('click', () => pedidoPronto(pedidoId, item));
    botao.type = 'button';
    botao.textContent = '✓';
    
    const cancelarBtn = document.createElement('button');
    cancelarBtn.addEventListener('click', () => cancelarPedido(pedidoId, item));
    cancelarBtn.type = 'button';
    cancelarBtn.textContent = 'X';

    const texto = document.createElement('span');
    texto.textContent = `Pedido #${String(cont).padStart(2, '0')}`;

    const acoes = document.createElement('div');
    acoes.classList.add('pedido-acoes');

    acoes.append(botao, cancelarBtn);
    item.append(texto, acoes);
    preparacao.appendChild(item);
}

pedidoBtn.addEventListener('click', fazerPedido);

function pedidoPronto(id, item) {
    const pedido = pedidos.get(id);

    if (!pedido || pedido.status !== 'preparando') return;

    const pedidoAtual = pronto.firstElementChild;

    if (pedidoAtual) {
        const idAtual = Number(pedidoAtual.dataset.pedidoId);
        const dadosAtuais = pedidos.get(idAtual);

        if (dadosAtuais) {
            dadosAtuais.status = 'historico';
        }

        historico.appendChild(pedidoAtual);
    }

    pedido.status = 'pronto';
    pronto.appendChild(item);
}