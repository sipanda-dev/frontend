<script>
import appConfig from "@/app.config";
import PageHeader from "@/components/page-header";
import { mapState, mapActions } from "vuex";
import router from "../../index";

export default {
  page: {
    title: "Info Berita",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    PageHeader,
  },
  computed: {
    ...mapState("news", ["data"]),
    newsInfo: function () {
      return this.data?.info;
    },
  },
  methods: {
    ...mapActions("news", ["get"]),
  },
  mounted() {
    this.get(router.history.current.params.id);
  },
  data() {
    return {
      title: "Info Berita",
      items: [
        {
          text: "Dashboard",
          href: "/",
        },
        {
          text: "Manajemen Berita",
          active: true,
        },
      ],
    };
  },
};
</script>

<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <div class="container-fluid">
      <div class="card shadow-lg">
        <!-- <div class="card-body"> -->
        <img
          :src="newsInfo.cover.PATH"
          :style="{ maxHeight: '500px', width: '100%', objectFit: 'cover' }"
        />
        <!-- </div> -->
      </div>
      <div v-html="newsInfo.DESCRIPTION"></div>
    </div>
  </div>
</template>
