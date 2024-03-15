import router from '@/router'
import { getActivePinia, storeToRefs } from 'pinia'
import useUserStore from '@/stores/user/user'
import AccessEnum from '@/utils/access/accessEnum'
import checkAccess from '@/utils/access/checkAccess'

router.beforeEach(async (to, from, next) => {
  const pinia = getActivePinia()
  if (!pinia) {
    console.error("Pinia instance not found. Make sure you've used Pinia before using the store.")
    return next(false)
  }
  const loginState = useUserStore()
  await loginState.getLoginUserAction()

  const loginUser = storeToRefs(loginState)
  const needAccess = to.meta?.Auth || AccessEnum.NOT_LOGIN

  if (!loginUser || !loginUser.userRole || loginUser.userRole.value === AccessEnum.NOT_LOGIN) {
    if (needAccess !== AccessEnum.NOT_LOGIN) {
      next('/user/login')
    } else {
      next()
    }
    return
  }

  if (to.meta?.Auth === 'admin' && loginUser.userRole.value !== 'admin') {
    next('/')
    return
  }

  if (!checkAccess(loginUser.userRole.value as AccessEnum, needAccess as AccessEnum)) {
    next('/')
    return
  }

  next()
})
