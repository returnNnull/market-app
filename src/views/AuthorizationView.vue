<template>
  <RegistrationForm v-if='isRegistration' @back-click = "isRegistration = false"/>
  <LoginForm v-else @registration-click = "isRegistration = true"/>
</template>

<script setup>

import { ref } from 'vue'
import RegistrationView from '@/components/RegistrationForm.vue'
import LoginView from '@/components/LoginForm.vue'
import RegistrationForm from '@/components/RegistrationForm.vue'
import LoginForm from '@/components/LoginForm.vue'

const isRegistration = ref(false)

</script>

<style scoped>

</style>