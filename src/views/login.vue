<template>
  <button @click="goIndex">首页</button>
</template>

<script setup lang="ts">
import router from "@/router";

const goIndex = () => {
  router.push({
    path: "/",
  });
};
</script>

<style scoped lang="scss"></style>
