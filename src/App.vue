<script setup lang="ts"></script>

<template>
  <el-config-provider namespace="ep">
    <base-layout>
      <RouterView />
    </base-layout>
  </el-config-provider>
</template>

<style>
#app {
  text-align: center;
  color: var(--ep-text-color-primary);
}

.main-container {
  height: calc(100vh - var(--ep-menu-item-height) - 4px);
}
</style>
