const frases = [
    "A persistência é o caminho do êxito.",
    "Pequenos passos também levam longe.",
    "Todo progresso começa com a decisão de tentar.",
    "Aprender a programar é aprender a pensar.",
    "Não desista. Você está evoluindo.",
    ";D"
]
const botao = document.getElementById("btn-frase");
const textoFrase = document.getElementById("frase");

botao.addEventListener("click", ()=>{
    const indiceAleatorio = Math.floor(Math.random()*frases.length);
    textoFrase.textContent = frases[indiceAleatorio];
})