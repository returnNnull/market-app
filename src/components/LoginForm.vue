<template>
  <div class='form-center-container'>
    <form class='form shadow'>
      <h2 class = "form-header">Авторизация</h2>
      <input type='email' v-model='email' placeholder='Почта'>
      <input type='password' v-model='password' placeholder='Пароль'>
      <progress v-if='isLoading'/>
      <button-primary v-else @on-btn-click = '_signIn'>Войти</button-primary>
      <p>или</p>
      <a href='#'  @click = '_toRegistrationView' >Зарегистрироваться</a>
<!--      <RouterLink to = 'resetPassword'>Забыли пароль</RouterLink>-->
    </form>
  </div>

</template>

<script setup>

import { ref } from 'vue'
import router from '@/router'
import {login } from '@/stores/firebase-auth'
import ButtonPrimary from '@/components/inputs/ButtonPrimary.vue'

const email = ref('')
const password = ref('')
const isLoading = ref(false)

const actions = defineEmits(['registrationClick'])

function _signIn() {
  isLoading.value = true
  login(email.value, password.value)
    .then((result) => {
      router.push('profile')
    })
    .catch((err) => {
      isLoading.value = false
      alert(err.message)
    })
}

function _toRegistrationView(){
  actions('registrationClick')
}

function _toResetPassword(){
  router.push("/resetPassword")
}

</script>

<style scoped>



.form-header {
  padding: 1em;
}
</style>