<script>
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import { mapActions, mapState } from "vuex";
import router from "../../index";

import swal from 'sweetalert2'

export default {
  page: {
    title: "Detail Validasi Warga",
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
  mounted() {
    this.get(router.history.current.params.id);
  },
  methods: {
    ...mapActions("account", ["get", 'update']),
    async save(status){
      swal.fire({
        title: 'Apakah anda yakin untuk melanjutkan?',
        showCancelButton: true,
        confirmButtonText: `Ya`,
        cancelButtonText: `Batal`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.update({id:router.history.current.params.id, payload:{status}})
        }
      })
    }
  },
  computed: {
    ...mapState("account", ["users"]),
    userData: function () {
      return this.users;
    },
  },
  watch: {
    userData: {
      handler: function (value) {
        if (value) {
          this.form.name = value.user.NAME;
          this.form.nik = value.user.NIK;
          this.form.address = value.ADDRESS;
          this.form.gender = value.GENDER;
          this.form.birth_place = value.BIRTH_PLACE;
          this.form.birth_date = value.BIRTH_DATE;
          this.form.email = value.EMAIL;
          this.form.phone = value.PHONE_NUMBER;
          this.form.status = value.user.STATUS
        }
      },
      immediate: true,
    },
  },
  data() {
    return {
      form: {
        name: "",
        nik: "",
        alamat: "",
        email: "",
        birth_date: "",
        phone: "",
        gender: "",
        birth_place: "",
      },
      title: "Detail Validasi Warga",
      items: [
        {
          text: "Dashboard",
          href: "/",
        },
        {
          text: "Validasi Warga",
          href: "/admin/citizens/verify",
        },
        {
          text: "Detail Validasi Warga",
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
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-xl-6">
            <div class="row mb-4 align-items-center">
              <div class="col-xl-auto">
                <b-avatar
                  v-if="userData.user.cover"
                  :src="userData.user.cover.PATH"
                  size="10rem"
                ></b-avatar>
              </div>
              <div class="col-xl">
                <b-form-group class="font-weight-bold" label="Nama">
                  <b-form-input
                    v-model="form.name"
                    disabled
                    type="text"
                    placeholder="Name"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group class="font-weight-bold" label="NIK">
                  <b-form-input
                    v-model="form.nik" disabled
                    type="text"
                    placeholder="NIK"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
            </div>
            <b-form-group class="font-weight-bold" label="Alamat">
              <b-form-textarea
                v-model="form.address" disabled
                placeholder="Alamat..."
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>
            <b-form-group class="font-weight-bold" label="Tanggal Lahir">
              <b-form-datepicker
                v-model="form.birth_date" disabled
                class="mb-2"
              ></b-form-datepicker>
            </b-form-group>
            <b-form-group
              class="font-weight-bold"
              label="Jenis Perempuan"
              v-slot="{ ariaDescribedby }"
            >
              <b-form-radio-group
                v-model="form.gender"
                button-variant="outline-primary" 
                :options="[
                  { value: 'L', text: 'Laki - Laki' },
                  { value: 'P', text: 'Perempuan' },
                ]"
                :aria-describedby="ariaDescribedby"
                buttons
              ></b-form-radio-group>
            </b-form-group>
          </div>
          <div class="col-lg-6">
            <b-form-group class="font-weight-bold" label="Email">
              <b-form-input
                v-model="form.email" disabled
                type="text"
                placeholder="Email"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group class="font-weight-bold" label="Tempat Lahir">
              <b-form-input
                v-model="form.birth_place" disabled
                type="text"
                placeholder="Tempat Lahir"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group class="font-weight-bold" label="No. Hp">
              <b-form-input
                v-model="form.phone" disabled
                type="text"
                placeholder="No. Hp"
                required
              ></b-form-input>
            </b-form-group>
            <div class="row">
              <div class="col-xl-auto">
                <b-form-group class="font-weight-bold" label="Foto KTP" >
                  <img
                    v-if="userData.user.ktp"
                    :src="userData.user.ktp.PATH"
                    height="150px"
                    class="rounded shadow-lg"
                    style="background: #2a9187; object-fit: cover"
                  />
                  <h4 v-else class="text-muted">Belum ada</h4>
                </b-form-group>
              </div>
              <div class="col-xl">
                <b-form-group class="font-weight-bold" label="Foto Diri + KTP" >
                  <img
                    v-if="userData.user.diri"
                    :src="userData.user.diri.PATH"
                    height="150px"
                    class="rounded shadow-lg"
                    style="background: #2a9187; object-fit: cover"
                  />
                  <h4 v-else class="text-muted">Belum ada</h4>
                </b-form-group>
              </div>
            </div>
            <div class="d-flex">
              <b-button variant="danger" class="mx-1 w-100" @click="save('T')" v-if="['N','T'].includes(form.status)" :disabled="form.status != 'N'">
                <i class="fa fa-times mr-2"></i> Tolak Validasi
              </b-button>
              <b-button variant="primary" class="mx-1 w-100" @click="save('Y')" v-if="['N','Y'].includes(form.status)" :disabled="form.status != 'N'">
                <i class="fa fa-save mr-2"></i> Validasi
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
