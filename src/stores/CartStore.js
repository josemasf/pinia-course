import { acceptHMRUpdate, defineStore } from "pinia";
import { groupBy } from "lodash";
import { useAuthStore } from "./AuthStore";

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
        grouped: (state) =>{
             const grouped = groupBy(state.items, (item)=> item.name)
             const sorted = Object.keys(grouped).sort()

             let inOrder = {};
             sorted.forEach(key => inOrder[key] = grouped[key])

             return inOrder
        },
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
        },
        setItemCount(item, count){
            this.removeItem(item.name)

            this.addToCart(count, item)
        },
        checkout(){
            const authStore = useAuthStore()
            alert(`${authStore.username} ha comprado ${this.count} items con un total de ${this.totalPrice}` )
        }
    }
})

//Para que en desarrollo actulice las acciones sin tener que refrescar la página
if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}