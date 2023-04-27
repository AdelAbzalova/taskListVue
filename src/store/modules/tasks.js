export default {
	namespaced: true,
	state: {
        items:[],
		modal:false,
	},
	getters: {
		items(state){
			return state.items;
		},
		modal(state){
			return state.modal
		}
	},
	mutations: {
		saveChange(state, exer){
			{
				state.items.push(exer);
			}
		},
		changeModal(state){
			state.modal=!state.modal
		}
		// remove(state, id_product){
		// 	let pos = state.products.indexOf(id_product);

		// 	if(pos !== -1){
		// 		state.products.splice(pos, 1);
		// 	}
		// }
	},
	actions: {
		saveChange(store, exer){
			store.commit('saveChange', exer);
		},

		// remove(store, id_product){
		// 	store.commit('remove', id_product);
		// }
	}
};