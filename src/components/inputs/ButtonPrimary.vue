<template>
  <button class='btn-primary' type='button' @click='action'><slot></slot></button>
</template>

<script setup>

const emit = defineEmits(['onBtnClick'])

function action() {
  emit('onBtnClick')
}

</script>

<style scoped>

.btn-disabled{

}

</style>