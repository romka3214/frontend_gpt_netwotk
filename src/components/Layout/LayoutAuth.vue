<script setup lang="ts">
import { useMessage } from "naive-ui";
window.$message = useMessage();
</script>
<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>
<style lang="scss"></style>
