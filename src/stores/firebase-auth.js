// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  updatePassword,
  updateEmail,
  reauthenticateWithCredential,
  onAuthStateChanged,
  EmailAuthProvider
} from 'firebase/auth'
import router from '@/router'
import { loggedUser } from '@/stores/local'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


import {app} from './firebase-config'
export const auth = getAuth(app)

export function getUser(){
  return auth.currentUser
}

export function login(email, pass) {
  return signInWithEmailAndPassword(auth, email, pass)
}

export function registration(email, pass) {
  return createUserWithEmailAndPassword(auth, email, pass)
}

export function changeName(name) {
  return updateProfile(auth.currentUser, {
    displayName: name,
    photoURL: ''
  })
}

export function changeEmail(newEmail) {
    return  updateEmail(auth.currentUser, newEmail)
}

export async function reauthenticate(password){
  const credential = await EmailAuthProvider.credential(auth.currentUser.email, password)
  await reauthenticateWithCredential(auth.currentUser, credential)
}

export async function changePass(password) {
  await updatePassword(auth.currentUser, password)
}
export function logOut() {
  return signOut(auth)
}
