import { defineStore } from "pinia";

export const useAuthStore =  defineStore('AuthStore', {
    state:()=>{
        return{
            username: 'JoseMa'
    }}
})