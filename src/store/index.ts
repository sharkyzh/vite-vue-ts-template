import { useUserStore } from './modules/user'

const store = () => {
  return {
    useUserStore: useUserStore(),
  }
}

export default store
