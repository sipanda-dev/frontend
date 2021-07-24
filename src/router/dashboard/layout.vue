<script>
import router from "@/router";
import { layoutComputed } from "@/state/helpers";
import Loading from "vue-loading-overlay";

import NavBar from "@/components/nav-bar";
import SideBar from "@/components/side-bar";
import Footer from "@/components/footer";
import { mapActions, mapState } from "vuex";
/**
 * Vertical layout
 */
export default {
  components: { NavBar, SideBar, Footer, Loading },
  data() {
    return {
      isMenuCondensed: false,
    };
  },
  computed: {
    ...layoutComputed,
    user: mapState("auth", ["data"]).data,
    authIsLoading: mapState("auth", ["isLoading"]).isLoading,
    newsIsLoading: mapState("news", ["isLoading"]).isLoading,
    accountIsLoading: mapState("account", ["isLoading"]).isLoading,
    complaintIsLoading: mapState("complaint", ["isLoading"]).isLoading,
    fileIsLoading: mapState("files", ["isLoading"]).isLoading,
    isLoading: function () {
      return (
        this.authIsLoading ||
        this.newsIsLoading ||
        this.accountIsLoading ||
        this.complaintIsLoading ||
        this.fileIsLoading 
      );
    },
  },
  created: () => {
    document.body.removeAttribute("data-layout", "horizontal");
    document.body.removeAttribute("data-topbar", "dark");
    document.body.removeAttribute("data-layout-size", "boxed");
    document.body.classList.remove("auth-body-bg");
  },
  methods: {
    ...mapActions("auth", ["getUserData"]),
    toggleMenu() {
      document.body.classList.toggle("sidebar-enable");

      if (window.screen.width >= 992) {
        // eslint-disable-next-line no-unused-vars
        router.afterEach((routeTo, routeFrom) => {
          document.body.classList.remove("sidebar-enable");
          document.body.classList.remove("vertical-collpsed");
        });
        document.body.classList.toggle("vertical-collpsed");
      } else {
        // eslint-disable-next-line no-unused-vars
        router.afterEach((routeTo, routeFrom) => {
          document.body.classList.remove("sidebar-enable");
        });
        document.body.classList.remove("vertical-collpsed");
      }
      this.isMenuCondensed = !this.isMenuCondensed;
    },
    toggleRightSidebar() {
      document.body.classList.toggle("right-bar-enabled");
    },
    hideRightSidebar() {
      document.body.classList.remove("right-bar-enabled");
    },
  },
  mounted() {
    // this.toggleMenu()
    if (!this.user || !this.user?.user) {
      this.getUserData();
    }
    if (this.loader === true) {
      document.getElementById("preloader").style.display = "block";
      document.getElementById("status").style.display = "block";

      setTimeout(function () {
        document.getElementById("preloader").style.display = "none";
        document.getElementById("status").style.display = "none";
      }, 2500);
    } else {
      document.getElementById("preloader").style.display = "none";
      document.getElementById("status").style.display = "none";
    }
  },
};
</script>

<template>
  <div>
    <loading :active.sync="isLoading" 
        is-full-page lock-scroll loader='dots' color='#51A5F1'
    />
    <div id="preloader">
      <div id="status">
        <div class="spinner-chase">
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
        </div>
      </div>
    </div>
    <div id="layout-wrapper">
      <NavBar />
      <SideBar :is-condensed="isMenuCondensed" :type="leftSidebarType" :width="layoutWidth" />
      <!-- ============================================================== -->
      <!-- Start Page Content here -->
      <!-- ============================================================== -->

      <div class="main-content">
        <div class="page-content">
          <!-- Start Content-->
          <div class="container-fluid">
            <slot />
            <transition name="fade" mode="out-in">
            <router-view />
            </transition>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>
