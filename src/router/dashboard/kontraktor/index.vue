<script>
import appConfig from "@/app.config";
import PageHeader from "@/components/page-header";
import DataTable from "../../../components/datatable.vue";
import { mapState, mapActions } from "vuex";

export default {
  page: {
    title: "Generate Akun",
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
    this.getAll('K');
  },
  methods: {
    ...mapActions("account", ["getAll", "generate"]),
    submit() {
      let data = {
        name: this.form.name,
        password: this.form.password,
        type: 'K',
        email: this.form.email,
        phone: this.form.phone,
        parent: this.userData.user.USER_ID,
      };
      let cover = new FormData();
      cover.append("file", this.form.image);
      let payload = {
        data,
        cover,
        type: 'K'
      };
      this.generate(payload);
      window.$(".vld-icon").hide();
    },
  },
  computed: {
    ...mapState("account", ["users"]),
    ...mapState("auth", ["data"]),
    tableData: function () {
      return this.users || [];
    },
    userData: function () {
      return this.data;
    },
  },
  data() {
    return {
      id: null,
      form: { date: new Date(), penulis: "Muhammad Abdurrahman Al Jauzy" },
      title: "Kontraktor",
      items: [
        {
          text: "Dashboard",
          href: "/",
        },
        {
          text: "Kontraktor",
          active: true,
        },
      ],
      fields: [
        {
          key:'USER_COVER',
          label:'Logo',
          sortable:false
        },
        {
          key: "USER_NAME",
          label: "Nama",
          sortable: false,
        },
        {
          key: "EMAIL",
          label: "Alamat Email",
          sortable: true,
        },
        {
          key: "PHONE_NUMBER",
          label: "Nomor Telepon",
          sortable: true,
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
      :label="'Kontraktor'"
      @add="id = null, form = {}"
      @create="submit"
      onCreate
    >
      <template v-slot:modal>
        <div class="row">
          <div class="col-lg">
            <b-form-group label="Foto Terkait">
              <b-form-file
                v-model="form.image"
                accept="image/*"
                placeholder="Pilih file atau seret kesini..."
                drop-placeholder="Seret file kesini..."
              ></b-form-file>
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <b-form-group label="Nama Kontraktor">
              <b-form-input
                v-model="form.name"
                type="text"
                placeholder="Nama"
                required
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-lg-6">
            <b-form-group label="Nomor Telepon">
              <b-form-input
                v-model="form.phone"
                type="text"
                placeholder="Nomor Telepon"
                required
              ></b-form-input>
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <b-form-group label="Alamat Email">
              <b-form-input
                v-model="form.email"
                type="text"
                placeholder="Alamat Email"
                required
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-lg-6">
            <b-form-group label="Password">
              <b-form-input
                v-model="form.password"
                type="text"
                placeholder="Password"
                required
              ></b-form-input>
            </b-form-group>
          </div>
        </div>
      </template>
    </DataTable>
  </div>
</template>
