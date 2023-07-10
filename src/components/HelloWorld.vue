<script setup lang="ts">
import store from '@/store'
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)

const userStore = store().useUserStore

const changeUserName = (name) => {
  userStore.setInfo({ user_name: name })
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>

    <div>------------------------------------------------------------------</div>
    <div>userStore name is : {{ userStore.user_name }}</div>
    <button type="button" @click="changeUserName('李四')">李四</button>
    <button type="button" @click="changeUserName('张三')">张三</button>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
