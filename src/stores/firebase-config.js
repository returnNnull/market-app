import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyAkWbxz63VUJ5qs9v1G8JEf7F0E4VNq_MM',
  authDomain: 'dachnic-vol.firebaseapp.com',
  projectId: 'dachnic-vol',
  storageBucket: 'dachnic-vol.appspot.com',
  messagingSenderId: '724528444986',
  appId: '1:724528444986:web:7a35f671b222ece5646703',
  measurementId: 'G-Y13BHGHWFY'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)