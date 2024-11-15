<template>
  <div class="flex flex-col gap-3 pb-3">
    <div
      class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
      style="
        background-image: url('https://cdn.usegalileo.ai/sdxl10/0271e53b-24a5-4d9d-9895-b40dc5d591ef.png');
      "
    ></div>
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
defineProps({
  nickName: String,
  title: String,
  description: String,
});
</script>

<style lang="scss" scoped></style>
