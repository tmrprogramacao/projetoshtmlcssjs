//Criando um map para guardar os preços dos produtos.
let precosBatedeira = new Map();

//Cadastrando os dados (.set).
precosBatedeira.set("Arno", 250.00);
precosBatedeira.set("Walita", 180.00);
precosBatedeira.set("Oster", 350.00);

//Verificando se existe a marca Philco (.has)

console.log("Temos Philco no estoque?", precosBatedeira.has("Philco"));

//Buscando o preço da Oster (.get).

console.log(`A batedeira Oster custa: R$ ${precosBatedeira.get("Oster")}`);

//Testando a segurança contra o 'toString'

console.log("Existe a marca 'toString'", precosBatedeira.has("toString"));
