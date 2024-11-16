<template>
  <div class="flex flex-col gap-3 pb-3">
    <CardImage :id="id"></CardImage>
    <div>
      <p cla ss="text-[#111418] text-base font-medium leading-normal">
        닉네임 : {{ nickName }}
      </p>
      <p class="text-[#637588] text-sm font-normal leading-normal">
        title : {{ title }}
      </p>
      <p class="text-[#637588] text-sm font-normal leading-normal">
        description : {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup>
import CardImage from "./CardImage.vue";

defineProps({
  nickName: String,
  title: String,
  description: String,
  id: Number,
});
</script>

<style lang="scss" scoped></style>
