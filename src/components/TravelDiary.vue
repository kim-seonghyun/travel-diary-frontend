<script setup>
import { ref, onMounted } from "vue";
import TravelDiaryItem from "./\bTravelDiaryItem.vue";
import axios from "axios";
const diaries = ref([]);
const loading = ref(true); // 로딩 상태
const error = ref(null); // 에러 메시지

onMounted(async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/travel-diary/list"
    );
    diaries.value = response.data;
  } catch (err) {
    error.value = "Failed to load items";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
    <TravelDiaryItem
      v-for="diary in diaries"
      :key="diary.id"
      :nick-name="diary.username"
      :title="diary.title"
      :description="diary.description"
      :id="diary.id"
    ></TravelDiaryItem>
  </div>
</template>

<style scoped></style>
