const preparacao = document.getElementById('preparacao');
const pedidoBtn = document.getElementById('pedido_btn');

let cont = 0;

function fazerPedido() {
    cont += 1;

    const pedido = document.createElement('p');
    pedido.textContent = `Pedido #${cont}`;
    pedido.classList.add('pedido-item');

    preparacao.appendChild(pedido);
}

pedidoBtn.addEventListener('click', fazerPedido);