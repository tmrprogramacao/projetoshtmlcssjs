const taskInput= document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

//Função para add tarefa
function addTask(){
    const taskText = taskInput.value.trim();

    if (taskText === ""){
        alert("Digite uma tarefa!");
        return;
    }
    //Criar elemento li
    const li = document.createElement("li");
    li.textContent = taskText;

    //Botão de marca como concluída
    const checkBtn = document.createElement("button");
    checkBtn.textContent= "✅";
    checkBtn.style.marginLeft= "1px";
    checkBtn.style.marginRight= "1px";
    checkBtn.onclick = () => li.classList.toggle("completed")

    //Botão de remover
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "🗑️";
    removeBtn.style.marginLeft = "1px";
    removeBtn.style.marginRight = "1px";
    removeBtn.onclick = () => li.remove();

    //Adicionar botões à tarefa
    li.appendChild(checkBtn);
    li.appendChild(removeBtn)

   //Adicionar a tarefa à lista
    taskList.appendChild(li);

    //Limpar input
    taskInput.value = "";
}

//Adicionar evento ao botão
addTaskBtn.addEventListener("click", addTask);

//Adicionar evento com tecla Enter
taskInput.addEventListener("keypress", function(event){
    if (event.key === "Enter"){
        addTask();
    }
});