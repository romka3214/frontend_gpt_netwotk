<script lang="ts">
import { darkTheme } from "naive-ui";
import { defineComponent } from "vue";
import Main from "@/Main.vue";
export default defineComponent({
  components: { Main },
  setup() {
    return {
      darkTheme,
    };
  },
});
</script>
<template>
  <n-config-provider :theme="darkTheme">
    <n-global-style />
    <n-message-provider>
      <Main />
    </n-message-provider>
  </n-config-provider>
</template>
