<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-md p-4">
      <h1 class="text-2xl font-semibold mb-8 text-blue-600">#dotori</h1>
      <nav>
        <ul>
          <li v-for="item in menuItems" :key="item.name" class="mb-4">
            <a
              :href="item.href"
              class="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition duration-200"
            >
              <span :class="item.icon" class="text-xl"></span>
              <span class="text-base font-medium">{{ item.name }}</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl font-semibold text-gray-800">목적지 상세 정보</h2>
      </div>

      <!-- Destination Detail -->
      <div class="container mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div v-if="travel">
          <!-- Image -->
          <img
            :src="travel.webPageUrl"
            alt="destination"
            class="w-full h-96 object-cover rounded-lg mb-6"
          />

          <!-- Facility Name -->
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            {{ travel.facilityName }}
          </h2>

          <!-- Road Address -->
          <p class="text-lg text-gray-700 mb-2">
            <span class="font-medium text-gray-800">도로명 주소:</span>
            {{ travel.roadAddress }}
          </p>

          <!-- Street_number Address -->
          <p class="text-lg text-gray-700 mb-2">
            <span class="font-medium text-gray-800">지번 주소:</span>
            {{ travel.streetNumberAddress }}
          </p>

          <!-- Location -->
          <p class="text-lg text-gray-700 mb-2">
            <span class="font-medium text-gray-800">여행지 소개:</span>
            {{ travel.facilityIntroduction }}
          </p>

          <!-- Phone Number -->
          <p class="text-lg text-gray-700 mb-6">
            <span class="font-medium text-gray-800">전화번호:</span>
            {{ travel.phoneNumber }}
          </p>

          <!-- Map -->
          <h3 class="text-xl font-semibold text-gray-800 mb-4">여행지 위치</h3>
          <div class="w-full h-full rounded-lg overflow-hidden shadow-sm">
            <KakaoMapView
              :latitude="travel.latitude"
              :longitude="travel.longitude"
              :facilityName="travel.facilityName"
              :roadAddress="travel.roadAddress"
              :phoneNumber="travel.phoneNumber"
            />
          </div>

          <DiaryListNavBar :tripId="tripId" />
        </div>

        <!-- Loading -->
        <div v-else class="text-center py-12">
          <p class="text-lg text-gray-500">로딩 중...</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import KakaoMapView from "@/components/KakaoMapView.vue";
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

// Sidebar menu items
const menuItems = ref([
  { name: "Home", href: "#", icon: "icon-home" },
  { name: "Popular", href: "#", icon: "icon-star" },
  { name: "Canned Goods", href: "#", icon: "icon-archive" },
  { name: "Fresh Produce", href: "#", icon: "icon-leaf" },
  { name: "Checkout", href: "#", icon: "icon-cart" },
]);
</script>

<style scoped>
.icon-home::before {
  content: "🏠";
}
.icon-star::before {
  content: "⭐";
}
.icon-archive::before {
  content: "📦";
}
.icon-leaf::before {
  content: "🍃";
}
.icon-cart::before {
  content: "🛒";
}
</style>
