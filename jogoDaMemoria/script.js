const grid = document.getElementById("grid");
const tempoEl = document.getElementById("tempo");
const movimentosEL = document.getElementById("movimentos");
const reiniciarBtn = document.getElementById("reiniciar");
const rankingLista = document.getElementById("ranking");
const nomeInput = document.getElementById("nome");

const simbolos = [ 
  "\u{1F355}", "\u{1F354}", "\u{1F32D}", "\u{1F35F}",
  "\u{1F369}", "\u{1F34E}", "\u{1F347}", "\u{1F349}",
  "\u{1F353}", "\u{1F352}", "\u{1F95D}", "\u{1F34D}",
  "\u{1F951}", "\u{1F34C}", "\u{1F965}", "\u{1F36A}",
  "\u{1F370}", "\u{1F9C1}"
];

let cartas = [...simbolos, ...simbolos];
let primeira = null;
let segunda = null;
let bloqueado = false;
let movimentos = 0;
let tempo = 0;
let intervalo;

function embaralhar(array){
    return array.sort(() => Math.random() - 0.5);
}

function iniciar(){
    grid.innerHTML = "";
    primeira = null;
    segunda = null;
    bloqueado = false;
    movimentos = 0;
    tempo = 0;
    movimentosEL.textContent = 0;
    tempoEl.textContent = 0;
    clearInterval(intervalo);

    intervalo = setInterval(() => {
        tempo++;
        tempoEl.textContent = tempo;
    }, 1000);

    embaralhar(cartas).forEach(simbolo => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.simbolo = simbolo;

        // CORRIGIDO: template string com crase
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">${simbolo}</div>
            </div>
        `;

        card.addEventListener("click", virar);
        grid.appendChild(card);
    });
}

function virar(){
    if(bloqueado || this.classList.contains("virada")) return;

    this.classList.add("virada");

    if(!primeira){
        primeira = this;
        return;
    }

    segunda = this;
    movimentos++;
    movimentosEL.textContent = movimentos;
    
    if(primeira.dataset.simbolo === segunda.dataset.simbolo) {
        primeira = null;
        segunda = null;
        verificarFim(); // CORRIGIDO
    } else {
        bloqueado = true;
        setTimeout(() =>{
            primeira.classList.remove("virada");
            segunda.classList.remove("virada");
            primeira = null;
            segunda = null;
            bloqueado = false;
        }, 900);
    }
}

function verificarFim(){
    if(document.querySelectorAll(".virada").length === cartas.length) {
        clearInterval(intervalo);
        salvarRanking();
        setTimeout(() => alert("Parabéns! Você venceu!"), 300);
    }
}

function salvarRanking(){
    const nome = nomeInput.value || "Anônimo";
    let ranking = JSON.parse(localStorage.getItem("rankingMemoria")) || [];

    ranking.push({nome, tempo, movimentos});
    ranking.sort((a, b) => a.tempo - b.tempo);
    ranking = ranking.slice(0, 5);

    // CORRIGIDO: nome certo da chave
    localStorage.setItem("rankingMemoria", JSON.stringify(ranking));
    mostrarRanking();
}

function mostrarRanking(){
    rankingLista.innerHTML = "";
    const ranking = JSON.parse(localStorage.getItem("rankingMemoria")) || [];

    ranking.forEach((item, i)=>{
        const li = document.createElement("li");
        li.textContent = `${i+1}º - ${item.nome} | ${item.tempo}s | ${item.movimentos} jogadas`;
        rankingLista.appendChild(li);
    });
}

reiniciarBtn.addEventListener("click", iniciar);

iniciar();
mostrarRanking();
