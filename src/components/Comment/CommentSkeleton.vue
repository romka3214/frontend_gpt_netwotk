<script setup lang="ts">
defineProps<{
  depth: number;
}>();
</script>

<template>
  <div class="pl-4 border-l border-neutral-500 pt-4">
    <div class="flex items-center space-x-2">
      <n-skeleton text round width="20px" />
      <n-skeleton text round width="20%" />
    </div>
    <div class="mt-2 pb-2"><n-skeleton text round width="100%" /></div>

    <div v-if="depth < 2" class="mt-4 space-y-4">
      <CommentSkeleton :depth="depth + 1" />
    </div>
  </div>
</template>

<style scoped></style>
