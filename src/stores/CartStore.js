import { defineStore } from "pinia";
import { groupBy } from "lodash";

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
        isEmpty: (state) => state.count === 0,
        grouped: (state) => groupBy(state.items, (item)=> item.name),
        groupCount: (state) => (name) => state.grouped[name].length,
        totalPrice: (state) => state.items.reduce((p, c)=> p+c.price,0),
    },
    actions:{
        addToCart(count, item){
            count = parseInt(count)
            for(let index=0; index<count; index++) {
                this.items.push(item)
            }
        },
        removeItem(name){
            this.items = this.items.filter((el) => el.name !== name)
        }
    }
})