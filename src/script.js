// numero de cima
const previousOperationText = document.querySelector("#previous-operacao");
// numero de baixo (numero maior no visor)
const currentOperationText = document.querySelector("#current-operacao");
// operacoes
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator{
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    } // melhora o fluxo de trabalho para trabalhar com DOM e OBJETO

    addDigit(digit){

        if(digit === "." && this.currentOperationText.innerText.includes(".")) {
            return
        }

        this.currentOperation = digit
        this.updateScreen()
    }

    // processo all calculator Operation
    processOperation(operation) {
      // verifica se nao tem nenhum texto em currentText(numero maior no visor)
      // após  "&&" verifica se a mudança é diferente de c
      if (this.currentOperationText.innerText === "" && operation !== "C") {
        // mudança de operação
        if (this.previousOperationText !== "") {
          this.changeOperation(operation);
        }
        return; // quando tenta mudar operacao e é invalida
      }

      let operationValue;
      // separa em array e pega o primeiro numero(s)
      let previous = + this.previousOperationText.innerText.split(" ")[0];
      let current = + this.currentOperationText.innerText;

      switch (operation) {
        // somar
        case "+":
          operationValue = previous + current;
          this.updateScreen(operationValue, operation, current, previous);
          break;
          // subitrair
        case "-":
          operationValue = previous - current;
          this.updateScreen(operationValue, operation, current, previous);
          break;
          // divisao
        case "/":
          operationValue = previous / current;
          this.updateScreen(operationValue, operation, current, previous);
          break;
          //operação X
        case "*":
          operationValue = previous * current;
          this.updateScreen(operationValue, operation, current, previous);
          break;
          // Deletar ultimo numero digitado
        case "DEL":
          this.processDelOperation();
          break;
          // deleta numero maior no visor
        case "CE":
          this.processClearCurrentOperation();
          break;
          // deleta todos os numeros do visor
        case "C":
          this.processClearOperation();
          break;
          // operação para ver resultado 
        case "=":
          this.processEqualOperation()
          break;

        default:
          return;
      }
    } 

    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
        ) {
        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            // check id value is zero, if it just add current value
            if(previous === 0){
                operationValue = current;
            }
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }

    changeOperation(operation) {
        const mathOperation = ["*", "/", "+", "-"]

        if(!mathOperation.includes(operation)) {
            return
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;

    }
    
    // deletar ultimo digito
    processDelOperation() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    // deleta todos os digitos maiores
    processClearCurrentOperation() {
        this.currentOperationText.innerText = "";
    }

    // deleta todos os digitos e operações
    processClearOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    // soma os numeros com =
    processEqualOperation() {
        // separa em string e pega a segunda parte que é a operação
        const operation = previousOperationText.innerText.split(" ")[1];

        this.processOperation(operation)
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

// eventos que fazem a calculadora funcionar
buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        // pega o valor do botão
        const value = e.target.innerText;
        // se o valor for numerico com . quero processar algo
        // tenta converter o valor em numero
        if(+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            // se nao conseguir converter em numero será uma operação (+, -, =, *, /)
            calc.processOperation(value);
        }
    })

});