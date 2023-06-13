<template @click="putListener()">
  <div class="container">
    <table class="container-table" v-show="this.items.length != 0">
      <tr class="container-tr">
        <th>Задание</th>
        <th>Задачи</th>
      </tr>

      <tr
        class="container-tr"
        v-for="(item, index) in items"
        :key="'exercise' + index"
        @click="changeChosenElem(index)"
        :class="chosenElem == index ? 'selected' : ''"
      >
        <td class="container-td , container-exercise">{{ item.exercise }}</td>
        <td class="container-td ,container-task">
          <ul>
            <li
              v-for="(task, ind) in item.tasks"
              class="container-li"
              :key="'task' + index + ind"
            >
              <input
                type="checkbox"
                :id="index + String(ind)"
                :checked="item.checked[ind]"
                @change="
                  changeCheckbox([index, ind, !this.items[index].checked[ind]])
                "
              />
              <label :for="index + String(ind)">{{ task }}</label>
            </li>
          </ul>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "AppMain",
  mounted() {
    document.addEventListener("click", (e) => {
      if (
        e.target.tagName != "TD" &&
        e.target.tagName != "LI" &&
        e.target.tagName != "INPUT" &&
        this.isModalOpen == false
      ) {
        this.changeChosenElem(null);
      }
    });
  },

  methods: {
    ...mapActions({
      changeCheckbox: "changeCheckbox",
      changeChosenElem: "changeChosenElem",
    }),
  },

  computed: {
    ...mapState({
      items: "items",
      chosenElem: "chosenElem",
      isModalOpen: "isModalOpen",
    }),
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-around;
}
.container-table {
  font-size: 20px;
}
.container-tr {
  background-color: var(--main-bg-color);
}
.container-td {
  width: 600px;
  border-collapse: collapse;
}
.container-exercise {
  text-align: center;
}
.container-task {
  text-align: start;
}
.container-li {
  list-style: none;
}
.selected {
  background-color: var(--selected-bg-color);
}
</style>
