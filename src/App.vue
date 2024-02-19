<template>
  <MainHeader :onSearch="handleSearch" />
  <div class="main-content">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<script setup>
import MainHeader from "./components/Header/Header.vue";
import { ref } from "vue";

const searchQuery = ref("");

const handleSearch = (query) => {
  searchQuery.value = query;
};
</script>

<style lang="scss">
@import "@/styles/global";
</style>
