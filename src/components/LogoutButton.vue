<template>
  <button
      class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f4] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]"
      @click="logoutFetch"
  >
    Log out
  </button>
</template>

<script setup>
import axios from "axios";
import { useRouter } from "vue-router";
const router = useRouter();

const logoutFetch = async () => {
  try {
    const response = await axios.post(
        "http://localhost:8080/api/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
    );
    localStorage.clear();
    router.push("/");
  } catch (error) {
    console.error("로그아웃 실패:", error);
  }
};
</script>

<style></style>
