<template>
  <div class="price-card">
    <img :src='v_product.imgUrl'>
    <h3>{{ v_product.name }}</h3>
    <p class="price-card__about">{{v_product.about}}</p>
    <div class="chip">{{v_product.category}}</div>
    <div>
      <h2>Цена</h2>
      <p>{{v_product.price}} руб</p>
    </div>

    <button-primary class='card-btn' @on-btn-click = 'buy'>Купить</button-primary>

    <div class="discount" v-if='v_product.discount > 0'>
      <p>Скидка</p>
      <p>{{ v_product.discount}} %</p>
    </div>


  </div>
</template>

<script setup>

import { Product } from '@/stores/firebase-db'
import { reactive } from 'vue'
import ButtonPrimary from '@/components/inputs/ButtonPrimary.vue'

const props = defineProps({
  p_product: {
    type: Product,
    default: Product.empty()
  }
})

const emits = defineEmits([
  'buyClick'
])

const v_product = reactive(props.p_product)


function buy(){
  emits('buyClick', v_product)
}



</script>

<style scoped>


.price-card {
  position: relative;
  width: 400px;
  margin: 2rem;
  padding: 1rem;
  -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.price-card img {
  width: 100%;
  height: auto;
  background-size: cover;
  background-position: center;
}

.price-card h3 {
  margin: 1rem 0;
}

.price-card__about{
  max-height: 200px;
  overflow-y: hidden;
  text-overflow: ellipsis;
}

.discount {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  background: #b91212;
  border-radius: 100px;
  color: white;
  font-weight: bold;
  position: absolute;
  bottom: -50px;
  right: -20px;
}

.chip {
  display: flex;
  justify-content: center;
  max-width: 100px;
  padding: 5px;
  background: #72C6C7;
  border-radius: 1em;
  color: white;
  font-style: italic;
  margin: 0.5em;
}
</style>