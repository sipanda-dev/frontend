<script>
import appConfig from "@/app.config";
import PageHeader from "@/components/page-header";
import DataTable from "../../../components/datatable.vue";
import { mapActions, mapState } from "vuex";
import router from "../../index";

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
    DataTable,
  },
  mounted() {
    let current = router.history.current;
    this.id = current.params.id
    this.get(current.params.id);
  },
  computed: {
    ...mapState("project", ["data"]),
    projek : function(){
      return this.data?.project
    }
  },
  methods: {
    ...mapActions("project", ["get","createProjDet", "editProjDet", "deleteFinance", "createFinance"]),
    ...mapActions("files", ["uploadProject"]),
    async upload(){
      let data = new FormData();
      data.append("file", this.form.image);
      let payload = {
        data,
        id: this.id,
      };
      await this.uploadProject(payload)
      this.get(this.id)
    },
    getProgress(data){
      if(!data.project_details) return 0
      if(data.project_details.length < 1) return 0
      return parseFloat(data.project_details.filter(item => (item ? item.STATUS == 'Y' : false)).length) * 100 / parseFloat(data.project_details.length)
    },
    edit(item){
      let data = {}
      data.title = item.PROJCOMP_NAME
      data.status = item?.STATUS
      data.progress = item.PROGRESS
      data.budget = item.finance.AMOUNT
      data.description = item.finance.DESCRIPTION
      this.id_projdet = item.PROJDET_ID
      this.id_finance = item.finance.FINANCE_ID
      this.form = data
    },
    async save(){
      let data = {
        title: this.form.title,
        progress: this.form.progress,
        status: this.form.status ? this.form.status : 'N',
      }
      let finance = {
        is_general: false,
        amount: this.form.budget,
        description: this.form.description
      }
      let payload = {
        id: this.id,
        id_projdet: this.id_projdet,
        id_finance: this.id_finance,
        finance,
        data
      }
      if (!this.id_projdet) await this.createProjDet(payload)
      else await this.editProjDet(payload)
      this.get(this.id)
    },
    async fin_delete(id){
      await this.deleteFinance(id)
      this.get(this.id)
    },
    async create_fin(){
      let payload = {
        parent: this.id,
        is_general: true,
        amount: this.form.proj_budget,
        description: this.form.proj_desc
      }
      await this.createFinance(payload)
      this.get(this.id)
    }
  },
  watch: {
  },
  data() {
    return {
      verif: 'Y',
      id: null,
      id_projdet: null,
      id_finance: null,
      form: { },
      title: "Detail Proyek",
      tableData: [],
      fields: [
        {
          key: "PROJCOMP_NAME",
          label: "Komponen",
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
          key: "DET_PROGRESS",
          label:'Progress',
          sortable: true,
        },
        {
          key: "Fin_Budget",
          label:'Budget',
          sortable: true,
        },
        {
          key: "Fin_Keterangan",
          label:'Keterangan',
          sortable: true,
        },
        {
          key: "aksi",
          label: "#",
          sortable: false,
        },
      ],
      items: [
        {
          text: "Dashboard",
          href: "/",
        },
        {
          text: "Proyek OnProgress",
          href: "/admin/proyek/onprogress",
        },
        {
          text: "Detail Proyek",
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
          <div class="col-xl-5">
            <div class="row">
              <div class="col-lg-6">
                <b-form-group label="Judul">
                  <h5 class="font-weight-bold">{{ projek.TITLE }}</h5>
                </b-form-group>
              </div>
              <div class="col-lg-6">
                <b-form-group label="Lokasi">
                  <h5>{{ projek.LOCATION }}</h5>
                </b-form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-6">
                <b-form-group label="Kontraktor">
                  <h4 class="font-weight-bold">{{ projek.user.NAME }}</h4>
                </b-form-group>
              </div>
              <div class="col-lg-6">
                <b-form-group label="Progress">
                  <b-progress :max="100" height="1.5rem" animated>
                    <b-progress-bar
                      :value="getProgress(projek)"
                      :variant="
                        getProgress(projek) > 75
                          ? 'primary'
                          : getProgress(projek) > 50
                          ? 'warning'
                          : 'danger'
                      "
                      :label="`${((getProgress(projek) / 100) * 100).toFixed(2)}%`"
                    ></b-progress-bar>
                  </b-progress>
                </b-form-group>
              </div>
            </div>
            <div style="text-align:justify" v-html="projek.DESCRIPTION"></div>
          </div>
          <div class="col-xl-4">
            <div class="d-flex align-items-center">
              <label class="font-weight-bold mb-0">Berkas Projek</label>
              <b-button class="ml-auto" variant="primary" size="sm" v-b-modal.berkas><i class="fa fa-plus mr-1"></i> Tambah</b-button>
            </div>
            <div class="row mt-3">
              <div class="col-xl-6" v-for="(img, idx) in projek.files" :key="idx">
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
          </div>
          <div class="col-xl-3">
            <div class="d-flex align-items-center">
              <label class="font-weight-bold mb-0">Rincian Biaya</label>
              <b-button @click="form.proj_desc = null, form.proj_budget = null" class="ml-auto" variant="primary" size="sm" v-b-modal.finance><i class="fa fa-plus mr-1"></i> Tambah</b-button>
            </div>
            <div class="w-100 border rounded p-3 mt-3">
              <div v-for="(fin,fin_idx) in projek.finances" :key="fin.FINANCE_ID">
                <span class="d-flex align-items-end" style="justify-content:space-between">
                  <label class="mb-0"><i class="text-danger fa fa-trash mr-1" @click="fin_delete(fin.FINANCE_ID)" style="cursor:pointer" /> {{fin.DESCRIPTION}}</label>
                  <label class="mb-0">Rp. {{fin.AMOUNT}}</label>
                </span>
                <hr v-if="fin_idx != projek.finances.length - 1">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <DataTable
      :tableData="projek.project_details || []"
      :fields="fields"
      :label="'Komponen Proyek'"
      onCreate
      onEdit
      @create="save"
      @edit="edit"
      @add="id_projdet = null, id_finance = null, form = {progress: 0}"
    >
      <template v-slot:modal>
        <b-form-group label="Status Komponen Proyek">
          <b-form-radio-group
            v-model="form.status"
            class="w-100"
            button-variant="outline-primary"
            :options="[
              { text: 'Belum Selesai', value: 'N' },
              { text: 'Sudah Selesai', value: 'Y' },
            ]"
            :aria-describedby="ariaDescribedby"
            name="radios-btn-default"
            buttons
          ></b-form-radio-group>
        </b-form-group>
        <div class="row">
          <div class="col-lg-6">
            <b-form-group label="Nama Komponen">
              <b-form-input
                v-model="form.title"
                type="text"
                placeholder="Nama Komponen"
                required
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-lg-6">
            <b-form-group label="Progress">
              <b-form-spinbutton v-model="form.progress" min="1" max="100"></b-form-spinbutton>
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <b-form-group label="Budget">
              <b-form-input
                v-model="form.budget"
                type="number"
                placeholder="Budget"
                required
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-lg-6">
            <b-form-group label="Keterangan">
              <b-form-input
                v-model="form.description"
                type="text"
                placeholder="Keterangan"
                required
              ></b-form-input>
            </b-form-group>
          </div>
        </div>
      </template>
    </DataTable>

    <b-modal
      id="berkas"
      :title="'Upload Berkas'"
      size="lg"
      centered
      @ok="upload"
    >
      <b-form-group label="Berkas">
        <b-form-file
          accept="image/*"
          v-model="form.image"
          placeholder="Pilih file atau seret kesini..."
          drop-placeholder="Seret file kesini..."
        ></b-form-file>
      </b-form-group>
    </b-modal>
    
    <b-modal
      id="finance"
      :title="'Rincian Biaya'"
      size="lg"
      centered
      @ok="create_fin"
    >
      <div class="row">
        <div class="col-lg-6">
          <b-form-group label="Budget">
            <b-form-input
              v-model="form.proj_budget"
              type="number"
              placeholder="Budget"
              required
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-lg-6">
          <b-form-group label="Keterangan">
            <b-form-input
              v-model="form.proj_desc"
              type="text"
              placeholder="Keterangan"
              required
            ></b-form-input>
          </b-form-group>
        </div>
      </div>
    </b-modal>

  </div>
</template>
