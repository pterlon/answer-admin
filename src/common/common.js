export function getRankListChartOptions(legend, xData, series) {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: legend
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        mark: {show: true},
        dataView: {show: true, readOnly: false},
        magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
        restore: {show: true},
        saveAsImage: {show: true}
      }
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {show: false},
        data: xData
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series,
  };
}
