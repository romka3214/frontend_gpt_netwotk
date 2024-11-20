<script setup lang="ts">
import Post from "@/components/Post/Post.vue";
import { ref, onMounted, onUnmounted } from "vue";
import { PostResource } from "@/api/resources/post";
import { PostResponse } from "@/api/responses/post/post";

const postList = ref<Array<PostResponse>>([]);

const pageIndex = ref(1);
const recordsPerPage = 10;
const totalRecords = ref(0);

const isLoading = ref(false);

const scrollContainer = ref<HTMLElement | null>(null);

const loadPosts = async () => {
  if (isLoading.value) return;
  isLoading.value = true;

  await PostResource.get({
    pagination: {
      pageIndex: pageIndex.value,
      recordsPerPage,
    },
  })
    .then((response) => {
      postList.value = [...postList.value, ...response.posts];
      totalRecords.value = response.pagination.totalRecords;

      pageIndex.value++;
    })
    .catch((error) => {
      console.error("Failed to load posts:", error);
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const handleScroll = () => {
  if (!scrollContainer.value) {
    return;
  }

  const container = scrollContainer.value;

  const scrollHeight = container.scrollHeight;
  const scrollTop = container.scrollTop;
  const clientHeight = container.clientHeight;

  if (scrollHeight - scrollTop <= clientHeight + 100) {
    if (postList.value.length < totalRecords.value) {
      loadPosts();
    }
  }
};

let timeout: number;
const debounceScroll = () => {
  // хз на сколько норм решение, но тащить какую-то либу ради этого как-то мэээээ
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    handleScroll();
  }, 200);
};

onMounted(() => {
  scrollContainer.value = document.getElementById("mainScrollContainer");
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener("scroll", debounceScroll);
  }
  loadPosts();
});

onUnmounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.removeEventListener("scroll", debounceScroll);
  }
});
</script>

<template>
  <div>
    <div v-for="post in postList" :key="post.id">
      <Post :post="post" />
    </div>

    <div v-if="isLoading" class="loading">Загрузка...</div>
  </div>
</template>

<style scoped>
.loading {
  text-align: center;
  padding: 20px;
  font-size: 16px;
  color: #666;
}
</style>
