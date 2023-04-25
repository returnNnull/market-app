<template>
  <HomeView v-if='user.isLogged' />
  <LoginView v-else />
</template>

<script setup>
import { loggedUser } from '@/stores/local'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/components/LoginForm.vue'
import Header from '@/components/Header.vue'

const user = loggedUser()

</script>

<style scoped>

</style>