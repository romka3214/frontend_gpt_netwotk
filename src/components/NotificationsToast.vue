<template>
  <div class="notifications">
    <cv-toast-notification
      v-for="notification in notifications"
      :kind="notification.kind"
      :title="notification.kind"
      :sub-title="notification.subtitle"
      :key="notification.id"
      @close="notificationsStore.deleteNotification(notification.id)"
    />

    <n-message-provider>
      <content />
    </n-message-provider>
  </div>
</template>
<script setup lang="ts">
import { useNotificationsStore } from "@/stores/notifications";
import { computed } from "vue";

const notificationsStore = useNotificationsStore();
const notifications = computed(() => notificationsStore.notifications);
</script>
<style>
.notifications {
  position: fixed;
  top: 3rem;
  right: 1rem;
  width: 18rem;
  z-index: 10000;
}
</style>
