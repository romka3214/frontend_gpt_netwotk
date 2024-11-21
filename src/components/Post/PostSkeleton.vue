<script setup lang="ts"></script>

<template>
  <n-card class="mb-4">
    <div class="flex items-center space-x-2 pb-4">
      <n-skeleton circle size="medium" />
      <n-skeleton text round width="20%" />
    </div>
    <n-skeleton text round width="100%" />
    <n-skeleton text round width="80%" />
    <n-skeleton text round width="60%" />

    <template #action>
      <n-skeleton text round width="20%" />
    </template>
  </n-card>
</template>

<style scoped></style>
