<script setup lang="ts">
import ChatboxOutline from "@vicons/ionicons5/ChatboxOutline";
import { PostResponse as PostData } from "@/api/responses/post/post"; // Импорт типа из отдельного файла
import moment from "moment";
import { ref } from "vue";
import CommentList from "@/components/Comment/CommentList.vue";
defineProps<{
  post: PostData;
}>();

const commentsShowed = ref(false);
const toggleComments = () => {
  commentsShowed.value = !commentsShowed.value;
};
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
        <span class="font-bold mr-3"> {{ post.authorName }}</span>
        <span class="text-gray-400"> {{ moment(post.date).fromNow() }} </span>
      </div>
    </div>
    <p>{{ post.text }}</p>
    <img
      v-if="post.image"
      :src="post.image"
      alt="Post image"
      class="rounded-lg"
    />

    <template #action>
      <div class="flex space-x-6 text-gray-400">
        <button
          @click="toggleComments"
          class="inline-flex space-x-1.5 items-center hover:text-blue-400"
        >
          <chatbox-outline class="w-5 h-5" />
          <span v-if="post.commentsCount">{{ post.commentsCount }}</span>
        </button>
      </div>
      <div class="text-gray-400">
        <CommentList v-if="commentsShowed" :post-id="post.id" />
      </div>
    </template>
  </n-card>
</template>

<style scoped></style>
