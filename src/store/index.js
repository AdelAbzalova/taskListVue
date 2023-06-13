import { createStore } from "vuex";
export default createStore({
  state: {
    items: [],
    isModalOpen: false,
    mode: "",
    chosenElem: null,
  },
  getters: {
  },
  mutations: {
    SAVE_CHANGE(state, payload) {
      if (state.mode == "add") {
        state.items.push(payload.exercise);
      } else if (state.mode == "edit") {
        state.items[payload.chosenElem] = payload.exercise;
      }
      this.commit("SAVE_LOCAL_STORE");
    },
    CHANGE_CHECKBOX(state, payload) {
      state.items[payload.indOfEx].checked[payload.indOfTask] = payload.isChecked;
    },
    TOGGLE_MODAL(state) {
      state.isModalOpen = !state.isModalOpen;
    },
    CHANGE_MODE(state, mode) {
      state.mode = mode;
    },
    CHANGE_CHOSEN_ELEM(state, index) {
      state.chosenElem = index;
    },
    DELETE_ELEM(state) {
      state.items.splice(state.chosenElem, 1);
      this.commit("SAVE_LOCAL_STORE");
    },
    CHECK_LOCAL_STORE(state) {
      if (localStorage.getItem("items")) {
        try {
          state.items = JSON.parse(localStorage.getItem("items"));
        } catch (e) {
          localStorage.removeItem("items");
        }
      }
    },
    SAVE_LOCAL_STORE(state) {
      const parsed = JSON.stringify(state.items);
      localStorage.setItem("items", parsed);
    },
  },
  actions: {
    saveChange(store, [exercise, chosenElem]) {
      store.commit("SAVE_CHANGE", {exercise:exercise, chosenElem:chosenElem});
    },
    changeCheckbox(store, [indOfEx, indOfTask, isChecked]) {
      store.commit("CHANGE_CHECKBOX", {indOfEx:indOfEx, indOfTask:indOfTask, isChecked:isChecked});
    },
    toggleModal(store) {
      store.commit("TOGGLE_MODAL");
    },
    changeMode(store, mode) {
      store.commit("CHANGE_MODE", mode);
    },
    changeChosenElem(store, index) {
      store.commit("CHANGE_CHOSEN_ELEM", index);
    },
    deleteElem(store) {
      store.commit("DELETE_ELEM");
    },
    checkLocalStore(store) {
      store.commit("CHECK_LOCAL_STORE");
    },
    saveLocalStore(store) {
      store.commit("SAVE_LOCAL_STORE");
    },
  },
});
