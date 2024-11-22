<template>
  <div
    class="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
    style="font-family: 'Plus Jakarta Sans', 'Noto Sans', sans-serif"
  >
    <div class="layout-container flex h-full grow flex-col">
      <Header></Header>

      <div class="gap-1 px-6 flex flex-1 justify-center py-5">
        <Navbar></Navbar>
        <main class="flex-1 p-10">
          <!-- Welcome Section -->
          <section class="bg-[#F2F6F6] p-6 rounded-lg shadow mb-10">
            <h2 class="text-2xl font-semibold text-[#637F96]">
              {{ mypage.name || "사용자" }}님, 안녕하세요
            </h2>
            <p class="mt-2 text-gray-700">
              현재 도토리가 {{ mypage.dotori }}개를 수집했어요!
            </p>
            <button
              class="mt-4 py-2 px-6 bg-[#637F96] text-white rounded-lg hover:bg-[#4F6878]"
            >
              정보 변경하기
            </button>
          </section>

          <!-- Progress Bar Section -->
          <section class="bg-white p-6 rounded-lg shadow mb-10">
            <h3 class="text-xl font-semibold text-gray-700 mb-4">여행 성향</h3>
            <div
              v-for="(style, index) in travelStyles"
              :key="index"
              class="mb-4"
            >
              <label class="text-gray-600">{{ style.name }}</label>
              <div
                class="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden"
              >
                <div
                  :style="{ width: style.progress + '%' }"
                  class="h-full bg-[#E74C3C] transition-width duration-300"
                ></div>
              </div>
            </div>
          </section>

          <!-- Content Section -->
          <section class="space-y-4">
            <div class="bg-white p-4 rounded-lg shadow">
              <h4 class="text-lg font-semibold text-gray-800">
                결제 내역 보러가기
              </h4>
              <p class="text-gray-500">도토리 할인중!</p>
              <button
                class="mt-2 text-sm text-[#637F96] font-semibold hover:underline"
                @click="toggleModal"
              >
                보러가기
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg w-96 p-6">
        <!-- Modal Header -->
        <div class="flex justify-between items-center border-b pb-4">
          <h2 class="text-lg font-semibold text-gray-800">결제 내역</h2>
          <button
            @click="toggleModal"
            class="text-gray-500 hover:text-black focus:outline-none"
          >
            ✕
          </button>
        </div>

        <!-- Modal Content -->
        <div class="py-4 space-y-4">
          <ul v-if="bills.length > 0" class="space-y-2">
            <li
              v-for="(bill, index) in bills"
              :key="index"
              class="p-4 bg-gray-100 rounded-lg shadow"
            >
              <div class="flex justify-between items-center">
                <p class="text-gray-800 font-semibold">
                  상품명: {{ bill.orderName }}
                </p>
                <p
                  :class="[
                    'text-sm font-semibold px-2 py-1 rounded',
                    bill.status === 'DONE' ? 'bg-blue-100 text-blue-600' : '',
                    bill.status === 'CANCEL' ? 'bg-red-100 text-red-600' : '',
                  ]"
                >
                  {{
                    bill.status === "DONE"
                      ? "결제 완료"
                      : bill.status === "CANCEL"
                      ? "결제 취소"
                      : "결제 진행 중"
                  }}
                </p>
              </div>
              <p class="text-gray-600">금액: {{ bill.amount }}원</p>
              <p class="text-gray-500">결제 날짜: {{ bill.rechargeAt }}</p>
              <p class="text-gray-500">결제 방식: {{ bill.provider }}</p>
              <button
                @click="
                  refundBill(bill.id, bill.paymentId, '기간 내 결제 취소')
                "
                class="mt-2 px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                환불 요청
              </button>
            </li>
          </ul>
          <p v-else class="text-gray-500">결제 내역이 없습니다.</p>
        </div>

        <!-- Modal Footer -->
        <div class="flex justify-end pt-4 border-t">
          <button
            @click="toggleModal"
            class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import Header from "@/components/Header.vue";
import Navbar from "@/components/Navbar.vue";

// 상태 변수 정의
const mypage = ref({
  sea: 0,
  mountain: 0,
  city: 0,
  festival: 0,
  valley: 0,
  name: "",
  email: "",
  dotori: 0,
});

const isModalOpen = ref(false);
const bills = ref([]);

// 함수 정의
const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

const refundBill = async (id, paymentId, cancelReason) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/toss/cancel",
      { id, paymentId, cancelReason },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    const updatedBill = bills.value.find((bill) => bill.id === id);
    if (updatedBill) {
      updatedBill.status = "CANCEL";
    }
    alert("환불이 처리되었습니다.");
  } catch (error) {
    console.error("환불 실패:", error);
    alert("환불 처리 중 오류가 발생했습니다.");
  }
};

const fetchMypage = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/user/mypage", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    mypage.value = response.data;
  } catch (error) {
    console.error("데이터 로드 실패:", error);
  }
};

const fetchBills = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/toss/bills", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    bills.value = response.data;
  } catch (error) {
    console.error("데이터 로드 실패:", error);
  }
};

// 계산된 속성
const travelStyles = computed(() => [
  { name: "바다", progress: mypage.value.sea },
  { name: "산", progress: mypage.value.mountain },
  { name: "도시", progress: mypage.value.city },
  { name: "축제", progress: mypage.value.festival },
  { name: "계곡", progress: mypage.value.valley },
]);

// 컴포넌트가 마운트될 때 데이터 로드
onMounted(() => {
  fetchMypage();
  fetchBills();
});
</script>

<style scoped>
/* 추가 스타일 정의 가능 */
</style>
