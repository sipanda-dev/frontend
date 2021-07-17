<script>
export default {
  props: {
    title: String,
    subtitle: String,
    img: String,
    link: String,
  },
  methods: {
    on_link() {
      this.$router.push(this.$props.link);
    },
  },
};
</script>

<template>
  <div
    class="d-flex align-items-end card-pengaduan"
    :style="`background-image: url('${$props.img}');`"
  >
    <div class="card w-100 mt-auto" style="border-radius: 20px; margin-bottom: -0.1em">
      <div class="card-body">
        <h4 class="font-weight-bold mb-1">{{ $props.title }}</h4>
        <div class="d-flex">
          <h6 class="mb-0 mr-auto">{{ $props.subtitle }}</h6>
          <h6
            class="mb-0 text-primary font-weight-bold"
            style="cursor: pointer"
            @click="on_link"
          >
            <i class="fa fa-chevron-right mr-1" />Detail
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.card-pengaduan {
  margin-top: 1em;
  margin-bottom: 1em;
  border-radius: 20px;
  height: 250px;
  transition: height 1s, margin 1s;
  background-size: cover;
  background-position: center;
}
.card-pengaduan:hover {
  margin-top: 0em;
  margin-bottom: 0em;
  height: 300px;
}
</style>
