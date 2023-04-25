<template>
<form>
  <input type='password' placeholder='Введите пароль' v-model='pass'>
  <progress v-if='isLoading'/>
  <button-primary v-else @on-btn-click = "click">Подтвердить</button-primary>
</form>
</template>

<script setup>
import ButtonPrimary from '@/components/inputs/ButtonPrimary.vue'
import { ref } from 'vue'
import { reauthenticate } from '@/stores/firebase-auth'


const pass = ref("")
const isLoading = ref(false)

const props = defineProps({
  oldValue: Object,
  newValue: Object,
  initiatorId: Number
})
const emits = defineEmits(["success", "failure"])
function click(){
  isLoading.value = true
  reauthenticate(pass.value).then(r => {
    emits("success")
    isLoading.value = false
  }).catch(e => {
    emits("failure", e)
    isLoading.value = false
    alert(e)
  })

}
</script>

<style scoped>

</style>