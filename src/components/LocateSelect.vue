<script setup>
import { ref, watch } from "vue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const selectedValue = ref("");
// emit 함수를 정의합니다.
const emit = defineEmits(["update:modelValue"]);

watch(selectedValue, (newValue) => {
  // 선택된 값이 변경되면 상위 컴포넌트에 전달
  emit("update:modelValue", newValue);
});
</script>

<template>
  <div class="w-full max-w-xs mx-auto">
    <Select v-model="selectedValue">
      <!-- Select Trigger -->
      <SelectTrigger
        class="w-full px-4 py-2 bg-white text-gray-700 rounded-lg shadow-md border border-gray-300 hover:bg-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
      >
        <SelectValue
          placeholder="지역별 카테고리"
          class="text-sm font-medium"
        />
      </SelectTrigger>

      <!-- Select Content -->
      <SelectContent
        class="mt-2 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto border border-gray-200"
      >
        <SelectItem
          value="0"
          class="px-6 py-2 hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200 rounded-lg"
          >전체</SelectItem
        >

        <SelectItem
          value="1"
          class="px-6 py-2 hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200 rounded-lg"
          >서울특별시</SelectItem
        >
        <SelectItem
          value="2"
          class="px-6 py-2 hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200 rounded-lg"
          >부산광역시</SelectItem
        >
        <SelectItem
          value="3"
          class="px-6 py-2 hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200 rounded-lg"
          >대구광역시</SelectItem
        >
        <SelectItem
          value="4"
          class="px-6 py-2 hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200 rounded-lg"
          >인천광역시</SelectItem
        >
        <SelectItem
          value="5"
          class="px-6 py-2 hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200 rounded-lg"
          >광주광역시</SelectItem
        >
        <SelectItem
          value="6"
          class="px-6 py-2 hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200 rounded-lg"
          >대전광역시</SelectItem
        >
        <SelectItem
          value="7"
          class="px-6 py-2 hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200 rounded-lg"
          >울산광역시</SelectItem
        >
        <SelectItem
          value="8"
          class="px-6 py-2 hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200 rounded-lg"
          >세종특별자치시</SelectItem
        >
        <SelectItem
          value="9"
          class="px-6 py-2 hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200 rounded-lg"
          >경기도</SelectItem
        >
        <SelectItem
          value="10"
          class="px-6 py-2 hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200 rounded-lg"
          >강원도</SelectItem
        >
        <SelectItem
          value="11"
          class="px-6 py-2 hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200 rounded-lg"
          >충청북도</SelectItem
        >
        <SelectItem
          value="12"
          class="px-6 py-2 hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200 rounded-lg"
          >충청남도</SelectItem
        >
        <SelectItem
          value="13"
          class="px-6 py-2 hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200 rounded-lg"
          >전라북도</SelectItem
        >
        <SelectItem
          value="14"
          class="px-6 py-2 hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200 rounded-lg"
          >전라남도</SelectItem
        >
        <SelectItem
          value="15"
          class="px-6 py-2 hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200 rounded-lg"
          >경상북도</SelectItem
        >
        <SelectItem
          value="16"
          class="px-6 py-2 hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200 rounded-lg"
          >경상남도</SelectItem
        >
        <SelectItem
          value="17"
          class="px-6 py-2 hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200 rounded-lg"
          >제주특별자치도</SelectItem
        >
      </SelectContent>
    </Select>
  </div>
</template>

<style scoped></style>
