<template>
  <v-app class="gp-full-height">
    <Header />
    <!-- Provides the application the proper gutter -->
    <v-parallax dark src="./assets/job3.jpg" height="100%">
      <Jobs v-if="$root.menuOption === 1" />
      <Persons v-if="$root.menuOption === 2" />
    </v-parallax>
    <Footer />
  </v-app>
</template>

<script>
import Vue from "vue";
import debounce from "lodash/debounce";
import Persons from "./components/Persons";
import Jobs from "./components/Jobs";
import Header from "./components/Header";
import Footer from "./components/Footer";

require("./assets/css/app.scss");

export default Vue.extend({
  name: "App",

  components: {
    Header,
    Persons,
    Jobs,
    Footer,
  },
  methods: {
    setViewHeight() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    },
  },

  mounted() {
    this.setViewHeight();

    const debouncedSetHeight = debounce(this.setViewHeight, 50);

    window.addEventListener("resize", debouncedSetHeight);

    this.$once("destroyed", () => {
      window.removeEventListener("resize", debouncedSetHeight);
    });
  },
});
</script>
<style scoped lang="scss">

.gp-full-height ::v-deep .v-application--wrap {
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
}
</style>

