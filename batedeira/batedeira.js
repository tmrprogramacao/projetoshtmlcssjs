class Batedeira{
    //O constructor é onde definimos as propriedades que vêm "de fábrica"
    constructor(marca){
        this.marca = marca;
        this.ligada = false;
        this.velocidade = 0;
    }
    ligar(){
    this.ligada = true;
    this.velocidade = 1;
    console.log("A batedeira ligou na velocidade 1.");}


    desligar(){
    this.ligada = false;
    this.velocidade= 0;
    console.log("A batedeira foi desligada.");
    }

    mudarVelocidade(novaVelocidade){
    if(!this.ligada){
        console.log("Não dá parar mudar a velocidade, a batedeira está desligada.");
        return;
    }

    if (novaVelocidade >= 1 && novaVelocidade <=3){
        this.velocidade = novaVelocidade;
        console.log(`Velocidade alterada para: ${this.velocidade}`);
    }else{
        console.log("Velocidade inválida! Escolha de 1 a 3.")
    }
    }
}
// Compramos uma batedeira da Arno
let minhaBatedeira = new Batedeira("Arno");

// Apertando os "botões" (chamando os métodos da interface)
minhaBatedeira.ligar(); 
// → "A batedeira ligou na velocidade 1."

minhaBatedeira.mudarVelocidade(3); 
// → "Velocidade alterada para: 3"

minhaBatedeira.desligar(); 
// → "A batedeira foi desligada."