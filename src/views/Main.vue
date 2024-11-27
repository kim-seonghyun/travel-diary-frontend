<template>
  <div
    class="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
    style="font-family: 'Plus Jakarta Sans', 'Noto Sans', sans-serif"
  >
    <div class="layout-container flex h-full grow flex-col">
      <Header></Header>

      <div class="gap-1 px-6 flex flex-1 justify-center py-5">
        <Navbar></Navbar>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Navbar from "@/components/Navbar.vue";
import Content from "@/components/Content.vue";
export default {
  components: {
    Header,
    Navbar,
    Content,
  },
};
</script>

<style scoped>
/* 추가적인 스타일을 여기에 작성 */
</style>
