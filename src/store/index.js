import { createStore } from 'vuex'
// import tasks from './modules/tasks'

// export default createStore({
//   state: {
    
//   },
//   getters: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//     tasks
//   }
// })




export default createStore({
	state: {
        items:[],
		modal:false,
		mode:'',
		chosenElem:-1,
	},
	getters: {
		items(state){
			return state.items;
		},
		modal(state){
			return state.modal
		},
		mode(state){
			return state.mode
		},
		chosenElem(state){
			return state.chosenElem
		}
	},
	mutations: {
		saveChange(state, [exer, chosenElem]){
			// console.log(state.mode);
				if (state.mode=='add'){
					state.items.push(exer);
					// console.log('push')
				}
				else if (state.mode=='edit'){
					state.items[chosenElem]=exer
					console.log('exer',exer);
					console.log(state.items)
				}
				
			
		},
    changeCheckbox(state, [indOfEx, indOfTask, isChecked]){
        state.items[indOfEx].checked[indOfTask]=isChecked
    }, 
	changeModal(state, newModal){
		state.modal=!newModal
		// console.log(!newModal)
		// console.log(state.modal)
	},
	changeMode(state, mode){
		state.mode=mode
	},
	changeChosenElem(state, index){
		state.chosenElem=index
		// console.log('state.chosenElem',state.chosenElem)
	}, 
	deleteElem(state){
		state.items.splice(state.chosenElem, 1)
	}
    },
		// remove(state, id_product){
		// 	let pos = state.products.indexOf(id_product);

		// 	if(pos !== -1){
		// 		state.products.splice(pos, 1);
		// 	}
		// }
	actions: {
		saveChange(store, [exer, chosenElem]){
			store.commit('saveChange', [exer, chosenElem]);
		},
		changeCheckbox(store, [indOfEx, indOfTask, isChecked]){
			store.commit('changeCheckbox', [indOfEx, indOfTask, isChecked])
		},
		changeModal(store){
			store.commit('changeModal', this.state.modal )
		},
		changeMode(store, mode){
			store.commit('changeMode', mode)
		}, 
		changeChosenElem(store, index){
			store.commit('changeChosenElem', index)
		}, 
		deleteElem(store){
			store.commit('deleteElem')
		}
		// remove(store, id_product){
		// 	store.commit('remove', id_product);
		// }
	}
})