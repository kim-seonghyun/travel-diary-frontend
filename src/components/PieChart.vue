<template>
  <div class="flex justify-center items-center p-6">
    <PieChart
        :chart-id="'travel-pie-chart'"
        :chart-data="chartData"
        :chart-options="chartOptions"
        class="w-96 h-96"
    />
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PieController,
} from "chart.js";
import { PieChart } from "vue-chart-3";

// Chart.js에 필요한 컨트롤러 및 플러그인 등록
ChartJS.register(Title, Tooltip, Legend, ArcElement, PieController);

// Props 정의
const props = defineProps({
  travelStyles: {
    type: Array,
    required: true,
  },
});

console.log(props.travelStyles);

// Chart.js 데이터와 옵션
const chartData = {
  labels: props.travelStyles.map((style) => style.name),
  datasets: [
    {
      data: props.travelStyles.map((style) => style.progress),
      backgroundColor: ["#60A5FA", "#34D399", "#FBBF24", "#F472B6", "#818CF8"],
      borderColor: ["#ffffff"],
      borderWidth: 2,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
    },
  },
};
</script>

<style scoped>
/* Chart container 추가 스타일 */
</style>
