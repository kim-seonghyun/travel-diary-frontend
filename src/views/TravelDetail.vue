<template>
  <div
    class="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
    style="font-family: 'Plus Jakarta Sans', 'Noto Sans', sans-serif"
  >
    <div class="layout-container flex h-full grow flex-col">
      <Header></Header>

      <div class="flex justify-center bg-gray-50">
        <!-- Main Container -->
        <div
          class="w-full max-w-7xl flex flex-col lg:flex-row min-h-screen px-8"
        >
          <!-- Left Sidebar (Navbar) -->
          <Navbar class="w-80 bg-gray-200"></Navbar>

          <!-- Main Content -->
          <main class="flex-1 p-8 bg-white rounded-lg shadow-md">
            <!-- Destination Detail -->
            <div v-if="travel" class="space-y-6">
              <!-- Image Section -->
              <div class="relative w-full h-96 rounded-lg overflow-hidden">
                <img
                  :src="travel.webPageUrl"
                  alt="destination"
                  class="w-full h-full object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                />
              </div>

              <!-- Text Section -->
              <div class="space-y-4">
                <h2 class="text-3xl font-extrabold text-gray-900">
                  {{ travel.facilityName }}
                </h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p class="text-base text-gray-700">
                      <span class="font-semibold text-gray-900"
                        >도로명 주소:</span
                      >
                      {{ travel.roadAddress }}
                    </p>
                    <p class="text-base text-gray-700">
                      <span class="font-semibold text-gray-900"
                        >지번 주소:</span
                      >
                      {{ travel.streetNumberAddress }}
                    </p>
                  </div>
                  <div>
                    <p class="text-base text-gray-700">
                      <span class="font-semibold text-gray-900"
                        >여행지 소개:</span
                      >
                      {{ travel.facilityIntroduction }}
                    </p>
                    <p class="text-base text-gray-700">
                      <span class="font-semibold text-gray-900">전화번호:</span>
                      {{ travel.phoneNumber }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Map Section -->
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">
                  여행지 위치
                </h3>
                <div class="w-full h-96 rounded-lg overflow-hidden shadow-sm">
                  <KakaoMapView
                    :latitude="travel.latitude"
                    :longitude="travel.longitude"
                    :facilityName="travel.facilityName"
                    :roadAddress="travel.roadAddress"
                    :phoneNumber="travel.phoneNumber"
                  />
                </div>
              </div>

              <!-- Diary Navigation Section -->
              <DiaryListNavBar :tripId="tripId" class="mt-6" />
            </div>

            <!-- Loading -->
            <div v-else class="text-center py-12">
              <p class="text-lg text-gray-500">로딩 중...</p>
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import KakaoMapView from "@/components/KakaoMapView.vue";
import Header from "@/components/Header.vue";
import Navbar from "@/components/Navbar.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import DiaryListNavBar from "@/components/DiaryListNavBar.vue";

const route = useRoute();
const travel = ref(null);
const tripId = ref();

// Fetch destination details
onMounted(() => {
  tripId.value = route.params.id;

  axios
    .get(`http://localhost:8080/api/trip/detail`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: { tripId: tripId.value },
    })
    .then((response) => {
      travel.value = response.data;
    })
    .catch((error) => {
      console.error("데이터를 가져오는 데 실패했습니다.", error);
    });
});
</script>

<style scoped>
main {
  transition: none;
}
</style>
