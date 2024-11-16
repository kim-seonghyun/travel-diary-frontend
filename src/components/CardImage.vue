<template>
  <div
    class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
    :style="{ backgroundImage: 'url(' + imageUrl + ')' }"
  ></div>
</template>
<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const imageUrl = ref("");
const loading = ref(true);
const error = ref(null);

const { id } = defineProps({
  id: Number,
});
onMounted(async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/image-url/${id}`
    );
    imageUrl.value = response.data;
    console.log(imageUrl.value);
  } catch (err) {
    error.value = "Failed to load items";
  } finally {
    loading.value = false;
  }
});
</script>

<style></style>
