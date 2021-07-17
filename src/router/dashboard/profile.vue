<script>
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

import {mapActions, mapState} from 'vuex'

export default {
  page: {
    title: "My Profile",
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
  computed:{
    ...mapState('auth', ['data'])
  },
  watch:{
    data:{
      handler: function(value){
        if(value){
          this.form = {
            name: value.user.NAME,
            address: value.ADDRESS,
            birth_date: value.BIRTH_DATE,
            birth_place: value.BIRTH_PLACE,
            gender: value.GENDER,
            nik: value.user.NIK,
            email: value.EMAIL,
            phone: value.PHONE_NUMBER,
          }
        }
      }
    }, immediate: true, deep: true
  },
  mounted(){
    this.getUserData();
  },
  methods: {
    ...mapActions('auth', ['updateProfile', 'getUserData', 'updateKTP']),
    save_ktp(){
      let ktp = new FormData();
      ktp.append("file", this.form.ktp);
      let diri = new FormData();
      diri.append("file", this.form.diri);
      let payload = {
        ktp, diri, user_id: this.data.user.USER_ID,
        ktp_id: null, diri_id: null
      }
      this.updateKTP(payload);
    },
    save(){
      let data = {
        name: this.form.name,
        address: this.form.address,
        birth_date: this.form.birth_date,
        birth_place: this.form.birth_place,
        gender: this.form.gender,
        nik: this.form.nik,
        email: this.form.email,
        phone: this.form.phone,
      };
      let cover = new FormData();
      cover.append("file", this.form.image);
      let payload = {
        data,
        cover,
        cover_id: this.data.user.cover ? this.data.user.cover.FILE_ID : null,
        user_id: this.data.user.USER_ID
      };
      this.updateProfile(payload);
      window.$(".vld-icon").hide();
    }
  },
  data() {
    return {
      form: {},
      header: {
        title: "My Profile",
        items: [
          {
            text: "Dashboard",
            href: "/",
          },
          {
            text: "My Profile",
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
    <b-card bg-variant="info" class="info-card text-white-50">
        <div class="row align-items-center">
            <div class="col-md">
                <h5 class="mt-0 mb-2 text-white">
                    <i class="mdi mdi-account-check mr-2"></i> Masukan Data Asli Mu !
                </h5>
                <p class="card-text text-white">
                    Ini Digunakan Untuk Mengkonfirmasi Data Pribadi Anda Dengan Akurat
                </p>
            </div>
        </div>
    </b-card>
    <div class="row align-items-center">
      <div class="col-xl-6 justify-content-center d-flex my-3">
        <img width="100%" src="@/static/svg_1.svg" class="position-absolute" style="z-index:-1" />
        <img
            v-if="data.user.cover"
            :src="data.user.cover.PATH || 'https://www.svgrepo.com/show/275281/man-user.svg'"
            class="rounded-circle shadow-lg" width="60%"
            alt="user-pic" style="border:2px solid white"
        />
      </div>
      <div class="col-xl-6">
        <div class="card">
          <div class="card-body">
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
                    :value="form.email"
                    disabled
                    type="text"
                    placeholder="Alamat Email"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
              <div class="col-lg-6">
                <b-form-group label="NIK">
                  <b-form-input
                    v-model="form.nik"
                    type="text"
                    placeholder="NIK"
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
            <div class="d-flex">
              <b-button class="ml-auto" variant="primary" @click="save">
                <i class="fa fa-save mr-2"/> Simpan
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-lg-6">
            <b-form-group class="font-weight-bold" label="Foto KTP">
              <b-form-file accept="image/*" v-model="form.ktp"></b-form-file>
            </b-form-group>
            <b-form-group class="font-weight-bold" label="Foto  Diri + KTP">
              <b-form-file accept="image/*" v-model="form.diri"></b-form-file>
            </b-form-group>
            <div class="d-flex justify-content-end">
              <b-button class="ml-auto" variant="primary" @click="save_ktp">
                <i class="fa fa-save mr-2"/> Simpan
              </b-button>
            </div>
          </div>
          <div class="col-lg-6 row">
            <div class="col-xl-auto">
              <b-form-group class="font-weight-bold" label="Foto KTP" >
                <img
                  v-if="data.user.ktp"
                  :src="data.user.ktp.PATH"
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
                  v-if="data.user.diri"
                  :src="data.user.diri.PATH"
                  height="150px"
                  class="rounded shadow-lg"
                  style="background: #2a9187; object-fit: cover"
                />
                <h4 v-else class="text-muted">Belum ada</h4>
              </b-form-group>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>
