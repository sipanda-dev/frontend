<script>
import appConfig from "@/app.config";
import PageHeader from "@/components/page-header";
import DataTable from "../../../components/datatable.vue";
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
    DataTable,
  },
  mounted() {
    this.getAll('W');
  },
  methods: {
    ...mapActions("account", ["getAll", "generate"]),
    submit() {
      let data = {
        name: this.form.name,
        password: this.form.password,
        address: this.form.address,
        birth_date: this.form.birth_date,
        birth_place: this.form.birth_place,
        gender: this.form.gender,
        nik: this.form.nik,
        type: "W",
        status: "N",
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
      title: "Data Warga",
      form: {},
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
          key: "NIK",
          label: "NIK",
          sortable: true,
        },
        {
          key: "ADDRESS",
          label: "Alamat",
          sortable: true,
        },
        {
          key: "GENDER",
          label: "L/P",
          sortable: true,
        },
        {
          key: "BIRTH_INFO",
          label: "TTL",
          sortable: true,
        },
        {
          key: "STATUS_WARGA",
          label: "Status",
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
      :label="'Data Warga'"
      @add="id = null, form = {}"
      @create="submit"
      onCreate
    >
      <template v-slot:modal>
        <div class="row">
          <div class="col-lg-auto">
            <b-form-group v-slot="{ ariaDescribedby }" label="Jenis Kelamin">
              <b-form-radio-group
                v-model="form.gender"
                button-variant="outline-primary"
                :options="[
                  { value: 'L', text: 'Laki - Laki' },
                  { value: 'P', text: 'Perempuan' },
                ]"
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
        <b-form-group label="NIK">
          <b-form-input
            v-model="form.nik"
            type="text"
            placeholder="NIK"
            required
          ></b-form-input>
        </b-form-group>
        <div class="row">
          <div class="col-lg-6">
            <b-form-group label="Tempat Lahir">
              <b-form-input
                v-model="form.birth_place"
                type="text"
                placeholder="Tempat Lahir"
                required
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-lg-6">
            <b-form-group label="Tanggal Lahir">
              <b-form-input
                v-model="form.birth_date"
                type="date"
                placeholder="Tanggal Lahir"
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
        <b-form-group label="Alamat">
          <b-form-textarea
            v-model="form.address"
            placeholder="Alamat"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>
      </template>
    </DataTable>
  </div>
</template>
