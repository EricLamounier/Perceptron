import { adicionaDadosGraficoAND, limpaGraficoAND } from '../graficos/graphAND.js';
import { adicionaDadosGraficoOR, limpaGraficoOR } from '../graficos/graphOR.js';
import { adicionaDadosGraficoNOT, limpaGraficoNOT } from '../graficos/graphNOT.js';

const resultadoTreinamentoAND = { w1: 0, w2: 0, bias: 0 };

const resultadoTreinamentoOR = { w1: 0, w2: 0, bias: 0 };

const resultadoTreinamentoNOT = { w1: 0, bias: 0 };

const sleep = (milliseconds) => (new Promise(resolve => setTimeout(resolve, milliseconds)))

const elementos = {
  w1AND: document.getElementById('w1AND'),
  w2AND: document.getElementById('w2AND'),
  biasAND: document.getElementById('biasAND'),

  w1OR: document.getElementById('w1OR'),
  w2OR: document.getElementById('w2OR'),
  biasOR: document.getElementById('biasOR'),

  w1NOT: document.getElementById('w1NOT'),
  biasNOT: document.getElementById('biasNOT'),
}

const ativacaoLinear = (valor) => (valor < 0 ? 0 : 1);

const ativacaoSigmoide = (valor) => (1 / (1 + Math.exp(-valor)) >= 0.5 ? 1 : 0);

const adicionaDadosGrafico = (operador, acertos) => {
  switch(Number(operador)) {
    case 0: adicionaDadosGraficoAND(acertos); break;

    case 1: adicionaDadosGraficoOR(acertos); break;

    case 2: adicionaDadosGraficoNOT(acertos); break;
  }
};

const salvaDados = (w1, w2, bias, operador) => {

  switch(Number(operador)) {
    case 0:
      resultadoTreinamentoAND.w1 = w1;
      resultadoTreinamentoAND.w2 = w2;
      resultadoTreinamentoAND.bias = bias;
      break;

    case 1:
      resultadoTreinamentoOR.w1 = w1;
      resultadoTreinamentoOR.w2 = w2;
      resultadoTreinamentoOR.bias = bias;
      break;

    case 2:
      resultadoTreinamentoNOT.w1 = w1;
      resultadoTreinamentoNOT.bias = bias;
      break;
  }
}

const atualizaInformacoes = (w1,w2,bias,operador) => {
  switch(operador) {
    case 0: // AND
      elementos.w1AND.innerHTML = w1
      elementos.w2AND.innerHTML = w2
      elementos.biasAND.innerHTML = bias
      break

    case 1: // OR
      elementos.w1OR.innerHTML = w1
      elementos.w2OR.innerHTML = w2
      elementos.biasOR.innerHTML = bias
      break
    case 2: // NOT
      elementos.w1NOT.innerHTML = w1
      elementos.biasNOT.innerHTML = bias
      break
    case 3: // NAND
      
      break
  }
}

const treinoPerceptron = async (dados, w1, w2, bias, taxa_aprendizado, epocas, operador) => {
  let check = 0
  const opcaoAtivacao = Number(document.querySelector('input[name="funcaoAtivacao"]:checked').value);
  
  for (let epoca = 0; epoca < epocas; epoca++) {
    let acertos = dados.length;

    for (let entrada of dados) {
      const [x1, x2, target] = entrada;
      
      const sum = x1 * w1 + x2 * w2 + bias;
      const predicao = opcaoAtivacao === 0 ? ativacaoLinear(sum) : ativacaoSigmoide(sum);
      const erro = target - predicao;

      w1 += taxa_aprendizado * erro * x1;
      w2 += taxa_aprendizado * erro * x2;
      bias += taxa_aprendizado * erro;

      if (predicao !== target) acertos--;

      atualizaInformacoes(w1.toFixed(2), w2.toFixed(2), bias.toFixed(2) ,operador)
    }

    if (acertos ===  dados.length) check++;

    adicionaDadosGrafico(operador,acertos,check);

    await sleep(100)

    if (check === 15 || check === epocas) {
      salvaDados(w1, w2, bias, operador)
      return;
    }
  }
}

const perceptron = (x1, x2, w1, w2, bias) => {
  const opcaoAtivacao = Number(document.querySelector('input[name="funcaoAtivacao"]:checked').value);
  const sum = x1*w1 + x2*w2 + bias
  return opcaoAtivacao === 0 ? ativacaoLinear(sum) : ativacaoSigmoide(sum)
}

const iniciarTreinamento = async () => {
  const w1 = Number(document.getElementById('input_w1').value)
  const w2 = Number(document.getElementById('input_w2').value)
  const bias = Number(document.getElementById('input_bias').value)
  const taxa_aprendizado = Number(document.getElementById('input_taxa_aprendizado').value)
  const epocas = Number(document.getElementById('input_epocas').value)
  
  const and = [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, 1, 1]];
  const or = [[0, 0, 0], [0, 1, 1], [1, 0, 1], [1, 1, 1]];
  const not = [[0, 0, 1], [1, 0, 0]];

  treinoPerceptron(and, w1, w2, bias, taxa_aprendizado, epocas, 0),
  treinoPerceptron(or, w1, w2, bias, taxa_aprendizado, epocas, 1),
  treinoPerceptron(not, w1, 0, bias, taxa_aprendizado, epocas, 2)
}

const iniciarLimpeza = () => {
  limpaGraficoAND()
  limpaGraficoOR()
  limpaGraficoNOT()

  document.getElementById('w1AND').innerHTML = 0
  document.getElementById('w2AND').innerHTML = 0
  document.getElementById('biasAND').innerHTML = 0

  document.getElementById('w1OR').innerHTML = 0
  document.getElementById('w2OR').innerHTML = 0
  document.getElementById('biasOR').innerHTML = 0

  document.getElementById('w1NOT').innerHTML = 0
  document.getElementById('biasNOT').innerHTML = 0
}

const iniciarTeste = () => {
  const opt = Number(document.querySelector('input[name="operadores"]:checked').value)
  let x1 = Number(document.getElementById('input_x1').value)
  const x2 = Number(document.getElementById('input_x2').value)
  let w1, w2, bias

  switch(opt) {
    case 0: // AND
      w1 = resultadoTreinamentoAND.w1
      w2 = resultadoTreinamentoAND.w2
      bias = resultadoTreinamentoAND.bias
      break

    case 1: // OR
      w1 = resultadoTreinamentoOR.w1
      w2 = resultadoTreinamentoOR.w2
      bias = resultadoTreinamentoOR.bias
      break
    case 2: // NOT
      w1 = resultadoTreinamentoNOT.w1
      w2 = 0
      bias = resultadoTreinamentoNOT.bias
      break
    case 3: // NAND
      w1 = resultadoTreinamentoAND.w1
      w2 = resultadoTreinamentoAND.w2
      bias = resultadoTreinamentoAND.bias
      x1 = perceptron(x1, x2, w1, w2, bias) // AND

      w1 = resultadoTreinamentoNOT.w1
      w2 = 0
      bias = resultadoTreinamentoNOT.bias // NOT
      break
    case 4: // NOR
      w1 = resultadoTreinamentoOR.w1
      w2 = resultadoTreinamentoOR.w2
      bias = resultadoTreinamentoOR.bias

      x1 = perceptron(x1, x2, w1, w2, bias) // OR

      w1 = resultadoTreinamentoNOT.w1
      w2 = 0
      bias = resultadoTreinamentoNOT.bias // NOT
  }

  document.getElementById('resTeste').value = perceptron(x1, x2, w1, w2, bias)
}

const treinar = document.getElementById('treinar')
treinar.addEventListener('click', iniciarTreinamento)

const limpar = document.getElementById('limpar')
limpar.addEventListener('click', iniciarLimpeza)

const testar = document.getElementById('testar')
testar.addEventListener('click', iniciarTeste)

const treinoOpcao = document.getElementsByName('operadores');
treinoOpcao.forEach((opcao) => {
  opcao.addEventListener('click', () => {
    document.getElementById('testeOpcao').innerHTML = opcao.getAttribute('data-i');
    if(Number(opcao.value) === 2){
      document.getElementById('input_w2').value = 0
      document.getElementById('input_x2').value = 0
      document.getElementById('input_w2').setAttribute('disabled', 'disabled');
      document.getElementById('input_x2').setAttribute('disabled', 'disabled');
    }else{
      document.getElementById('input_w2').removeAttribute('disabled');
      document.getElementById('input_x2').removeAttribute('disabled');
    }
  })
})