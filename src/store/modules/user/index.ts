import { defineStore } from 'pinia'
import { login as userLogin, logout as userLogout, getUserProfile, LoginData } from '@/api/user/index'
import { UserState } from './types'
import { clearToken, setToken } from '@/utils/auth'

const key = 'userInfo'
export const useUserStore = defineStore(key, {
  state: (): UserState => ({
    user_name: undefined,
    avatar: undefined,
    organization: undefined,
    location: undefined,
    email: undefined,
    role: '',
  }),
  getters: {
    userProfile(state: UserState): UserState {
      return { ...state }
    },
  },
  actions: {
    // 设置用户的信息
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial)
    },
    // 重置用户信息
    resetInfo() {
      this.$reset()
    },
    // 获取用户信息
    async info() {
      const result = await getUserProfile()
      this.setInfo(result)
    },
    // 异步登录并存储token
    async login(loginForm: LoginData) {
      const result = await userLogin(loginForm)
      const token = result?.token
      if (token) {
        setToken(token)
      }
      return result
    },
    // Logout
    async logout() {
      await userLogout()
      this.resetInfo()
      clearToken()
      // 路由表重置
      // location.reload();
    },
  },
  // 开启数据缓存，在 strategies 里自定义 key 值，并将存放位置由 sessionStorage 改为 localStorage
  // 默认所有 state 都会进行缓存，你可以通过 paths 指定要持久化的字段，其他的则不会进行持久化，如：paths: ['userinfo'] 替换key的位置
  persist: {
    enabled: true,
    strategies: [
      {
        key: key,
        storage: localStorage,
      },
    ],
  },
})
