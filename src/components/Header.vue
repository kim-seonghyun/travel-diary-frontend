<script setup>
import HeaderMenuButton from "./HeaderMenuButton.vue";
import LogoutButton from "./LogoutButton.vue";
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
      <label class="flex flex-col min-w-40 !h-10 max-w-64">
        <div class="flex w-full flex-1 items-stretch rounded-xl h-full">
          <div
            class="text-[#637588] flex border-none bg-[#f0f2f4] items-center justify-center pl-4 rounded-l-xl border-r-0"
            data-icon="MagnifyingGlass"
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
                d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
              ></path>
            </svg>
          </div>
          <input
            placeholder="Search"
            class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f4] focus:border-none h-full placeholder:text-[#637588] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
            value=""
          />
        </div>
      </label>
      <div class="flex gap-2">
        <HeaderMenuButton
          :content="'Log in'"
          :href="'/login'"
        ></HeaderMenuButton>

        <LogoutButton></LogoutButton>

        <HeaderMenuButton
          :content="'여행지 검색'"
          :href="'/travel/search'"
        ></HeaderMenuButton>

        <HeaderMenuButton
          :content="'마이페이지'"
          :href="'/user/mypage'"
        ></HeaderMenuButton>

        <HeaderMenuButton
          :content="'도토리 상점'"
          :href="'/store/dotori'"
        ></HeaderMenuButton>

        <HeaderMenuButton :content="'QnA'" :href="'/question-list'">
        </HeaderMenuButton>
        <button
          class="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#f0f2f4] text-[#111418] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
        >
          <div
            class="text-[#111418]"
            data-icon="ShoppingCart"
            data-size="20px"
            data-weight="regular"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path
                d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z"
              ></path>
            </svg>
          </div>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
