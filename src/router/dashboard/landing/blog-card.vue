<script>
export default {
  props: {
    data: Object,
  },
};
</script>

<template>
  <div>
    <div class="card p-1 border shadow-none">
      <div class="p-3">
        <h5>
          <router-link to="/blog/detail" class="text-dark">{{
            $props.data.TITLE
          }}</router-link>
        </h5>
        <p class="text-muted mb-0">
          {{ new Date($props.data.CREATE_DATE).toLocaleString() }}
        </p>
      </div>

      <div class="position-relative">
        <img :src="$props.data.cover.PATH" alt="" class="img-thumbnail" />
      </div>

      <div class="p-3">
        <ul class="list-inline">
          <li class="list-inline-item mr-3">
            <a href="#" class="text-muted">
              <i class="bx bx-purchase-tag-alt align-middle text-muted mr-1"></i>
              Daily News
            </a>
          </li>
          <li class="list-inline-item mr-3">
            <a href="#" class="text-muted">
              <i class="bx bx-comment-dots align-middle text-muted mr-1"></i>
              oleh {{ $props.data.user.NAME }}
            </a>
          </li>
        </ul>
        <!-- <p v-html="$props.data.DESCRIPTION">
          Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet
        </p> -->

        <div>
          <a
            @click="$router.push('/admin/news/' + $props.data.NEWS_ID)"
            class="text-primary"
            style="cursor: pointer"
            >Read more <i class="mdi mdi-arrow-right"></i
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>
