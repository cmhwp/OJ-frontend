import { defineStore } from 'pinia'
import type { IAccount } from '@/type/user'
import { UserControllerService, type UserRegisterRequest } from '../../../generated'
import accessEnum from '@/utils/access/accessEnum'
import router from '@/router'
import message from '@arco-design/web-vue/es/message'
interface IUserState {
  id: number
  userName: string
  userRole: string
  userAvatar: string
  userProfile: string
  gender: number
  birthday: string
  address: string
  websites: string
  gitHubName: string
  school: string
  company: string
  tags: string[]
  position: string
}
const useUserStore = defineStore('user', {
  persist: false,
  state: (): IUserState => ({
    id: -1,
    userName: '',
    userRole: '',
    userAvatar: '',
    userProfile: '',
    gender: 0,
    birthday: '',
    address: '',
    websites: '',
    gitHubName: '',
    school: '',
    company: '',
    tags: [],
    position: ''
  }),
  actions: {
    async loginAccountAction(payload: IAccount) {
      const loginResult = await UserControllerService.userLoginUsingPost(payload)
      if (loginResult.code === 0) {
        const res = await UserControllerService.getLoginUserUsingGet()
        console.log(res)
        if (res.code === 0) {
          message.success('登录成功')
          // 存储用户信息
          this.id = <number>res.data?.id
          this.userName = <string>res.data?.userName
          this.userRole = <string>res.data?.userRole
          this.userAvatar = <string>res.data?.userAvatar
          this.userProfile = <string>res.data?.userProfile
          this.gender = <number>res.data?.gender
          this.birthday = <string>res.data?.birthday
          this.address = <string>res.data?.address
          this.websites = <string>res.data?.websites
          this.gitHubName = <string>res.data?.gitHubName
          this.school = <string>res.data?.school
          this.company = <string>res.data?.company
          this.tags = <string[]>(res.data?.tags as unknown)
          this.position = <string>res.data?.position
          // 存储token
          router.push('/')
        } else {
          this.userRole = accessEnum.NOT_LOGIN
        }
      }
    },
    async getLoginUserAction() {
      const res = await UserControllerService.getLoginUserUsingGet()
      if (res.code === 0) {
        // 存储用户信息
        this.id = <number>res.data?.id
        this.userName = <string>res.data?.userName
        this.userRole = <string>res.data?.userRole
        this.userAvatar = <string>res.data?.userAvatar
        this.userProfile = <string>res.data?.userProfile
        this.gender = <number>res.data?.gender
        this.birthday = <string>res.data?.birthday
        this.address = <string>res.data?.address
        this.websites = <string>res.data?.websites
        this.gitHubName = <string>res.data?.gitHubName
        this.school = <string>res.data?.school
        this.company = <string>res.data?.company
        this.tags = <string[]>(res.data?.tags as unknown)
        this.position = <string>res.data?.position
      }
    },
    resetState() {
      this.$reset()
    },
    async logoutAction() {
      const res = await UserControllerService.userLogoutUsingPost()
      console.log(res)
      if (res.code === 0) {
        this.resetState()
        localStorage.clear()
        await router.push('/')
        location.reload()
      } else {
        message.error('注销失败:' + res.message)
      }
    },
    async userRegisterAction(payload: UserRegisterRequest) {
      const res = await UserControllerService.userRegisterUsingPost(payload)
      if (res.code === 0) {
        message.success('注册成功')
        const { userAccount, userPassword } = { ...payload }
        console.log(userAccount, userPassword)
        await this.loginAccountAction({ userAccount, userPassword })
        await this.getLoginUserAction()
        await router.push('/user/userInfo')
      } else {
        message.error('注册失败:' + res.message)
      }
    }
  }
})
export default useUserStore
