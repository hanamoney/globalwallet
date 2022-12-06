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
    x: (ctx) => maxIndex(ctx) <= ctx.chart.data.datasets[0].data.length/2 ? 'start' : 'end',
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
    x: (ctx) => minIndex(ctx) <= ctx.chart.data.datasets[0].data.length/2 ? 'start' : 'end',
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

const getOrCreateTooltip = (chart) => {
  var tooltipEl = chart.canvas.parentNode.querySelector('div');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.classList.add('chart_tooltip');
    tooltipEl.style.color = 'white';
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.top = 0;
    tooltipEl.style.padding = 0 + 'rem ' + 0.8 + 'rem';
    tooltipEl.style.transition = 'all .1s ease';

    var tooltipCont = document.createElement('div');
    tooltipCont.classList.add('tooltip_cont');

    tooltipEl.appendChild(tooltipCont);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

var externalTooltipHandler = (context) => {
  var {chart, tooltip} = context;
  var tooltipEl = getOrCreateTooltip(chart);
  var tooltipLine = chart.canvas.parentNode.querySelector('.line');

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // add tooltip vertical line
  if (!tooltipLine) {
    tooltipLine = document.createElement('p');
    tooltipLine.classList.add('line');
    tooltipLine.style.position = 'absolute';
    tooltipLine.style.top = '0';
    tooltipLine.style.bottom = '0';
    tooltipLine.style.left = '0';
    tooltipLine.style.width = '1px';
    tooltipLine.style.height = '20rem';
    tooltipLine.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
    chart.canvas.parentNode.appendChild(tooltipLine);
  }

  // tooltip text
  if (tooltip.body) {
    var titleLines = tooltip.title || [];
    var bodyLines = tooltip.body.map(b => b.lines);

    var tooltipLabel = document.createElement('p');
    tooltipLabel.classList.add('label');
    tooltipLabel.style.color = '#9DAAB0';
    tooltipLabel.style.fontSize = '1.3rem';
    tooltipLabel.style.lineHeight = '1.5';
    titleLines.forEach(title => {
      var text = document.createTextNode(title);
      tooltipLabel.appendChild(text);
    });

    var tooltipValue = document.createElement('p');
    tooltipValue.classList.add('value');
    tooltipValue.style.fontSize = '1.5rem';
    tooltipValue.style.lineHeight = '1.5';
    bodyLines.forEach((body, i) => {
      var text = document.createTextNode(body);
      tooltipValue.appendChild(text);
    });

    var tooltipRoot = tooltipEl.querySelector('.tooltip_cont');
    while (tooltipRoot.firstChild) {
      tooltipRoot.firstChild.remove();
    }
    tooltipRoot.appendChild(tooltipLabel);
    tooltipRoot.appendChild(tooltipValue);
  }

  var {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;

  // Display, position for tooltip contents
  tooltipEl.style.opacity = 1;
  var left = tooltip.caretX <= window.innerWidth / 2 ? positionX + tooltip.caretX : positionX + tooltip.caretX - 86;
  tooltipEl.style.left = left * 0.1 + 'rem';

  // position for tooltip line
  tooltipLine.style.left = (positionX + tooltip.caretX) * 0.1 + 'rem';
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
        label: '환율',
        backgroundColor: 'transparent',
        borderColor: 'rgb(255, 240, 189)',
        pointRadius: 0,
        data: lineChart_exr002,
      }]
    },
    options: {
      maintainAspectRatio: false,
      events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove', 'touchend'],
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
        mode: 'index',
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
          displayColors: false,
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
              var text = tooltipItems.formattedValue;
              return text + '원';
            }
          },
          external: externalTooltipHandler
        },
      }
    },
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


$(function(){

  var startX,startY,endX,endY;
  var moving = false;

  // document.querySelector('.line_chart').addEventListener('touchstart', function(e){
  $(document).on('touchstart', '.line_chart', function(e){
    var e = e.originalEvent;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;

    if ( Math.abs(endX - startX) > Math.abs(endY - startY) ) {
        moving = true;
        if (e.cancelable) e.preventDefault();
        if (document.querySelector('.chart_tooltip')) {
  
        document.querySelector('.chart_tooltip').style.display = 'block';
        document.querySelector('.line').style.display = 'block';
      }
      annotationOpts.maxText.display = false;
      annotationOpts.minText.display = false;
      annotationOpts.averageline.label.display = false;
      
      chartEXR.update();
    }
  });

  // document.querySelector('.line_chart').addEventListener('touchmove', function(e){
  $(document).on('touchmove', '.line_chart', function(e){
    var e = e.originalEvent;
    endX = e.touches[0].clientX;
    endY = e.touches[0].clientY;
  });

  // document.querySelector('.line_chart').addEventListener('touchend', function(){
  $(document).on('touchend', '.line_chart', function(e){
    if (document.querySelector('.chart_tooltip')) { 
      document.querySelector('.chart_tooltip').style.display = 'none';
      document.querySelector('.line').style.display = 'none';
    }
    annotationOpts.maxText.display = true;
    annotationOpts.minText.display = true;
    annotationOpts.averageline.label.display = true;

    chartEXR.update();
    moving = false;
  });

});