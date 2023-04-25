<template>
  <div class='modal-container'>
    <slot class='modal-body'> </slot>
    <i class="bi bi-x-lg modal-close-btn"
       style='color: white; font-size: 2em; cursor: pointer'
       @click = 'closeModal'
    ></i>
  </div>
</template>

<script setup>


const emit = defineEmits(['modalCloseBtnClick'])


function closeModal() {
  emit('modalCloseBtnClick')
}

</script>

<style scoped>

.modal-container{
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
}

.modal-body{

  width: 200px;
  height: 200px;
  background: white;
}

.modal-close-btn{
  position: absolute;
  right: 2em;
  top: 2em
}


</style>