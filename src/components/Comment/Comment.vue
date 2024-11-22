<script setup lang="ts">
import { CommentResponse as CommentData } from "@/api/responses/comment/comment";
import moment from "moment";
defineProps<{
  comment: CommentData;
  depth: number;
}>();
</script>

<template>
  <div v-if="depth <= 3">
    <div class="pl-4 border-l border-gray-200 mt-4">
      <div class="flex items-center space-x-2">
        <div class="font-semibold">{{ comment.authorName }}</div>
        <div class="text-gray-500 text-sm">
          {{ moment(comment.createdAt).fromNow() }}
        </div>
      </div>
      <div class="mt-2">{{ comment.text }}</div>

      <div v-if="comment.children" class="mt-4 space-y-4">
        <Comment
          v-for="child in comment.children"
          :key="child.id"
          :comment="child"
          :depth="depth + 1"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
