<template>
  <h1 class="header-title">Список заданий</h1>
  <div class="container">
    <button class="btn" @click="changeMode('add'), showModal()">
      Добавить задачу
    </button>
    <button class="btn" @click="changeMode('edit'), showModal()">
      Редактировать
    </button>
    <button class="btn" @click="deleteItem()">Удалить</button>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "AppHeader",
  methods: {
    ...mapMutations(["toggleModal"]),
    ...mapActions({
      toggleModal: "toggleModal",
      changeMode: "changeMode",
      deleteElem: "deleteElem",
      checkLocalStore: "checkLocalStore",
    }),
    deleteItem() {
      if (this.chosenElem != null) {
        if (confirm("Вы точно хотите удалить это задание?")) {
          this.deleteElem();
        }
      } else {
        alert("Выберите задание для удаления!!!");
      }
    },
    showModal() {
      if (!(this.mode === "edit" && this.chosenElem === null)) {
        this.toggleModal();
      } else {
        alert("Сначала выберите задание для редактирования!");
      }
    },
  },
  computed: {
    ...mapState({
      isModalOpen: "isModalOpen",
      mode: "mode",
      chosenElem: "chosenElem",
    }),
  },
};
</script>

<style scoped>
.btn {
  font-size: 20px;
  background-color: var(--btns-bg-color);
  color: white;
  border-radius: 10px;
  box-shadow: 5px 5px 3px 1px black;
  width: 300px;
  margin: 15px;
  height: 35px;
}
.header-title {
  color: var(--btns-bg-color);
  text-align: center;
}
.container {
  text-align: center;
}
</style>
