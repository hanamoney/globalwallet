/**
 * @name: 환율정보
 * @pageID: EXR_001 
 * @description:
 */

'use strict';

// average line
function average(ctx) {
  const values = ctx.chart.data.datasets[0].data;
  return values.reduce((a, b) => a + b, 0) / values.length;
}
const annotation = {
  type: 'line',
  borderColor: 'rgba(255,255,255,0.4)',
  borderDash: [2, 2],
  borderDashOffset: 0,
  borderWidth: 1,
  label: {
    enabled: false,
  },
  scaleID: 'y',
  value: (ctx) => average(ctx)
};

/**
  * @name createChart()
  * @description chart 생성
  * @param {element} chart canvas element
  * @param {idx} chart element index
  * @param {Array} 날짜 labels
  * @param {Array} 환율 데이터
  */
function createChart(el, idx, labels, datas) {
  var chartId = new Chart($(el), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: '일주일 환율 트랜드',
        backgroundColor: 'transparent',
        borderColor: 'rgb(255, 240, 189)',
        pointRadius: 0,
        data: datas,
      }]
    },
    options: {
      // responsive: true,
      maintainAspectRatio: false,
      borderWidth: 2,
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false,
            drawTicks: false // 22.12.27 추가
          },
          ticks: {
            display: false,
            drawTicks: false
          }
        },
        y: {
          grid: {
            display: false,
            drawBorder: false,
            drawTicks: false // 22.12.27 추가
          },
          ticks: {
            display: false,
            drawTicks: false
          }
        }
      },
      legend: {
        display: false,
      },
      plugins: {
        title: {
          display: false
        },
        subtitle: {
          display: false
        },
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false
        },
        annotation: {
          annotations: {
            annotation
          }
        }
      }
    }
  });
  chartArr[idx] = chartId; 
}

/**
  * @name updateChart()
  * @description chart 업데이트
  * @param {Object} chart 
  * @param {Array} 업데이트 날짜 labels
  * @param {Array} 업데이트 환율 데이터
  */
function updateChart(el, labels, newData) {
  el.data.datasets.forEach(function(dataset) {
    dataset.data = newData;
  });
  el.update();
}