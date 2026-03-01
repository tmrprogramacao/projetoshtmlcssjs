const input = document.getElementById("tarefaInput");
const select = document.getElementById("categoriaSelect");
const btn = document.getElementById("adicionarBtn");
const lista = document.getElementById("lista");
const filtros = document.querySelectorAll(".filtros button");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
let filtroAtual = "todas";

function salvar(){
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function renderizar(){
    lista.innerHTML = "";

    let tarefasFiltradas = tarefas.filter(t => {
        if(filtroAtual === "pendentes") return !t.concluida;
        if(filtroAtual === "concluidas") return t.concluida;
        return true;
    });

    tarefasFiltradas.forEach((tarefa, index)=>{
        const li = document.createElement("li");
        li.draggable = true;
        if(tarefa.concluida) li.classList.add("concluida");

        li.innerHTML = `
        <span>${tarefa.texto} <span class= "categoria">${tarefa.categoria}</span></span>
        <div>
            <button onclick="toggle(${index})">✔</button>
            <button onclick="remover(${index})">🗑</button>
        </div>`;

        li.addEventListener("dragstart", ()=> li.classList.add("dragging"));
        li.addEventListener("dragend", ()=>{
            li.classList.remove("dragging");
            atualizarOrdem();
        });

        lista.appendChild(li);

    });
}

function adicionar(){
    if(input.value.trim() === "") return;

    tarefas.push({
        texto: input.value,
        categoria: select.value,
        concluida: false
    });

    input.value = "";
    salvar();
    renderizar();
}

function toggle(index){
    tarefas[index].concluida = !tarefas[index].concluida;
    salvar();
    renderizar();
}

function remover(index){
    tarefas.splice(index, 1);
    salvar();
    renderizar();
}

function atualizarOrdem(){
    const itens = [...lista.children];
    const novaOrdem= [];

    itens.forEach(li => {
        const texto = li.querySelector("span").childNodes[0].textContent.trim();
        const tarefa = tarefas.find(t => t.texto === texto);
        if(tarefa) novaOrdem.push(tarefa);
    });

    tarefas = novaOrdem;
    salvar();
}

filtros.forEach(btn => {
    btn.addEventListener("click", ()=>{
        filtroAtual = btn.dataset.filtro;
        renderizar();
    });
});

btn.addEventListener("click", adicionar);

renderizar();

