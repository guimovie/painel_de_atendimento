const historico = document.getElementById('historico-lista');
const pronto = document.getElementById('pronto-lista');
const preparacao = document.getElementById('preparacao-lista');
const pedidoBtn = document.getElementById('pedido-btn');
const limparBtn = document.getElementById('limpar-btn');
const videoPlayer = document.getElementById('video-player');
const videoMensagem = document.getElementById('video-mensagem');

const LIMITE_HISTORICO = 7;
let cont = 0;
const pedidos = new Map();
const videos = [
    'videos/video1.mp4'
];
let videoAtual = 0;

pedidoBtn.addEventListener('click', fazerPedido);
limparBtn.addEventListener('click', limparPedidos);
videoPlayer.addEventListener('ended', tocarProximoVideo);
videoPlayer.addEventListener('error', () => {
    videoMensagem.textContent = `Não foi possível carregar "${videos[videoAtual]}". Confira se o arquivo existe na pasta videos.`;
    videoMensagem.hidden = false;
});

videoPlayer.src = videos[videoAtual];
videoPlayer.play().catch(() => {
    videoMensagem.textContent = 'Não foi possível iniciar o vídeo automaticamente.';
    videoMensagem.hidden = false;
});

function tocarProximoVideo() {
    videoAtual = (videoAtual + 1) % videos.length;
    videoMensagem.hidden = true;
    videoPlayer.src = videos[videoAtual];
    videoPlayer.play().catch(() => {
        videoMensagem.textContent = 'Não foi possível iniciar o vídeo automaticamente.';
        videoMensagem.hidden = false;
    });
}

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

function limparPedidos() {
    cont = 0
    historico.replaceChildren();
    pronto.replaceChildren();
    const mensagemPronto = document.createElement('h2');
    mensagemPronto.textContent = 'Pronto';
    pronto.appendChild(mensagemPronto);
    preparacao.replaceChildren();
    pedidos.clear();
}

function pedidoPronto(id, item) {
    const pedido = pedidos.get(id);

    if (!pedido || pedido.status !== 'preparando') return;

    const pedidoAtual = pronto.querySelector('.pedido-item');

    if (pedidoAtual) {
        const idAtual = Number(pedidoAtual.dataset.pedidoId);
        const dadosAtuais = pedidos.get(idAtual);

        if (dadosAtuais) {
            dadosAtuais.status = 'historico';
        }

        historico.appendChild(pedidoAtual);

        if (historico.children.length > LIMITE_HISTORICO) {
            const pedidoMaisAntigo = historico.firstElementChild;
            pedidos.delete(Number(pedidoMaisAntigo.dataset.pedidoId));
            pedidoMaisAntigo.remove();
        }
    }

    pedido.status = 'pronto';
    const mensagemPronto = pronto.querySelector('h2');
    if (mensagemPronto) mensagemPronto.remove();
    pronto.appendChild(item);
    anunciarPedidoPronto(id);
}

function anunciarPedidoPronto(id) {
    if (!('speechSynthesis' in window)) {
        console.error('Este navegador não oferece suporte à leitura de voz.');
        return;
    }

    const fala = new SpeechSynthesisUtterance(`Pedido ${id} está pronto`);
    fala.lang = 'pt-BR';
    window.speechSynthesis.speak(fala);
}

function cancelarPedido(id, item) {
    const pedido = pedidos.get(id);

    if (!pedido || pedido.status !== 'preparando') return;

    item.remove();
    pedidos.delete(id);
}