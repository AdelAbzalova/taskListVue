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
                      class="body-textarea">
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
        <div class="body-table">
            <table>
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
                        @change="changeCheckbox(index)" 
                        :checked="checked[index]" >
                </td>
                <td>
                    <input type="text"  
                          @input="changeTask($event, index)" 
                          :value="task">
                  
                </td>
                </tr>
            </table>
            {{ this.items }}
        </div>
        </slot>
       </section>
       <footer class="modal-footer">
          <slot name="footer">
            <button class="btn">Вперед</button>
            <button class="btn"
                    @click="undoChange()">Назад</button>
            <button class="btn"
                     @click="changeSave(), close()">
                     Сохранить
            </button>

            <button
              type="button"
              class="btn-green btn"
              :modal="modal"
              @click="close()">
              Закрыть
          </button>
        </slot>
      </footer>
    </div>
  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import store from '@/store';
  export default {
    name: 'AppModal',
   props:{
    // chosenElem:Number,
   },
   data(){
    return {
      exercise:'',
      tasks:[],
      checked:[],
      chosenIndex:'',
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
      },
      changeTask(e, index){
        this.tasks[index]=e.target.value
        // this.checked[index]=false
      },
      changeCheckbox(index){
        this.checked[index]=!this.checked[index]
        // if (this.checked[index]==true){
        //   this.checked[index]=false
        // }
        // else{
        //   this.checked[index]=true
        // }
        
      }, 
      chooseElem(index){
        this.chosenIndex=index
      },
      deleteTask(){
        this.checked.splice(this.chosenIndex,1);
        this.tasks.splice(this.chosenIndex,1)
      }, 
      changeSave(){
        // console.log('check ex', this.exercise!='')
        if(this.exercise!=''){
        store.dispatch('saveChange', [{
          exercise:this.exercise,
          tasks:this.tasks, 
          checked:this.checked
        }, this.chosenElem
      ]);
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
      undoChange(){
//         const inp = document.querySelector('input');
// inp.addEventListener('click', e => {
  document.dispatchEvent(
    new KeyboardEvent('keydown', {
      // keyCode: 13,
      ctrlKey: true,
      KeyZ:true
    })
  );
// });

document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.KeyZ) {
    console.log('Hi there');
  }
});
      }
    },

    computed:{
    ...mapGetters({
        items:'items',
        modal:'modal',
        mode:'mode', 
        chosenElem:'chosenElem'
      }),
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