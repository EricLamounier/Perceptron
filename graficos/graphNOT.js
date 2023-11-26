let chartDataNOT = {
  labels: [],
  datasets: [{
    label: 'Acertos',
    borderColor: 'pink',
    data: [],
    fill: false,
  }]
};

let ctxNOT = document.getElementById('graphNOT').getContext('2d');

let countNOT = 1; // Contador para os números inteiros no eixo x

let graphNOT = new Chart(ctxNOT, {
  type: 'line',
  data: chartDataNOT,
  options: {
    plugins: {
      legend: {
        labels: {
          font: {
            color: 'white' // Cor do texto do rótulo
          }
        }
      },
      title: {
        display: true,
        text: 'NOT',
        font: {
          size: 16,
          color: 'white'
        }
      }
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Épocas',
          color: 'white'
        },
        ticks: {
          stepSize: 1,
          color: 'white',
        },
        grid: {
          color: 'white'
        }
      },
      y: {
        beginAtZero: true,
        type: 'linear',
        title: {
          display: true,
          text: 'Qtd. Acertos',
          color: 'white'
        },
        ticks: {
          color: 'white',
          min:0,
          max:4,
          stepSize: 1
        },
        grid: {
          color: 'white'
        }
      }
    },
    elements: {
      point: {
        backgroundColor: 'white'
      }
    }
  }
});

export const limpaGraficoNOT = () => {
  // Limpar gráfico de linha (chartData)
  chartDataNOT.labels = [];
  chartDataNOT.datasets[0].data = [];
  countNOT = 1;
  graphNOT.update();
}

export const adicionaDadosGraficoNOT = (valor) => {
  // Adicione um novo ponto ao gráfico
  chartDataNOT.labels.push(countNOT++);
  chartDataNOT.datasets[0].data.push(valor);

  // Atualize o gráfico
  graphNOT.update();
}