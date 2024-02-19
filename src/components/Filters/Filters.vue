<template>
  <NSpace vertical>
    <div v-for="(filter, index) in filters" :key="index" class="filter-items">
      <label>{{ filter.label }}</label>
      <NSelect
        clearable
        :v-model:value="filter.model"
        :placeholder="filter.placeholder"
        :options="filter.options"
        size="large"
        :multiple="filter.multiple"
        @change="handleSelectChange"
      />
    </div>
  </NSpace>
</template>

<script>
import { defineComponent, ref } from "vue";
import { NSelect, NSpace } from "naive-ui";
import { companyData } from "@/data/companyData.js";
import { deparmentData } from "@/data/departmentData.js";
import { locationsData } from "@/data/locationData.js";
import { Employee } from "@/data/employee.js";
export default defineComponent({
  name: "FilterComponent",
  components: {
    NSelect,
    NSpace,
  },
  setup() {
    const filters = ref([
      {
        label: "Company",
        model: "selectedCompany",
        placeholder: "Select company",
        options: companyData,
        multiple: false,
      },
      {
        label: "Department",
        model: "selectedDeparment",
        placeholder: "Select department",
        options: deparmentData,
        multiple: false,
      },
      {
        label: "Location",
        model: "selectedLocation",
        placeholder: "Select location",
        options: locationsData,
        multiple: false,
      },
      {
        label: "Employee",
        model: "selectedEmployee",
        placeholder: "Select employee",
        multiple: true,
        options: Employee.map((employee) => ({
          label: `${employee.firstName} ${employee.lastName}`,
          value: `${employee.firstName} ${employee.lastName}`,
        })),
      },
    ]);

    const employeeOptions = ref(
      Employee.map((employee) => ({
        label: `${employee.firstName} ${employee.lastName}`,
        value: `${employee.firstName} ${employee.lastName}`,
      }))
    );

    const handleSelectChange = (selectedValue) => {
      console.log(`Selected value for `, selectedValue);
    };

    return {
      filters,
      employeeOptions,
      handleSelectChange,
    };
  },
});
</script>

<style lang="scss">
@import "@/styles/global.scss";
</style>
