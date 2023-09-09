<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";


import { useProductStore, useCartStore } from "@/stores/";

const productStore = useProductStore()
productStore.fill()

const cartStore = useCartStore()
/*import { storeToRefs } from "pinia";
const {products} = storeToRefs(useProductStore())*/

cartStore.$onAction(({name,args, after})=>{
  if(name==="addToCart"){
    after(()=>{      
      console.log(args[0], args[1].name)
    })
  }
})

</script>

<template>
  <div class="container">
    <TheHeader />
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in productStore.products"
        :key="product.name"
        :product="product"
        @addToCart="cartStore.addToCart($event, product)"
      />
    </ul>
  </div>
</template>
