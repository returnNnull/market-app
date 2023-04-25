<template>
  <div class='list'>
    <div class='list-header'>
      <p class='list-header-item'>Фото</p>
      <p class='list-header-item'>Название</p>
      <p class='list-header-item'>Категория</p>
      <p class='list-header-item'>Цена</p>
      <p class='list-header-item'>Колличество</p>
      <p class='list-header-item'>Удалить</p>
    </div>
    <div class='list-items-container' v-for='(item, index) in v_list' :key = 'item.id'>
      <div class='list-item'>
        <img :src='item.imgUrl' >
      </div>
      <p class='list-item'>{{item.name}}</p>
      <p class='list-item'>{{item.category}}</p>
      <p class='list-item'>{{item.price}} руб.</p>
      <div class='list-item'>
        <div class='list-actions'>
          <div class='add' @click = 'plus(index,item.id, item.price)'><i class="bi bi-plus"></i></div>
          <p>{{item.count}}</p>
          <div class='minus' @click = 'minus(index, item.id)'><i class="bi bi-dash"></i></div>
        </div>
      </div>
      <div class='list-item'>
        <i class="bi bi-trash2-fill" @click = 'deleteItemFromBasket(item.id)'></i>
      </div>

    </div>
    <div class='total-container'>
      <h2 style='margin-right: 2em'>Итого: {{basket().sum}} </h2>
      <button-primary @on-btn-click = 'alert("Оплата не подключена...")'>Купить</button-primary>
    </div>
  </div>
</template>

<script setup>

import { basket } from '@/stores/local'
import { onMounted, reactive, ref } from 'vue'
import { getProductById } from '@/stores/firebase-db'
import ButtonPrimary from '@/components/inputs/ButtonPrimary.vue'


const v_list = ref([])



function plus(index, id, price){
  basket().add(id, price)
  v_list.value[index].count++
}

function minus(index, id){
  basket().remote(id)
  if(v_list.value[index].count > 0){
    v_list.value[index].count--
  }

}

function remoteFromList(id) {
  for (let i = 0; i < v_list.value.length; i++){
    if (v_list.value[i].id === id.toString()){
      let index = v_list.value.indexOf(v_list.value[i])
      v_list.value = v_list.value.splice(index, 1)
      break
    }
  }
}

function deleteItemFromBasket(id){
  basket().deleteFromBasket(id)
  remoteFromList(id)
  initList()
}

onMounted( () => {
  initList()
})

async function initList(){
  v_list.value = []
  for (let i = 0; i < basket().list.length; i++) {
    const product = await getProductById(basket().list[i].id)
    v_list.value.push({
      id: product.id,
      name: product.name,
      price: product.price,
      imgUrl: product.imgUrl,
      count: basket().list[i].count
    })
  }
}

</script>



<style scoped>

.bi-trash2-fill{
  font-size: 2em;
  cursor: pointer;
}

.bi-trash2-fill:hover{
  color: red;
}
.list-header {
  display: flex;
  width: 100%;

}

.list-header-item {
  padding: 0.5em 1em;
  font-weight: bold;
  text-transform: uppercase;
  width: calc(100%);
  text-align: center;
}

.list-item {
  display: flex;
  width: calc(100%);
  justify-content: center;
  text-align: center;
}

.list-items-container {
  display: flex;
  width: 100%;
  align-items: center;
}

.list img {
  display: block;
  object-fit: contain;
  width: 100px;
  height: auto;
}

.list-actions {
  display: flex;
}

.add, .minus {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3em;
  height: 3em;
  background: #72C6C7;
  color: white;
  cursor: pointer;
}

.list-actions p {
  margin: 1em;
}

.total-container {
  display: flex;
  margin: 2em;
  justify-content: right;
  align-items: center;
}
</style>