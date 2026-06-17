// 1. Criamos um objeto "pai" (o protótipo)
let prototipoCachorro = {
    latir(){
        console.log(`${this.nome} diz: Auau!`);
    }
};

// 2. Criamos um cachorro linkado a esse protótipo

let meuCachorro = Object.create(prototipoCachorro);
meuCachorro.nome = "Rex";

// 3. Vamos tentar ver o que tem DENTRO do objeto meuCachorro
console.log("--- Propriedades Reais do Cachorro ---");
console.log(meuCachorro); 

// 4. Vamos chamar o método que está no protótipo
console.log("\n--- Chamando o método ---");
meuCachorro.latir();

// 5. Vamos perguntar ao JavaScript quem é o protótipo dele
console.log("\n--- Verificando o Pai/Protótipo ---");
console.log(Object.getPrototypeOf(meuCachorro) === prototipoCachorro);