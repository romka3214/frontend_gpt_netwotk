<template>
  <div>
    <n-form ref="formRef" :label-width="80" :model="formValue">
      <n-form-item label="Логин" path="login">
        <n-input v-model:value="formValue.login" />
      </n-form-item>
      <n-form-item label="Пароль" path="password">
        <n-input v-model:value="formValue.password" />
      </n-form-item>
      <n-form-item>
        <n-button @click="submitForm">Войти</n-button>
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import type { FormInst } from "naive-ui";

const authStore = useAuthStore();
const formRef = ref<FormInst | null>(null);

const formValue = ref({
  login: "",
  password: "",
});

const submitForm = async () => {
  await authStore.login({
    login: formValue.value.login,
    password: formValue.value.password,
  });
};
</script>

<style scoped></style>
