import { createRouter, createWebHistory } from "vue-router";
import ManageAttendanceHome from "@/pages/Home/ManageHome.vue";
import AttendanceLogs from "@/pages/AttendanceLogs/AttendanceLogs";
import ExportedFiles from "@/pages/ExportedFiles/ExportedFiles";
import PostAnnouncements from "@/pages/PostAnnouncements/PostAnnouncements";

const routes = [
  {
    path: "/",
    component: ManageAttendanceHome,
    name: "ManageHome",
  },
  {
    path: "/attendance-logs",
    component: AttendanceLogs,
    name: AttendanceLogs,
  },
  {
    path: "/exported-files",
    component: ExportedFiles,
    name: ExportedFiles,
  },
  {
    path: "/post-announcements",
    component: PostAnnouncements,
    name: PostAnnouncements,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
