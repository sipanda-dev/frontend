<script>
import appConfig from "@/app.config";
import PageHeader from "@/components/page-header";

import { mapActions, mapState } from "vuex";
import router from "../../index";
import Stepper from "./stepper.vue";

export default {
  page: {
    title: "Detail Pengaduan",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    PageHeader,
    Stepper,
  },
  mounted() {
    let current = router.history.current;
    this.get(current.params.id);
  },
  computed: {
    ...mapState("complaint", ["data"]),
    user_parent : function(){
      return this.data?.user.user
    }
  },
  methods: {
    ...mapActions("complaint", ["get", "update"]),
    save(){
      let data = {
        status: this.form.status
      }
      this.update({
        data,
        follup: this.form.diteruskan && !this.data.follow_ups.includes(this.$store.state.auth.data.user.USER_PARENT) ? this.$store.state.auth.data.user.USER_PARENT : null,
        complaint_id : this.data.COMPLAINT_ID
      })
    },
    done(){
      let data = {
        status: 'D'
      }
      this.update({
        data,
        complaint_id : this.data.COMPLAINT_ID
      })
    },
    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
    }
  },
  watch: {
    data: {
      handler: function (value) {
        if (value) {
          this.form.title = value.TITLE
          this.form.sendat = new Date(value.CREATE_DATE).toLocaleString();
          this.form.location = value.user.user ? value.user.user.NAME : "-";
          this.form.detail = value.DETAIL;
          this.form.sender = value.user.NAME;
          this.form.status = value.STATUS;
          this.form.diteruskan = value.follow_ups.findIndex(item => (item.USER_ID == this.$store.state.auth.data.user.USER_PARENT)) != -1
          if (value.follow_ups) this.form.follup = value.follow_ups;

          let status = {'D':'Selesai Survey', 'T':'Ditolak', 'Y':'Verifikasi'}
          if(value.STATUS != 'N') this.form.follup.push({user:{NAME:status[value.STATUS]}})
        }
      },
      immediate: true,
    },
  },
  data() {
    return {
      verif: 'Y',
      form: { follup: [] },
      title: "Detail Pengaduan",
      items: [
        {
          text: "Dashboard",
          href: "/",
        },
        {
          text: "Kategori Aduan",
          href: "/admin/pengaduan",
        },
        {
          text: "Data Aduan",
          href: "/admin/pengaduan/data-aduan",
        },
        {
          text: "Detail Aduan",
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
    <Stepper :follup="[{ user : {NAME: `Dibuat : ${formatDate(data.CREATE_DATE)}`} }, ...form.follup]"  />
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-xl-5">
            <b-form-group label="Judul" class="font-weight-bold">
              <b-form-input
                v-model="form.title"
                disabled
                type="text"
                placeholder="Judul"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Waktu" class="font-weight-bold">
              <b-form-input
                v-model="form.sendat"
                disabled
                type="text"
                placeholder="Waktu"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Pengirim" class="font-weight-bold">
              <b-form-input
                v-model="form.sender"
                disabled
                type="text"
                placeholder="Pengirim"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Lokasi" class="font-weight-bold">
              <b-form-input
                disabled
                v-model="form.location"
                type="text"
                placeholder="Lokasi"
              ></b-form-input>
            </b-form-group>
            <b-form-group class="font-weight-bold" label="Keluhan">
              <b-form-textarea
                v-model="form.detail"
                disabled
                placeholder="Keluhan"
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>
          </div>
          <div class="col-xl-4">
            <b-form-group class="font-weight-bold" label="Bukti Aduan">
              <div class="row">
                <div class="col-xl-6" v-for="(img, idx) in data.files" :key="idx">
                  <b-form-group class="font-weight-bold">
                    <img
                      :src="img.PATH"
                      width="100%"
                      class="rounded shadow-lg"
                      style="background: #2a9187; object-fit: cover; max-height: 300px"
                    />
                  </b-form-group>
                </div>
              </div>
            </b-form-group>
            <div v-if="data.follow_ups.findIndex(item => (item.USER_ID == this.$store.state.auth.data.USER_ID)) != -1 || data.USER_ID == this.$store.state.auth.data.USER_ID">
              <b-form-checkbox
                v-model="form.diteruskan"
                :value="true"
                :unchecked-value="false"
              >
                Diteruskan ke {{
                  $store.state.auth.data.user.user.TYPE == 'P' ? 'Provinsi' : $store.state.auth.data.user.user.TYPE == 'B' ? 'Kabupaten' : 
                  $store.state.auth.data.user.user.TYPE == 'C' ? 'Kecamatan' : 'Desa'
                }} {{$store.state.auth.data.user.user.NAME}}
              </b-form-checkbox>
              <p class="mt-2">
                Jika daerah aduan tidak sesuai, maka akan di teruskan ke daerah yang terkait
              </p>
            </div>
            <div class="d-flex justify-content-end">
              <b-button v-if="$store.state.auth.data.user.TYPE == 'W'" variant="primary" :disabled="true"
                ><i class="fa fa-save mr-1" /> Terapkan
              </b-button>
              <b-button v-else variant="primary" @click="save" :disabled="form.status == 'D'"
                ><i class="fa fa-save mr-1" /> Terapkan
              </b-button>
            </div>
          </div>
          <div class="col-xl-3">
            <label class="font-weight-bold">Status</label>
            <p>
              Dari Keluhan tersebut, apakah akan dilakukan verifikasi dan diteruskan
              menjadi suatu proyek?
            </p>
            <b-form-group v-slot="{ ariaDescribedby }">
              <b-form-radio-group
                v-model="form.status"
                v-if="form.status != 'D'"
                class="w-100"
                button-variant="outline-primary"
                :options="[
                  { text: 'Tolak', value: 'T' },
                  { text: 'Verifikasi', value: 'Y' },
                ]"
                :aria-describedby="ariaDescribedby"
                name="radios-btn-default"
                buttons
              ></b-form-radio-group>
              <b-form-radio-group
                v-else
                class="w-100"
                button-variant="outline-primary"
                v-model="verif"
                :options="[
                  { text: 'Tolak', value: 'T' },
                  { text: 'Verifikasi', value: 'Y' },
                ]"
                :aria-describedby="ariaDescribedby"
                name="radios-btn-default"
                buttons
              ></b-form-radio-group>
            </b-form-group>

            <span v-if="form.status == 'Y' || form.status == 'D'">
              <label class="font-weight-bold">Status Survey</label>
              <p>
                Konfirmasi Jika Sudah Melakukan Survey Lokasi
              </p>
              <b-button class="w-100" variant="primary" @click="done">
                <i class="fa fa-check mr-2"/> Sudah Survey
              </b-button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
