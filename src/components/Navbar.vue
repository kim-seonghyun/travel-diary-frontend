<script setup>

</script>

<template>
    <div class="layout-content-container flex flex-col w-80">
    <div class="flex h-full min-h-[700px] flex-col justify-between bg-white p-4">
      <div class="flex flex-col gap-4">
        <div class="flex gap-3">
          <div
            class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style='background-image: url("https://cdn.usegalileo.ai/sdxl10/3cc7ef87-1f29-4b08-9910-ba74eaccbdab.png");'
          ></div>
          <h1 class="text-[#111418] text-base font-medium leading-normal">#Dotori</h1>
        </div>
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-3 px-3 py-2">
            <div class="text-[#111418]" data-icon="House" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z"
                ></path>
              </svg>
            </div>
            <p class="text-[#111418] text-sm font-medium leading-normal">Home</p>
          </div>
          <div class="flex items-center gap-3 px-3 py-2">
            <div class="text-[#111418]" data-icon="Campfire" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M223.62,226.42a8,8,0,0,1-10.05,5.2L128,204.39,42.43,231.62a8,8,0,1,1-4.85-15.25l64-20.37-64-20.38a8,8,0,1,1,4.85-15.24L128,187.6l85.57-27.22a8,8,0,1,1,4.85,15.24l-64,20.38,64,20.37A8,8,0,0,1,223.62,226.42ZM68,108c0-20.1,9.77-40.87,28.24-60a156,156,0,0,1,27.57-22.76,8,8,0,0,1,8.38,0C134.47,26.59,188,60.08,188,108a60,60,0,0,1-120,0Zm60,44a16,16,0,0,0,16-16c0-13.57-10-24.46-16-29.79-6,5.33-16,16.22-16,29.79A16,16,0,0,0,128,152ZM84,108a43.83,43.83,0,0,0,12.09,30.24c0-.74-.09-1.49-.09-2.24,0-28,26.44-45.91,27.56-46.66a8,8,0,0,1,8.88,0C133.56,90.09,160,108,160,136c0,.75,0,1.5-.09,2.24A43.83,43.83,0,0,0,172,108c0-32-32.26-58-44-66.34C116.27,50,84,76,84,108Z"
                ></path>
              </svg>
            </div>
            <p class="text-[#111418] text-sm font-medium leading-normal">Camping Gear</p>
          </div>
          <div class="flex items-center gap-3 px-3 py-2 rounded-xl bg-[#f0f2f4]">
            <div class="text-[#111418]" data-icon="BowlFood" data-size="24px" data-weight="fill">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M224,104h-8.37a88,88,0,0,0-175.26,0H32a8,8,0,0,0-8,8,104.35,104.35,0,0,0,56,92.28V208a16,16,0,0,0,16,16h64a16,16,0,0,0,16-16v-3.72A104.35,104.35,0,0,0,232,112,8,8,0,0,0,224,104ZM173.48,56.23q2.75,2.25,5.27,4.75a87.92,87.92,0,0,0-49.15,43H100.1A72.26,72.26,0,0,1,168,56C169.83,56,171.66,56.09,173.48,56.23ZM148.12,104a71.84,71.84,0,0,1,41.27-29.57A71.45,71.45,0,0,1,199.54,104ZM128,40a71.87,71.87,0,0,1,19,2.57A88.36,88.36,0,0,0,83.33,104H56.46A72.08,72.08,0,0,1,128,40Z"
                ></path>
              </svg>
            </div>
            <p class="text-[#111418] text-sm font-medium leading-normal">Canned Goods</p>
          </div>
          <div class="flex items-center gap-3 px-3 py-2">
            <div class="text-[#111418]" data-icon="OrangeSlice" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M248,80H8a8,8,0,0,0-8,8,128,128,0,0,0,256,0A8,8,0,0,0,248,80ZM77.4,149.91l42.6-42.6V167.6A79.59,79.59,0,0,1,77.4,149.91ZM66.09,138.6A79.59,79.59,0,0,1,48.4,96h60.29ZM136,107.31l42.6,42.6A79.59,79.59,0,0,1,136,167.6Zm53.91,31.29L147.31,96H207.6A79.59,79.59,0,0,1,189.91,138.6ZM128,200A112.15,112.15,0,0,1,16.28,96H32.34a96,96,0,0,0,191.32,0h16.06A112.15,112.15,0,0,1,128,200Z"
                ></path>
              </svg>
            </div>
            <p class="text-[#111418] text-sm font-medium leading-normal">Fresh Produce</p>
          </div>
          <div class="flex items-center gap-3 px-3 py-2">
            <div class="text-[#111418]" data-icon="ShoppingCart" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z"
                ></path>
              </svg>
            </div>
            <p class="text-[#111418] text-sm font-medium leading-normal">Checkout</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>