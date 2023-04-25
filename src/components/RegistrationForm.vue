<template>
  <div class='form-center-container'>
    <form class="form">
      <h2>Регистрация</h2>
      <input type="email" placeholder="Почта" v-model='email'>
      <input type="password" placeholder="Пароль" v-model='pass'>
      <input type="password" placeholder="Повторите пароль" v-model='repeatPass'>
      <input type="text" placeholder="Имя" v-model='name'>
      <progress v-if='isLoading'/>
      <button-primary v-else @on-btn-click = "_registration">Войти</button-primary>
      <a href="#" @click = "_back">Назад</a>
    </form>
  </div>

</template>

<script setup>

import { ref } from 'vue'
import { auth } from '@/stores/firebase-auth'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import router from '@/router'
import ButtonPrimary from '@/components/inputs/ButtonPrimary.vue'

const email = ref("")
const pass = ref("")
const repeatPass = ref("")
const name = ref("")
const isLoading = ref(false)

const actions = defineEmits(['backClick'])


function _registration(){
  if (_checkPasswordsEquals()){
    isLoading.value = true
    createUserWithEmailAndPassword(auth, email.value, pass.value)
      .then((result) => {

      })
      .catch((error)=> {
        isLoading.value = false
        alert(error)
      })
  }
  else {
    alert("Пароли не совпадают")
  }
}

function _back(){
  actions('backClick')
}

function _checkPasswordsEquals(){
  return pass.value === repeatPass.value
}

</script>

<style scoped>

</style>