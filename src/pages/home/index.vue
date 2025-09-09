<template>
  <div>home</div>
  <test />
  <test2 />
  <div>{{ data }}</div>
</template>

<script setup lang="ts">
import { getSimpleAPI } from '~/api/simpleAPI';

const api = getSimpleAPI();

const { runAsync, data } = useRequest(() => api.getApiUsers(), {
  manual: true,
});

onMounted(async () => {
  const res = await runAsync();

  console.log(res, 'res');

  await nextTick();

  console.log(data.value, '??getSimpleAPI()');
});
</script>
