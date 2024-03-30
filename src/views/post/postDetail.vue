<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { PostControllerService } from '../../../generated'
import { useRoute } from 'vue-router'
import moment from 'moment/moment'
const resData = ref()
const route = useRoute()
const dataList = async () => {
  const id = route.query.id as unknown as number
  await PostControllerService.getPostVoByIdUsingGet(id).then((res) => {
    resData.value = res.data
    console.log(resData)
  })
}
watch(
  () => route.query.id,
  () => {
    dataList()
  }
)
onMounted(() => {
  dataList()
})
</script>

<template>
  <div id="post-detail">
    <a-row>
      <a-col :span="13">
        <div class="post-detail-total">
          <div class="css-1132auf-Header-Breadcrumb">
            <div class="post-detail-header">
              <span>
                <span class="post-header-item">
                  <a>讨论</a>
                </span>
                <span class="ant-breadcrumb-separator">/</span>
              </span>
              <span>
                <span class="post-header-item" v-if="resData && resData.title">
                  <a>{{ resData.title }}</a>
                </span>
                <span class="ant-breadcrumb-separator" v-if="resData && resData.summary !== null"
                  >/</span
                >
              </span>
              <span v-if="resData && resData.summary !== null">
                <span class="post-header-item">
                  <a>{{ resData.summary }}</a>
                </span>
              </span>
            </div>
          </div>
          <div style="padding-top: 8px"></div>
          <div class="css-se33k0-QuestionContent">
            <div class="css-em3qpz-QuestionTitle">
              <a-avatar :image-url="resData?.user?.userAvatar" class="user-avatar"></a-avatar>
              <span style="margin-right: 12px">{{ resData?.title }}</span>
              <button
                style="margin-left: auto; flex-shrink: 0"
                class="css-yf7o-BaseButtonComponent-ThemedButton"
              >
                <icon-plus />
                <span>关注TA</span>
              </button>
            </div>
            <div class="css-5d7bnq-QuestionInfoContainer">
              <div class="css-xwj2ip-UsernameContainer">
                <span class="css-17369th-NameWrap">{{ resData?.user?.userName }}</span>
              </div>
              <span style="color: rgba(191, 191, 191, 1); margin-left: 10px; white-space: nowrap"
                >发起于 {{ moment(resData?.createTime).format('YYYY年MM月DD日') }}</span
              >
            </div>
          </div>
          <div style="position: relative">
            <div class="css-1j8tn6">
              <ai-editor-view :value="resData?.content"></ai-editor-view>
            </div>
          </div>
        </div>
      </a-col>
      <a-col :span="5"></a-col>
    </a-row>
  </div>
</template>

<style scoped>
#post-detail {
  margin: 90px 20px 20px 20px;
}
.post-detail-total {
  background: rgba(255, 255, 255, 1);
  box-shadow:
    0px 1px 2px rgba(0, 0, 0, 0.1),
    0px 2px 8px rgba(0, 0, 0, 0.08);
  width: 100%;
  padding: 0px 16px;
  margin-bottom: 10px;
  border-radius: 8px;
}
.post-detail-header {
  font-size: 14px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: 'tnum';
  color: rgba(0, 0, 0, 0.45);
}
.post-detail-header > span {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}
.post-header-item {
  display: inline-block;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ant-breadcrumb-separator {
  color: rgba(191, 191, 191, 1);
  display: inline-block;
  margin: 0 8px;
}
.css-1132auf-Header-Breadcrumb {
  width: 100%;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  height: 36px;
  border-bottom: 1px solid rgba(240, 240, 240, 1);
  padding: 0px;
}
.css-se33k0-QuestionContent {
  padding-top: 8px;
  position: relative;
}
.css-em3qpz-QuestionTitle {
  width: 100%;
  font-size: 18px;
  font-weight: 500;
  line-height: 32px;
  color: rgba(0, 0, 0, 1);
  word-break: break-word;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}
.user-avatar {
  width: 32px;
  height: 32px;
  display: flex;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
  vertical-align: unset;
  background-color: rgba(191, 191, 191, 1);
  cursor: pointer;
}
.css-yf7o-BaseButtonComponent-ThemedButton {
  border: none;
  border-radius: 3px;
  line-height: 20px;
  outline: none;
  user-select: none;
  text-decoration: none;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  transition-property: color, box-shadow, background-color, opacity;
  transition-duration: 0.3s;
  overflow: hidden;
  cursor: pointer;
  opacity: 1;
  box-shadow: inset 0px 0px 0px 1px rgba(45, 181, 93, 1);
  background-color: transparent;
  color: rgba(45, 181, 93, 1);
  font-size: 14px;
  padding: 6px 12px;
}
.css-5d7bnq-QuestionInfoContainer {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  font-size: 12px;
  margin-top: 10px;
}
.css-xwj2ip-UsernameContainer {
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
}
.css-17369th-NameWrap {
  color: rgba(191, 191, 191, 1);
  font-size: 12px;
}
.css-1j8tn6 {
  position: relative;
  width: 100%;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  background-color: rgb(255, 255, 255);
  box-sizing: border-box;
  color: rgb(26, 26, 26);
}
</style>
