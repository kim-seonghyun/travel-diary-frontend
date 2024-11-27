<script setup>
import { ref, computed } from "vue";
// 로그인 상태 확인
const isLoggedIn = computed(() => {
  return !!localStorage.getItem("accessToken");
});
</script>

<template>
  <div
    class="layout-content-container flex flex-col w-80 shadow-md hover:shadow-lg transition-shadow duration-300"
  >
    <div
      class="flex h-full min-h-[700px] flex-col justify-between bg-white p-4"
    >
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-3 px-3 py-2 rounded-xl">
            <div
              class="text-[#111418]"
              data-icon="BowlFood"
              data-size="24px"
              data-weight="fill"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path
                  d="M224,104h-8.37a88,88,0,0,0-175.26,0H32a8,8,0,0,0-8,8,104.35,104.35,0,0,0,56,92.28V208a16,16,0,0,0,16,16h64a16,16,0,0,0,16-16v-3.72A104.35,104.35,0,0,0,232,112,8,8,0,0,0,224,104ZM173.48,56.23q2.75,2.25,5.27,4.75a87.92,87.92,0,0,0-49.15,43H100.1A72.26,72.26,0,0,1,168,56C169.83,56,171.66,56.09,173.48,56.23ZM148.12,104a71.84,71.84,0,0,1,41.27-29.57A71.45,71.45,0,0,1,199.54,104ZM128,40a71.87,71.87,0,0,1,19,2.57A88.36,88.36,0,0,0,83.33,104H56.46A72.08,72.08,0,0,1,128,40Z"
                ></path>
              </svg>
            </div>
            <p class="text-[#111418] text-sm font-medium leading-normal">
              <router-link to="/travel-diary">여행기 목록</router-link>
            </p>
          </div>
          <div class="flex items-center gap-3 px-3 py-2">
            <div
              class="text-[#111418]"
              data-icon="OrangeSlice"
              data-size="24px"
              data-weight="regular"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path
                  d="M248,80H8a8,8,0,0,0-8,8,128,128,0,0,0,256,0A8,8,0,0,0,248,80ZM77.4,149.91l42.6-42.6V167.6A79.59,79.59,0,0,1,77.4,149.91ZM66.09,138.6A79.59,79.59,0,0,1,48.4,96h60.29ZM136,107.31l42.6,42.6A79.59,79.59,0,0,1,136,167.6Zm53.91,31.29L147.31,96H207.6A79.59,79.59,0,0,1,189.91,138.6ZM128,200A112.15,112.15,0,0,1,16.28,96H32.34a96,96,0,0,0,191.32,0h16.06A112.15,112.15,0,0,1,128,200Z"
                ></path>
              </svg>
            </div>
            <p class="text-[#111418] text-sm font-medium leading-normal">
              <router-link to="/post-list">타임라인</router-link>
            </p>
          </div>
          <div v-if="isLoggedIn" class="flex items-center gap-3 px-3 py-2">
            <div
              class="text-[#111418]"
              data-icon="ShoppingCart"
              data-size="24px"
              data-weight="regular"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path
                  d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z"
                ></path>
              </svg>
            </div>
            <p class="text-[#111418] text-sm font-medium leading-normal">
              <router-link to="/post/create">포스트 작성</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
