<script>
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import CardPengaduan from "@/components/card-pengaduan";

export default {
  page: {
    title: "Kategori Pengaduan",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    PageHeader,
    CardPengaduan,
  },
  data() {
    return {
      header: {
        title: "Kategori Pengaduan",
        items: [
          {
            text: "Dashboard",
            href: "/",
          },
          {
            text: "Kategori Pengaduan",
            active: true,
          },
        ],
      },
      data: [
        {
          id: 1,
          title: "Sampah",
          subtitle: 'Fasilitas Sampah & Kebersihan',
          category: "A",
          img:
            "https://discover.rbcroyalbank.com/wp-content/uploads/banner-small-garbage-day_402x-1.jpg",
        },
        {
          id: 2,
          title: "Pembangunan Rumah",
          subtitle: 'Lahan Pemukiman & Layanan',
          category: "B",
          img:
            "https://assets.weforum.org/article/image/large_15gAQdddPzO5Cn18bJ--4zQTUHrfpVxWQbAQ6jhvTSc.jpg",
        },
        {
          id: 3,
          title: "Perbaikan Jalan",
          subtitle: 'Kerusakan & Rekomendasi Perbaikan',
          category: "C",
          img:
            "https://industrytoday.com/wp-content/uploads/2020/09/asphalt-repair.jpg",
        },
        {
          id: 4,
          title: "Pelayanan",
          subtitle: 'Pelayanan Kantor Pemerintahan',
          category: "D",
          img:
            "https://asset.kompas.com/crops/e4Dyl4Q_V8a9FDBgsnB9-45UIuI=/0x0:0x0/750x500/data/photo/2015/12/30/1016138IMG-20151230-090841p.jpg",
        },
        {
          id: 5,
          title: "Transportasi",
          subtitle: 'Penyedian Transportasi dan Lainnya',
          category: "E",
          img:
            "https://www.itdp.org/wp-content/uploads/2019/05/Traffic-USA-1-e1558632602236.jpg",
        },
      ],
    };
  },
};
</script>

<template>
  <div>
    <PageHeader :title="header.title" :items="header.items" />
    <div class="container-fluid">
      <div class="row">
        <template v-for="item in data">
          <div class="col-lg-4 col-xl-3 col-md-6" :key="item.id">
            <CardPengaduan
              :title="item.title"
              :subtitle="item.subtitle"
              :img="item.img"
              :link="
                '/admin/pengaduan/data-aduan/' + item.category + `?title=${item.title}`
              "
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
