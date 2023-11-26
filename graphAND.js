let chartData = {
  labels: [],
  datasets: [{
    label: 'Acertos',
    borderColor: 'orange',
    data: [],
    fill: false,
  }]
};

let ctx = document.getElementById('graphAND').getContext('2d');

let count = 1; // Contador para os números inteiros no eixo x

let graphAND = new Chart(ctx, {
  type: 'line',
  data: chartData,
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
        text: 'AND',
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

// Função para adicionar dados ao gráfico
export const adicionaDadosAND = (valor) => {
  // Adicione um novo ponto ao gráfico
  chartData.labels.push(count++);
  chartData.datasets[0].data.push(valor);

  // Atualize o gráfico
  graphAND.update();
}

export const limpaGraficoAND = () => {
  // Limpar gráfico de linha (chartData)
  chartData.labels = [];
  chartData.datasets[0].data = [];
  count = 1;
  graphAND.update();
}