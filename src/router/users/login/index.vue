<script>
import appConfig from "@/app.config";

import Form from "./form.vue";

export default {
  components: {
    Form,
  },
  page: {
    title: "Login",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
};
</script>

<template>
  <div class="account-pages">
    <div class="" style="margin: 0 5%">
      <div class="row justify-content-center vh-100 align-items-center">
        <div class="col-md-8 col-lg-6 col-xl-5 mx-3" style="max-width: 500px">
          <div class="card overflow-hidden">
            <div class="card-body pt-0 shadow-lg">
              <div class="p-2">
                <center class="my-3">
                  <img src="@/assets/sipanda/logo.png" alt class="img-fluid" />
                </center>
                <Form />
              </div>
            </div>
          </div>
          <div class="mt-3 text-center">
            <p>© {{ new Date().getFullYear() }} Sipanda. Allrights Reserved.</p>
          </div>
        </div>
        <div class="col-md-4 col-lg-6 col-xl-7">
          <img src="@/assets/sipanda/cities.png" width="100%" />
        </div>
      </div>
    </div>
  </div>
</template>
