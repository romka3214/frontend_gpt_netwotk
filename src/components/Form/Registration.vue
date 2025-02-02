<template>
  <n-form :disabled="model.loading" ref="formRef" :model="model" :rules="rules">
    <n-form-item-row path="login" label="Login">
      <n-input placeholder="" v-model:value="model.login" type="text" />
    </n-form-item-row>
    <n-form-item-row path="password" label="Password">
      <n-input
        @input="handlePasswordInput"
        placeholder=""
        v-model:value="model.password"
        type="password"
      />
    </n-form-item-row>
    <n-form-item-row
      ref="rPasswordFormItemRef"
      first
      path="reenteredPassword"
      label="Password confirmation"
    >
      <n-input
        placeholder=""
        v-model:value="model.reenteredPassword"
        :disabled="!model.password"
        type="password"
      />
    </n-form-item-row>
  </n-form>
  <n-button
    :disabled="model.loading"
    @click="submit"
    type="primary"
    block
    secondary
    strong
  >
    Sign Up
  </n-button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { FormInst, FormItemInst, FormItemRule, FormRules } from "naive-ui";

import { useAuthStore } from "@/stores/auth";

interface ModelType {
  login: string | null;
  password: string | null;
  reenteredPassword: string | null;
  loading: boolean;
}
const authStore = useAuthStore();

const formRef = ref<FormInst | null>(null);
const rPasswordFormItemRef = ref<FormItemInst | null>(null);
const model = ref<ModelType>({
  login: null,
  password: null,
  reenteredPassword: null,
  loading: false,
});

function validatePasswordStartWith(rule: FormItemRule, value: string): boolean {
  return (
    !!model.value.password &&
    model.value.password.startsWith(value) &&
    model.value.password.length >= value.length
  );
}

function validatePasswordSame(rule: FormItemRule, value: string): boolean {
  return value === model.value.password;
}

const rules: FormRules = {
  login: [
    {
      required: true,
      message: "A login is required",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "A password is required",
    },
  ],
  reenteredPassword: [
    {
      required: true,
      message: "Password confirmation is required",
      trigger: ["input", "blur"],
    },
    {
      validator: validatePasswordStartWith,
      message: "Password confirmation does not match the password",
      trigger: "input",
    },
    {
      validator: validatePasswordSame,
      message: "Password confirmation does not match the password",
      trigger: ["blur", "password-input"],
    },
  ],
};

function handlePasswordInput() {
  if (model.value.reenteredPassword) {
    rPasswordFormItemRef.value
      ?.validate({ trigger: "password-input" })
      .catch(() => {});
  }
}

function submit(e: MouseEvent) {
  e.preventDefault();

  model.value.loading = true;
  formRef.value
    ?.validate()
    .then(async () => {
      if (model.value.login && model.value.password) {
        await authStore.registration({
          username: model.value.login,
          password: model.value?.password,
        });
      }
    })
    .catch(() => {})
    .finally(() => {
      model.value.loading = false;
    });
}
</script>
