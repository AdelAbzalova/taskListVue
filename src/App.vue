<template>
  <app-header></app-header>
  <app-main> </app-main>
  <app-modal v-show="isModalOpen"> </app-modal>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AppHeader from "./components/Header.vue";
import AppMain from "./components/Main.vue";
import AppModal from "./components/Modal.vue";

export default {
  components: {
    AppHeader,
    AppMain,
    AppModal,
  },
  mounted() {
    this.checkLocalStore();
  },
  methods: {
    ...mapActions({
      checkLocalStore: "checkLocalStore",
    }),
  },
  computed: {
    ...mapState({
      isModalOpen: "isModalOpen",
    }),
  },
};
</script>

<style>
:root {
  --btns-bg-color: rgb(156, 68, 156);
  --main-bg-color: rgb(249, 221, 249);
  --selected-bg-color: rgba(177, 72, 207, 0.5);
  --modal-bg-color: rgb(134, 102, 166);
  --modal-text-color: rgb(236, 236, 236);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
