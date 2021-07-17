<script>
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

// import PolarChart from "./PolarChart";
import Blog from "./blog";

export default {
  page: {
    title: "Dashboard",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    PageHeader,
    // PolarChart,
    Blog,
  },
  data() {
    return {
      header: {
        title: "Dashboard",
        items: [
          {
            text: "Dashboard",
            href: "/",
          },
          {
            text: "Dashboard",
            active: true,
          },
        ],
      },
      datasets: [
        {
          title: "STATUS PENGERJAAN",
          datas: [3, 15, 10, 2],
          labels: ["Pengajuan", "Belum Dikerjakan", "Sedang Dikerjakan", "Selesai"],
        },
        {
          title: "DATA WARGA",
          datas: [2, 13, 40],
          labels: ["Belum Diverifikasi", "Sedang Diverifikasi", "Telah Diverifikasi"],
        },
        {
          title: "GRAFIK ADUAN",
          datas: [3, 15, 10],
          labels: ["Jalan Rusak", "Sampah", "Sanitasi"],
        },
      ],
    };
  },
};
</script>

<template>
  <div>
    <PageHeader :title="header.title" :items="header.items" />
    <!-- <div class="row">
      <template v-for="sets in datasets">
        <div class="col-lg-4" :key="sets.title">
          <div class="card">
            <div class="card-body">
              <h4
                class="px-3 py-2 rounded mb-3 shadow font-weight-bold text-center border card-title bg-primary text-white"
              >
                {{ sets.title }}
              </h4>
              <div class="row align-items-center">
                <div class="col-xl-6 row">
                  <template v-for="(label, idx) in sets.labels">
                    <div class="col-xl-12" :key="label + sets.title">
                      <h5 class="mb-0 font-weight-bold">{{ sets.datas[idx] }}</h5>
                      <p class="text-muted">{{ label }}</p>
                    </div>
                  </template>
                </div>
                <div class="col-xl-6 h-100">
                  <PolarChart :height="400" :labels="sets.labels" :datas="sets.datas" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div> -->
    <Blog />
  </div>
</template>
