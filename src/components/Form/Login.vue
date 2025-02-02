<template>
  <n-form
    ref="formRef"
    :disabled="authFormValue.loading"
    :model="authFormValue"
    :rules="authRules"
  >
    <n-form-item-row label="Login" path="login">
      <n-input v-model:value="authFormValue.login" type="text" placeholder="" />
    </n-form-item-row>
    <n-form-item-row label="Password" path="password">
      <n-input
        v-model:value="authFormValue.password"
        type="password"
        placeholder=""
      />
    </n-form-item-row>
  </n-form>
  <n-button
    :disabled="authFormValue.loading"
    @click="submitLoginForm"
    type="primary"
    block
    secondary
    strong
  >
    Войти
  </n-button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import type { FormInst } from "naive-ui";
const authStore = useAuthStore();

const formRef = ref<FormInst | null>(null);

const authFormValue = ref({
  login: "",
  password: "",
  loading: false,
});
const authRules = {
  login: {
    required: true,
    message: "",
    trigger: "blur",
  },
  password: {
    required: true,
    message: "",
    trigger: "blur",
  },
};

const submitLoginForm = () => {
  authFormValue.value.loading = true;
  formRef.value
    ?.validate()
    .then(async () => {
      await authStore.login({
        username: authFormValue.value.login,
        password: authFormValue.value.password,
      });
    })
    .catch(() => {})
    .finally(() => {
      authFormValue.value.loading = false;
    });
};
</script>
