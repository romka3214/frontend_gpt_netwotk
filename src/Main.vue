<script lang="ts">
import LayoutAuth from "@/components/Layout/LayoutAuth.vue";
import LayoutMain from "@/components/Layout/LayoutMain.vue";
import { defineComponent } from "vue";
import { useAuthStore } from "@/stores/auth";
export default defineComponent({
  components: { LayoutMain, LayoutAuth },
  setup() {
    const authStore = useAuthStore();
    return {
      authStore,
    };
  },
});
</script>

<template>
  <LayoutAuth v-if="!authStore.isAuth" />
  <LayoutMain v-else />
</template>
