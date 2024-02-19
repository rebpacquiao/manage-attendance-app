<template>
  <NInput
    v-model:value="searchQuery"
    @keyup="handleSearch"
    type="text"
    class="employee-input"
    placeholder="Search Employee..."
    clearable
  >
    <template #suffix>
      <MagnifyIcon :style="colorWhite" />
    </template>
  </NInput>
</template>
<script>
import { NInput } from "naive-ui";
import { ref } from "vue";
import MagnifyIcon from "vue-material-design-icons/Magnify.vue";

export default {
  name: "SearchData",
  data() {
    return {
      colorWhite: "color:#fff",
    };
  },
  components: {
    NInput,
    MagnifyIcon,
  },
  props: {
    onSearch: Function,
  },
  setup(props, { emit }) {
    const searchQuery = ref("");

    const handleSearch = () => {
      const query = searchQuery.value;
      if (props.onSearch) {
        props.onSearch(query);
        emit("search", query);
      }
    };
    return {
      searchQuery,
      handleSearch,
    };
  },
};
</script>
