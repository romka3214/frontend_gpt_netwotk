<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { PostResource } from "@/api/resources/post";

const emit = defineEmits<{
  (event: "new-post"): void;
}>();

const form = ref({
  text: "",
});
const isLoading = ref(false);

const submit = async () => {
  isLoading.value = true;
  PostResource.create({
    text: form.value.text,
  })
    .then(async () => {
      emit("new-post");
    })
    .finally(() => {
      isLoading.value = false;
      form.value.text = "";
    });
};
</script>

<template>
  <n-card class="mb-4">
    <n-input
      v-model:value="form.text"
      type="textarea"
      placeholder="What`s on your mind?"
    />
    <n-space justify="end">
      <n-button
        @click="submit"
        :disabled="isLoading || form.text.length === 0"
        strong
        secondary
        class="mt-2 ml-auto"
      >
        Post
      </n-button>
    </n-space>
  </n-card>
</template>

<style scoped></style>
