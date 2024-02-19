<template>
  <n-space id="main-navigation" class="header-section" size="large">
    <n-layout has-sider class="navigation-left-section">
      <a href="/"><img :src="imageUrl" alt="Sprout" /></a>
    </n-layout>
    <n-layout-content class="navigation-right-section">
      <NMenu
        v-model:value="activeKey"
        mode="horizontal"
        :options="menuOptions"
        responsive
      />
      <Search :onSearch="handleSearch" />
      <NButton
        class="nav-circle"
        strong
        secondary
        round
        type="primary"
      ></NButton>
      <NDropdown :options="options">
        <NButton quaternary type="info">Admin <MenuDown /> </NButton>
      </NDropdown>
    </n-layout-content>
  </n-space>
</template>

<script>
export default {
  name: "MainHeader",
};
</script>
<script setup>
import { ref, h } from "vue";
import MenuDown from "vue-material-design-icons/MenuDown.vue";
import { NMenu, NDropdown, NButton } from "naive-ui";
import Search from "@/components/Search/Search.vue";
import { SearchHelper } from "@/utils/searchUtils";
import { Employee } from "@/data/employee.js";

const imageUrl = require("@/assets/sprout-logo.png");

const renderIcon = (icon) => () =>
  h(MenuDown, null, { default: () => h(icon) });

const activeKey = ref(null);

const options = ref([
  {
    label: "Profile",
    key: "profile",
  },
  {
    label: "Edit Profile",
    key: "editProfile",
  },
  {
    label: "Logout",
    key: "logout",
  },
]);

const menuOptions = ref([
  {
    label: () =>
      h(
        "a",
        {
          href: "#",
        },
        h("span", { class: "parent-nav" }, "My Requests")
      ),
    key: "my-requests",
    icon: renderIcon(MenuDown),
  },
  {
    label: () => h(h("span", { class: "parent-nav" }, "My Team")),
    key: "my-team",
    icon: renderIcon(MenuDown),
    children: [
      {
        label: "Sample Team 1",
        key: "sample-team-1",
      },
      {
        label: "Sample Team 2",
        key: "sample-team-2",
      },
    ],
  },
  {
    label: () => h(h("span", { class: "parent-nav" }, "Company")),
    key: "company",
    icon: renderIcon(MenuDown),
  },
  {
    label: () => h(h("span", { class: "parent-nav" }, "Administration Tools")),
    key: "administration-tools",
    icon: renderIcon(MenuDown),
    children: [
      {
        label: "Admin 3",
        key: "admin 3",
        children: [
          {
            label: "Admin",
            key: "sub-admin",
          },
        ],
      },
      {
        label: "Admin 4",
        key: "admin-4",
        children: [
          {
            label: "Admin",
            key: "sub-admin",
          },
        ],
      },
    ],
  },
  {
    label: () => h(h("span", { class: "parent-nav" }, "Maintenance")),
    key: "maintenance",
    icon: renderIcon(MenuDown),
    children: [
      {
        label: "Sample Team 1",
        key: "sample-team-1",
      },
      {
        label: "Sample Team 2",
        key: "sample-team-2",
      },
    ],
  },
]);

const handleSearch = (query) => {
  const filteredData = SearchHelper(Employee, query);
};
</script>

<style lang="scss">
@import "@/styles/global.scss";
@import "./Header.scss";
</style>
