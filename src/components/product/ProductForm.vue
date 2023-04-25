<template>
  <form class='add-form'>
    <img id='file-img-container' src='@/assets/img/image-placeholder.svg'  @click='selectImage'>
    <div class='inputs-container'>
      <input type='file' @change='onFileChange($event)' id='file-input' style='display: none'
             accept='image/jpeg, image/png, image/jpg'>
      <p>Название</p>
      <input placeholder='Название' v-model='v_product.name'>
      <p>Описание</p>
      <textarea placeholder='Описание' v-model='v_product.about'/>
      <p>Категория</p>
      <select v-model='p_product.category'>
        <option value='Цветы'>Цветы</option>
        <option value='Саженцы'>Саженцы</option>
        <option value='Семена'>Семена</option>
      </select>
      <p>Цена руб.</p>
      <input type='number' placeholder='Цена'  v-model='v_product.price'>
      <p>Скидка %</p>
      <input type='number' placeholder='Скидка'  v-model='v_product.discount'>
      <button-primary @on-btn-click='save'>Сохранить</button-primary>
    </div>

  </form>
</template>

<script setup>
import { loadFile, uploadFile } from '@/stores/firebase-storage'
import { insertProduct, Product } from '@/stores/firebase-db'
import { onMounted, reactive, ref } from 'vue'
import ButtonPrimary from '@/components/inputs/ButtonPrimary.vue'


const props = defineProps({
  p_product: {
    type: Product,
    default: Product.empty()
  }

})

const v_product = reactive(props.p_product)


const emits = defineEmits([
  'success'
])

onMounted(() => {
  if (v_product.imgUrl !== ""){
    const imgElement = document.getElementById('file-img-container')
    imgElement.src = v_product.imgUrl
  }
})

let imageFile
let imgLoaded = false
async function save() {
  if (imgLoaded){
    uploadFile(imageFile).then(r => {
      v_product.img = r
      _insert()
    }).catch(e => {
      alert(e)
    })
  }
  else {
    _insert()
  }

}

function _insert(){
  insertProduct(v_product)
    .then(() => {
      emits('success', v_product)
    })
    .catch(insertError => {
      alert(insertError)
    })
}

function onFileChange(event) {
  setImage(event.target.files[0])
}

function setImage(img){
  const imgElement = document.getElementById('file-img-container')
  imgElement.src = URL.createObjectURL(img)
  imgLoaded = true
  imageFile = img
}

function selectImage() {
  const input = document.getElementById('file-input')
  input.click()
}



</script>

<style scoped>

.add-form {
  display: flex;
  min-width: 600px;
  text-align: center;
}

.add-form .inputs-container{

}

.add-form textarea {
  height: 8em;
}

#file-img-container {
  width: 100%;
  height: auto;
  max-height: 400px;
  cursor: pointer;
  object-fit: contain;
  object-position: top;
  margin: 1em;
}


</style>