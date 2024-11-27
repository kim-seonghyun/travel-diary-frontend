<script setup>
import { ref, computed } from "vue";
import HeaderMenuButton from "./HeaderMenuButton.vue";
import LogoutButton from "./LogoutButton.vue";

// 로그인 상태 확인
const isLoggedIn = computed(() => {
  return !!localStorage.getItem("accessToken");
});
</script>

<template>
  <header
    class="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f4] px-10 py-3"
  >
    <div class="flex items-center gap-4 text-[#111418]">
      <div class="size-4">
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
        </svg>
      </div>
      <h2
        class="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]"
      >
        <a href="/">#Dotori</a>
      </h2>
    </div>
    <div class="flex flex-1 justify-end gap-8">
      <div class="flex gap-2">
        <HeaderMenuButton
          v-if="!isLoggedIn"
          :content="'Log in'"
          :href="'/login'"
        ></HeaderMenuButton>

        <LogoutButton v-if="isLoggedIn"></LogoutButton>

        <HeaderMenuButton
          v-if="isLoggedIn"
          :content="'마이페이지'"
          :href="'/user/mypage'"
        ></HeaderMenuButton>

        <HeaderMenuButton
          :content="'여행지 검색'"
          :href="'/travel/search'"
        ></HeaderMenuButton>

        <HeaderMenuButton
          :content="'도토리 상점'"
          :href="'/store/dotori'"
        ></HeaderMenuButton>

        <HeaderMenuButton
          :content="'QnA'"
          :href="'/question-list'"
        ></HeaderMenuButton>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
