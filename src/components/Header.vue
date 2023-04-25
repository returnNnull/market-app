<template>
  <header>
    <div class='header-container'>
      <div class='header-logo'>
        <h2>Волжский дачник</h2>
      </div>
      <nav>
        <ul>
          <li>
            <RouterLink to='/'>Главная</RouterLink>
          </li>
          <li><RouterLink to = '/category'>Каталог</RouterLink></li>
          <li><a @click = '_toDiscounts'>Акции</a></li>
        </ul>
      </nav>

      <div class='actions'>
        <div class='action-item basket' @click = '_toBasket'>
          <img src='@/assets/ic/bag.svg' alt='bag'>
          <p class='count'>{{basketState.size}}</p>
        </div>
        <div class='action-item' @click = '_toProfile'>
          <img src='@/assets/ic/person.svg'  alt='account'>
          <p>{{displayName}} </p>
        </div>
      </div>
    </div>
  </header>
  <modal-view v-if= "modalShow && !isAuthorized" @modal-close-btn-click = "closeModal">
   <AuthorizationView></AuthorizationView>
  </modal-view>
</template>

<script setup>

import router from '@/router'
import { onDeactivated, ref } from 'vue'
import ModalView from '@/components/ModalView.vue'
import LoginView from '@/components/LoginForm.vue'
import { basket, filter, loggedUser } from '@/stores/local'
import RegistrationView from '@/components/RegistrationForm.vue'
import AuthorizationView from '@/views/AuthorizationView.vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/stores/firebase-auth'



const props = defineProps({
  displayName: String,
  isAuthorized: Boolean
})

const basketState = basket()
const filterState = filter()


const modalShow = ref(false)
const isRegistration = ref(false)


function _toDiscounts(){
  filterState.num = 4
  router.push("/category")
}
function _toBasket(){
  router.push("basket")
}
function _toProfile(){
  if (props.isAuthorized){
    router.push("profile")
  }
  else {
    modalShow.value = true
  }
}

function _toRegistration(){
  isRegistration.value = true
}

function closeModal(){
  modalShow.value = false
}

onDeactivated(() => {
  basket().saveLocal()
})

</script>

<style scoped>

header{
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
}

.header-container {
  display: flex;
  justify-content: space-between;
  vertical-align: center;
  padding: 1em;
  height: var(--header-heigth);
  background: var(--vt-c-white);
}

header nav {
  display: flex;
  align-items: center;
}

.header-logo {
  display: flex;
  align-items: center;
}

.header-logo img {
  width: 50px;
  height: 50px;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.action-item {
  display: flex;
  align-items: center;
  margin: 1em;
}

.action-item:hover {
  cursor: pointer;
}

.action-item.basket {
  position: relative;
}

.action-item img {
  width: 24px;
  height: 24px;
}

.action-item .count {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 2em;
  height: 2em;
  font-size: 0.6em;
  background: var(--main-color);
  border-radius: 10px;
  position: absolute;
  bottom: -5px;
  right: -5px;
}

nav ul {
  display: flex;
}

nav a:hover {
  background: var(--main-color);
  color: white;
}

nav a {
  display: flex;
  justify-content: center;
  min-width: 150px;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 1em;
}


</style>