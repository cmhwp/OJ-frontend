<template>
  <div class="box" ref="chartDom"></div>
  <a-modal
    v-model:visible="isModalVisible"
    :hide-title="true"
    :footer="false"
    @ok="handleOk"
    @cancel="handleCancel"
    :modal-style="{ borderRadius: '10px', width: '82vh', height: '62vh' }"
  >
    <!-- 在这里添加你的弹窗内容 -->
    <div
      style="
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        height: 40px;
        width: 100%;
      "
    >
      <div>
        <a-button
          @click="onSubtractChange(1)"
          :disabled="index === 0"
          style="border-radius: 5px; margin-right: 3px; width: 30px; height: 30px"
        >
          <template #icon>
            <icon-left size="18" />
          </template>
        </a-button>
        <a-button
          :disabled="disabled"
          style="border-radius: 5px; width: 30px; height: 30px"
          @click="onAddChange(1)"
        >
          <template #icon>
            <icon-right size="18" />
          </template>
        </a-button>
      </div>
      <span style="font-size: 20px; white-space: nowrap"
        >代码示例 (执行用时：<span style="font-weight: bold">{{ clickedXData }}ms</span>)</span
      >
      <div style="display: flex; justify-content: flex-end">
        <a-button
          type="text"
          @click="isModalVisible = false"
          style="border-radius: 5px; width: 30px; height: 30px"
        >
          <template #icon>
            <icon-close size="18" style="color: #636c7b" />
          </template>
        </a-button>
      </div>
    </div>
    <div
      style="height: 52vh; position: relative; background-color: #f6f6f6; border-radius: 10px"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <highlightjs class="highlightjs-code" language="java" :code="code" />
      <div style="position: absolute; top: 10px; right: 25px" v-if="isShow">
        <a-tooltip
          v-if="isShowCopy"
          background-color="#FFFFFF"
          position="tr"
          :content-style="{
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
            borderRadius: '10px'
          }"
        >
          <template #content><span style="color: black; font-size: 13px">复制</span></template>
          <button
            @click="copyCodeToClipboard"
            style="
              display: flex;
              justify-content: center;
              height: 28px;
              width: 28px;
              cursor: pointer;
            "
            class="custom-button"
          >
            <icon-copy style="color: #373737" :size="25" />
          </button>
        </a-tooltip>
        <a-tooltip
          v-else
          background-color="#FFFFFF"
          position="tr"
          :content-style="{
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
            borderRadius: '10px'
          }"
        >
          <template #content><span style="color: black; font-size: 13px">已复制</span></template>
          <img
            :src="require('@/assets/对号.png')"
            alt=""
            style="margin-right: 5px; margin-top: 5px"
          />
        </a-tooltip>
      </div>
    </div>
  </a-modal>
</template>
<script setup lang="ts">
import { ref, onMounted, withDefaults, defineProps, watch, watchEffect } from 'vue'
import * as echarts from 'echarts'

import {
  QuestionSubmitControllerService,
  type QuestionSubmitQueryRequest
} from '../../../generated'
import message from '@arco-design/web-vue/es/message'
import { useRoute } from 'vue-router'
import useUserStore from '@/stores/user/user'

const loginUser = useUserStore()
const route = useRoute()

const disabled = ref(false)

const isShowCopy = ref(true)

const isShow = ref(false)

const handleMouseEnter = () => {
  isShow.value = true
}

const handleMouseLeave = () => {
  isShow.value = false
}

interface Props {
  xData?: []
  seriesData?: []
  value: string
  language: string
}

const props = withDefaults(defineProps<Props>(), {
  xData: () => [],
  seriesData: () => [],
  value: () => '',
  language: () => ''
})

// 头像图片URL
const avatarUrl =
  loginUser.userAvatar ||
  'https://himg.bdimg.com/sys/portraitn/item/03cde88aa5e69cabe59682e58fa3e59abce7b396df8f'

// 找到与props.value匹配的xData索引
const targetIndex = ref(props.xData.findIndex((x) => x === props.value))

const isModalVisible = ref(false)

const clickedXData = ref()

const showModal = () => {
  isModalVisible.value = true
}

const handleOk = () => {
  isModalVisible.value = false
}

const handleCancel = () => {
  isModalVisible.value = false
}

let chartDom = ref(null) //注意变量名 和 ref名字要对应
onMounted(() => {
  initChart()
})

const copyCodeToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(code.value)
  } catch (err) {
    console.error('Failed to copy: ', err)
    message.error('代码复制失败')
  }

  // 将 isShowCopy 的值设为 false
  isShowCopy.value = false

  // 在 2 秒后将 isShowCopy 的值恢复为 true
  setTimeout(() => {
    isShowCopy.value = true
  }, 2000)
}

const initChart = () => {
  const myChart = echarts.init(chartDom.value, null, {
    devicePixelRatio: window.devicePixelRatio
  })

  // 图表点击事件监听
  myChart.on('click', function (params) {
    // 更新 clickedXData 值为当前点击的 x 轴坐标
    clickedXData.value = params.name // 'name' 通常对应 x 轴的数据点名称
    index.value = 0
    disabled.value = false
    showModal() // 显示弹窗
    loadData()
  })

  const option = {
    tooltip: {
      // 鼠标悬浮提示数据
      trigger: 'axis',
      formatter: '{c0}% 的用户使用了类似解法 Runtime：{b0} ms',
      backgroundColor: '#ffffff',
      borderRadius: 15, // 这里的4是示例值，你可以根据需要调整圆角的大小
      // borderColor: "#00000057",
      // borderWidth: 15,
      textStyle: {
        // 文字提示样式
        color: '#1A1A1A',
        fontSize: '14'
      },
      axisPointer: {
        // 坐标轴虚线
        // type: "cross",
        // label: {
        //   backgroundColor: "#1A1A1A",
        // },
        show: false
      }
    },

    // },
    grid: {
      // 控制图表的位置
      left: '5%',
      right: '5%',
      top: '18%',
      bottom: '5%',
      containLabel: true
    },
    xAxis: {
      axisLine: {
        show: false // 不显示X轴线
      },
      axisTick: {
        show: false // 不显示X轴刻度线
      },
      axisLabel: {
        // X轴线 标签修改
        interval: 'auto', // 显示每隔一个标签 自动
        textStyle: {
          color: '#A8A8A8', //坐标值得具体的颜色
          fontSize: '12',
          fontFamily: 'SimSun' // 设置字体为宋体
        },
        // 使用模板字符串格式化标签文本
        formatter: '{value}ms'
      },
      data: props.xData
    },
    yAxis: {
      // axisLabel: {
      //   // y轴线 标签修改
      //   textStyle: {
      //     color: "#00000057", //坐标值得具体的颜色
      //   },
      // },
      axisPointer: {
        show: false // 隐藏Y轴的axisPointer
      },
      axisLabel: {
        // X轴线 标签修改
        interval: 'auto', // 显示每隔一个标签 自动
        textStyle: {
          color: '#A8A8A8', //坐标值得具体的颜色
          fontSize: '13',
          fontFamily: 'SimSun' // 设置字体为宋体
        },
        formatter: '{value}%'
      }
    },
    series: [
      {
        data: props.seriesData.map((item, index) => ({
          value: item,
          itemStyle: {
            normal: {
              // 默认时样式
              borderRadius: [5, 5, 0, 0],
              color: props.xData[index] === props.value ? '#1A1A1A' : '#E2E2E2' // 使用黑色表示选中状态
            },
            emphasis: {
              // 当选择时的样式
              color: '#1A1A1A'
            }
          }
        })),
        type: 'bar',
        barWidth: '48%',
        itemStyle: {
          normal: {
            borderRadius: [5, 5, 0, 0]
          }
        }
      }
    ]
  }
  if (option) {
    myChart.setOption(option)
  }
  // 图表渲染完成后添加头像
  myChart.on('finished', () => {
    addAvatar(myChart)
  })
}

const addAvatar = (myChart: echarts.ECharts) => {
  if (targetIndex.value >= 0) {
    // 获取对应柱状图顶部的y轴像素位置
    const seriesData = props.seriesData[targetIndex.value]
    const avatarPosition = myChart.convertToPixel({ seriesIndex: 0 }, [
      targetIndex.value,
      seriesData
    ])

    const avatarSize = 27 // 头像的尺寸，宽度和高度
    const borderSize = 2 // 边框的宽度
    const totalSize = avatarSize + borderSize * 2 // 总尺寸，包含边框
    const clipRadius = avatarSize / 2 // 裁剪圆的半径

    // 根据柱状图顶部位置调整头像位置，考虑头像大小和一定的偏移量以避免遮挡柱状图
    const avatarTopOffset = 10 // 头像距离柱状图顶部的偏移量
    myChart.setOption({
      graphic: [
        {
          type: 'circle',
          shape: {
            cx: avatarPosition[0],
            cy: avatarPosition[1] - avatarSize / 2 - avatarTopOffset,
            r: clipRadius + borderSize
          },
          style: {
            fill: 'none',
            stroke: '#1A1A1A', // 边框颜色
            lineWidth: borderSize // 边框宽度
          },
          z: 100
        },
        {
          type: 'image',
          id: 'avatar',
          style: {
            image: avatarUrl,
            width: avatarSize,
            height: avatarSize
          },
          position: [
            avatarPosition[0] - clipRadius,
            avatarPosition[1] - avatarSize - avatarTopOffset
          ], // 调整头像位置
          z: 101,
          clipPath: {
            type: 'circle',
            shape: {
              cx: clipRadius,
              cy: clipRadius,
              r: clipRadius
            }
          }
        }
      ]
    })
  }
}

const index = ref(0)
const current = ref(1)
const dataList = ref()
const total = ref()
const searchParams = ref<QuestionSubmitQueryRequest>({
  pageSize: 100,
  current: current.value,
  sortField: 'createTime',
  sortOrder: 'descend',
  message: 'Accepted' as any,
  language: props.language
})

const code = ref('')
const loadData = async () => {
  //抽屉数据
  const res = await QuestionSubmitControllerService.listQuestionSubmitVoByPageUsingPost(
    searchParams.value
  )
  // 题目数据
  if (res.code === 0) {
    dataList.value = res.data.records
    total.value = res.data.total
    code.value = res.data.records[index.value].code
  } else {
    message.error('加载失败：' + res.message)
  }
}

const onSubtractChange = (number: number) => {
  const newIndex = index.value - number
  // 确保 newIndex 在合理范围内
  if (newIndex >= 0) {
    disabled.value = false
    index.value = newIndex
  } else {
    console.log('已达到数据列表的边界')
  }
}

const onAddChange = (number: number) => {
  const newIndex = index.value + number
  // 确保 newIndex 在合理范围内
  if (newIndex >= 0 && newIndex < dataList.value?.length) {
    index.value = newIndex
  } else {
    disabled.value = true
    console.log('已达到数据列表的边界')
  }
}

watch(
  () => [props.xData, props.seriesData, props.value],
  () => {
    if (chartDom.value) {
      echarts.dispose(chartDom.value) // 销毁旧图表实例
      initChart() // 重新初始化图表
      targetIndex.value = props.xData.findIndex((x) => x === props.value)
    }
  }
)

watch(index, () => {
  // 当 index 发生变化时，你可能需要更新 searchParams 或者直接在这里调用加载数据的逻辑
  // 注意：根据你的具体逻辑调整，这里只是一个基本示例
  code.value = dataList.value[index.value].code
})

watchEffect(() => {
  searchParams.value = {
    ...searchParams.value,
    questionId: route.params.id,
    time: clickedXData.value as any
  } as never
})
</script>

<style scoped>
.box {
  width: 100%;
  height: 220px;
  background-color: #ffffff;
}

.highlightjs-code {
  font-size: 16px; /* 设置字体大小 */
  line-height: 24px;
  overflow: auto;
  height: 100%;
  border-radius: 10px;
}

.custom-button {
  border-radius: 5px; /* 设置圆角大小 */
  background-color: #ffffff;
  border: 1px solid #e5e6eb; /* 添加 1px 实线边框 */
  outline: none;
  margin-left: 5px;
}

.custom-button:hover {
  background-color: #f0f0f0;
}
</style>
