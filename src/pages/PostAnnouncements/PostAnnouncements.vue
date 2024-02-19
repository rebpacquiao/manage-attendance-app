<template>
  <div class="main-contaner">
    <NLayout>
      <NLayoutHeader>
        <div class="announcement-container">
          <div class="announcment-left">
            <h2>Announcements</h2>
            <p>
              View, create, or edit announcements for all employees of your
              company.
            </p>
          </div>
          <div class="announcment-right">
            <a href="/" class="announcement-link">Manage Attendance</a>
          </div>
        </div>
      </NLayoutHeader>
      <NLayoutContent class="announcement-data-table">
        <div class="announcement-filter">
          <div class="announcement-left"></div>
          <div class="announcement-search">
            <NSelect
              :v-model:value="selectFilterBy"
              placeholder="Filter by"
              :options="filterBy"
            />
            <NInput
              v-model:value="searchAnnouncement"
              type="text"
              placeholder="Search Title, Message, Sent By"
              @input="handleSearch"
            >
              <template #suffix>
                <MagnifyIcon />
              </template>
            </NInput>
          </div>
        </div>
        <NDataTable
          :columns="columns"
          :data="filteredLetters"
          :pagination="pagination"
        />
      </NLayoutContent>
    </NLayout>
  </div>
</template>

<script>
export default {
  name: "PostAnnouncements",
};
</script>
<script setup>
import {
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NDataTable,
  NInput,
  NSelect,
} from "naive-ui";
import { h, reactive, computed, ref, watchEffect } from "vue";
import MagnifyIcon from "vue-material-design-icons/Magnify.vue";
import ClockTimeEight from "vue-material-design-icons/ClockTimeEight.vue";
import Cellphone from "vue-material-design-icons/Cellphone.vue";
import EmailNewsletter from "vue-material-design-icons/EmailNewsletter.vue";
import { useStore } from "vuex";
const store = useStore();

const searchAnnouncement = ref("");
const selectFilterBy = ref(null);

const columns = [
  {
    title: "Title",
    key: "title",
    sorter: "default",
  },
  {
    title: "Message",
    key: "message",
    sorter: "default",
    render(row) {
      return h("div", { class: "ellipse-container" }, [
        h("span", { class: "col-message" }, row.message),
      ]);
    },
  },
  {
    title: "Sent By",
    key: "sentBy",
    sorter: "default",
  },
  {
    title: "Sent Through",
    key: "sent-throught",
    sorter: "default",
    render() {
      return h("div", { class: "icons" }, [
        h("span", { class: "icon" }, [h(ClockTimeEight)]),
        h("span", { class: "icon" }, [h(Cellphone)]),
        h("span", { class: "icon" }, [h(EmailNewsletter)]),
      ]);
    },
  },
  {
    title: "Date Created",
    key: "dateCreated",
    sorter: "default",
  },
  {
    title: "Start Date",
    key: "startDate",
    sorter: "default",
    render(row) {
      return h("div", { class: "time-date" }, [
        h("span", { class: "start-date" }, [row.startDate]),
        h("span", { class: "start-time" }, [row.timeCreated]),
      ]);
    },
  },
  {
    title: "End Date",
    key: "endDate",
    sorter: "default",
    render(row) {
      return h("div", { class: "time-date" }, [
        h("span", { class: "start-date" }, [row.endDate]),
        h("span", { class: "start-time" }, [row.endTimeCreated]),
      ]);
    },
  },
];

const filterBy = ref([
  {
    label: "Title",
    value: "title",
  },
  {
    label: "Message",
    value: "message",
  },
  {
    label: "Sent By",
    value: "sentBy",
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

const filteredLetters = computed(() => {
  return store.state.announcements.filter((announcement) => {
    const searchValue = searchAnnouncement.value.toLowerCase();

    return (
      announcement.title.toLowerCase().includes(searchValue) ||
      announcement.message.toLowerCase().includes(searchValue) ||
      announcement.sentBy.toLowerCase().includes(searchValue)
    );
  });
});

const handleSearch = () => {
  store.dispatch("updateFilteredData", searchAnnouncement.value);
};

watchEffect(() => {
  pagination.total = searchAnnouncement.value.length;
});
</script>

<style lang="scss">
@import "@/styles/global.scss";
@import "./PostAnnouncements.scss";
</style>
