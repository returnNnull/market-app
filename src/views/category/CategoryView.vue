<template>
  <section>

    <div class='filters'>
      <p class='filters-item' @click = setFilter(0)>Все</p>
      <p class='filters-item' @click = setFilter(1)>Цветы</p>
      <p class='filters-item' @click = setFilter(2)>Саженцы</p>
      <p class='filters-item' @click = setFilter(3)>Семена</p>
      <p class='filters-item' @click = setFilter(4)>Акции</p>
    </div>
    <progress v-if='isLoading' style='margin: 1em auto'></progress>
    <div  v-else class='cards-container'>
      <h2 v-if='list.length === 0'>Ничего не найдено</h2>
      <product-card v-for='product in list' :key = 'product.id' :p_product = "product" @buy-click = 'buy'></product-card>
    </div>

  </section>
</template>

<script setup>

import { onMounted, ref, watch } from 'vue'
import { getAllProduct, getProductByDiscount, getProductsByCategory } from '@/stores/firebase-db'
import ProductCard from '@/components/product/ProductCard.vue'
import { basket, filter } from '@/stores/local'
import router from '@/router'
import { useRoute } from 'vue-router'

const list = ref([])

const v_basket = basket()

const isLoading = ref(false)



function buy(product){
  v_basket.add(product.id, product.price)
}

async function setFilter(value){
  isLoading.value = true
  filter().num = value
  switch (value) {
    case 0:
      list.value = await getAllProduct();
      break;
    case 1:
      list.value = await getProductsByCategory("Цветы");
      break;
    case 2:
      list.value = await getProductsByCategory("Саженцы");
      break;
    case 3:
      list.value = await getProductsByCategory("Семена");
      break;
    case 4:
      list.value = await getProductByDiscount();
      break;
  }
  isLoading.value = false
}



onMounted(() => {
  window.scroll(0,0)
  setFilter(filter().num)
})

</script>

<style scoped>

.cards-container{
  display: flex;
  flex-wrap: wrap;
}

.filters{
  display: flex;
  justify-content: center;
  border-bottom: 1px var(--vt-c-black-mute) solid;
}

.filters-item{
  padding: 0.5em 1em;
  cursor: pointer;
}

.filters-item:hover {
  color: var(--grey);
}


</style>