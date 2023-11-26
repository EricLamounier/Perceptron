let chartDataOR = {
  labels: [],
  datasets: [{
    label: 'Acertos',
    borderColor: 'cyan',
    data: [],
    fill: false,
  }]
};

let ctxOR = document.getElementById('graphOR').getContext('2d');

let countOR = 1; // Contador para os números inteiros no eixo x

let graphOR = new Chart(ctxOR, {
  type: 'line',
  data: chartDataOR,
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
          text: 'OR',
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

export const limpaGraficoOR = () => {
  // Limpar gráfico de linha (chartData)
  chartDataOR.labels = [];
  chartDataOR.datasets[0].data = [];
  countOR = 1;
  graphOR.update();
}

export const adicionaDadosOR = (valor) => {
  // Adicione um novo ponto ao gráfico
  chartDataOR.labels.push(countOR++);
  chartDataOR.datasets[0].data.push(valor);

  // Atualize o gráfico
  graphOR.update();
}