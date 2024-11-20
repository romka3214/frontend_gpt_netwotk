<script setup lang="ts">
import { useMessage } from "naive-ui";
import { useAuthStore } from "@/stores/auth";
window.$message = useMessage();
const authStore = useAuthStore();
</script>
<template>
  <div class="container mx-auto grid grid-cols-12 gap-4 h-screen">
    <aside
      class="col-span-2 h-full sticky top-0 flex flex-col items-start p-4 border-r border-neutral-800"
    >
      <button class="text-xl font-bold">Твиттер гениев</button>
      <nav class="space-y-4 mt-4 mb-4">
        <a href="#" class="block py-2 px-4 rounded hover:bg-neutral-700"
          >Какая-то навигация</a
        >
      </nav>
      <button
        @click="authStore.logout"
        class="bg-neutral-700 text-white font-bold py-2 px-4 rounded w-full"
      >
        Выйти
      </button>
    </aside>

    <!-- Центральная колонка (Контент) -->
    <main
      id="mainScrollContainer"
      class="col-span-7 h-full overflow-y-scroll p-4"
    >
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </main>

    <!-- Правая колонка (Рекомендации и тренды) -->
    <aside
      class="col-span-3 h-full sticky top-0 p-4 border-l border-neutral-800"
    ></aside>
  </div>
</template>

<style>
.custom-container {
  max-width: 1200px;
}
</style>
