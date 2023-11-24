let chartData = {
  labels: [],
  datasets: [{
    label: 'Valores Dinâmicos',
    borderColor: 'orange',
    data: [],
    fill: false
  }]
}

let ctx = document.getElementById('myChart').getContext('2d')

let count = 1 // Contador para os números inteiros no eixo x

let myChart = new Chart(ctx, {
  type: 'line',
  data: chartData,
  options: {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        ticks: {
          stepSize: 1 // Passo entre os números inteiros
        }
      },
      y: {
        min: -1,
        ticks: {
          stepSize: 1 // Passo entre os números inteiros
        }
      }
    },
    animation: {
      duration: 1, // Ajuste a duração da animação (em milissegundos)
      easing: 'easeInOutQuad', // Ajuste a função de interpolação ('linear', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad', etc.)
    }
  }
})

// Função para adicionar dados ao gráfico
export const adicionaDados = (valor) => {
  // Adicione um novo ponto ao gráfico
  chartData.labels.push(count++)
  chartData.datasets[0].data.push(valor)

  // Atualize o gráfico
  myChart.update()
}

export const limpaGrafico = () => {
  chartData.labels = []
  chartData.datasets[0].data = []
  myChart.update()
}