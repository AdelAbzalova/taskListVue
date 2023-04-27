<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/> -->
  <app-header 
  
  ></app-header>
  <app-main 


  >
</app-main> 
<app-modal 
            v-show="modal" 



>  
            
</app-modal>

<!-- {{ this.exercise }}
{{ this.tasks }}
{{ this.checked }} -->

<!-- :exercise="exersice" 
            :tasks="tasks" 
            :checked="checked" -->
</template>

<script>
import { mapGetters } from 'vuex';
import AppHeader from './components/Header.vue';
import AppMain from './components/Main.vue';
import AppModal from './components/Modal.vue'
export default{
  components:{
    AppHeader,
    AppMain,
    AppModal,
  },
  data(){
    return{
      // chosenElem:-1,
      // mode:'',
      // exercise:'',
      // tasks:[],
      // checked:[],
    }
  },
  methods:{
    onModalChange(mod){
      this.modal=mod
      console.log(mod)
    },
    changeProps(mode){
      if (typeof this.chosenElem!=String && mode=='edit'){
        // this.exercise=this.items[this.chosenElem].exercise
        // this.tasks.push(this.items[this.chosenElem].tasks)
        // this.checked.push(this.items[this.chosenElem].checked)
      }
    }
  },
  computed:{
    ...mapGetters({
      items:'items',
      modal:'modal'
    })
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
