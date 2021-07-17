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
    this.getAll();
  },
  methods: {
    ...mapActions("account", ["getAll", "generate"]),
    async submit() {
      let data = {
        name: this.form.name,
        password: this.form.password,
        type: this.type,
        email: this.form.email,
        phone: this.form.phone,
        parent: this.userData.user.USER_ID,
      };
      let cover = new FormData();
      cover.append("file", this.form.image);
      let payload = {
        data,
        cover,
      };
      await this.generate(payload);
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
  watch: {
    userData: {
      handler: function (value) {
        if (value) {
          value = value.user;
          if (value.TYPE == "A") {
            this.type = "P";
            this.user_types = [
              { text: "Provinsi", value: "P" },
              { text: "Kabupaten", value: "B", disabled: true },
              { text: "Kecamatan", value: "C", disabled: true },
              { text: "Desa", value: "D", disabled: true },
            ];
          } else if (value.TYPE == "P") {
            this.form.type = "B";
            this.user_types = [
              { text: "Provinsi", value: "P", disabled: true },
              { text: "Kabupaten", value: "B" },
              { text: "Kecamatan", value: "C", disabled: true },
              { text: "Desa", value: "D", disabled: true },
            ];
          } else if (value.TYPE == "B") {
            this.form.type = "C";
            this.user_types = [
              { text: "Provinsi", value: "P", disabled: true },
              { text: "Kabupaten", value: "B", disabled: true },
              { text: "Kecamatan", value: "C" },
              { text: "Desa", value: "D", disabled: true },
            ];
          } else if (value.TYPE == "C") {
            this.form.type = "D";
            this.user_types = [
              { text: "Provinsi", value: "P", disabled: true },
              { text: "Kabupaten", value: "B", disabled: true },
              { text: "Kecamatan", value: "C", disabled: true },
              { text: "Desa", value: "D" },
            ];
          }
        }
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      id: null,
      form: { date: new Date(), penulis: "Muhammad Abdurrahman Al Jauzy" },
      type: null,
      title: "Generate Akun",
      items: [
        {
          text: "Dashboard",
          href: "/",
        },
        {
          text: "Generate Akun",
          active: true,
        },
      ],
      fields: [
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
        {
          key: "USER_TYPE",
          label: "Tipe Akun",
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
      :label="'Generate Akun'"
      @add="id = null, form = {}"
      @create="submit"
      onCreate
    >
      <template v-slot:modal>
        <div class="row">
          <div class="col-lg-auto">
            <b-form-group v-slot="{ ariaDescribedby }" label="Tipe Akun">
              <b-form-radio-group
                v-model="type"
                button-variant="outline-primary"
                :options="user_types"
                :aria-describedby="ariaDescribedby"
                name="radios-btn-default"
                buttons
              ></b-form-radio-group>
            </b-form-group>
          </div>
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
            <b-form-group label="Nama">
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
