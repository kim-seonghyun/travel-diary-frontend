<template>
  <div class="container mx-auto py-7">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
      <TravelDiaryCard
          v-for="diary in diaries"
          :key="diary.id"
          :diary="diary"
      />
    </div>
    <router-link
        to="/travel-diary/create"
        class="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 z-50"
    >
      <svg
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
      >
        <!-- 플러스 아이콘 SVG 코드 -->
        <path
            fill-rule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clip-rule="evenodd"
        />
      </svg>
    </router-link>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import axios from 'axios';
import TravelDiaryCard from "@/components/travel-diary/TravelDiaryCard.vue";

const diaries = ref([  // 실제 데이터 목록
  {
    "id": 1,
    "title": "무진장 단독 상품만 골랐다",
    "description": "패딩 vs 패딩 코트",
    "userId": 1,
    "username": "user1",
    "createdAt": "2024-11-24",
    "imageName": "https://source.unsplash.com/random/800x600"
  },
  {
    "id": 2,
    "title": "무진장 업고 뛴 패션 에디터",
    "description": "볼프 독립리스트 소개",
    "username": "user2",
    "createdAt": "2024-11-24",
    "imageName": "https://source.unsplash.com/random/800x600"
  },{
    "id": 3,
    "title": "무진장 업고 뛴 패션 에디터",
    "description": "볼프 독립리스트 소개",
    "username": "user2",
    "createdAt": "2024-11-24",
    "imageName": "https://source.unsplash.com/random/800x600"
  },{
    "id": 4,
    "title": "무진장 업고 뛴 패션 에디터",
    "description": "볼프 독립리스트 소개",
    "username": "user2",
    "createdAt": "2024-11-24",
    "imageName": "https://source.unsplash.com/random/800x600"
  },{
    "id": 5,
    "title": "무진장 업고 뛴 패션 에디터",
    "description": "볼프 독립리스트 소개",
    "username": "user2",
    "createdAt": "2024-11-24",
    "imageName": "https://source.unsplash.com/random/800x600"
  }

]);
const loading = ref(false);

const fetchDiaries = async () => {
  try {
    loading.value = true;
    const response = await axios.get(
        `http:localhost:8080/api/travel-diary/list`
    );
    diaries.value.push(...response.data);
    loading.value = false;
  } catch (error) {
    console.error("Error fetching diaries:", error);
    loading.value = false;
  }
};


onMounted(() => {
  fetchDiaries();
});

</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>