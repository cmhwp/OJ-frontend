import { defineStore } from 'pinia'
import type { IAccount } from '@/type/user'
import { UserControllerService } from '../../../generated'
import accessEnum from '@/utils/access/accessEnum'
import router from '@/router'
import message from '@arco-design/web-vue/es/message'
interface IUserState {
  id: number
  userName: string
  userRole: string
  userAvatar: string
  userProfile: string
}
const useUserStore = defineStore('user', {
  persist: true,
  state: (): IUserState => ({
    id: '',
    userName: '',
    userRole: '',
    userAvatar: '',
    userProfile: ''
  }),
  actions: {
    async loginAccountAction(payload: IAccount) {
      const loginResult = await UserControllerService.userLoginUsingPost(payload)
      if (loginResult.code === 0) {
        const res = await UserControllerService.getLoginUserUsingGet()
        console.log(res)
        if (res.code === 0) {
          // 存储用户信息
          this.id = <number>res.data?.id
          this.userName = <string>res.data?.userName
          this.userRole = <string>res.data?.userRole
          this.userAvatar = <string>res.data?.userAvatar
          this.userProfile = <string>res.data?.userProfile
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
    }
  }
})
export default useUserStore
