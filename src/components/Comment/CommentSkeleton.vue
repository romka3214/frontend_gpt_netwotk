<script setup lang="ts"></script>

<template>
  <div class="pl-4 border-l border-gray-200">
    <div class="flex items-center space-x-2">
      <div class="font-semibold"><n-skeleton text round width="20%" /></div>
      <div class="text-gray-500 text-sm">
        <n-skeleton text round width="20%" />
      </div>
    </div>
    <div class="mt-2"><n-skeleton text round width="100%" /></div>

    <div class="mt-4 space-y-4">
      <CommentSkeleton />
    </div>
  </div>
</template>

<style scoped></style>
