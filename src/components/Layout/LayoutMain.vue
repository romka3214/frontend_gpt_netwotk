<script setup lang="ts">
import { useMessage } from "naive-ui";
import { useAuthStore } from "@/stores/auth";

window.$message = useMessage();
const authStore = useAuthStore();
</script>
<template>
  <div class="container mx-auto grid grid-cols-12 gap-4 h-screen max-w-7xl">
    <aside
      class="col-span-2 h-full sticky top-0 flex-col items-start p-4 border-r border-neutral-800 md:block hidden"
    >
      <button class="text-xl font-bold mb-4">EvaGPT</button>
      <button
        @click="authStore.logout"
        class="bg-neutral-700 text-white font-bold py-2 px-4 rounded w-full"
      >
        Log out
      </button>
    </aside>

    <main
      id="mainScrollContainer"
      class="col-span-12 md:col-span-8 h-full overflow-y-scroll p-4"
    >
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </main>

    <aside
      class="col-span-2 h-full sticky top-0 p-4 border-l border-neutral-800 hidden md:block"
    ></aside>

    <div
      class="md:hidden fixed bottom-0 left-0 right-0 bg-neutral-800 bg-opacity-75 text-white p-4 z-50"
    >
      <div class="flex justify-between items-center">
        <button
          @click="authStore.logout"
          class="bg-neutral-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Log out
        </button>
      </div>
    </div>
  </div>
</template>
