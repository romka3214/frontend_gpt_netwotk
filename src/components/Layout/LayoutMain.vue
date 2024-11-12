<script setup lang="ts">
import { useMessage } from "naive-ui";
window.$message = useMessage();
</script>
<template>
  <header class="flex justify-between items-center p-4">
    <div class="text-xl font-bold">Логотип</div>
    <div class="relative">
      <button @click="toggleMenu" class="focus:outline-none"></button>
    </div>
  </header>
  <div class="container mx-auto">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>
