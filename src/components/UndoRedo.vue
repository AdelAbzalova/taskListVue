<!-- <template>
    <div>
      <button @click="undo">Undo</button>
      <button @click="redo">Redo</button>
      <button @click="someAction">someaction</button>
      <button @click="anotherAction">another</button>

    </div>
  </template>
  
  <script>
  export default{
    
    name:'AppDo',
    data() {
      return {
        history: [],
        currentIndex: -1,
        // Модель данных компонента
        data: {
          // ...
        }
      }
    },
    methods: {
      // Добавление нового состояния в историю
      addToHistory() {
        const dataCopy = JSON.parse(JSON.stringify(this.data)) // создаем копию модели данных
        this.history.splice(this.currentIndex + 1, this.history.length - this.currentIndex, dataCopy)
        this.currentIndex++
      },
      // Отмена последнего изменения
      undo() {
        if (this.currentIndex > -1) {
          this.currentIndex--
          this.data = JSON.parse(JSON.stringify(this.history[this.currentIndex]))
        }
      },
      // Возврат последнего отмененного изменения
      redo() {
        if (this.currentIndex < this.history.length - 1) {
          this.currentIndex++
          this.data = JSON.parse(JSON.stringify(this.history[this.currentIndex]))
        }
      },
      // Некоторое действие, которое изменяет модель данных
      someAction() {
        this.addToHistory()
        // Изменение модели данных
        // Vue.set(this.data, "someKey", "someValue")
        this.data["someKey"] = "someValue";
        console.log('set', this.data)
        // ...
      },
      // Другое действие, которое изменяет модель данных
      anotherAction() {
        this.addToHistory()
        // Изменение модели данных
        // Vue.delete(this.data, "someKey")
        delete this.data["someKey"];
        console.log('del', this.data)
        // ...
      }
    }
  }
  </script> -->
  
  <template>
    <div>
      <textarea v-model="text" @input="updateHistory"></textarea>
      <div>
        <button @click="undo" :disabled="undoDisabled">Undo</button>
        <button @click="redo" :disabled="redoDisabled">Redo</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        text: "",
        history: [],
        currentIndex: 0,
      };
    },
    computed: {
      undoDisabled() {
        return this.currentIndex === 0;
      },
      redoDisabled() {
        return this.currentIndex === this.history.length;
      }
    },
    methods: {
      updateHistory() {
        this.history = this.history.slice(0, this.currentIndex);
        this.history.push({
          type: "text",
          data: this.text,
        });
        this.currentIndex++;
      },
      undo() {
        if (this.currentIndex > 0) {
          this.currentIndex--;
          this.text = this.history[this.currentIndex].data;
        }
      },
      redo() {
        if (this.currentIndex < this.history.length) {
          this.text = this.history[this.currentIndex].data;
          this.currentIndex++;
        }
      },
    },
  };
  </script>
  