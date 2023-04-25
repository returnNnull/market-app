<template>
  <div class='profile-form'>
    <editable-text :id = '0' :text='email' label-text='Почта: ' @value-changed='changed'  />
    <editable-text :id = '1' type='password' :text='name' label-text='ФИО:' @value-changed='changed' />
    <modal-view v-if='modalShow' @modal-close-btn-click='closeModal'>
      <confirm-password-view :new-value='v_newValue' :old-value='v_oldValue' :initiator-id='v_initiatorId'
                             @success='_confirm' @failure='_failure' />
    </modal-view>
  </div>
</template>

<script setup>

import { ref } from 'vue'
import { changeEmail, changeName, changePass, getUser, reauthenticate } from '@/stores/firebase-auth'
import EditableText from '@/components/EditableText.vue'
import ModalView from '@/components/ModalView.vue'
import ConfirmPasswordView from '@/components/ConfirmPasswordView.vue'

const user = getUser()
const email = ref(user.email)
const name = ref(user.displayName)


const v_newValue = ref('')
const v_oldValue = ref('')
const v_initiatorId = ref(-1)

const modalShow = ref(false)


function changed(id, newValue, oldValue){
  v_newValue.value = newValue
  v_oldValue.value = oldValue
  v_initiatorId.value = id
  modalShow.value = true
}

function _confirm() {
  switch (v_initiatorId.value) {
    case 0 :
      changeEmail(v_newValue.value).then( r => {
        email.value = v_newValue.value
      }).catch( e => alert(e))
      break
    case 1:
      changeName(v_newValue.value).then( r=> {
        name.value = v_newValue.value
      }).catch(e => {
        alert(e)
      })
      break
    default:
      break
  }
  closeModal()
}

function _failure(error) {
  closeModal()
  alert(error)
}

function closeModal() {
  modalShow.value = false
}

</script>

<style scoped>
.profile-form{
  width: 100%;
}
</style>