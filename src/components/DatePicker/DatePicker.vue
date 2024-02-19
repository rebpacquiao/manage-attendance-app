<template>
  <NFlex vertical>
    <div
      v-for="filterItem in filterItems"
      :key="filterItem.label"
      :class="filterItem.class"
    >
      <label>{{ filterItem.label }}</label>
      <NDatePicker
        v-model:value="filterItem.mode"
        type="date"
        size="large"
        :placeholder="filterItem.placeholder"
        :value-format="datePickerFormat"
      />
    </div>
  </NFlex>
</template>

<script>
import { defineComponent } from "vue";
import { NDatePicker, NFlex } from "naive-ui";

export default defineComponent({
  name: "DatePicker",
  data() {
    return {
      filterItems: [
        {
          label: "Date From",
          class: "filter-items",
          model: "dateFrom",
          placeholder: "Select date",
        },
        {
          label: "Date To",
          class: "filter-items",
          model: "dateTo",
          placeholder: "Select date",
        },
      ],
      datePickerFormat: "MM/dd/yyyy",
    };
  },
  components: {
    NDatePicker,
    NFlex,
  },
});
</script>

<style lang="scss">
@import "@/styles/global.scss";
@import "./DatePicker.scss";
</style>
