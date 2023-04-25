<template>
  <div class='content-manager-container'>

    <div class='list-container' v-for='item in v_items'>
      <product-list-item :p_product='item'  @changed='changed' @deleted='deleted' />
    </div>
    <button class='add-btn' @click='add'><i class='bi bi-plus-lg' />Добавить</button>
    <modal-view v-if='modalShow' @modal-close-btn-click='_modalClose'>
      <product-form :p_product='v_selected_item' @success='success'></product-form>
    </modal-view>
  </div>


</template>

<script setup>

import ModalView from '@/components/ModalView.vue'
import { onMounted, reactive, ref } from 'vue'
import ProductListItem from '@/views/profile/ProductListItem.vue'
import ProductForm from '@/components/product/ProductForm.vue'
import { deleteProduct, getAllProduct, insertProduct, Product } from '@/stores/firebase-db'


const modalShow = ref(false)
const v_items = ref([])

const v_selected_item = ref(null)


onMounted( () => {
  updateList()
})

function success(product) {
  _modalClose()
  updateList()
}

function deleted(product) {
  deleteProduct(product.id).then(() => {
    updateList()
  })
    .catch((e) => {
      alert(e)
    })

}

function changed(product) {
  v_selected_item.value = product
  _modalShow()

}


function add() {
  v_selected_item.value = Product.empty()
  _modalShow()
}

function _modalClose() {
  modalShow.value = false
}

function _modalShow(){
  modalShow.value = true
}

 function updateList() {
  getAllProduct().then( items => {
    v_items.value = items
  })
    .catch(e => {
      alert(e)
    })

}

</script>

<style scoped>

.content-manager-container {
  width: 100%;
  position: relative;
  overflow-y: scroll;
  padding-bottom: 5em;
}

.add-btn {
  position: fixed;
  bottom: 3em;
  right: 0;
  background: var(--main-color);
  z-index: 1001;
}

.bi-plus-lg {
  padding-right: 1em;
}

</style>