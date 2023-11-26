import { adicionaDadosAND, limpaGraficoAND } from '../graficos/graphAND.js';
import { adicionaDadosOR, limpaGraficoOR } from '../graficos/graphOR.js';
import { adicionaDadosNOT, limpaGraficoNOT } from '../graficos/graphNOT.js';

const resultadoTreinamentoAND = { w1: 0, w2: 0, bias: 0 };

const resultadoTreinamentoOR = { w1: 0, w2: 0, bias: 0 };

const resultadoTreinamentoNOT = { w1: 0, bias: 0 };

const sleep = (milliseconds) => (new Promise(resolve => setTimeout(resolve, milliseconds)))


const ativacaoLinear = (valor) => (valor < 0 ? 0 : 1);

const ativacaoSigmoide = (valor) => (1 / (1 + Math.exp(-valor)) >= 0.5 ? 1 : 0);

const adicionaDados = (operador, acertos) => {
  switch(Number(operador)) {
    case 0: adicionaDadosAND(acertos); break;

    case 1: adicionaDadosOR(acertos); break;

    case 2: adicionaDadosNOT(acertos); break;
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
    }

    if (acertos ===  dados.length) check++;

    adicionaDados(operador,acertos,check);

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

  const funcoesTreino = [
    () => treinoPerceptron(and, w1, w2, bias, taxa_aprendizado, epocas, 0),
    () => treinoPerceptron(or, w1, w2, bias, taxa_aprendizado, epocas, 1),
    () => treinoPerceptron(not, w1, 0, bias, taxa_aprendizado, epocas, 2)
  ];

  await Promise.all(funcoesTreino.map(funcaoTreino => funcaoTreino()));

  document.getElementById('w1AND').innerHTML = (resultadoTreinamentoAND.w1).toFixed(2)
  document.getElementById('w2AND').innerHTML = (resultadoTreinamentoAND.w1).toFixed(2)
  document.getElementById('biasAND').innerHTML = (resultadoTreinamentoAND.bias).toFixed(2)

  document.getElementById('w1OR').innerHTML = (resultadoTreinamentoOR.w1).toFixed(2)
  document.getElementById('w2OR').innerHTML = (resultadoTreinamentoOR.w2).toFixed(2)
  document.getElementById('biasOR').innerHTML = (resultadoTreinamentoOR.bias).toFixed(2)

  document.getElementById('w1NOT').innerHTML = (resultadoTreinamentoNOT.w1).toFixed(2)
  document.getElementById('biasNOT').innerHTML = (resultadoTreinamentoOR.bias).toFixed(2)

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