<template>
  <div class="centered-container">
    <n-card>
      <n-tabs class="card-tabs" default-value="login" size="large" animated>
        <n-tab-pane name="login" tab="Login">
          <Login />
        </n-tab-pane>
        <n-tab-pane name="signup" tab="Sign Up">
          <Registration />
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import Login from "@/components/Form/Login.vue";
import Registration from "@/components/Form/Registration.vue";
</script>

<style scoped>
.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.n-card {
  width: 100%;
  max-width: 400px;
  padding: 20px;
}
</style>
