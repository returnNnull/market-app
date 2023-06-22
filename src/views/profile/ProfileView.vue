<template>
  <div class='admin-container'  v-if='user.isLogged'>
    <div class='admin-panel'>
      <h3 >Настройки</h3>
      <nav>
        <ul>
          <li>
            <a @click = 'show(0)'>Профиль</a>
          </li>
          <li v-if="user.isAdmin()">
            <a @click = 'show(1)'>Контент</a></li>
          <li v-if="user.isAdmin()">
            <a @click = 'show(2)'>Информация</a></li>
          <li>
            <a @click = '_signOut'>Выйти</a></li>
        </ul>
      </nav>
    </div>
    <div class='splitter'/>
    <div class='admin-body'>

      <user-information-view v-if='content === 0'/>
      <content-manager-view  v-else-if='content === 1'/>
      <site-information-view v-else-if='content === 2'/>
    </div>
  </div>
</template>

<script setup>



import { logOut } from '@/stores/firebase-auth'
import router from '@/router'
import { loggedUser } from '@/stores/local'
import UserInformationView from '@/views/profile/UserInformationView.vue'
import { onMounted, reactive, ref } from 'vue'
import ContentManagerView from '@/views/profile/ContentManagerView.vue'
import SiteInformationView from '@/views/profile/SiteInformationView.vue'
import { getAllProduct } from '@/stores/firebase-db'

const user = loggedUser()
const content = ref(0)

function show(value){
  content.value = value
}

function _signOut() {
  logOut()
  router.replace("/")
}

</script>

<style scoped>

.splitter{
  width: 1px;
  background: var(--vt-c-black-mute);
}

.admin-container {
  display: flex;
}

.admin-panel {
  display: flex;
  flex-direction: column;
  min-width: 200px;
  min-height: 80vh;
  padding: 1rem;
}

.admin-panel a {
  width: 100%;
  color: var(--vt-c-black);
}

.admin-panel a:hover {
  color: var(--vt-c-black-mute);
}

li {
  display: flex;
  align-items: center;
}

.admin-body {
  display: flex;
  width: 100%;
  background: var(--vt-c-white-mute);
  padding: 1em;
}

li img {
  width: 1em;
  height: 1em;
}

h3 {
  color: var(--vt-c-black);
  padding: 1rem 0;
}
</style>