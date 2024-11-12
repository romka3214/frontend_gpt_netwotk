<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import router from "@/router";

const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
  router.push({ name: "auth" });
};
</script>

<template>
  <n-h1
    >Ебааать дароваа, ты успешно авторизовался. Теперь ты можешь только ВЫЙТИ
    НАХУЙ (кнопка снизу)</n-h1
  >
  <n-button @click="logout"> Выйти </n-button>
</template>
<style scoped></style>
