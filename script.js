const numBotoes = document.querySelectorAll("[data-num]");
const operadorBotoes = document.querySelectorAll("[data-operador]");
const igualBotoes = document.querySelector("[data-igual]");
const deleteBotoes = document.querySelector("[data-delete]");
const limpatudo = document.querySelector("[data-limpa-tudo]");
const anteOperTextElement = document.querySelector("[data-prev]");
const actOperTextElement = document.querySelector("[data-curr]");

class Calculador{

    constructor(anteOperTextElement, actOperTextElement){
        this.actOperTextElement = actOperTextElement;
        this.anteOperTextElement = anteOperTextElement;
        this.limpar();
    }

    pegarNumber(num){
        if(this.actuaOperand.includes('.') && num === '.') return;
        
        this.actuaOperand = `${this.actuaOperand}${num.toString()}`;
        //this.actuaOperand = this.actuaOperand.toString() + num.toString();
    }

    limpar(){
        this.actuaOperand = "";
        this.antaOperand = "";
        this.operacao = undefined;
    }

    delete(){
        this.actuaOperand = this.actuaOperand.toString().slice(0, -1);
    }
    
    actualizarTela(){
        this.anteOperTextElement.innerText = this.antaOperand;
        this.actOperTextElement.innerText = this.actuaOperand;
    }
    /*actualizarTela(){
        this.actOperTextElement.innerText = this.getTelaNumber(this.actuaOperand);
        if (this.operacao != null) {
            this.anteOperTextElement.innerText= `${this.getTelaNumber(this.antaOperand)} ${this.operacao}`;
        } else {
            this.anteOperTextElement.innerText = '';
        }
    }*/

    opcao(operacao){
        if(this.actuaOperand === '') return;
        if(this.antaOperand !== '') this.calcula();

        this.operacao = operacao;
        this.antaOperand = `${this.actuaOperand} ${this.operacao}`;
        this.actuaOperand = '';

    }
    calcula(){
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

for (const numBotao of numBotoes) {
    numBotao.addEventListener("click", () => {
        calculador.pegarNumber(numBotao.innerHTML);
        calculador.actualizarTela();
    });   
}

/*
numBotoes.forEach(button => {
    button.addEventListener("click", () => {
        calculador.pegarNumber(button.innerText);
        calculador.actualizarTela();

    })
});*/
/*operadorBotoes.forEach(button =>{
    button.addEventListener("click", () => {
        calculador.opcao(operadorBotoes.innerText);
        calculador.actualizarTela();
    });
} );*/
for(const operadorBotao of operadorBotoes){
    operadorBotao.addEventListener("click", () =>{
        calculador.opcao(operadorBotao.innerText);
        calculador.actualizarTela();
    })
}




limpatudo.addEventListener("click", () => {
    calculador.limpar(); //server para limpar as variavais
    calculador.actualizarTela(); //server para actualizar os dados na tela
});

igualBotoes.addEventListener("click", () =>{
    calculador.calcula();
    calculador.actualizarTela();
});

deleteBotoes.addEventListener("click", button =>{
    calculador.delete();
    calculador.actualizarTela();
})


