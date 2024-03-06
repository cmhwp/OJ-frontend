import { ref } from 'vue'
export const Account_Verification = ref(false)
export const Password_Verification = ref(false)
export const accountRules = {
  // userAccount: [
  //   {
  //     required: true,
  //     message: '账号不可以为空！',
  //     trigger: 'blur'
  //   },
  //   {
  //     message: '账号长度应为3-16个字符！',
  //     trigger: 'blur',
  //     minLength: 3,
  //     maxlength: 16
  //   },
  //   {
  //     message: '不能包含空格！',
  //     trigger: 'blur',
  //     match: /^\S*$/ // 匹配不能包含空格
  //   },
  //   {
  //     message: '账号必须包含字母、数字、符号中至少两种类型！',
  //     trigger: 'blur',
  //     match: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
  //   },
  //   {
  //     message: '账号不可以包含连续重复的6位及以上的字母或数字！',
  //     trigger: 'blur',
  //     match: /^(?!.*(.)\1{5,})$/
  //   }
  // ],
  // userPassword: [
  //   {
  //     required: true,
  //     message: '密码不可以为空!',
  //     trigger: 'blur'
  //   },
  //   {
  //     message: '密码长度应为8-16个字符!',
  //     trigger: 'blur',
  //     minLength: 8,
  //     maxlength: 16
  //   },
  //   {
  //     message: '不能包含空格！',
  //     trigger: 'blur',
  //     match: /^\S*$/ // 匹配不能包含空格
  //   },
  //   {
  //     message: '密码必须包含字母、数字、符号中至少两种类型!',
  //     trigger: 'blur',
  //     match:
  //       /^(?=(?:.*[a-zA-Z])(?=.*\d)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z\d])|(?=.*\d)(?=.*[^a-zA-Z\d]))[\w\d!@#$%^&*()-_+=]{8,16}$/
  //   },
  //   {
  //     required: true,
  //     message: '密码不可以包含连续重复的6位及以上的字母或数字!',
  //     trigger: 'blur',
  //     match: /^(?!.*(.)\1{5,})$/
  //   }
  // ]
  userAccount: [
    {
      required: true,
      validator: (value: string | undefined, callback: (args: string) => void) => {
        return new Promise((resolve) => {
          if (value === undefined) {
            callback('账号不可以为空!')
          } else if (value.trim() === '') {
            callback('不能包含空格！')
          } else if (
            !/(?=.*\d)(?=.*[^a-zA-Z\d])/.test(value) &&
            !/(?=.*[a-zA-Z])(?=.*\d)/.test(value) &&
            !/(?=.*[a-zA-Z])(?=.*[^a-zA-Z\d])/.test(value)
          ) {
            callback('密码必须包含字母、数字、符号中至少两种类型!')
          } else if (value.length < 5 || value.length > 16) {
            callback('密码长度必须为5-16位！')
          } else if (/([a-zA-Z0-9])\1{5,}/.test(value)) {
            callback('密码不可以包含连续重复的6位及以上的字母或数字!')
          } else {
            Account_Verification.value = true
          }
          resolve(true)
        })
      }
    }
  ],
  userPassword: [
    {
      required: true,
      validator: (value: string | undefined, callback: (args: string) => void) => {
        return new Promise((resolve) => {
          window.setTimeout(() => {
            if (value === undefined) {
              callback('密码不可以为空！')
            } else if (value.trim() === '') {
              callback('不能包含空格！')
            } else if (value.length < 8 || value.length > 16) {
              callback('密码长度应为8-16个字符！')
            } else if (
              !/(?=.*\d)(?=.*[^a-zA-Z\d])/.test(value) &&
              !/(?=.*[a-zA-Z])(?=.*\d)/.test(value) &&
              !/(?=.*[a-zA-Z])(?=.*[^a-zA-Z\d])/.test(value)
            ) {
              callback('密码必须包含字母、数字、符号中至少两种类型！')
            } else if (/([a-zA-Z0-9])\1{5,}/.test(value)) {
              callback('密码不可以包含连续重复的6位及以上的字母或数字！')
            } else {
              Password_Verification.value = true
            }
            resolve(true)
          }, 100)
        })
      }
    }
  ]
}
