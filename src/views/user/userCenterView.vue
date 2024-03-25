<script setup lang="ts">
import useUserStore from '@/stores/user/user'
import { Image15 } from '@/assets/image/imgExport'
import { computed, ref, onMounted, watchEffect } from 'vue'
import { UserControllerService } from '../../../generated'
import message from '@arco-design/web-vue/es/message'

const loginUser = useUserStore()
const name = computed(() => {
  return loginUser.userName
})
const avatar = computed(() => {
  return loginUser.userAvatar
})
const toast = () => {
  console.log('更换头像')
}
console.log(name)
const options = [
  {
    value: '北京',
    label: '北京',
    children: [
      {
        value: '市辖区',
        label: '市辖区',
        children: [
          { value: '东城区', label: '东城区' },
          { value: '西城区', label: '西城区' },
          { value: '朝阳区', label: '朝阳区' },
          { value: '海淀区', label: '海淀区' }
        ]
      }
    ]
  },
  {
    value: '上海',
    label: '上海',
    children: [
      {
        value: '市辖区',
        label: '市辖区',
        children: [
          { value: '黄浦区', label: '黄浦区' },
          { value: '徐汇区', label: '徐汇区' },
          { value: '长宁区', label: '长宁区' }
        ]
      }
    ]
  },
  {
    value: '江苏省',
    label: '江苏省',
    children: [
      {
        value: '南京市',
        label: '南京市',
        children: [
          { value: '玄武区', label: '玄武区' },
          { value: '秦淮区', label: '秦淮区' }
        ]
      },
      {
        value: '苏州市',
        label: '苏州市',
        children: [
          { value: '姑苏区', label: '姑苏区' },
          { value: '吴中区', label: '吴中区' }
        ]
      }
    ]
  },
  {
    value: '浙江省',
    label: '浙江省',
    children: [
      {
        value: '杭州市',
        label: '杭州市',
        children: [
          { value: '上城区', label: '上城区' },
          { value: '下城区', label: '下城区' }
        ]
      },
      {
        value: '宁波市',
        label: '宁波市',
        children: [
          { value: '海曙区', label: '海曙区' },
          { value: '江北区', label: '江北区' }
        ]
      }
    ]
  }
]
const tags = [
  { code: 'JavaScript', color: 'blue' },
  { code: 'HTML', color: 'green' },
  { code: 'Java', color: 'red' },
  { code: 'Python', color: 'orange' },
  { code: 'C++', color: 'orange' },
  { code: 'C#', color: 'gold' }
]
//表单
let formRef = ref({
  userName: '',
  gender: 0,
  birthday: '',
  address: '',
  userProfile: '',
  websites: '',
  gitHubName: '',
  school: '',
  company: '',
  tags: [] as string[],
  position: ''
})
const updateInfo = async () => {
  await loginUser.getLoginUserAction()
  man(loginUser.gender)
  formRef.value = { ...loginUser }
}
const manGenderClass = ref(true)
const womanGenderClass = ref(false)
const man = (gender: number) => {
  if (gender === 0) {
    formRef.value.gender = 0
    manGenderClass.value = true
    womanGenderClass.value = false
  } else if (gender === 1) {
    formRef.value.gender = 1
    manGenderClass.value = false
    womanGenderClass.value = true
  }
}
watchEffect(() => {
  console.log(formRef.value)
})
const handleSubmit = async () => {
  formRef.value.tags = tags.map((item) => item.code)
  await UserControllerService.updateMyUserUsingPost(formRef.value).then((res) => {
    console.log(res)
  })
}
onMounted(() => {
  updateInfo()
})
</script>

<template>
  <div class="user-center">
    <a-layout style="width: 900px">
      <a-space style="display: flex; justify-content: center">
        <a-layout-content style="width: 300px">
          <a-space
            direction="vertical"
            style="display: flex; justify-content: center; align-items: center"
          >
            <div
              style="
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
              "
              class="user-top"
            >
              <a-avatar :size="70" shape="square" :image-url="loginUser.userAvatar"></a-avatar>
              <a-space class="avatar-info">
                <span class="user-name">{{ name }}</span>
                <img :src="Image15" class="img-vip" />
              </a-space>
              <div class="vip-info">加入会员，尊享n大特权</div>
              <a-button class="vip-btn">升级&nbsp;VIP&nbsp;会员</a-button>
            </div>
            <div class="user-bottom">
              <div class="user-item">
                <a class="user-item-a">
                  <icon-star class="user-item-icon"></icon-star>
                  我的收藏
                </a>
              </div>
              <div class="user-item">
                <a class="user-item-a">
                  <icon-book class="user-item-icon" />
                  个人笔记
                </a>
              </div>
              <div class="user-item">
                <a class="user-item-a">
                  <icon-question-circle class="user-item-icon" />
                  我的题解
                </a>
              </div>
              <div class="user-item">
                <a class="user-item-a">
                  <icon-heart class="user-item-icon" />
                  创作激励
                </a>
              </div>
              <div class="user-driver"></div>
              <div class="user-item">
                <a class="user-item-a">
                  <icon-computer class="user-item-icon" />
                  做题分析
                </a>
              </div>
              <div class="user-item">
                <a class="user-item-a">
                  <icon-bar-chart class="user-item-icon" />
                  进度管理
                </a>
              </div>
              <div class="user-driver"></div>
              <div class="user-item">
                <a class="user-item-a">
                  <icon-user class="user-item-icon" />
                  个人信息
                </a>
              </div>
              <div class="user-item">
                <a class="user-item-a">
                  <icon-file class="user-item-icon" />
                  个人简历
                </a>
              </div>
              <div class="user-item">
                <a class="user-item-a">
                  <icon-lock class="user-item-icon"></icon-lock>
                  账号安全
                </a>
              </div>
              <div class="user-item">
                <a class="user-item-a">
                  <icon-settings class="user-item-icon" />
                  通知与隐私
                </a>
              </div>
            </div>
          </a-space>
        </a-layout-content>
        <a-layout-content style="width: 600px">
          <div class="user-left">
            <a-form class="user-form" :model="formRef">
              <a-avatar
                @click="toast"
                :size="100"
                :image-url="avatar"
                :trigger-icon-style="{ color: '#3491FA' }"
              >
                <template #trigger-icon>
                  <IconEdit :size="15" />
                </template>
              </a-avatar>
              <a-form-item class="a-form-item-nick">
                <div class="nick-input-div">
                  <label class="nick-name">昵称</label>
                  <a-input
                    v-model="formRef.userName"
                    class="nick-input"
                    placeholder="请输入昵称"
                  ></a-input>
                </div>
                <div class="gender-choice-div">
                  <label class="gender-label">性别</label>
                  <div class="gender-choice">
                    <div class="man">
                      <span
                        class="man-span"
                        :class="{ 'choice-css': manGenderClass, 'no-choice-css': womanGenderClass }"
                        @click="man(0)"
                      >
                        <icon-man style="margin-right: 6px" />
                        男性
                      </span>
                    </div>
                    <div class="woman">
                      <span
                        class="woman-span"
                        :class="{ 'choice-css': womanGenderClass, 'no-choice-css': manGenderClass }"
                        @click="man(1)"
                      >
                        <icon-woman style="margin-right: 6px" />
                        女性
                      </span>
                    </div>
                  </div>
                </div>
              </a-form-item>
              <a-form-item class="a-form-item-brith-address">
                <div class="brith">
                  <label>生日</label>
                  <div class="brith-input">
                    <a-date-picker
                      class="birth-picker"
                      style="
                        border-radius: 0.375rem;
                        position: relative;
                        touch-action: manipulation;
                        outline: 2px solid #0000;
                        outline-offset: 2px;
                        color: #262626bf;
                        line-height: 1.25rem;
                        background-color: #00000008;
                        overflow: visible;
                        height: 2.5rem;
                        padding: 0.375rem 0.5rem 0.375rem 0.75rem;
                      "
                      v-model="formRef.birthday"
                    />
                  </div>
                </div>
                <div class="address">
                  <div style="position: relative">
                    <label class="address-lable">现居地</label>
                    <a-cascader
                      :options="options"
                      placeholder="请选择"
                      allow-search
                      style="
                        border-radius: 0.375rem;
                        position: relative;
                        touch-action: manipulation;
                        color: #262626bf;
                        line-height: 1.25rem;
                        background-color: #00000008;
                        overflow: visible;
                        height: 2.5rem;
                        padding: 0.375rem 0.5rem 0.375rem 0.75rem;
                      "
                      v-model="formRef.address"
                    />
                  </div>
                </div>
              </a-form-item>
              <a-form-item class="a-form-item-user-profile">
                <div class="user-profile">
                  <label>个人介绍</label>
                </div>
                <div style="position: relative">
                  <a-textarea
                    style="
                      overflow: hidden;
                      outline: 2px solid #0000;
                      outline-offset: 2px;
                      color: #262626bf;
                      line-height: 1.25rem;
                      background-color: #00000008;
                      padding: 0.375rem 0.5rem 0.375rem 0.75rem;
                      border-radius: 0.375rem;
                      border-width: 1px;
                      min-height: 48px;
                      width: 400px;
                      margin-left: 1rem;
                    "
                    placeholder="关于你的个性、兴趣或经验···"
                    allow-clear
                    :max-length="100"
                    show-word-limit
                    v-model="formRef.userProfile"
                  />
                </div>
              </a-form-item>
              <a-form-item class="a-form-item-website">
                <div class="website">
                  <label>个人网站</label>
                </div>
                <div class="website-input">
                  <a-input
                    style="
                      overflow: hidden;
                      outline: 2px solid #0000;
                      outline-offset: 2px;
                      color: #262626bf;
                      line-height: 1.25rem;
                      background-color: #00000008;
                      padding: 0.375rem 0.5rem 0.375rem 0.75rem;
                      border-radius: 0.375rem;
                      border-width: 1px;
                      min-height: 48px;
                      width: 400px;
                      margin-left: 1rem;
                    "
                    v-model="formRef.websites"
                  ></a-input>
                </div>
              </a-form-item>
              <a-form-item class="a-form-item-website">
                <div class="website">
                  <label> GitHub </label>
                </div>
                <div class="website-input" style="margin-left: 0.5rem">
                  <a-input
                    style="
                      overflow: hidden;
                      outline: 2px solid #0000;
                      outline-offset: 2px;
                      color: #262626bf;
                      line-height: 1.25rem;
                      background-color: #00000008;
                      padding: 0.375rem 0.5rem 0.375rem 0.75rem;
                      border-radius: 0.375rem;
                      border-width: 1px;
                      min-height: 48px;
                      width: 400px;
                      margin-left: 1rem;
                    "
                    v-model="formRef.gitHubName"
                  ></a-input>
                </div>
              </a-form-item>
              <a-form-item class="a-form-item-website">
                <div class="website">
                  <label>就读学校</label>
                </div>
                <div class="website-input">
                  <a-input
                    style="
                      overflow: hidden;
                      outline: 2px solid #0000;
                      outline-offset: 2px;
                      color: #262626bf;
                      line-height: 1.25rem;
                      background-color: #00000008;
                      padding: 0.375rem 0.5rem 0.375rem 0.75rem;
                      border-radius: 0.375rem;
                      border-width: 1px;
                      min-height: 48px;
                      width: 400px;
                      margin-left: 1rem;
                    "
                    v-model="formRef.school"
                  ></a-input>
                </div>
              </a-form-item>
              <a-form-item class="a-form-item-company">
                <div class="company">
                  <label>所在公司</label>
                  <a-input
                    style="
                      border-radius: 0.375rem;
                      position: relative;
                      touch-action: manipulation;
                      outline: 2px solid #0000;
                      outline-offset: 2px;
                      color: #262626bf;
                      line-height: 1.25rem;
                      padding: 0.375rem 0.75rem 0.375rem 0.75rem;
                      background-color: #00000008;
                      width: 90%;
                      height: 2.5rem;
                      overflow: visible;
                    "
                    placeholder="最近就职公司"
                    v-model="formRef.company"
                  ></a-input>
                </div>
                <div class="vocation">
                  <label>职位</label>
                  <a-input
                    style="
                      border-radius: 0.375rem;
                      position: relative;
                      touch-action: manipulation;
                      outline: 2px solid #0000;
                      outline-offset: 2px;
                      color: #262626bf;
                      line-height: 1.25rem;
                      padding: 0.375rem 0.75rem 0.375rem 0.75rem;
                      background-color: #00000008;
                      width: 100%;
                      height: 2.5rem;
                      overflow: visible;
                    "
                    placeholder="职位"
                    v-model="formRef.position"
                  ></a-input>
                </div>
              </a-form-item>
              <a-form-item class="a-form-item-website">
                <div class="website">
                  <label>技能标签</label>
                </div>
                <div class="website-input">
                  <a-input
                    style="
                      overflow: hidden;
                      outline: 2px solid #0000;
                      outline-offset: 2px;
                      color: #262626bf;
                      line-height: 1.25rem;
                      background-color: #00000008;
                      padding: 0.375rem 0.5rem 0.375rem 0.75rem;
                      border-radius: 0.375rem;
                      border-width: 1px;
                      min-height: 48px;
                      width: 400px;
                      margin-left: 1rem;
                    "
                    v-model="formRef.tags"
                  >
                    <template #prefix>
                      <div v-for="(tag, index) of tags" :key="index" style="margin: 0 3px">
                        <a-tag :color="tag.color" closable bordered>{{ tag.code }}</a-tag>
                      </div>
                    </template>
                  </a-input>
                </div>
              </a-form-item>
            </a-form>
            <div class="btn">
              <a-button class="a-btn" @click="handleSubmit">提交</a-button>
            </div>
          </div>
        </a-layout-content>
      </a-space>
    </a-layout>
  </div>
</template>

<style scoped>
.user-center {
  margin: 90px 10px 100px 200px;
}
.user-center .avatar-info {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  height: 24px;
  color: rgba(38, 38, 38, 1);
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
}
.img-vip {
  width: 20px;
  height: 20px;
  margin-left: 4px;
}
.vip-info {
  margin-bottom: 12px;
  font-size: 12px;
  line-height: 16px;
  color: rgba(60, 60, 67, 0.6);
}
.vip-btn {
  width: 120px;
  height: 32px;
  line-height: 32px;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  background: rgba(255, 161, 22, 1);
}
.user-top {
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding: 24px 0px;
  border-bottom: solid 1px rgba(0, 10, 32, 0.14);
  width: 150px;
}
.user-bottom {
  height: calc(100% - 200px);
}
.user-bottom .user-item {
  min-width: 84px;
  position: relative;
  background-color: transparent;
  border-radius: 5px;
}
.user-bottom .user-item .user-item-a {
  display: flex;
  padding: 14px 18px;
  font-size: 14px;
  -webkit-box-align: center;
  align-items: center;
  font-weight: 400;
}
.user-bottom .user-item .user-item-a:hover {
  color: rgba(140, 140, 140, 1);
}

.user-bottom .user-item .user-item-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
.user-driver {
  background-color: rgba(229, 229, 229, 1);
  height: 1px;
  width: 110px;
  margin: 16px auto;
  padding: 0px 18px;
}
.user-left {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.5rem;
  box-shadow: 0 1px 25px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  background-color: rgba(247, 247, 247, 1);
}
.user-left .user-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.user-left .user-form .a-form-item-nick {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: 1.5rem;
}
.nick-input-div {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  position: relative;
}
.nick-name {
  color: #262626bf;
  font-weight: 400;
  align-items: center;
  min-height: 21px;
  display: flex;
  margin-bottom: 0.5rem;
  gap: 0.25rem;
}
.nick-input {
  border-radius: 0.375rem;
  position: relative;
  touch-action: manipulation;
  outline: 2px solid #0000;
  outline-offset: 2px;
  color: #262626bf;
  line-height: 1.25rem;
  padding: 0.375rem 0.75rem 0.375rem 0.75rem;
  background-color: #00000008;
  width: 100%;
  height: 2.5rem;
  overflow: visible;
}
.gender-choice-div {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  position: relative;
  margin-left: 2rem;
}
.gender-choice-div .gender-label {
  color: #262626bf;
  font-weight: 400;
  align-items: center;
  min-height: 21px;
  display: flex;
  margin-bottom: 0.5rem;
  gap: 0.25rem;
  touch-action: manipulation;
}
.gender-choice-div .gender-choice {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
}
.gender-choice .man {
  cursor: pointer;
  flex: 1 1 0%;
}
.man .man-span {
  --tw-text-opacity: 1;
  padding-left: 18px;
  border-radius: 0.5rem;
  align-items: center;
  height: 2.5rem;
  display: flex;
}
.gender-choice .woman {
  cursor: pointer;
  flex: 1 1 0%;
}
.choice-css {
  color: rgb(0 122 255 / var(--tw-text-opacity));
  background-color: #007aff14;
}

.woman .woman-span {
  --tw-text-opacity: 1;
  padding-left: 18px;
  border-radius: 0.5rem;
  align-items: center;
  height: 2.5rem;
  display: flex;
}
.no-choice-css {
  background-color: #00000008;
  color: #262626bf;
}
.a-form-item-brith-address {
  gap: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}
.a-form-item-brith-address .brith {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  position: relative;
}
.a-form-item-brith-address .brith > label {
  color: #262626bf;
  font-weight: 400;
  gap: 0.25rem;
  align-items: center;
  min-height: 21px;
  display: flex;
  margin-bottom: 0.5rem;
  touch-action: manipulation;
}
.brith .brith-input {
  width: 100%;
  position: relative;
}
.address {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  position: relative;
}
.address .address-lable {
  color: #262626bf;
  font-weight: 400;
  gap: 0.25rem;
  align-items: center;
  min-height: 21px;
  display: block;
  margin-bottom: 0.5rem;
  touch-action: manipulation;
}
.a-form-item-user-profile {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  justify-content: flex-start;
}
.user-profile > label {
  color: #262626bf;
  font-weight: 400;
  gap: 0.25rem;
  align-items: center;
  min-height: 21px;
  display: flex;
  margin-bottom: 0.5rem;
  touch-action: manipulation;
}
.a-form-item-website {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  position: relative;
}
.website > label {
  color: #262626bf;
  font-weight: 400;
  gap: 0.25rem;
  align-items: center;
  min-height: 21px;
  display: flex;
  margin-bottom: 0.5rem;
  touch-action: manipulation;
}
.website-input {
  border-radius: 0.375rem;
  position: relative;
}
.a-form-item-company {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  gap: 1.5rem;
}
.company {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  position: relative;
}
.company > label {
  color: #262626bf;
  font-weight: 400;
  gap: 0.25rem;
  align-items: center;
  min-height: 21px;
  display: flex;
  margin-bottom: 0.5rem;
  touch-action: manipulation;
}
.vocation {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  position: relative;
}
.vocation > label {
  color: #262626bf;
  font-weight: 400;
  gap: 0.25rem;
  align-items: center;
  min-height: 21px;
  display: flex;
  margin-bottom: 0.5rem;
  touch-action: manipulation;
}
.btn {
  display: flex;
  justify-content: flex-end;
}
.btn .a-btn {
  --tw-text-opacity: 1;
  color: rgb(255 255 255);
  font-weight: 400;
  padding: 0.5rem 1.5rem;
  --tw-bg-opacity: 1;
  background-color: rgb(45 181 93);
  border-radius: 5px;
  white-space: nowrap;
  align-items: center;
  display: inline-flex;
  cursor: pointer;
}
.btn .a-btn:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(38 154 79);
}
</style>
