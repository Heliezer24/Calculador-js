const numBotoes = document.querySelectorAll("[data-num]");
const operadorBotoes = document.querySelectorAll("[data-operador]");
const igualBotoes = document.querySelector("[data-igual]");
const deleteBotoes = document.querySelector("[data-delete]");
const limpatudo = document.querySelector("[data-limpa-tudo]");
const anteOperTextElement = document.querySelector("[data-anterior]");
const actOperTextElement = document.querySelector("[data-actual]");



class Calculador{
    constructor(anteOperTextElement, actOperTextElement){
      this.actOperTextElement = actOperTextElement;
      this.anteOperTextElement = anteOperTextElement;
      this.limpar();
    }

    formataNumero(numero){
      const stingNumero = numero.toString();

      const intDigito = parseFloat(stingNumero.spit(".")[0]);

      const decimalDigito = stingNumero.spit(".")[1];

      let intTela;

      if (isNaN(intDigito)) {
        intTela = "";
        
  } else {
      intTela = intDigito.toLocaleString("en", {
      maximumFractionDigits :0,
    });
  }
  if (decimalDigito != null) {  
    return `${intTela}.${decimalDigito}`;
  } else {
    return intTela;
  }
}


    pegarNumber(num){ //Esta função serve para pegar os numeros e fazer o tratamento.
      if(this.actuaOperand.includes('.') && num === '.') return;
      
      this.actuaOperand = `${this.actuaOperand}${num.toString()}`;
      //this.actuaOperand = this.actuaOperand.toString() + num.toString();
    }

    limpar(){ // Esta função serve para limpar os números digitados
      this.actuaOperand = "";
      this.antaOperand = "";
      this.operacao = undefined;
    }

    delete(){ //Esta função serve para eliminar um unico digito, nesse caso do fim.
      this.actuaOperand = this.actuaOperand.toString().slice(0, -1);
    }

    actualizarTela(){ // A função que actualiza a tela, e faz actualização dos numeros digitados na tela
      this.anteOperTextElement.innerText = this.antaOperand;
      this.actOperTextElement.innerText = this.actuaOperand;
    }
    opcao(operacao){//Esta função serve para saber qual operação.
      if(this.actuaOperand === '') return;
      if(this.antaOperand !== '') this.calcula();

      this.operacao = operacao;
      this.antaOperand = `${this.actuaOperand} ${this.operacao}`;
      this.actuaOperand = '';

    }
calcula(){// Esta função e que faz os calculos.
  let res;
  const ante = parseFloat(this.antaOperand);
  const actual =parseFloat(this.actuaOperand);
  if(isNaN(ante) || isNaN(actual)) return;
  switch (this.operacao) {
    case '+':
      res = ante + actual;
      break;
    case '-':
      res = ante - actual;
      break;
    case '*':
      res = ante * actual;
      break;
    case '÷':
      res = ante / actual;
      break;
    default:
      return;
  }

  this.actuaOperand = res;
  this.operacao = undefined;
  this.antaOperand = '';

 }

}

const calculador = new Calculador(
  anteOperTextElement,
  actOperTextElement
);

for (const numBotao of numBotoes) { // Serve para saber qual digito foi digitado.
  numBotao.addEventListener("click", () => {
    calculador.pegarNumber(numBotao.innerHTML);
    calculador.actualizarTela();
  });   
}

for(const operadorBotao of operadorBotoes){ // Serve para saber qual operação foi digitado
  operadorBotao.addEventListener("click", () =>{
    calculador.opcao(operadorBotao.innerText);
    calculador.actualizarTela();
  })
}

limpatudo.addEventListener("click", () => {// Adicionando o evento no button para ter uma acção
  calculador.limpar(); //server para limpar as variavais
  calculador.actualizarTela(); //server para actualizar os dados na tela
});

igualBotoes.addEventListener("click", () =>{//server para mostrar o resultado
  calculador.calcula();
  calculador.actualizarTela();
});

deleteBotoes.addEventListener("click", () =>{
  calculador.delete();
  calculador.actualizarTela();
})
