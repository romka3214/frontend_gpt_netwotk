<template>
  <n-form :disabled="model.loading" ref="formRef" :model="model" :rules="rules">
    <n-form-item-row path="login" label="Логин">
      <n-input placeholder="" v-model:value="model.login" type="text" />
    </n-form-item-row>
    <n-form-item-row path="password" label="Пароль">
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
      label="Подтверждение пароля"
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
    Зарегистрироваться
  </n-button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type {
  FormInst,
  FormItemInst,
  FormItemRule,
  FormRules,
  FormValidationError,
} from "naive-ui";
import { useMessage } from "naive-ui";
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
const message = useMessage();
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
      message: "Логин обязателен",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "Пароль обязателен",
    },
  ],
  reenteredPassword: [
    {
      required: true,
      message: "Подтверждение пароля обязательно",
      trigger: ["input", "blur"],
    },
    {
      validator: validatePasswordStartWith,
      message: "Подтверждение пароля не совпадает с паролем",
      trigger: "input",
    },
    {
      validator: validatePasswordSame,
      message: "Подтверждение пароля не совпадает с паролем",
      trigger: ["blur", "password-input"],
    },
  ],
};

function handlePasswordInput() {
  if (model.value.reenteredPassword) {
    rPasswordFormItemRef.value
      ?.validate({ trigger: "password-input" })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
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
          login: model.value.login,
          password: model.value?.password,
        });
      }
    })
    .catch((errors: Array<FormValidationError> | undefined) => {
      if (!errors) {
        message.success("Valid");
      } else {
        message.error("Invalid");
      }
    })
    .finally(() => {
      model.value.loading = false;
    });
}
</script>
