<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import PostList from "@/components/PostList.vue";
const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
  window.location.reload();
};
</script>

<template>
  <n-h1>Посты гениев</n-h1>
  <!--  <n-button @click="logout"> Выйти </n-button>-->
  <PostList />
</template>
<style scoped></style>
