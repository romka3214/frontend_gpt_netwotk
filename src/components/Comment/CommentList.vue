<script setup lang="ts">
import { onMounted, ref } from "vue";
import { CommentResource } from "@/api/resources/comment";
import { CommentResponse } from "@/api/responses/comment/comment";
import CommentSkeleton from "@/components/Comment/CommentSkeleton.vue";
import Comment from "@/components/Comment/Comment.vue";

const props = defineProps<{
  postId: number;
}>();

const commentList = ref<Array<CommentResponse>>([]);

const pageIndex = ref(1);
const recordsPerPage = 3;
const totalRecords = ref(0);

const isLoading = ref(false);

const loadMore = async () => {
  isLoading.value = true;

  await CommentResource.get({
    pageIndex: pageIndex.value,
    recordsPerPage,
    // eslint-disable-next-line no-undef
    postID: props.postId,
  })
    .then((response) => {
      commentList.value = [...commentList.value, ...response.comments];
      totalRecords.value = response.pagination.totalRecords;
      pageIndex.value++;

      console.log(commentList.value);
    })
    .catch((error) => {
      console.error("Failed to load comments:", error);
    })
    .finally(() => {
      isLoading.value = false;
    });
};
onMounted(() => {
  loadMore();
});
</script>

<template>
  <div v-if="!isLoading">
    <div v-for="comment in commentList" :key="comment.id">
      <Comment :depth="1" :comment="comment" />
    </div>
  </div>

  <div v-if="isLoading">
    <CommentSkeleton :depth="1" />
    <CommentSkeleton :depth="1" />
    <CommentSkeleton :depth="1" />
  </div>
  <button class="mt-4" @click="loadMore">Показать ещё</button>
</template>
