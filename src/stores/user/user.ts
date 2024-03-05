import { defineStore } from 'pinia'
import type { IAccount } from '@/type/user'
import { UserControllerService } from '../../../generated'
import accessEnum from '@/utils/access/accessEnum'
interface IUserState {
  userName: string
  userRole: string
  userAvatar: string
  userProfile: string
}

const useUserStore = defineStore('user', {
  persist: true,
  state: (): IUserState => ({
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
          this.userName = <string>res.data?.userName
          this.userRole = <string>res.data?.userRole
          this.userAvatar = <string>res.data?.userAvatar
          this.userProfile = <string>res.data?.userProfile
        } else {
          this.userRole = accessEnum.NOT_LOGIN
        }
      }
    },
    async getLoginUserAction() {
      const res = await UserControllerService.getLoginUserUsingGet()
      if (res.code === 0) {
        // 存储用户信息
        this.userName = <string>res.data?.userName
        this.userRole = <string>res.data?.userRole
        this.userAvatar = <string>res.data?.userAvatar
        this.userProfile = <string>res.data?.userProfile
      }
    }
  }
})
export default useUserStore
