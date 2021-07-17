<script>
import appConfig from "@/app.config";
import PageHeader from "@/components/page-header";
import DataTable from "../../../components/datatable.vue";

import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { mapActions, mapState } from "vuex";

export default {
  page: {
    title: "Data List Proyek On Progress",
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
    ckeditor: CKEditor.component,
  },
  mounted() {
    this.getProjects();
    this.getAll('K');
  },
  methods: {
    ...mapActions("project", ["getProjects", 'editProject', 'createProject']),
    ...mapActions("account", ["getAll"]),
    edit(item){
      this.id = item.PROJECT_ID;
      let data = {}
      data.title = item.TITLE
      data.description = item.DESCRIPTION
      data.kontraktor = item.USER_ID
      data.location = item.LOCATION
      this.form = data
    },
    save(){
      let data = {
        title: this.form.title,
        description: this.form.description,
        kontraktor: this.form.kontraktor,
        location: this.form.location,
        status: 'N'
      };
      let payload = {
        data,
        id: this.id,
      };
      if (!this.id) this.createProject(payload);
      else this.editProject(payload);
    },
    detail(item) {
      this.$router.push("/admin/proyek/onprogress/" + item.PROJECT_ID);
    },
  },
  computed: {
    ...mapState("account", ["users"]),
    ...mapState("project", ["data"]),
    tableData: function () {
      return this.data?.project;
    },
    kontraktorList: function () {
      return this.users || [];
    },
  },
  data() {
    return {
      id: null,
      editor: ClassicEditor,
      title: "Data List Proyek On Progress",
      items: [
        {
          text: "Dashboard",
          href: "/",
        },
        {
          text: "Data List Proyek On Progress",
          active: true,
        },
      ],
      form: {},
      fields: [
        {
          key: "TITLE",
          label: "Project",
          sortable: true,
        },
        {
          key: "LOCATION",
          label: "Lokasi",
          sortable: true,
        },
        {
          key: "KONTRAKTOR",
          label: "Kontraktor",
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
          key: "progress",
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
};
</script>

<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <DataTable
      :tableData="tableData"
      :fields="fields"
      :label="'Proyek'"
      onDetail
      onCreate
      onEdit
      @create="save"
      @add="id = null, form = {}"
      @edit="edit"
      @detail="detail"
    >
      <template v-slot:modal>
        <div class="row">
          <div class="col-xl-6"> 
            <b-form-group label="Nama Projek">
              <b-form-input
                v-model="form.title"
                type="text"
                placeholder="Nama Projek"
                required
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-xl-6"> 
            <b-form-group label="Lokasi">
              <b-form-input
                v-model="form.location"
                type="text"
                placeholder="Lokasi"
                required
              ></b-form-input>
            </b-form-group>
          </div>
        </div>
        <b-form-group label="Kontraktor">
          <b-form-select placeholder="Pilih" v-model="form.kontraktor" :options="kontraktorList.map(item => ({value: item.USER_ID, text: item.user.NAME}))"></b-form-select>
        </b-form-group>
        <b-form-group label="Deskripsi Projek">
          <ckeditor v-model="form.description" :editor="editor"></ckeditor>
        </b-form-group>
      </template>
    </DataTable>
  </div>
</template>
