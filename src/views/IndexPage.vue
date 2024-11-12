<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
  window.location.reload();
};
</script>

<template>
  <n-h1>Прив чо дел, пока что тут ничего нет</n-h1>
  <n-button @click="logout"> Выйти </n-button>
</template>
<style scoped></style>
