const pizzas = [
    {id: 1, nome: "Calabresa", categoria: "tradicional", preco: 35.00, img: "pizzaReal.png", descricao: "Molho de tomate, mozarela, calabresa fatiada e cebola."},
    {id: 2, nome: "Quatro Queijos", categoria: "tradicional", preco: 40.00, img: "pizzaReal.png", descricao: "Molho de tomate, mozarela, gorgonzola, provolone e catupiry."},
    {id: 3, nome: "Nutella com Morango", categoria: "doce", preco: 45.00, img: "pizzaReal.png", descricao: "Creme de Nutella original com morangos frescos fatiados."},
    {id: 4, nome: "Frango com Catupiry", categoria: "especial", preco: 42.00, img: "pizzaReal.png", descricao: "Molho de tomate, mozarela, frango defiado e catupiry legítimo."},
];

let carrinho = [];

// Seleção de elementos DOM
const cardapioContainer = document.getElementById('cardapio');
const buscaInput = document.getElementById('busca');
const botoesFiltro = document.querySelectorAll('.btn-filtro');

//Elemento do Modal
const modal = document.getElementById('modal-detalhes');
const fecharModalBtn = document.getElementById('fecha-modal');
const modalImg = document.getElementById('modal-img');
const modalNome = document.getElementById('modal-nome');
const modalDescricao = document.getElementById('modal-descricao');
const modalPreco = document.getElementById('modal-preco');
const modalAddBtn = document.getElementById('modal-add-carrinho');

let pizzaSelecionadaAtual = null;

// Renderização Dinâmica
function renderizarCardapio(listaDePizzas){
    //limpa o container antes de renderizar (evita duplicar)
    cardapioContainer.innerHTML= "";

    listaDePizzas.forEach(pizza => {
        //Criação de Elementos pelo código
        const card = document.createElement('div');
        card.classList.add('pizza-card');
        //Injetando a estrutura interna do card
        card.innerHTML = `
        <img src="${pizza.img}" alt="${pizza.nome}">
        <h3>${pizza.nome}</h3>
        <p>R$ ${pizza.preco.toFixed(2)}</p>
        `;
        //Evendo para abrir o modal ao clicar no card
        card.addEventListener('click', ()=> abrirModal(pizza));
        //Adicionar o elemento criado dentro do container do html
        cardapioContainer.appendChild(card);
    });

}

// Modal com detalhes
function abrirModal(pizza){
    pizzaSelecionadaAtual = pizza; // salva a referencia para usar no carrinho
    modalImg.src = pizza.img;
    modalNome.textContent = pizza.nome;
    modalDescricao.textContent = pizza.descricao;
    modalPreco.textContent = `R$ ${pizza.preco.toFixed(2)}`;

    modal.classList.remove('oculto');
}

fecharModalBtn.addEventListener('click', ()=> modal.classList.add('oculto'));

//Filtros e Busca (lógica de arrays)
function filtrarPizzas(){
    const termoBusca = buscaInput.value.toLowerCase();
    const botaoAtivo = document.querySelector('.btn-filtro.ativo') || {dataset: {categoria: 'todos'}};
    const categoriaAtiva = botaoAtivo.dataset.categoria;

    const pizzasFiltradas = pizzas.filter(pizza => {
        const bateComBusca = pizza.nome.toLowerCase().includes(termoBusca);
        const bateComCategoria = categoriaAtiva === 'todos'|| pizza.categoria === categoriaAtiva;
        return bateComBusca && bateComCategoria;
    });

    renderizarCardapio(pizzasFiltradas);
}

//Evento de Digitação na Busca
buscaInput.addEventListener('input', filtrarPizzas);

//Evento de Clique nos Filtros
botoesFiltro.forEach(botao => {
    botao.addEventListener('click', ()=>{
        botoesFiltro.forEach(b => b.classList.remove('ativo'));
        botao.classList.add('ativo');
        filtrarPizzas();
    });
});

//Carrinho Fake
modalAddBtn.addEventListener('click', ()=>{
    if(pizzaSelecionadaAtual){
        carrinho.push(pizzaSelecionadaAtual);
        atualizarCarrinho();
        modal.classList.add('oculto'); // fecha o modal
    }
});

function atualizarCarrinho(){
    const itensContainer = document.getElementById('itens-carrinho');
    const valorTotalSpan = document.getElementById('valor-total');

    itensContainer.innerHTML = "";
    let total = 0;

    carrinho.forEach((item, index)=>{
        total += item.preco;

        const itemDiv = document.createElement('div');
        itemDiv.style.display = 'flex';
        itemDiv.style.justifyContent= 'space-between';
        itemDiv.style.marginBottom = '8px';

        itemDiv.innerHTML = `
        <span>${item.nome}</span>
        <span>${item.preco.toFixed(2)}</span>
        `;
        itensContainer.appendChild(itemDiv);
    });

    valorTotalSpan.textContent = total.toFixed(2);
}
//Inicializa o cardapio na primeira execução
renderizarCardapio(pizzas);