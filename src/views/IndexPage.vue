<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import PostList from "@/components/Post/PostList.vue";
const authStore = useAuthStore();
</script>

<template>
  <n-h1>Посты гениев</n-h1>
  <n-button @click="authStore.logout"> Выйти </n-button>
  <PostList />
</template>
<style scoped></style>
