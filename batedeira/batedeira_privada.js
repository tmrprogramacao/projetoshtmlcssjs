class BatedeiraComTrava{
    #voltagem = 220; // Ninguém fora da fábrica pode alterar a voltagem!
    constructor(marca){
        this.marca = marca;
    }
    //Método público
    exibirEspecificacoes(){
        console.log(`Batedeira ${this.marca} - Funciona em: ${this.#voltagem}V`);
    }
}

let minhaBatedeira = new BatedeiraComTrava("Arno");

minhaBatedeira.exibirEspecificacoes(); // → Funciona!

// Tentando dar uma de espertinho e mudar a voltagem por fora:
minhaBatedeira.#voltagem = 110; // Descomente essa linha para ver o Node dar erro!