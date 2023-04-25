<template>
  <div class='editable-text-container'>
    <h3 class='editable-text-container label'>{{ labelText }}</h3>
    <input v-if='isEdit' type='text' v-model='v_text'>
    <p v-else>{{ text }}</p>
    <div class='actions' v-if='isEdit'>
      <i class='bi bi-check-circle' @click='save' />
      <i class='bi bi-x-lg' @click = 'reset'></i>
    </div>

    <i v-else class='bi bi-pencil-square' @click='change' />


  </div>

</template>

<script setup>
import { ref } from 'vue'

const isEdit = ref(false)


const props = defineProps({
  text: String,
  labelText: String,
  id: Number
})

const v_text = ref(props.text)

const emits = defineEmits(['valueChanged'])

function reset(){
  isEdit.value = false
  v_text.value = props.text
}
function change() {
  isEdit.value = true
}

function save() {
  isEdit.value = false
  emits('valueChanged', props.id, v_text.value, props.text)
}
</script>

<style scoped>
.editable-text-container {
  display: flex;
  align-items: center;
  margin: 0.5em;
}


.editable-text-container.label {
  display: block;
  margin-right: 1rem;
  width: 100px;
  font-weight: bolder;
  text-align: right;
}

.editable-text-container .actions{
  display: flex;
  font-size: 24px;
}

.bi {
  cursor: pointer;
  padding-left: 1em;
}



.bi-check-circle:hover {
  color: var(--main-color);
}

.bi-x-lg:hover{
  color: red;
}
</style>