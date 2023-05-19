<template>
  <app-header></app-header>
  <app-main> </app-main>
  <app-modal v-show="modal"> </app-modal>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
    onModalChange(mod) {
      this.modal = mod;
    },
  },
  computed: {
    ...mapGetters({
      items: "items",
      modal: "modal",
    }),
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
