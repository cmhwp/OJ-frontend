import accessEnum from '@/utils/access/accessEnum'

/**
 * 判断登录用户是否具有所需的访问级别。
 *
 * @param userRole 当前登录用户权限。
 * @param needAccess 当前操作所需的访问级别。
 * @returns 返回一个布尔值，指示用户是否具有必要的访问权限。
 */
export default function (userRole: accessEnum, needAccess: accessEnum): boolean {
  // 映射枚举值到权限级别
  const accessLevel: { [key in accessEnum]: number } = {
    [accessEnum.NOT_LOGIN]: 0,
    [accessEnum.USER]: 1,
    [accessEnum.ADMIN]: 2
  }

  // 确保userRole是accessEnum的一个有效键
  const userAccessLevel =
    userRole && accessLevel[userRole as accessEnum] !== undefined
      ? accessLevel[userRole as accessEnum]
      : accessLevel[accessEnum.NOT_LOGIN]
  const requiredAccessLevel = accessLevel[needAccess]

  // 比较用户访问级别与所需访问级别
  return userAccessLevel >= requiredAccessLevel
}
