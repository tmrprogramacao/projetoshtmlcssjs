class Batedeira{
    // O 'this' garante que as propriedades fiquem grudadas no objeto específico que foi criado
    constructor(marca, cor){
        this.marca = marca;
        this.cor = cor;
        this.ligada = false;
        
    }

    ligar(){
    this.ligada = true;
    // Aqui o 'this' vai buscar a marca e a cor da batedeira específica que chamou o método
    console.log(`A batedeira ${this.marca} de cor ${this.cor} está LIGADA!`);
    }

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

    status() {
    if (this.ligada === true) {
    console.log(`A batedeira da marca ${this.marca} está ligada!`);
     } else {
    console.log(`A batedeira da marca ${this.marca} está desligada.`);
     }
}
}
// --- TESTANDO O "THIS" COM DOIS OBJETOS ---

// Criamos a batedeira da Thais (Objeto 1)
let batedeiraThais = new Batedeira("Arno", "Vermelha");

// Criamos a batedeira do Gemini (Objeto 2)
let batedeiraGemini = new Batedeira("Walita", "Preta");

// Agora vamos chamar o MESMO método 'ligar' para as duas:
batedeiraThais.ligar(); 
batedeiraGemini.ligar();

let minhaBatedeira = new Batedeira("Arno", "Vermelha");

minhaBatedeira.status(); // Vai dizer que está desligada
minhaBatedeira.ligar();  // Vai ligar
minhaBatedeira.status(); // Vai dizer que está ligada