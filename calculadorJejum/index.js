function calcularJejum(){
    const inicio = new Date(document.getElementById('inicio').value);
    const fim = new Date(document.getElementById('fim').value);
    const resultado = document.getElementById('resultado');

    if (!inicio || !fim || fim <= inicio){
        resultado.textContent = "Preencha corretamente as datas.";
        return;
    }

    const diffMs = fim - inicio;
    const horas = Math.floor(diffMs / (1000 * 60 * 60));
    const minutos = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60 * 60));

    resultado.textContent =`Tempo de Jejum: ${horas}h ${minutos}min `;
}