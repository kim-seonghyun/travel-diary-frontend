<template>
  <div class="wrapper w-100">
    <!-- Loading Section -->
    <div
      v-if="isLoading"
      class="flex-column align-center confirm-loading w-100 max-w-540"
    >
      <div class="flex-column align-center">
        <img
          src="https://static.toss.im/lotties/loading-spot-apng.png"
          width="120"
          height="120"
          alt="Loading"
        />
        <h2 class="title text-center">결제 요청까지 성공했어요.</h2>
        <h4 class="text-center description">결제 승인하고 완료해보세요.</h4>
      </div>
      <div class="w-100">
        <button @click="confirmPayment" class="btn primary w-100">
          결제 승인하기
        </button>
      </div>
    </div>
    <!-- Success Section -->
    <div
      v-else
      class="flex-column align-center confirm-success w-100 max-w-540"
    >
      <img
        src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
        width="120"
        height="120"
        alt="Success"
      />
      <h2 class="title">결제를 완료했어요</h2>
      <div class="response-section w-100">
        <div class="flex justify-between">
          <span class="response-label">결제 금액</span>
          <span id="amount" class="response-text">{{ amount }}원</span>
        </div>
        <div class="flex justify-between">
          <span class="response-label">주문번호</span>
          <span id="orderId" class="response-text">{{ orderId }}</span>
        </div>
        <div class="flex justify-between">
          <span class="response-label">paymentKey</span>
          <span id="paymentKey" class="response-text">{{ paymentKey }}</span>
        </div>
      </div>

      <div class="w-100 button-group">
        <div class="flex" style="gap: 16px">
          <a
            class="btn w-100"
            href="https://developers.tosspayments.com/sandbox"
            >다시 테스트하기</a
          >
          <a
            class="btn w-100"
            href="https://docs.tosspayments.com/guides/v2/payment-widget/integration"
            target="_blank"
            rel="noreferrer noopener"
            >결제 연동 문서가기</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/authStore";
import { useRouter } from "vue-router"; // Vue Router에서 useRouter 가져오기
import axios from "axios";

export default {
  setup() {
    const router = useRouter();
    const paymentKey = ref("");
    const orderId = ref("");
    const amount = ref("");
    const isLoading = ref(true);

    onMounted(() => {
      const urlParams = new URLSearchParams(window.location.search);
      paymentKey.value = urlParams.get("paymentKey");
      orderId.value = urlParams.get("orderId");
      amount.value = urlParams.get("amount");
    });

    // 마지막단계임 confirm -> spring 서버에서 해야함
    const confirmPayment = async () => {
      try {
        const requestBody = {
          paymentKey: paymentKey.value,
          orderId: orderId.value,
          amount: amount.value,
        };

        console.log("Request Body:", requestBody);

        const response = await axios.post(
          "http://localhost:8080/api/toss/confirm",
          requestBody,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (response.status === 200) {
          isLoading.value = false;
          router.push("/store/dotori"); // 홈으로 이동
        } else {
          console.log(
            `Payment confirmation failed with status: ${response.status}`
          );
        }
      } catch (error) {
        console.error(
          "Error confirming payment:",
          error.response || error.message
        );
      }
    };

    return {
      paymentKey,
      orderId,
      amount,
      isLoading,
      confirmPayment,
    };
  },
};
</script>

<style scoped>
/* 기본 스타일 추가 */
.wrapper {
  width: 100%;
}

.confirm-loading,
.confirm-success {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.confirm-loading {
  display: flex;
}

.confirm-success {
  display: none;
}

button {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}
</style>
