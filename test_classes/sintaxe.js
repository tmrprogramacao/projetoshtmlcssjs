// JEITO MODERNO (Esconde a sintaxe real)
class CoelhoModerno{
    constructor(tipo){
        this.tipo = tipo // Na instância
    }
    falar(){ console.log("Oi");} //No protótipo
}

// JEITO ANTIGO (Mostra o que o JavaScript faz de verdade por baixo dos panos)

function CoelhoAntigo(tipo){
    this.tipo = this.tipo;
}

// Olha a sintaxe real aqui! Nós explicitamente tocamos na propriedade '.prototype'
CoelhoAntigo.prototype.falar = function(){ console.log("Oi");};

// --- VAMOS PROVAR QUE SÃO IGUAIS ---
let moderno = new CoelhoModerno("Ninja");
let antigo = new CoelhoAntigo("Pirata");

console.log("Protótipo do moderno tem 'falar'?", Object.getPrototypeOf(moderno).hasOwnProperty("falar"));
console.log("Protótipo do antigo tem 'falar'?", Object.getPrototypeOf(antigo).hasOwnProperty("falar"));