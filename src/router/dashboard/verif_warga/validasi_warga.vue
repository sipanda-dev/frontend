<script>
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import CardPengaduan from "@/components/card-pengaduan";
import { mapActions, mapState } from "vuex";

export default {
  page: {
    title: "Data Warga",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    PageHeader,
    CardPengaduan,
  },
  mounted() {
    this.getAll();
  },
  methods: {
    ...mapActions("account", ["getAll"]),
  },
  computed: {
    ...mapState("account", ["users"]),
    tableData: function () {
      return this.users || [];
    },
  },
  data() {
    return {
      header: {
        title: "Data Warga",
        items: [
          {
            text: "Dashboard",
            href: "/",
          },
          {
            text: "Data Warga",
            active: true,
          },
        ],
      },
    };
  },
};
</script>

<template>
  <div>
    <PageHeader :title="header.title" :items="header.items" />
    <div class="container-fluid">
      <div class="row">
        <template v-for="item in tableData.filter(item => (item.user.STATUS == 'N'))">
          <div class="col-lg-4 col-xl-3 col-md-6" :key="item.id">
            <CardPengaduan
              :title="item.user.NAME"
              :subtitle="item.user.NIK"
              :img="
                item.user.cover
                  ? item.user.cover.PATH
                  : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
              "
              :link="'/admin/citizens/verify/' + item.user.USER_ID"
            />
          </div>
        </template>
        <div class="w-100 vh-100 d-flex align-items-center justify-content-center card" v-if="tableData.filter(item => (item.user.STATUS == 'N')).length < 1">
          <div class="text-center">
            <i class="fa fa-users fa-5x"/>
            <h2 class="font-weight-bold">Tidak ada warga untuk divalidasi</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
