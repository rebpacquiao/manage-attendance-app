<template>
  <div class="attendance-container">
    <div class="attendance-left-section">
      <div class="top-left-section">
        <h2>{{ leftTitle }}</h2>
        <p>
          {{ isDecription }}
        </p>
        <div class="left-nav">
          <button
            class="left-nav-item"
            @click="initAttendanceLogs"
            :class="activeAttendance"
          >
            <CalendarClock class="default-left-icon-color green-color" />
            {{ attendanceLogsLabel }}
          </button>
          <button
            class="left-nav-item"
            :class="activeExported"
            @click="initExportedLogs"
          >
            <DownloadNetworkOutline
              class="default-left-icon-color green-color"
            />
            {{ exportedLabel }}
          </button>
        </div>
      </div>
      <div class="mid-left-section" v-if="isActiveContent">
        <div class="filter-heading">
          <h5>Date Range</h5>
        </div>
        <NFlex vertical>
          <div class="filter-items">
            <label>Date From</label>
            <NDatePicker
              v-model="dateFrom"
              @update:value="handleDateFrom"
              type="date"
              size="large"
              format="MM/dd/yyyy"
              placeholder="Select date"
              clearable
            />
          </div>
          <div class="filter-items">
            <label>Date To</label>
            <NDatePicker
              v-model="dateTo"
              @update:value="handleDateTo"
              type="date"
              size="large"
              format="MM/dd/yyyy"
              placeholder="Select date"
              clearable
            />
          </div>
        </NFlex>
      </div>
      <div class="filter-section" v-if="isActiveContent">
        <div class="filter-heading">
          <h5>Filters</h5>
          <NButton quaternary round type="info">Show all</NButton>
        </div>
        <NSpace vertical>
          <div
            v-for="(filter, index) in filters"
            :key="index"
            class="filter-items"
          >
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
      </div>
      <div class="cta-left-section" v-if="isActiveContent">
        <NFlex vertical>
          <NButton
            size="large"
            @click="initSearch"
            id="search-left-button"
            class="search-left-button w-100"
            type="success"
          >
            <MagnifyIcon /> {{ searchLabel }}
          </NButton>
          <NButton size="large" class="w-100" disabled>
            <DownloadNetworkOutline /> {{ exportedLabel }}
          </NButton>
        </NFlex>
      </div>
    </div>
    <div class="data-table-section" v-if="isActiveContent">
      <NFlex vertical>
        <div class="calendar-container">
          <div class="calendar-left">
            <CalendarClock class="calendar-icon" />
            <strong v-if="isDate">{{ showDateFrom }} - {{ showDateTo }}</strong>
          </div>
          <a class="announcement-link" href="/post-announcements"
            >Post Announcements</a
          >
        </div>
        <NDataTable
          :columns="columns"
          :data="filteredData"
          :pagination="pagination"
        />
        <div class="range-section">Showing {{ displayRange }}</div>
      </NFlex>
    </div>
    <div class="exported-section" v-else>
      <ExportedFiles />
    </div>
  </div>
  <NModal :show="showModal">
    <NCard
      style="width: 600px"
      title="Edit Data"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>
        <NButton class="close-modal" @click="closeModal" quaternary
          ><Close
        /></NButton>
      </template>
      <NFlex vertical>
        <div
          v-for="(field, index) in formFields"
          :key="index"
          class="modal-field"
        >
          <label>{{ field.label }}</label>
          <NInput
            v-model:value="field.value"
            :type="field.type"
            :placeholder="field.placeholder"
          />
        </div>
      </NFlex>

      <NButton class="modal-save" type="success" disabled>Save</NButton>
    </NCard>
  </NModal>
</template>

<script>
export default {
  name: "AttendanceLogs",
};
</script>

<script setup>
import {
  NDataTable,
  NSelect,
  NSpace,
  NDatePicker,
  NModal,
  NCard,
  NText,
  NButton,
  NFlex,
  NInput,
} from "naive-ui";
import { reactive, computed, watchEffect, h } from "vue";
import ExportedFiles from "@/pages/ExportedFiles/ExportedFiles.vue";
import CalendarClock from "vue-material-design-icons/CalendarClock.vue";
import Close from "vue-material-design-icons/Close.vue";
import DownloadNetworkOutline from "vue-material-design-icons/DownloadNetworkOutline.vue";
import { ref } from "vue";
import MagnifyIcon from "vue-material-design-icons/Magnify.vue";
import { companyData } from "@/data/companyData.js";
import { deparmentData } from "@/data/departmentData.js";
import { locationsData } from "@/data/locationData.js";
import { Employee } from "@/data/employee.js";
import store from "@/store";
import SquareEditOutline from "vue-material-design-icons/SquareEditOutline.vue";

const activeAttendance = ref("success");
const activeExported = ref(String);
const isActiveContent = ref(true);
const leftTitle = ref("Manage Attendance");
const attendanceLogsLabel = ref("Attendance Logs");
const isDecription = ref(
  " Attendance management is where you can generate, add edit, and export the logs of the Employees."
);
const exportedLabel = ref("Exported Files");
const searchLabel = ref("Search");
const isDate = ref(false);
const isDateFrom = ref(null);
const isDateTo = ref(null);

const showDateFrom = ref(null);
const showDateTo = ref(null);
const showModal = ref(false);

const isFirstName = ref(null);
const isLastName = ref(null);
const isLocation = ref(null);
const isProjectName = ref(null);

const columns = [
  {
    title: "Name",
    key: "name",
    sorter: "default",
    render(row) {
      return h("div", [
        h("span", row.firstName),
        h("span", { class: "last-name" }, row.lastName),
        h("span", { class: "employee-id" }, row.employeeId),
      ]);
    },
  },
  {
    title: "Date",
    key: "date",
    sorter: "default",
  },
  {
    title: "Time",
    key: "time",
  },
  {
    title: "In/Out",
    key: "inOut",
    sorter: "default",
    render(row) {
      let inOutColor = "info";
      row.inOut === "In" ? (inOutColor = "info") : (inOutColor = "warning");
      return h(NText, { type: inOutColor, strong: true }, row.inOut);
    },
  },
  {
    title: "Log Details",
    key: "logDetails",
    sorter: "default",
    render(row) {
      return h(
        NButton,
        { type: "default", strong: true, primary: true },
        row.logDetails
      );
    },
  },
  {
    title: "Location",
    key: "location",
    sorter: "default",
  },
  {
    title: "Project Name",
    key: "projectName",
    sorter: "default",
  },
  {
    title: "Action",
    key: "action",
    render(row, { emit }) {
      return h(
        NButton,
        {
          type: "warning",
          quaternary: true,
          onClick: () => handleEditClick(row),
        },
        () => h(SquareEditOutline)
      );
    },
  },
];

const formFields = ref([
  {
    label: "First Name",
    value: isFirstName,
    type: "text",
    placeholder: "Enter First Name",
  },
  {
    label: "Last Name",
    value: isLastName,
    type: "text",
    placeholder: "Enter Last Name",
  },
  {
    label: "Location",
    value: isLocation,
    type: "text",
    placeholder: "Enter Location",
  },
  {
    label: "Project Name",
    value: isProjectName,
    type: "text",
    placeholder: "Enter Project",
  },
]);

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

const pagination = reactive({
  pageSize: 10,
  page: 1,
  showSizePicker: true,
  pageSizes: [5, 10],
  onChange: (page) => {
    pagination.page = page;
  },
  onUpdatePageSize: (pageSize) => {
    pagination.page = 1;
    pagination.pageSize = pageSize;
  },
});

const filteredData = computed(() => {
  const startDate = isDateFrom.value;
  const endDate = isDateTo.value;

  // Filter data based on date range
  return store.getters.getFilteredData.filter((item) => {
    const itemDate = new Date(item.date);
    return (
      (!startDate || itemDate >= new Date(startDate)) &&
      (!endDate || itemDate <= new Date(endDate))
    );
  });
});

watchEffect(() => {
  pagination.total = filteredData.value.length;
});

const initAttendanceLogs = () => {
  isActiveContent.value = true;
  activeAttendance.value = "success";
  activeExported.value = "";
};

const initExportedLogs = () => {
  isActiveContent.value = false;
  activeAttendance.value = "";
  activeExported.value = "success";
};

const handleSelectChange = (selectedValue) => {
  console.log(`Selected value for `, selectedValue);
};

const handleDateFrom = (date) => {
  isDateFrom.value = dateFormat(date);
};

const handleDateTo = (date) => {
  isDateTo.value = dateFormat(date);
};

const dateFormat = (rawValue) => {
  const date = new Date(rawValue);

  if (isNaN(date.getTime())) {
    console.error("Invalid date object");
    return;
  }

  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  const formattedDate = `${month}/${day}/${year}`;

  return formattedDate;
};

const dataTableDateFormat = (rawValue) => {
  const date = new Date(rawValue);

  if (isNaN(date.getTime())) {
    console.error("Invalid date object");
    return;
  }

  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return formattedDate;
};

const initSearch = () => {
  if (isDateFrom.value !== undefined || isDateTo.value !== undefined)
    showDateFrom.value = dataTableDateFormat(isDateFrom.value);
  showDateTo.value = dataTableDateFormat(isDateTo.value);
  isDate.value = true;

  store.dispatch("updateFilteredData", filteredData.value);
};

const displayRange = computed(() => {
  const startIndex = (pagination.page - 1) * pagination.pageSize + 1;
  const endIndex = Math.min(
    startIndex + pagination.pageSize - 1,
    pagination.total
  );
  return `${startIndex}-${endIndex} of ${pagination.total}`;
});

const handleEditClick = (row) => {
  showModal.value = true;

  isFirstName.value = row.firstName;
  isLastName.value = row.lastName;
  isLocation.value = row.location;
  isProjectName.value = row.projectName;
};

const closeModal = () => {
  showModal.value = false;
};
</script>

<style lang="scss">
@import "@/styles/global.scss";
@import "./AttendanceLogs.scss";
</style>
