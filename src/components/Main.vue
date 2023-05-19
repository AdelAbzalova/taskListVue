<template>
  <div class="container" @click="putListener()">
    <table v-show="this.items.length != 0">
      <tr>
        <th>Задание</th>
        <th>Задачи</th>
      </tr>

      <tr
        v-for="(item, index) in items"
        :key="index"
        @click="changeChosenElem(index)"
        v-bind:class="chosenElem == index ? 'selected' : ''"
      >
        <td class="container-exercise">{{ item.exercise }}</td>
        <td class="container-task">
          <ul>
            <li v-for="(task, ind) in item.tasks" :key="ind">
              <input
                type="checkbox"
                :id="index + String(ind)"
                :checked="item.checked[ind]"
                @change="changeCheckbox(index, ind)"
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
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AppMain",
  methods: {
    ...mapActions(["changeCheckbox", "changeChosenElem"]),

    changeCheckbox(index, ind) {
      let isChecked;
      isChecked = !this.items[index].checked[ind];
      this.$store.dispatch("changeCheckbox", [index, ind, isChecked]);
    },
    changeChosenElem(index) {
      this.$store.dispatch("changeChosenElem", index);
    },
    putListener() {
      document.addEventListener("click", (e) => {
        if (
          e.target.tagName != "TD" &&
          e.target.tagName != "LI" &&
          e.target.tagName != "INPUT" &&
          this.modal == false
        ) {
          this.changeChosenElem(-1);
        }
      });
    },
  },
  computed: {
    ...mapGetters({
      items: "items",
      chosenElem: "chosenElem",
      modal: "modal",
    }),
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-around;
}
table {
  font-size: 20px;
}
tr {
  background-color: rgb(249, 221, 249);
}
th {
  background-color: rgb(233, 179, 233);
}
td {
  width: 600px;
  border-collapse: collapse;
}
.container-exercise {
}
.container-task {
  text-align: start;
}
li {
  list-style: none;
}
.selected {
  background-color: rgba(177, 72, 207, 0.5);
}
</style>
