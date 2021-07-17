<script>
import appConfig from "@/app.config";
import PageHeader from "@/components/page-header";
import DataTable from "../../../components/datatable.vue";

import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { mapState, mapActions } from "vuex";

export default {
  page: {
    title: "Manajemen Berita",
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
  computed: {
    ...mapState("news", ["data"]),
    tableData: function () {
      return this.data?.news;
    },
  },
  methods: {
    ...mapActions("news", ["getAll", "createNews", "deleteNews", "editNews"]),
    submit() {
      let data = {
        title: this.form.title,
        description: this.editorData,
      };
      let cover = new FormData();
      cover.append("file", this.form.cover);
      let payload = {
        data,
        cover,
        id: this.id,
      };
      if (!this.id) this.createNews(payload);
      else this.editNews(payload);
      window.$(".vld-icon").hide();
    },
    remove(item) {
      this.deleteNews(item.NEWS_ID);
    },
    edit(item) {
      this.id = item.NEWS_ID;
      this.form.title = item.TITLE;
      this.editorData = item.DESCRIPTION;
      this.date = new Date(item.CREATE_DATE);
      this.penulis = item.user.NAME;
    },
    detail(item) {
      this.$router.push("/admin/news/" + item.NEWS_ID);
    },
  },
  mounted() {
    this.getAll();
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: "<h3>Hello World!</h3><h5><b>This is an simple editable area.</b></h5>",
      form: { date: new Date(), penulis: "Muhammad Abdurrahman Al Jauzy" },
      title: "Manajemen Berita",
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
      fields: [
        {
          key: "cover",
          sortable: false,
        },
        {
          key: "TITLE",
          sortable: true,
        },
        {
          key: "CREATE_DATE",
          sortable: true,
        },
        {
          key: "user",
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
      :label="'Berita'"
      @add="id = null, form = {}"
      @create="submit"
      @delete="remove"
      @edit="edit"
      @detail="detail"
      onDetail
      onDelete
      onCreate
      onEdit
    >
      <template v-slot:modal>
        <b-form-group label="Judul Berita">
          <b-form-input
            v-model="form.title"
            type="text"
            placeholder="Judul Berita"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Cover Berita">
          <b-form-file
            accept="image/*"
            v-model="form.cover"
            placeholder="Pilih file atau seret kesini..."
            drop-placeholder="Seret file kesini..."
          ></b-form-file>
        </b-form-group>
        <div class="row">
          <div class="col-lg-6">
            <b-form-group label="Penulis">
              <h5>{{ $store.state.auth.data.user.NAME }}</h5>
            </b-form-group>
          </div>
          <div class="col-lg-6">
            <b-form-group label="Tanggal">
              <h5>{{ form.date.toLocaleString() }}</h5>
            </b-form-group>
          </div>
        </div>
        <ckeditor v-model="editorData" :editor="editor"></ckeditor>
      </template>
    </DataTable>
  </div>
</template>
