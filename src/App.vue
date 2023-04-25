<script setup>
import { RouterView } from 'vue-router'
import { auth } from '@/stores/firebase-auth'
import { onAuthStateChanged } from 'firebase/auth'
import { loggedUser } from '@/stores/local'
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import AppFooter from '@/components/AppFooter.vue'


const user = loggedUser()
onAuthStateChanged(auth, (user) => {
  if (user) {
    loggedUser().set(user.uid, user.displayName)
  } else {
    loggedUser().clear()
  }
})

</script>

<template>
  <Header :display-name='user.displayName' :is-authorized = 'user.isLogged'/>
  <transition>
    <RouterView style='min-height: 100vh'/>
  </transition>

  <app-footer></app-footer>

</template>

<style>
@font-face {
  font-family: 'Montserrat Alternates', sans-serif;
  src: local("Monserat"), url("@/assets/fonts/Montserrat_Alternates/MontserratAlternates-Black.ttf") format("ttf");
  font-weight: 400;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
