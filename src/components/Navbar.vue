<script setup>
import HeaderMenuButton from "./HeaderMenuButton.vue";
</script>

<template>
  <div
    class="layout-content-container flex flex-col w-80 shadow-md hover:shadow-lg transition-shadow duration-300"
  >
    <div
      class="flex h-full min-h-[700px] flex-col justify-between bg-white p-4"
    >
      <div class="flex flex-col gap-4">
        <div class="flex gap-3">
          <div
            class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style="
              background-image: url('https://cdn.usegalileo.ai/sdxl10/3cc7ef87-1f29-4b08-9910-ba74eaccbdab.png');
            "
          ></div>
          <h1 class="text-[#111418] text-base font-medium leading-normal">
            #Dotori
          </h1>
        </div>
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-3 px-3 py-2">
            <div
              class="text-[#111418]"
              data-icon="House"
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
                  d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z"
                ></path>
              </svg>
            </div>
            <p class="text-[#111418] text-sm font-medium leading-normal">
              Home
            </p>
          </div>
          <div class="flex items-center gap-3 px-3 py-2">
            <div
              class="text-[#111418]"
              data-icon="Campfire"
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
                  d="M223.62,226.42a8,8,0,0,1-10.05,5.2L128,204.39,42.43,231.62a8,8,0,1,1-4.85-15.25l64-20.37-64-20.38a8,8,0,1,1,4.85-15.24L128,187.6l85.57-27.22a8,8,0,1,1,4.85,15.24l-64,20.38,64,20.37A8,8,0,0,1,223.62,226.42ZM68,108c0-20.1,9.77-40.87,28.24-60a156,156,0,0,1,27.57-22.76,8,8,0,0,1,8.38,0C134.47,26.59,188,60.08,188,108a60,60,0,0,1-120,0Zm60,44a16,16,0,0,0,16-16c0-13.57-10-24.46-16-29.79-6,5.33-16,16.22-16,29.79A16,16,0,0,0,128,152ZM84,108a43.83,43.83,0,0,0,12.09,30.24c0-.74-.09-1.49-.09-2.24,0-28,26.44-45.91,27.56-46.66a8,8,0,0,1,8.88,0C133.56,90.09,160,108,160,136c0,.75,0,1.5-.09,2.24A43.83,43.83,0,0,0,172,108c0-32-32.26-58-44-66.34C116.27,50,84,76,84,108Z"
                ></path>
              </svg>
            </div>
            <p class="text-[#111418] text-sm font-medium leading-normal">
              포스팅
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
