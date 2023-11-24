let w1 = 0
let w2 = 0
let bias = 0.5
let p_x1 = document.getElementById('x1Value')
let p_x2 = document.getElementById('x2Value')
let p_w1 = document.getElementById('w1Value')
let p_w2 = document.getElementById('w2Value')
let p_sum = document.getElementById('sumValue')
let p_stepValue = document.getElementById('stepValue')
let p_predicao = document.getElementById('predicaoValue')
let p_resultado = document.getElementById('resultadoValue')
let p_acuracia = document.getElementById('acuraciaValue')
import { adicionaDados, limpaGrafico } from './graph.js'

const step = (valor) => {
    return valor > 0 ? 1 : 0
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const treinoPerceptron = async (data, _w1, _w2, taxa_aprendizado, _bias, epocas) => {
    
    w1 = _w1
    w2 = _w2
    bias = _bias
    let cont = 0
    let check = 0

    for (let epoca = 0; epoca < epocas; epoca++) {
        if(cont == 4)
            check++
        else
            check = 0

        if(check == 10)
            return

        let contAcerto = 0
        let contErro = 0
        cont = 0

        for (const entrada of data) {
            const [_x1, _x2, _target] = entrada
            const sum = _x1 * w1 + _x2 * w2 + bias
            const predicao = step(sum)
            const erro = _target - predicao

            p_x1.innerHTML = _x1
            p_x2.innerHTML = _x2
            p_sum.innerHTML = sum.toFixed(2)
            p_stepValue.innerHTML = sum.toFixed(2)
            p_predicao.innerHTML = predicao 

            w1 = w1 + taxa_aprendizado * erro * _x1
            w2 = w2 + taxa_aprendizado * erro * _x2
            bias = bias + taxa_aprendizado * erro

            p_w1.innerHTML = w1
            p_w2.innerHTML = w2

            if(predicao === _target){
                cont++
                p_resultado.innerHTML = 'Acerto'
                contAcerto+=1
                adicionaDados(1)
            }else{
                cont = 0
                p_resultado.innerHTML = 'Erro'
                contErro+=1
                adicionaDados(-1)
            }
            await sleep(100)
        }
        p_acuracia.innerHTML = (contAcerto/4)*100
    }
}

document.getElementById('limpar').addEventListener('click', () => {
    w1 = 0
    w2 = 0
    bias = 0.5
    p_x1.innerHTML = 0 
    p_x2.innerHTML = 0 
    p_w1.innerHTML = 0 
    p_w2.innerHTML = 0 
    p_sum.innerHTML = 0 
    p_stepValue.innerHTML = 0 
    p_predicao.innerHTML = 0 
    p_resultado.innerHTML = 0 
    p_acuracia.innerHTML = 0 
    limpaGrafico()
})

const testPerceptron = () => {
    // Solicita a entrada de valores para teste
    const x1 = Number(document.getElementById('input_x1').value)
    const x2 = Number(document.getElementById('input_x2').value)

    console.log('pesos ' + w1,w2)
    // Realiza a previsão
    const sum = x1 * w1 + x2 * w2 + bias
    const predicao = step(sum)

    //console.log(predicao)
    console.log('bias ' + bias)
}

let and = [
    [0, 0, 0],
    [0, 1, 0],
    [1, 0, 0],
    [1, 1, 1],
]

let or = [
    [0, 0, 0],
    [0, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
]
// Chamada da função para iniciar o treinamento
document.getElementById('treinar').addEventListener('click', ()=>{
    treinoPerceptron(or, w1, w2, 0.2, bias, 100)
})