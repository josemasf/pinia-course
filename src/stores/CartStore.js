import { defineStore } from "pinia";

export const useCartStore = defineStore('CartStore',{
    state:()=>{
    return{
        items: []
        }
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