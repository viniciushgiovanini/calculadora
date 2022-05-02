onload = () => {
  document.querySelector("#bt-7").onclick = () => digito(7);
  document.querySelector("#bt-8").onclick = () => digito(8);
  document.querySelector("#bt-9").onclick = () => digito(9);
  document.querySelector("#bt-4").onclick = () => digito(4);
  document.querySelector("#bt-5").onclick = () => digito(5);
  document.querySelector("#bt-6").onclick = () => digito(6);
  document.querySelector("#bt-1").onclick = () => digito(1);
  document.querySelector("#bt-2").onclick = () => digito(2);
  document.querySelector("#bt-3").onclick = () => digito(3);
  document.querySelector("#bt-0").onclick = () => digito(0);
  document.querySelector("#bt-virg").onclick = virgula;
  document.querySelector("#bt-AC").onclick = limpa;
  document.querySelector("#bt-divi").onclick = () => operador('/');
  document.querySelector('#bt-multi').onclick = () => operador('*');
  document.querySelector("#bt-menos").onclick = () => operador('-');
  document.querySelector("#bt-plus").onclick = () => operador('+');
  document.querySelector("#bt-equal").onclick = calcula;
};
//Variaveis para salvar o valor do teclado, operador e estado da calc
let valor = '0'; //valor principal
let newnumber = true; //tela
let valorAnterior = 0; //valor acumulado para uma operacao
let operacaoPendente = null; //operacao acumulada;

//mudarvisor
const atualizarVisor = () => {
  if (valor == 'ERROR') {

    document.querySelector("#display").innerText = valor;
    valor = '0';
    return;

  }


  let visor = false;;
  let [parteInt, parteDeci] = valor.split(",");
  c = 0;

  if (parteInt.length > 10) {



    visor = true;
    return;
  }

  let v = '';

  for (let i = parteInt.length - 1; i >= 0; i--) {
    if (++c > 3) {
      v = '.' + v;
      c = 1;
    }
    v = parteInt[i] + v;
  }
  v = v + (parteDeci ? ',' + parteDeci.substr(0, 10 - v.length) : ''); //partDCEI == true --> ','+parteDeci ,,,, se for falsa --> '';

  if (visor == false) {
    document.querySelector("#display").innerText = v;
  }


};

//tratamento do visor
const digito = (n) => {
  if (newnumber == true) {
    valor = '' + n;
    newnumber = false;
  } else {
    valor += n;
  }
  atualizarVisor();
};

//tratamento da virgula

const virgula = () => {
  if (newnumber == true) {
    valor = '0,';
    newnumber = false;
  } else if (valor.indexOf(',') == -1) {
    valor += ',';
    newnumber = false;
  }
  atualizarVisor();
};

//tratamento do AC (All Clear)

const limpa = () => {
  newnumber = true;
  valor = '0';
  operacaoPendente = null;
  valorAnterior = 0;
  atualizarVisor();
};

//operações

//coverter string para um valor real;
const valorAtual = () => parseFloat(valor.replace(',', '.'));

const operador = (op) => {
  calcula();
  valorAnterior = valorAtual();
  operacaoPendente = op;
  newnumber = true;
};


const calcula = () => {
  if (operacaoPendente != null) {
    let resultado;
    switch (operacaoPendente) {
      case '+':
        resultado = valorAnterior + valorAtual();
        break;
      case '-':
        resultado = valorAnterior - valorAtual();
        break;
      case '*':
        resultado = valorAnterior * valorAtual();
        break;
      case '/':
        resultado = valorAnterior / valorAtual();
        break;
    }

    valor = resultado.toString().replace('.', ',');
    //console.log(valor);

    let [pInt] = valor.split(',');

    if (pInt.length > 10) {
      valor = 'ERROR'

    }
  }
  //console.log(valor.typeof);
  newnumber = true;
  operacaoPendente = null;
  valorAnterior = 0;
  atualizarVisor();
};