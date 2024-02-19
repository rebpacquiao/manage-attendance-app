import { createStore } from "vuex";
import { Employee } from "@/data/employee.js";
import { Announcements } from "@/data/announcement.js";

export default createStore({
  state: {
    filteredData: Employee,
    announcements: Announcements,
  },
  mutations: {
    setFilteredData(state, data) {
      state.filteredData = data;
    },
    setAnnouncements(state, data) {
      state.announcements = data;
    },
  },
  actions: {
    updateFilteredData({ commit, state }, data) {
      commit("setFilteredData", data);
      commit("setAnnouncements", state.announcements);
    },
  },
  getters: {
    getFilteredData(state) {
      return state.filteredData;
    },
    getAnnouncements(state) {
      return state.announcements;
    },
  },
});
