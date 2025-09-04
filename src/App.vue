<script setup lang="ts"></script>

<template>
  <el-config-provider namespace="ep">
    <base-layout v-if="$route.meta.layout !== false">
      <router-view />
    </base-layout>
    <router-view v-else />
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
