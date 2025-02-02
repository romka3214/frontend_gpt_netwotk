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
      if (response.comments !== null) {
        commentList.value = [...commentList.value, ...response.comments];
        totalRecords.value = response.pagination.totalRecords;
        pageIndex.value++;
      }
    })
    .catch((error) => {
      console.log("Failed to load comments:", error);
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
    <template v-if="commentList.length !== 0">
      <div v-for="comment in commentList" :key="comment.id">
        <Comment :depth="1" :comment="comment" />
      </div>
    </template>
    <template v-else> Nothing here... </template>
  </div>

  <div v-if="isLoading">
    <CommentSkeleton :depth="1" />
  </div>
  <button
    v-if="commentList.length < totalRecords"
    class="mt-4"
    @click="loadMore"
  >
    Show more
  </button>
</template>
