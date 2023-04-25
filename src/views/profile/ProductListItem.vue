<template>
  <div class='list-item'>
    <img class='image-column' :id='p_product.id' :src='p_product.imgUrl'  alt='image' style='height: 100px; width: 100px' />
    <p class='name-column'>{{ p_product.name }}</p>
    <p class='about-column'>{{ p_product.about }}</p>
    <div class='list-item-actions'>
      <i class='bi bi-pencil-square' @click = 'change' />
      <i class='bi bi-trash2-fill' @click='remove' />
    </div>

  </div>
</template>

<script setup>

import { onMounted, reactive, ref } from 'vue'
import { loadFile } from '@/stores/firebase-storage'
import { Product } from '@/stores/firebase-db'


const props = defineProps({
  p_product: {
    type: Product,
    default: Product.empty()
  }
})


const emits = defineEmits(['changed', 'deleted'])





function remove() {
  emits('deleted',props.p_product)
}

function change() {
  emits('changed',props.p_product)
}

</script>

<style scoped>


.bi {
  font-size: 1.5em;
  margin: 1em;
  cursor: pointer;
}

.bi-pencil-square:hover {
  color: var(--main-color);
}

.bi-trash2-fill:hover {
  color: red;
}

.list-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0.5em;

}

.list-item-actions {
  display: flex;
}

.list-item:hover {
  background: #c2e0c2;
}

.about-column, .name-column, .image-column{
  width: 30%;
  max-height: 200px;
  overflow-y: hidden;
  text-overflow: ellipsis;
}


</style>