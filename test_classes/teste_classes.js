class Particle{
    speed = 0; //propriedade declarada direto na classe

    constructor(position){
        this.position = position; // propriedade do construtor
    }
    move(){
        console.log("Movendo ...");
    }
}

let p = new Particle(10);

console.log("--- O que tem direto no objeto p? ---");
console.log(p); 

console.log("\n--- O método 'move' está no objeto p? ---");
console.log(p.hasOwnProperty("move")); // hasOwnProperty checa se está direto no objeto

console.log("\n--- O método 'move' está no protótipo do objeto p? ---");
console.log(Object.getPrototypeOf(p).hasOwnProperty("move"));