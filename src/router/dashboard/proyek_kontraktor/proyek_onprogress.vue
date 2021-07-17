<script>
import appConfig from "@/app.config";
import PageHeader from "@/components/page-header";
import DataTable from "../../../components/datatable.vue";

import { mapActions, mapState } from "vuex";

export default {
  page: {
    title: "Data List Proyek On Progress",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    PageHeader,
    DataTable,
  },
  mounted() {
    this.getProjects();
    this.getAll('K');
  },
  methods: {
    ...mapActions("project", ["getProjects"]),
    ...mapActions("account", ["getAll"]),
    detail(item) {
      this.$router.push("/admin/proyek/onprogress/k/" + item.PROJECT_ID);
    },
  },
  computed: {
    ...mapState("account", ["users"]),
    ...mapState("project", ["data"]),
    tableData: function () {
      return this.data?.project;
    },
    kontraktorList: function () {
      return this.users || [];
    },
  },
  data() {
    return {
      id: null,
      title: "Data List Proyek On Progress",
      items: [
        {
          text: "Dashboard",
          href: "/",
        },
        {
          text: "Data List Proyek On Progress",
          active: true,
        },
      ],
      form: {},
      fields: [
        {
          key: "TITLE",
          label: "Project",
          sortable: true,
        },
        {
          key: "LOCATION",
          label: "Lokasi",
          sortable: true,
        },
        {
          key: "KONTRAKTOR",
          label: "Kontraktor",
          sortable: true,
        },
        {
          key: "CREATE_DATE",
          label: "Dimulai",
          sortable: true,
        },
        {
          key: "STATUS",
          label: "Status",
          sortable: true,
        },
        {
          key: "progress",
          sortable: true,
        },
        {
          key: "aksi",
          label: "#",
          sortable: false,
        },
      ],
    };
  },
};
</script>

<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <DataTable
      :tableData="tableData"
      :fields="fields"
      :label="'Proyek'"
      onDetail
      @detail="detail"
    >
    </DataTable>
  </div>
</template>
