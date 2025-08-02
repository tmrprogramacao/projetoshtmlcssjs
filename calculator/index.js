function calcular(operador){
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const resultDiv = document.getElementById('result');

    if (isNaN (num1) || isNaN(num2)){
        resultDiv.textContent = "Por favor, digite dois números válidos."
        return;
    }

    let result;

    switch (operador){
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if(num2 === 0){
                resultDiv.textContent = "Não é possível dividir por zero.";
                result;
            }
            result = num1/num2;
            break;
    }
    resultDiv.textContent = `Resultado: ${result}`;
}
