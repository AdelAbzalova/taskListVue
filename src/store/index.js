import { createStore } from "vuex";
export default createStore({
  state: {
    items: [],
    modal: false,
    mode: "",
    chosenElem: -1,
  },
  getters: {
    items(state) {
      return state.items;
    },
    modal(state) {
      return state.modal;
    },
    mode(state) {
      return state.mode;
    },
    chosenElem(state) {
      return state.chosenElem;
    },
  },
  mutations: {
    saveChange(state, [exer, chosenElem]) {
      if (state.mode == "add") {
        state.items.push(exer);
      } else if (state.mode == "edit") {
        state.items[chosenElem] = exer;
        console.log("exer", exer);
        console.log(state.items);
      }
      this.commit("saveLocalStore");
    },
    changeCheckbox(state, [indOfEx, indOfTask, isChecked]) {
      state.items[indOfEx].checked[indOfTask] = isChecked;
    },
    changeModal(state, newModal) {
      state.modal = !newModal;
    },
    changeMode(state, mode) {
      state.mode = mode;
    },
    changeChosenElem(state, index) {
      state.chosenElem = index;
    },
    deleteElem(state) {
      state.items.splice(state.chosenElem, 1);
      this.commit("saveLocalStore");
    },
    checkLocalStore(state) {
      if (localStorage.getItem("items")) {
        try {
          state.items = JSON.parse(localStorage.getItem("items"));
          console.log("this.items", state.items);
        } catch (e) {
          localStorage.removeItem("items");
        }
      }
    },
    saveLocalStore(state) {
      const parsed = JSON.stringify(state.items);
      localStorage.setItem("items", parsed);
    },
  },
  actions: {
    saveChange(store, [exer, chosenElem]) {
      store.commit("saveChange", [exer, chosenElem]);
    },
    changeCheckbox(store, [indOfEx, indOfTask, isChecked]) {
      store.commit("changeCheckbox", [indOfEx, indOfTask, isChecked]);
    },
    changeModal(store) {
      console.log(this.state.modal);
      store.commit("changeModal", this.state.modal);
    },
    changeMode(store, mode) {
      store.commit("changeMode", mode);
    },
    changeChosenElem(store, index) {
      store.commit("changeChosenElem", index);
    },
    deleteElem(store) {
      store.commit("deleteElem");
    },
    checkLocalStore(store) {
      store.commit("checkLocalStore");
    },
    saveLocalStore(store) {
      store.commit("saveLocalStore");
    },
  },
});
