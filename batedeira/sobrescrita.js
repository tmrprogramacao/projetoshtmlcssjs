class Batedeira{
    constructor(marca){
        this.marca = marca;
    }
}

// 1. Adicionamos uma propriedade direto no protótipo (Manual de fábrica)

Batedeira.prototype.corPadrao = "Branca";

// 2. Criamos uma batedeira comum.
let batedeiraComum = new Batedeira("Arno");

// 3. Criamos uma batedeira customizada e mudamos a cor DIRETO nela.
let batedeiraEstilizada = new Batedeira("Walita");
batedeiraEstilizada.corPadrao = "Rosa Choque";// Sobrescrita acontecendo aqui!

console.log(`Cor da batedeira comum: ${batedeiraComum.corPadrao}`); 
console.log(`Cor da batedeira estilizada: ${batedeiraEstilizada.corPadrao}`);