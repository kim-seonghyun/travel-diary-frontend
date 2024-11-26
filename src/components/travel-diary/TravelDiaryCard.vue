<template>

  <div class="relative bg-white shadow-md overflow-hidden">

    <div class="p-4">
      <router-link :to="{ name: 'TravelDiaryDetail', params: { id: diary.id } }">
      <img :src="diary.imageName" alt="diary image" class="w-full h-40 object-cover rounded-md mb-4" />

      <h3 class="font-semibold text-lg truncate mb-2">{{ diary.title }}</h3>


      <p class="text-gray-600 text-sm truncate mb-2">{{ diary.description }}</p>

      <div class="flex items-center justify-between text-gray-400 text-xs">
        <span>{{ diary.username }}</span>
        <span>{{ new Date(diary.createdAt).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }) }}</span>
      </div>
      </router-link>
    </div>

  </div>

</template>

<script setup>
defineProps({
  diary: {
    type: Object,
    required: true,
  },
});
</script>

