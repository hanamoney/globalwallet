/**
 * @name: 환율정보 상세
 * @pageID: EXR_002
 * @description:
 */

'use strict';
var annotationOpts;

// Max Point
function maxValue(ctx) {
  let max = 0;
  const dataset = ctx.chart.data.datasets[0];
  dataset.data.forEach(function(el) {
    max = Math.max(max, el);
  });
  return max;
}
function maxIndex(ctx) {
  const max = maxValue(ctx);
  const dataset = ctx.chart.data.datasets[0];
  return dataset.data.indexOf(max);
}
function maxLabel(ctx) {
  return ctx.chart.data.labels[maxIndex(ctx)];
}
var maxPoint = {
  type: 'point',
  radius: 5,
  borderWidth: '3',
  borderColor: '#FF5166',
  backgroundColor: '#323E43',
  backgroundShadowColor: 'rgba(245, 46, 70, 0.8)',
  shadowBlur: 16,
  shadowOffsetX: 0,
  shadowOffsetY: 5,
  scaleID: 'y',
  xValue: (ctx) => maxLabel(ctx),
  yValue: (ctx) => maxValue(ctx)
}
var maxText = {
  type: 'label',
  color: '#FF5166',
  display: true,
  content: (ctx) => '최고 ' + maxValue(ctx).toFixed(2) + '원',
  font: {
    size: 16
  },
  position: {
    x: (ctx) => maxIndex(ctx) <= 3 ? 'start' : maxIndex(ctx) >= 10 ? 'end' : 'center',
    y: 'end'
  },
  xValue: (ctx) => maxLabel(ctx),
  yAdjust: -6,
  yValue: (ctx) => maxValue(ctx)
}

// Min Point
function minValue(ctx) {
  const dataset = ctx.chart.data.datasets[0];
  let min = dataset.data[0];
  dataset.data.forEach(function(el) {
    min = Math.min(min, el);
  });
  return min;
}
function minIndex(ctx) {
  const min = minValue(ctx);
  const dataset = ctx.chart.data.datasets[0];
  return dataset.data.indexOf(min);
}
function minLabel(ctx) {
  return ctx.chart.data.labels[minIndex(ctx)];
}
var minPoint = {
  type: 'point',
  radius: 5,
  borderWidth: '3',
  borderColor: '#308FFF',
  backgroundColor: '#323E43',
  backgroundShadowColor: 'rgba(48, 143, 255, 0.8)',
  shadowBlur: 16,
  shadowOffsetX: 0,
  shadowOffsetY: 5,
  scaleID: 'y',
  xValue: (ctx) => minLabel(ctx),
  yValue: (ctx) => minValue(ctx)
}
var minText = {
  type: 'label',
  color: '#308FFF',
  display: true,
  content: (ctx) => '최저 ' + minValue(ctx).toFixed(2) + '원',
  font: {
    size: 16
  },
  position: {
    x: (ctx) => minIndex(ctx) <= 3 ? 'start' : minIndex(ctx) >= 10 ? 'end' : 'center',
    y: 'start'
  },
  xValue: (ctx) => minLabel(ctx),
  yAdjust: 4,
  yValue: (ctx) => minValue(ctx)
}


// average line
function average(ctx) {
  var values = ctx.chart.data.datasets[0].data;
  return values.reduce((a, b) => a + b, 0) / values.length;
}
var averageline = {
  id: 'averageline',
  type: 'line',
  borderColor: 'rgba(255,255,255,0.4)',
  borderRadius: 4,
  borderDash: [2, 2],
  borderDashOffset: 0,
  borderWidth: 1,
  label: {
    display: true,
    padding: 4,
    backgroundColor: 'rgba(37,46,51,0.9)',
    color: 'rgba(183,197,200,1)',
    font: {
      size: 12,
      lineHeight: 1,
    },
    content: (ctx) => '평균 ' + average(ctx).toFixed(2) + '원',
    position: 'start',
    xAdjust: -4,
  },
  scaleID: 'y',
  value: (ctx) => average(ctx),
};

// tooltip drag line 
var tooltipLine = {
  id: 'tooltipLine',
  type: 'line',
  beforeDraw: function(chart){
    if (chart.tooltip._active && chart.tooltip._active.length) {
      var ctx = chart.ctx;
      ctx.save();
      var activePoint = chart.tooltip._active[0];
      ctx.beginPath();
      ctx.moveTo(activePoint.element.x, chart.chartArea.top - 57);
      ctx.lineTo(activePoint.element.x, chart.chartArea.bottom + 32);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.stroke();
      ctx.restore();
    }
  }
}

// tooltip position custom
Chart.Tooltip.positioners.custom = function(elements, position) {
  var tooltip = this;
  if (!elements.length) {
    return false;
  }
  // console.log(position);
  var offset = position.x <= tooltip.chart.width/2 ? position.x : position.x;
  return {
    x: offset,
    y: 0
  }
}

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
        label: '환율',
        backgroundColor: 'transparent',
        borderColor: 'rgb(255, 240, 189)',
        pointRadius: 0,
        data: lineChart_exr002,
      }]
    },
    options: {
      maintainAspectRatio: false,
      borderWidth: 1,
      pointHoverRadius: 0,
      layout: {
        padding: {
          top: 57,
          bottom: 58,
          right: 24,
          left: 24,
        }
      },
      scales: {
        x: {
          display: true,
          grid: {
            display: false,
            drawBorder: false
          },
          ticks: {
            display: false,
            drawTicks: false
          }
        },
        y: {
          display: false,
          grid: {
            display: false,
            drawBorder: false
          },
          ticks: {
            display: false,
            drawTicks: false
          }
        }
      },
      interaction: {
        mode: 'x',
        intersect: false,
      },
      plugins: {
        annotation: {
          clip: false,
          annotations: {
            averageline,
            maxPoint,
            maxText,
            minPoint,
            minText,
          }
        },
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
          enabled: false,
          mode: 'index',
          intersect: false,
          position: 'custom',
          yAlign: 'bottom',
          padding: '0 8 0 8',
          displayColors: false,
          backgroundColor: 'transparent',
          titleColor: '#9DAAB0',
          titleFont: {
            family: "'Spoqa',-apple-system,helvetica,Apple SD Gothic Neo,sans-serif",
            size: 12
          },
          bodyFont: {
            family: "'Spoqa',-apple-system,helvetica,Apple SD Gothic Neo,sans-serif",
            size: 15
          },
          callbacks: {
            label: function(tooltipItems) {
              return tooltipItems.formattedValue + '원';
            }
          },
        },
      }
    },
    plugins: [tooltipLine]
  });
  chartEXR = chartId;
  annotationOpts = chartEXR.config.options.plugins.annotation.annotations;
}

/**
  * @name updateChart()
  * @description chart 업데이트
  * @param {Object} chart 
  * @param {Array} labels
  * @param {Array} data 
  */
  function updateChart(el, newLabels, newData) {
    el.data.datasets.forEach(function(dataset) {
      dataset.data = newData;
    });
    el.update();
  }

  var startX,startY,endX,endY;
  var moving = false;
  document.querySelector('.line_chart').addEventListener('touchstart', function(e){
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });

  document.querySelector('.line_chart').addEventListener('touchmove', function(e){
    
    endX = e.touches[0].clientX;
    endY = e.touches[0].clientY;
    
    if ( Math.abs(endX - startX) > Math.abs(endY - startY) ) {
      moving = true;
      if (e.cancelable) e.preventDefault();
      chartEXR.config.options.plugins.tooltip.enabled = true;
      annotationOpts.maxText.display = false;
      annotationOpts.minText.display = false;
      annotationOpts.averageline.label.display = false;
      
      chartEXR.update();
    }
  });
  
  document.querySelector('.line_chart').addEventListener('touchend', function(){
    console.log(chartEXR.config.plugins[0]);
    chartEXR.config.options.plugins.tooltip.enabled = false;
    annotationOpts.maxText.display = true;
    annotationOpts.minText.display = true;
    annotationOpts.averageline.label.display = true;

    chartEXR.update();
    moving = false;
  });

  