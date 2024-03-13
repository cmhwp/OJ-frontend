<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { QuestionControllerService } from '../../../generated'
import message from '@arco-design/web-vue/es/message'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
// 如果页面地址包含 update，视为更新页面
const updatePage = route.path.includes('update')
import categories from '@/utils/question/questionUtils'

let form = ref({
  title: '',
  tags: [],
  difficulty: 1,
  languages: '',
  answer: '',
  content: '',
  frontendCode: '',
  backendCode: '',
  logicCode: '',
  judgeConfig: {
    memoryLimit: 666,
    stackLimit: 666,
    timeLimit: 666
  },
  judgeCase: [
    {
      input: '',
      output: ''
    }
  ]
})

const options = [
  { label: '简单', value: 1 },
  { label: '中等', value: 2 },
  { label: '困难', value: 3 }
]

/**
 * 根据题目 id 获取老的数据
 */
const loadData = async () => {
  const id = route.query.id
  if (!id) {
    return
  }
  const res = await QuestionControllerService.getQuestionByIdUsingGet(id as any)
  if (res.code === 0) {
    form.value = res.data as any
    // json 转 js 对象
    if (!form.value.judgeCase) {
      form.value.judgeCase = [
        {
          input: '',
          output: ''
        }
      ]
    } else {
      form.value.judgeCase = JSON.parse(form.value.judgeCase as any)
    }
    if (!form.value.judgeConfig) {
      form.value.judgeConfig = {
        memoryLimit: 1000,
        stackLimit: 1000,
        timeLimit: 1000
      }
    } else {
      form.value.judgeConfig = JSON.parse(form.value.judgeConfig as any)
    }
    if (!form.value.tags) {
      form.value.tags = []
    } else {
      form.value.tags = JSON.parse(form.value.tags as any)
    }
  } else {
    message.error('加载失败，' + res.message)
  }
}
onMounted(() => {
  loadData()
})

const doSubmit = async () => {
  // 区分更新还是创建
  if (updatePage) {
    const res = await QuestionControllerService.updateQuestionUsingPost(form.value)
    if (res.code === 0) {
      message.success('更新成功')
      await router.push('/menage/question')
    } else {
      message.error('更新失败，' + res.message)
    }
  } else {
    const res = await QuestionControllerService.addQuestionUsingPost(form.value)
    if (res.code === 0) {
      message.success('创建成功')
      router.go(-1)
    } else {
      message.error('创建失败:' + res.message)
    }
  }
  console.log(form.value)
}

/**
 * 新增判题用例
 */
const handleAdd = () => {
  form.value.judgeCase.push({
    input: '',
    output: ''
  })
}

/**
 * 删除判题用例
 */
const handleDelete = (index: number) => {
  form.value.judgeCase.splice(index, 1)
}

const onContentChange = (value: string) => {
  form.value.content = value
}

const onFrontendCodeChange = (value: string) => {
  form.value.frontendCode = value
}

const onBackendCodeChange = (value: string) => {
  form.value.backendCode = value
}

const onLogicCodeChange = (value: string) => {
  form.value.logicCode = value
}
const onAnswerChange = (value: string) => {
  form.value.answer = value
}
</script>

<template>
  <div id="add-question">
    <div class="form-container" style="overflow-x: hidden">
      <a-form label-align="left" auto-label-width :style="{ maxWidth: '1000px', margin: '0 auto' }">
        <a-form-item field="title" label="标题" :style="{ width: '520px' }">
          <a-input
            v-model="form.title"
            allow-clear
            placeholder="请输入标题"
            style="border-radius: 10px"
            size="large"
          />
        </a-form-item>
        <a-form-item field="difficulty" label="标签" :style="{ width: '520px' }">
          <a-select
            size="large"
            v-model="form.tags"
            placeholder="请选择标签 ..."
            multiple
            style="border-radius: 10px"
          >
            <a-optgroup
              v-for="category in categories"
              :key="category.label"
              :label="category.label"
            >
              <a-option v-for="option in category.options" :key="option">{{ option }}</a-option>
            </a-optgroup>
          </a-select>
        </a-form-item>
        <a-form-item field="tags" label="难度" :style="{ width: '600px' }">
          <a-radio-group v-model="form.difficulty" :options="options" />
        </a-form-item>
        <a-form-item label="判题配置" :content-flex="false" :merge-props="false">
          <a-space direction="vertical" style="width: 240px">
            <a-form-item field="judgeConfig.timeLimit" label="时间限制">
              <a-input-number
                v-model="form.judgeConfig.timeLimit"
                placeholder="请输入时间限制"
                mode="button"
                min="0"
                size="large"
              />
            </a-form-item>
            <a-form-item field="judgeConfig.memoryLimit" label="内存限制">
              <a-input-number
                v-model="form.judgeConfig.memoryLimit"
                placeholder="请输入内存限制"
                mode="button"
                min="0"
                size="large"
              />
            </a-form-item>
            <a-form-item field="judgeConfig.stackLimit" label="堆栈限制">
              <a-input-number
                v-model="form.judgeConfig.stackLimit"
                placeholder="请输入堆栈限制"
                mode="button"
                min="0"
                size="large"
              />
            </a-form-item>
          </a-space>
        </a-form-item>
        <a-form-item label="测试用例配置" :content-flex="false" :merge-props="false">
          <div style="display: flex; flex-direction: column">
            <a-form-item v-for="(judgeCaseItem, index) of form.judgeCase" :key="index" no-style>
              <a-space direction="vertical" style="min-width: 520px">
                <a-form-item
                  :field="`form.judgeCase[${index}].input`"
                  :label="`输入用例 ${index}:`"
                  :key="index"
                >
                  <a-input
                    v-model="judgeCaseItem.input"
                    style="width: 300px; border-radius: 10px"
                    placeholder="请输入测试输入用例"
                    size="large"
                  />
                </a-form-item>
                <a-form-item
                  :field="`form.judgeCase[${index}].output`"
                  :label="`输出用例 ${index}:`"
                  :key="index"
                >
                  <a-input
                    v-model="judgeCaseItem.output"
                    style="width: 300px; border-radius: 10px"
                    placeholder="请输入测试输出用例"
                    size="large"
                  />
                </a-form-item>
                <a-button
                  type="outline"
                  status="danger"
                  @click="handleDelete(index)"
                  style="margin-bottom: 24px; border-radius: 20px"
                >
                  删除
                </a-button>
              </a-space>
            </a-form-item>
          </div>
          <div>
            <a-button @click="handleAdd" type="outline" status="success" style="border-radius: 20px"
              >新增测试用例
            </a-button>
          </div>
        </a-form-item>
        <a-form-item field="logicCode" label="逻辑代码">
          <div>
            <monaco-editor
              :value="form.logicCode as string"
              :handle-change="onLogicCodeChange"
              style="
                width: 800px;
                height: 500px;
                border: 1px solid #eeeeee;
                padding: 10px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              "
            />
          </div>
        </a-form-item>
        <a-form-item field="backendCode" label="后端代码">
          <div>
            <monaco-editor
              :value="form.backendCode as string"
              :handle-change="onBackendCodeChange"
              style="
                width: 800px;
                height: 500px;
                border: 1px solid #eeeeee;
                padding: 10px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              "
            />
          </div>
        </a-form-item>
        <a-form-item field="frontendCode" label="前端代码">
          <div>
            <monaco-editor
              :value="form.frontendCode as string"
              :handle-change="onFrontendCodeChange"
              style="
                width: 800px;
                height: 500px;
                border: 1px solid #eeeeee;
                padding: 10px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              "
            />
          </div>
        </a-form-item>
        <a-form-item field="content" label="题目内容">
          <div>
            <ai-editor
              :value="form.content"
              style="width: 820px"
              :handle-change="onContentChange"
            />
          </div>
        </a-form-item>
        <a-form-item field="answer" label="答案">
          <div>
            <ai-editor :value="form.answer" style="width: 820px" :handle-change="onAnswerChange" />
          </div>
        </a-form-item>
        <a-form-item>
          <div style="min-width: 200px; z-index: 0">
            <a-button type="primary" @click="doSubmit" style="border-radius: 20px">提交 </a-button>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style scoped>
#add-question {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f8fa;
  overflow: hidden;
}

.form-container {
  margin-top: 100px;
  width: 100%; /* 根据需要调整宽度 */
}
</style>
