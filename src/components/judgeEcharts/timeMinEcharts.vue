<template>
  <div class="box" ref="chartDom"></div>
</template>
<script setup lang="ts">
import { ref, onMounted, withDefaults, defineProps, watch } from 'vue'
import * as echarts from 'echarts'

interface Props {
  xData?: []
  seriesData?: []
}

const props = withDefaults(defineProps<Props>(), {
  xData: () => [],
  seriesData: () => []
})

let chartDom = ref(null) //注意变量名 和 ref名字要对应
onMounted(() => {
  initChart()
})

const initChart = () => {
  const myChart = echarts.init(chartDom.value, null, {
    devicePixelRatio: window.devicePixelRatio
  })
  const option = {
    // },
    grid: {
      // 控制图表的位置
      left: '0%',
      right: '5%',
      top: '5%',
      bottom: '0%',
      containLabel: true
    },
    xAxis: {
      axisLine: {
        show: false // 不显示X轴线
      },
      axisTick: {
        show: false // 不显示X轴刻度线
      },
      axisPointer: {
        show: false // 隐藏Y轴的axisPointer
      },
      axisLabel: {
        // X轴线 标签修改
        interval: 'auto', // 显示每隔一个标签 自动
        // 使用模板字符串格式化标签文本
        formatter: '{value}ms',
        margin: -10, // 将标签上移，根据需要调整这个值
        textStyle: {
          color: '#737373', //坐标值得具体的颜色
          fontSize: '12',
          fontFamily: 'SimSun' // 设置字体为宋体
        }
      },
      data: props.xData
    },
    yAxis: {
      axisPointer: {
        show: false // 隐藏Y轴的axisPointer
      },
      show: false // 不显示Y轴
    },
    series: [
      {
        data: props.seriesData,
        type: 'bar',
        barWidth: '48%', //调整柱状图宽度
        z: -1, // 尝试将柱状图的z值设置为负数
        itemStyle: {
          normal: {
            borderRadius: [5, 5, 0, 0],
            color: '#E2E2E2' // 默认颜色
          },
          emphasis: {
            // 当选择时的样式
            color: '#E2E2E2'
          }
        }
      }
    ]
  }
  option && myChart.setOption(option)
}

watch(
  () => [props.xData, props.seriesData],
  () => {
    if (chartDom.value) {
      echarts.dispose(chartDom.value) // 销毁旧图表实例
      initChart() // 重新初始化图表
    }
  }
)
</script>

<style scoped>
.box {
  display: flex;
  height: 45px;
  background-color: #f5f5f5;
  border-radius: 10px;
  width: calc(100% - 60px);
}
</style>
