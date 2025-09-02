<template>
  <div>{{ userStore.name }}</div>
  <div>{{ data.name }}</div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user';

const userStore = useUserStore();

const data = ref({
  name: '11',
});
</script>
