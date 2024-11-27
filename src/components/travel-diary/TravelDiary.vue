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

const diaries = ref([]);
const loading = ref(false);

const fetchDiaries = async () => {
  try {
    loading.value = true;
    const response = await axios.get(
        `http://localhost:8080/api/travel-diary/list`
    );
    console.log(response.data);
    diaries.value = await Promise.all(
        response.data.map(async (diary) => {
          if (diary.imageName) {
            diary.imageName = await fetchImage(diary.imageName);
          } else {
            diary.imageName = "https://via.placeholder.com/120x120";
          }
          return diary;
        })
    );
    loading.value = false;

    loading.value = false;
  } catch (error) {
    console.error("Error fetching diaries:", error);
    loading.value = false;
  }
};

const fetchImage = async (imageUrl) => {
  try {
    const response = await axios.get(`http://localhost:8080/images/uploads/${imageUrl}`, {
      responseType: "blob",
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error("이미지 로드 실패:", error);
    return "https://via.placeholder.com/120x120";
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