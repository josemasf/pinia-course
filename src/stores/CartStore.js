import { defineStore } from "pinia";

export const useCartStore = defineStore('CartStore',{
    state:()=>{
    return{
        items: []
        }
    },
    getters:{
        count(){
            return this.items.length
        },
        isEmpty: (state) => state.count === 0
    },
    actions:{
        addToCart(count, item){
            count = parseInt(count)
            for(let index=0; index<count; index++) {
                this.items.push(item)
            }
        }
    }
})