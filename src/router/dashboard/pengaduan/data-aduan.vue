<script>
import appConfig from "@/app.config";
import PageHeader from "@/components/page-header";
import DataTable from "../../../components/datatable.vue";
import router from "../../index";

import { mapActions, mapState } from "vuex";

export default {
  page: {
    title: "Data Aduan",
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
    let current = router.history.current;
    this.title = "Kategori : " + current.query.title;
    this.cat = current.params.category
    this.getByCategory(current.params.category);
  },
  computed: {
    ...mapState("complaint", ["data"]),
    tableData: function () {
      return this.data;
    },
  },
  data() {
    return {
      cat: null,
      title: "Kategori : Jalan Rusak",
      form: {},
      items: [
        {
          text: "Dashboard",
          href: "/",
        },
        {
          text: "Data Aduan",
          active: true,
        },
      ],
      fields: [
        {
          key: "CREATE_DATE",
          label: "Waktu",
          sortable: true,
        },
        {
          key: "user",
          label: "Pengirim",
          sortable: true,
        },
        {
          key: "ORIGIN",
          label: "Lokasi",
          sortable: true,
        },
        {
          key: "KELUHAN",
          label: "Keluhan",
          sortable: true,
        },
        {
          key: "STATUS_COMPLAINT",
          label: "Status",
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
  methods: {
    ...mapActions("complaint", ["getByCategory", 'createComplaint']),
    onDetail(item) {
      this.$router.push(`/admin/pengaduan/data-aduan/${item.COMPLAINT_ID}/detail`);
    },
    save(){
      let payload = {
        parent: this.$store.state.auth.data.USER_ID,
        title: this.form.title,
        category: this.cat,
        detail : this.form.detail,
        status: 'N',
      }
      this.createComplaint({payload, files: this.form.file, cat:this.cat})
    }
  },
};
</script>

<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <DataTable
      :tableData="tableData"
      :fields="fields"
      :label="'Pengaduan'"
      @detail="onDetail"
      onDetail
      :onCreate="$store.state.auth.data.user.TYPE == 'W'"
      @add="form = {}"
      @create="save"
    >
      <template v-slot:modal>
        <b-form-group label="Judul" class="font-weight-bold">
          <b-form-input
            v-model="form.title"
            type="text"
            placeholder="Judul"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group class="font-weight-bold" label="Detail Keluhan">
          <b-form-textarea
            v-model="form.detail"
            placeholder="Detail Keluhan..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>
        <b-form-group class="font-weight-bold" label="File Bukti">
          <b-form-file accept="image/*" v-model="form.file" multiple />
        </b-form-group>
      </template>
    </DataTable>
  </div>
</template>
