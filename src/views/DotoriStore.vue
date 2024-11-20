<template>
  <div
    class="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
    style="font-family: 'Plus Jakarta Sans', 'Noto Sans', sans-serif"
  >
    <div class="layout-container flex h-full grow flex-col">
      <Header></Header>

      <div class="flex min-h-screen bg-gray-50">
        <!-- Left Sidebar (Navbar) -->
        <Navbar class="w-1000 bg-gray-200"></Navbar>

        <!-- Main Content -->
        <main class="flex-grow container mx-auto p-6">
          <section class="text-center mb-12">
            <h2 class="text-3xl font-semibold mb-4">도토리 충전하기!!</h2>
            <p class="text-gray-600">
              여행 고수님들의 다이어리를 보고 여행을 떠나요!
              <br />
              원하시는 수량의 도토리를 선택해주세요!
            </p>
          </section>

          <!-- Tabs -->
          <div class="flex justify-center space-x-4 mb-8">
            <button
              @click="setTab('faq')"
              :class="
                activeTab === 'faq'
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-200 text-gray-600'
              "
              class="px-6 py-2 rounded-full"
            >
              10개
            </button>
            <button
              @click="setTab('inquiry')"
              :class="
                activeTab === 'inquiry'
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-200 text-gray-600'
              "
              class="px-6 py-2 rounded-full"
            >
              50개
            </button>
            <button
              @click="setTab('notice')"
              :class="
                activeTab === 'notice'
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-200 text-gray-600'
              "
              class="px-6 py-2 rounded-full"
            >
              100개
            </button>
          </div>

          <!-- Tab Content -->
          <div class="text-center">
            <p v-if="activeTab === 'faq'" class="text-gray-600">
              도토리 10개를 구매합니다!
            </p>
            <p v-if="activeTab === 'inquiry'" class="text-gray-600">
              도토리 50개를 구매합니다!
            </p>
            <p v-if="activeTab === 'notice'" class="text-gray-600">
              도토리 100개를 구매합니다!
            </p>
          </div>
        </main>
      </div>

      <!-- Footer -->
      <footer class="bg-gray-800 text-white text-center py-4">
        <p class="text-sm">&copy; 2024 SSAFY. All rights reserved.</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Header from "@/components/Header.vue";
import Navbar from "@/components/Navbar.vue";

// 현재 활성화된 탭을 관리하는 상태
const activeTab = ref("faq");

// 탭 변경 함수
const setTab = (tabName) => {
  activeTab.value = tabName;
};
</script>

<style scoped>
/* Navbar를 고정 크기로 설정 */

/* 추가적인 스타일이 필요한 경우 작성하세요 */
</style>
