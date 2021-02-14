const historyUl = document.querySelector('.history-ul');
const totalDom = document.querySelector('.total-int');
const form = document.querySelector('.form');
const produtoInput = document.querySelector('.produto');
const valorInput = document.querySelector('.valor');





const localStorangeProdutos = JSON.parse(localStorage.getItem('produtos'));
let produtosValores = localStorage.getItem('produtos') !== null ? localStorangeProdutos : [];


const apagarItem = (ID) => {
    produtosValores = produtosValores.filter((item) => item.id !== ID);
    atualizaLocalStorage();
    inicia();
}

const addProdutosList = (transacao) => {
    const valorAbs = Math.abs(transacao.valor);
    const li = document.createElement('li');
    li.classList.add('li');
    li.innerHTML = `<span>${transacao.nome}</span>
        <span>R$ ${valorAbs}</span><button class="delete" onclick="apagarItem(${transacao.id})">
        X</button>`;
    historyUl.append(li);
}

const atualizaValoresTela = () => {
    
    const pegaValoresPorcentagens = produtosValores.map((itens) => itens.porcentagemValue);

    const total = pegaValoresPorcentagens.reduce((acumulador, valores) => acumulador + valores, 0).toFixed(2);

    const totalFormatado = Number(total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    //console.log('Total: ' +total)
    totalDom.innerHTML = `${totalFormatado}`;
    //console.log(' dcsdc '+totalFormatado);
    
}

const inicia = () => {
    historyUl.innerHTML = '';
    produtosValores.forEach(addProdutosList);
    atualizaValoresTela();
}
inicia();

const atualizaLocalStorage = () => {
    localStorage.setItem('produtos', JSON.stringify(produtosValores));
}

const geraIds = () => Math.round(Math.random() * 1000);

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const inputProduto = produtoInput.value;
    const inputValor = valorInput.value;



    if (inputProduto === '' || inputValor === '') {
        alert('ATENÇÃO: Preencha os campos abaixo');
        return;
    }
    
    const pegaRadio = (valor) => {
        const radio = document.querySelectorAll('.radio');

        for (var i = 0; i < radio.length; i++) {
            if (radio[i].checked) {
                return radio[i].value;
            }
        }
        return null;
    }
    const valorDoRadio = pegaRadio('valor');

    let porcentagem = '';

    if(valorDoRadio === 'sim'){
        porcentagem = (inputValor * 2) / 100;
    }else{
        porcentagem = (inputValor * 6) / 100;
    }
    

    const transacoes = { id: geraIds(), nome: inputProduto, valor: inputValor, porcentagemValue: porcentagem};
    console.log(transacoes)

    produtosValores.push(transacoes);
    inicia();
    atualizaLocalStorage();

    produtoInput.value = '';
    produtoInput.focus();
    valorInput.value = '';
});