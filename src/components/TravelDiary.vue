<script setup>
import TravelDiaryItem from "./\bTravelDiaryItem.vue";
</script>

<script>
import axios from "axios";

export default {
  data() {
    return {
      items: [], // API에서 가져온 데이터를 저장
      loading: true, // 로딩 상태
      error: null, // 에러 메시지
    };
  },
  mounted() {
    // 컴포넌트가 마운트된 후 데이터를 가져옴
    axios
      .get("http://localhost:8080/api/travel-diary/list")
      .then((response) => {
        console.log(response.data);
        this.diaries = response.data;
      })
      .catch((error) => {
        this.error = "Failed to load items: " + error.message;
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
    <TravelDiaryItem
      v-for="diary in this.diaries"
      :key="diary.id"
      :nick-name="diary.userId"
      :title="diary.title"
      :description="diary.description"
    ></TravelDiaryItem>
  </div>
</template>

<style scoped></style>
