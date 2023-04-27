<template>
<h1>Список заданий</h1>
<div class="container">
<button class="btn"
        :modal="modal" 
        @click="changeMode('add'),showModal()" 
         >Добавить задачу</button>
<button class="btn"
        :modal="modal" 
        @click="changeMode('edit'), showModal()" >Редактировать</button>
<button class="btn"
        @click="deleteItem()">Удалить</button>

</div>
</template>

<script>
import store from '@/store';
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'AppHeader',
  props: {
  //  mode:String,
  },
  data(){
    return {
      actionOfButton:'',
    }
  },
  methods:{
    // ...mapMutations({
    //     showModal:'changeModal',
    // }),
    ...mapMutations(['changeModal']),
    // showModal(){
    //     this.$emit('update:modal', true)
    // },
    ...mapActions({
      changwModal:'changeModal',
      changeMode:'changeMode', 
      deleteElem:'deleteElem'
    }),
    deleteItem(){
      if(this.chosenElem!=-1){
        if (confirm("Вы точно хотите удалить это задание?"))
  {
    this.deleteElem()
  //тут удаление записи из базы
  }
else
  {

  // alert("You pressed Cancel!");
  //тут просто остаемся на странице
  }
      }

    },
    showModal(){
      if (!(this.mode=='edit' && this.chosenElem==-1)){
        store.dispatch('changeModal')
      }
      else {
        alert('Сначала выберите задание для редактирования!')
      }
    }
    // changeMode(mode){
    //   this.$emit('update:mode', mode)
    // }
  },
  computed:{
    ...mapGetters(
      {
        modal:'modal', 
        mode:'mode', 
        chosenElem:'chosenElem'
      }
    )
  }
}
</script>

<style scoped>
.btn {
  font-size: 20px;
  background-color:rgb(156, 68, 156);
  color: white;
  /* border: 1px solid thistle ; */
  border-radius: 10px;
  box-shadow: 5px 5px 3px 1px black;
  width:300px;
  margin: 15px;
  height: 35px;
}
h1{
  color: rgb(156, 68, 156);
}

</style>