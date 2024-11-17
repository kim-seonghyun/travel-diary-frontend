<template>
  <button
    class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f4] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]"
  >
    <a class="truncate" :href="href">{{ content }}</a>
  </button>
</template>

<script setup>
defineProps({
  content: String,
  href: String,
});
</script>

<style></style>
