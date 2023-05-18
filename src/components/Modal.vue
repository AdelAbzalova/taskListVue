<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
        {{ this.mode=='add'? 'Добавление задания!' : 'Редактирование задания!' }}
          <button
            type="button"
            class="btn-close"
            :modal="modal"
            @click="close()" >
            x
          </button>
        </slot>
      </header>
      <section class="modal-body">
        <slot name="body">
            <div class="body-exercise">
            <div class="body-header">Задание:</div>
          
          <!-- <div class="enterTask"> -->
            <textarea name="" id="" cols="40" rows="3" 
                      v-model='this.exercise'  
                      class="body-textarea"
                      @input='updateHistory'>
            </textarea>
          <!-- </div> -->
        </div>
        <div class="body-list">
            <div >
                Список задач:
            </div>
            <div>
                <button class="btn btn-first" 
                        @click="addTask()">
                        Добавить
                </button>
                <button class="btn" 
                        @click="deleteTask()">
                        Удалить
                </button>
            </div>
        </div>
        <div class="body-table" >
            <table v-show="tasks.length!=0">
                <tr>
                    <th>
                        Статус
                    </th>
                    <th>
                        Название
                    </th>
                </tr>
                
                <tr v-for="(task, index) in tasks" 
                    :key="index" 
                    @click="chooseElem(index)">
                  
                <td>
                  <input type="checkbox" 
                        @change="changeCheckbox(index), updateHistory()" 
                        :checked="checked[index] " >
                </td>
                <td>
                    <input type="text"  
                          @input="changeTask($event, index), updateHistory(), task = $event.target.value" 
                          :value="task"
                         >
                  
                </td>
                </tr>
            </table>
            <!-- {{ this.items }} -->
            {{ this.tasks }}
            {{ this.exercise }}
        </div>
        </slot>
       </section>
       <footer class="modal-footer">
          <slot name="footer">
            <app-do></app-do>
            <button class="btn"
                    :class="{ 'btn-disabled' : redoDisabled }"
                    :disabled="redoDisabled"
                    @click="redo">
                    Вперед
            </button>
            <button class="btn"
                    :class="{ 'btn-disabled' : undoDisabled }"
                    @click="undo"
                    :disabled="undoDisabled">
                    Назад
            </button>
            <button class="btn"
                     @click="changeSave(), close()"
                     >
                     Сохранить
            </button>

            <button
              type="button"
              class="btn-green btn"
              :modal="modal"
              @click=" confirmClose()">
              Закрыть
          </button>
        </slot>
      </footer>
    </div>
  </div>


</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AppDo from './UndoRedo.vue';
import store from '@/store';
  export default {
    name: 'AppModal',
    components:{
      AppDo,
    },
   props:{
    // chosenElem:Number,
   },
   data(){
    return {
      exercise:'',
      tasks:[],
      checked:[],
      chosenIndex:'',
      history:[{
        exercise:'',
        tasks:[],
        checked:[]
      }
    ], 
      historyIndex:0,
    }
   },
  //  updated() {    
  //   // if (this.chooseElem!=-1 && this.mode=='edit'){
  //   //     this.exercise=this.items[this.chosenElem].exercise
  //   //     this.tasks.push(this.items[this.chosenElem].tasks)
  //   //     this.checked.push(this.items[this.chosenElem].checked)
  //   // }
  //     },
    methods: {
      ...mapActions( {
        saveChange:'saveChange',
        // close:'changeModal'
        changeModal:'changeModal'
      }),
      // close() {
      //   this.changeModal
      //   // this.$emit('update:modal', false);
      // },
      addTask(){
        this.tasks.push('');
        this.updateHistory();
      },
      changeTask(e, index){
        this.tasks[index]=e.target.value
        // this.checked[index]=false
      },
      changeCheckbox(index){
        this.checked[index]=!this.checked[index]  
      }, 
      chooseElem(index){
        this.chosenIndex=index
      },
      deleteTask(){
        this.checked.splice(this.chosenIndex,1);
        this.tasks.splice(this.chosenIndex,1)
      }, 
      changeSave(){
        if(this.exercise!=''){
        store.dispatch('saveChange', [{
          exercise:this.exercise,
          tasks:this.tasks, 
          checked:this.checked
        }, this.chosenElem
      ]);
        }
      },
      confirmClose(){
        if (this.mode=='edit'){
          if (confirm("Вы точно хотите отменить редактирование?"))
  {
    this.close()
  }

}
else{
  this.close()
}
      },
      close(){
    store.dispatch('changeModal');
        this.clearFields()
    },
      clearFields(){
      this.exercise='';
      this.tasks=[];
      this.checked=[];
      this.chosenIndex='';
      },
      updateHistory() {
        console.log('updhist', this.history);
        console.log('task', this.tasks)
        // if (this.historyIndex==0 && this.tasks.length==0){
        //   this.addTask()
        // }
        if (this.historyIndex==0){
          // if (this.history[0].exercise==''){

          // }
         
          this.history.push({
            exercise:this.exercise,
          tasks:this.tasks,
          checked:this.checked
          })

          this.historyIndex++;
        }
        
        this.history=JSON.parse(JSON.stringify(this.history.slice(0, this.historyIndex)))
        // this.history = this.history.slice(0, this.historyIndex)
        // this.history[this.historyIndex].tasks[0]='';
        this.history.push({
          exercise:this.exercise,
          tasks:this.tasks,
          checked:this.checked
          
        });
        this.historyIndex++;
        
  
      },
      undo() {
        console.log('curind', this.historyIndex)
        if (this.historyIndex==this.history.length){
            this.historyIndex--;
          }
        if (this.historyIndex > 0) {
          this.historyIndex--;
        
          this.exercise = this.history[this.historyIndex].exercise;
          for (let i=0; i<this.history[this.historyIndex].tasks.length; i++){
            // Vue.$set(this.tasks,i,this.history[this.historyIndex].tasks[i])
             this.tasks[i]=this.history[this.historyIndex].tasks[i];
             this.checked[i] = this.history[this.historyIndex].checked[i];
            // this.tasks[i].set(this.history[this.historyIndex].tasks[i])
          }
          // this.tasks = this.history[this.historyIndex].tasks;
          this.checked = this.history[this.historyIndex].checked;
          console.log('ind', this.historyIndex)
          console.log('history', this.history)

        }
      },
      redo() {
        if (this.historyIndex < this.history.length) {
          this.exercise = this.history[this.historyIndex].exercise;
          this.tasks = this.history[this.historyIndex].tasks;
          this.checked = this.history[this.historyIndex].checked;
          this.historyIndex++;
        }
      },
//       undoChange(){
// //         const inp = document.querySelector('input');
// // inp.addEventListener('click', e => {
//   document.dispatchEvent(
//     new KeyboardEvent('keydown', {
//       // keyCode: 13,
//       ctrlKey: true,
//       KeyZ:true
//     })
//   );
// // });

// document.addEventListener('keydown', e => {
//   if (e.ctrlKey && e.KeyZ) {
//     console.log('Hi there');
//   }
// });
//       }
    },

    computed:{
    ...mapGetters({
        items:'items',
        modal:'modal',
        mode:'mode', 
        chosenElem:'chosenElem'
      }),
      undoDisabled() {
        return this.historyIndex === 0;
      },
      redoDisabled() {
        return this.historyIndex === this.history.length;
      }
    },
watch:{
  modal: function (){
    if (this.chosenElem!=-1 && this.mode=='edit' && this.modal==true){
        this.exercise=this.items[this.chosenElem].exercise
        this.tasks=this.items[this.chosenElem].tasks
        this.checked=this.items[this.chosenElem].checked
        // console.log('chosenElem',this.chosenElem)
    }
    else{
      this.clearFields();
// console.log('else worked')
// console.log('chosenElem',this.chosenElem)
// console.log(this.mode)
// console.log(this.modal)
// console.log(this.exercise!='')
    }
  }
}
  };
</script>

<style scoped>

.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;

  }

  .modal {
    background: #fef8ff;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    width: 700px;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    /* color: #4AAE9B; */
    color:rgb(134, 102, 166);
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    padding: 0px;
    cursor: pointer;
    font-weight: bold;
    color:rgb(134, 102, 166);
    /* color:rgba(113, 82, 154, 0); */
    background: transparent;
  }

  .btn {
    color: rgb(236, 236, 236);
    /* background: rgb(192, 80, 192); */
    background-color:rgb(134, 102, 166);
    height: 30px;
    width: 100px;
    border-radius: 4px;
    margin-left: 10px;
    font-size: 15px;
    border:1px solid rgb(134, 102, 166);
    /* display: flex;
    justify-content: space-around; */
    /* border: 1px solid #4AAE9B; */
  }
  .btn-disabled{
    background-color:rgba(134, 102, 166,0.5);
  }
  .btn-first{
    margin-left: 40px;
  }
  .body-exercise{
    display: flex;
    justify-content:space-between;
    margin: 10px;
  }
  .body-header{
    padding: 20px;
  }
  .body-textarea{
    font-size: 20px;
    resize: none;
  }

  .body-list{
    display: flex;
    padding: 20px;
    /* margin: 10px; */
  }
  .body-table{
    padding: 20px;
    display: flex;
    justify-content: center;
  }

</style>