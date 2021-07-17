<script>
import BlogCard from "./blog-card.vue";

import { mapState, mapActions } from "vuex";

export default {
  components: {
    BlogCard,
  },
  computed: {
    ...mapState("news", ["data"]),
    newsList: function () {
      return this.data?.news;
    },
  },
  methods: {
    ...mapActions("news", ["getAll"]),
  },
  mounted() {
    this.getAll();
  },
  data() {
    return {
      title: "Blog Grid",
      items: [
        {
          text: "Blog",
          href: "/",
        },
        {
          text: "Blog Grid",
          active: true,
        },
      ],
    };
  },
};
</script>

<template>
  <div class="row">
    <div class="col-xl-9 col-lg-8">
      <div class="card">
        <div class="mt-5">
          <div class="row justify-content-center">
            <div class="col-xl-10">
              <div>
                <div class="row align-items-center">
                  <div class="col-4">
                    <div>
                      <h5 class="mb-0">Berita Terkini</h5>
                    </div>
                  </div>
                </div>
                <!-- end row -->

                <hr class="mb-4" />

                <div class="row">
                  <template v-for="(data, idx) in newsList">
                    <div class="col-sm-6" :key="idx + 'news'">
                      <BlogCard :data="data" />
                    </div>
                  </template>
                </div>

                <hr class="my-4" />

                <!-- <div class="text-center">
                  <ul class="pagination justify-content-center pagination-rounded">
                    <li class="page-item disabled">
                      <a href="#" class="page-link"
                        ><i class="mdi mdi-chevron-left"></i
                      ></a>
                    </li>
                    <li class="page-item">
                      <a href="#" class="page-link">1</a>
                    </li>
                    <li class="page-item active">
                      <a href="#" class="page-link">2</a>
                    </li>
                    <li class="page-item">
                      <a href="#" class="page-link">3</a>
                    </li>
                    <li class="page-item">
                      <a href="#" class="page-link">...</a>
                    </li>
                    <li class="page-item">
                      <a href="#" class="page-link">10</a>
                    </li>
                    <li class="page-item">
                      <a href="#" class="page-link"
                        ><i class="mdi mdi-chevron-right"></i
                      ></a>
                    </li>
                  </ul>
                </div> -->
              </div>
            </div>
          </div>
        </div>
        <!-- Nav tabs -->
      </div>
    </div>

    <div class="col-xl-3 col-lg-4">
      <div class="card">
        <div class="card-body p-4">
          <div>
            <p class="text-muted">Kategori</p>

            <ul class="list-unstyled font-weight-medium">
              <li>
                <a href="#" class="text-muted py-2 d-block"
                  ><i class="mdi mdi-chevron-right mr-1"></i> Pembangunan</a
                >
              </li>
              <li>
                <a href="#" class="text-muted py-2 d-block"
                  ><i class="mdi mdi-chevron-right mr-1"></i> Perbaikan
                  <span
                    class="badge badge-soft-success badge-pill float-right ml-1 font-size-12"
                    >04</span
                  ></a
                >
              </li>
              <li>
                <a href="#" class="text-muted py-2 d-block"
                  ><i class="mdi mdi-chevron-right mr-1"></i> Event</a
                >
              </li>
            </ul>
          </div>

          <hr class="my-4" />

          <div>
            <p class="text-muted mb-2">Berita Terbaru</p>

            <div class="list-group list-group-flush">
              <a href="#" class="list-group-item text-muted py-3 px-2">
                <div class="media align-items-center">
                  <div class="mr-3">
                    <img
                      src="@/assets/images/small/img-7.jpg"
                      alt=""
                      class="avatar-md h-auto d-block rounded"
                    />
                  </div>
                  <div class="media-body overflow-hidden">
                    <h5 class="font-size-13 text-truncate">Beautiful Day with Friends</h5>
                    <p class="mb-0 text-truncate">10 Apr, 2020</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- end card -->
    </div>
  </div>
  <!-- end row -->
</template>
