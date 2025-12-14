const botao = document.getElementById("btn-tema");
const body = document.body;


botao.addEventListener("click", ()=>{
    const temaEscuroAtivo = body.classList.toggle("tema-escuro");

    if (temaEscuroAtivo){
        botao.textContent = "Modo claro";
        botao.setAttribute("arial-label", "Ativar modo claro");
    }else{
        botao.textContent= "Modo escuro";
        botao.setAttribute("arial-label", "Ativar modo escuro");
    }
});

