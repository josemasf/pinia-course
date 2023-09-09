<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";


import { useProductStore, useCartStore } from "@/stores/";

const productStore = useProductStore()
productStore.fill()

const cartStore = useCartStore()

/*import { storeToRefs } from "pinia";
const {products} = storeToRefs(useProductStore())*/



cartStore.$onAction(({name,args, after, onError})=>{
  if(name==="addToCart"){
    after(()=>{      
      console.log(args[0], args[1].name)
    })
    onError(()=>{      
      //Aquí va sentry
      console.error('sentry')
    })
  }
})

</script>

<template>
  <div class="container">
    <TheHeader />
    <div class="mb-5 flex justify-end">      
      <AppButton @click="cartStore.undo">Undo</AppButton>
      <AppButton class="ml-2" @click="cartStore.redo">Redo</AppButton>
    </div>
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
