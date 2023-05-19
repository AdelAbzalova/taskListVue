<template>
  <h1>Список заданий</h1>
  <div class="container">
    <button class="btn" :modal="modal" @click="changeMode('add'), showModal()">
      Добавить задачу
    </button>
    <button class="btn" :modal="modal" @click="changeMode('edit'), showModal()">
      Редактировать
    </button>
    <button class="btn" @click="deleteItem()">Удалить</button>
  </div>
</template>

<script>
import store from "@/store";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "AppHeader",
  methods: {
    ...mapMutations(["changeModal"]),
    ...mapActions({
      changwModal: "changeModal",
      changeMode: "changeMode",
      deleteElem: "deleteElem",
      checkLocalStore: "checkLocalStore",
    }),
    deleteItem() {
      if (this.chosenElem != -1) {
        if (confirm("Вы точно хотите удалить это задание?")) {
          this.deleteElem();
        }
      }
    },
    showModal() {
      if (!(this.mode == "edit" && this.chosenElem == -1)) {
        store.dispatch("changeModal");
      } else {
        alert("Сначала выберите задание для редактирования!");
      }
    },
  },
  computed: {
    ...mapGetters({
      modal: "modal",
      mode: "mode",
      chosenElem: "chosenElem",
    }),
  },
};
</script>

<style scoped>
.btn {
  font-size: 20px;
  background-color: rgb(156, 68, 156);
  color: white;
  border-radius: 10px;
  box-shadow: 5px 5px 3px 1px black;
  width: 300px;
  margin: 15px;
  height: 35px;
}
h1 {
  color: rgb(156, 68, 156);
}
</style>
