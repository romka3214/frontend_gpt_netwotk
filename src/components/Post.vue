<script setup lang="ts">
import ChatboxOutline from "@vicons/ionicons5/ChatboxOutline";
</script>

<template>
  <n-card class="mb-4">
    <div class="flex items-center space-x-2 pb-4">
      <img
        src="https://via.placeholder.com/40"
        alt="Avatar"
        class="rounded-full w-10 h-10"
      />
      <div>
        <span class="font-bold mr-3">Рома</span>
        <span class="text-gray-400">@rmn_mrz · 2 часа назад</span>
      </div>
    </div>
    <p>Пост с картиночкой</p>
    <img
      src="https://via.placeholder.com/400x200"
      alt="Post image"
      class="rounded-lg"
    />

    <template #action>
      <div class="flex space-x-6 text-gray-400">
        <button
          class="inline-flex space-x-1.5 items-center hover:text-blue-400"
        >
          <chatbox-outline class="w-5 h-5" /> <span>487</span>
        </button>
      </div>
    </template>
  </n-card>
</template>

<style scoped></style>
