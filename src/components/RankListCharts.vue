<template>
  <div class="rank-list-charts" ref="charts"></div>
</template>

<script>
  import * as echarts from 'echarts'
  import { getRankListChartOptions } from '@/common/common'
  export default {
    name: "RankListCharts",
    components: {},
    data() {
      return {
        chart: null,
        options: {}
      }
    },
    props: {
      list: {
        type: Array,
        default() { return [] }
      }
    },
    computed: {
      labelOption() {
        return {
          show: true,
          position: 'insideBottom',
          distance: 15,
          align: 'left',
          verticalAlign: 'middle',
          rotate: 90,
          formatter: '{c}  {name|{a}}',
          fontSize: 16,
          rich: {
            name: {}
          }
        }
      }
    },
    watch: {
      list(val) {
        this.setRankListOptions(val);
        this.renderChart()
      }
    },
    methods: {
      init(dom) {
        this.chart = echarts.init(dom)
      },
      renderChart() {
        this.chart.clear();

        this.chart.setOption(this.options)
      },
      setRankListOptions(list) {
        let legend = ['成绩'];
        let xData = list.map(item => item.nickname);
        let series = [
          {
            name: '成绩',
            type: 'bar',
            barGap: 0,
            barWidth : 50,
            label: this.labelOption,
            emphasis: {
              focus: 'series'
            },
            data: []
          }
        ];
        list.forEach(({ time, score }) => {
          let [n1, n2] = series;
          n1.data.push(score)
        })
        this.options = getRankListChartOptions(legend, xData, series)
      }
    },
    mounted() {
      this.init(this.$refs.charts)
      this.renderChart()
    }
  }
</script>

<style lang="scss" scoped>
  .rank-list-charts {
    height: 400px;
  }
</style>