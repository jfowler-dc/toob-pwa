<template>
  <div id="app" class="flex flex-col">
    <navigation/>
    <router-view/>
  </div>
</template>
<script>
import Navigation from './components/Navigation.vue';
export default {
  data() {
    return {

    }
  },
  created() {
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.showUpgradeUI = true;
      });
    }
  },
  methods: {
    async accept() {
      this.showUpgradeUI = false
      await this.$workbox.messageSW({ type: "SKIP_WAITING" });
    }
  },
  components: {
    Navigation
  }
}
</script>

