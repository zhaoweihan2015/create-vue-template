<template>
  <div>welcome1 {{ id }}</div>
</template>

<script setup lang="ts">
interface Params {
  id: string;
}

const { id } = useRoute().params as Params;
</script>
