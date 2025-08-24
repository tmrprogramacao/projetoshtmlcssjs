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

    //Botão de remover
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.style.marginLeft = "5px";
    removeBtn.onclick = () => li.remove();

    //Marcar como concluída ao clicar
    li.onclick = () => li.classList.toggle("completed");

    li.appendChild(removeBtn);
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