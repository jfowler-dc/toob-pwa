import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDtsWQkir_sJ1PP7K6GupiUZyjqI7gRvtw",
    authDomain: "toob2-e52ad.firebaseapp.com",
    projectId: "toob2-e52ad",
    storageBucket: "toob2-e52ad.appspot.com",
    messagingSenderId: "963980798002",
    appId: "1:963980798002:web:b68f9c2a813572cf9eb42b",
    measurementId: "G-F718BLSR4F"
  }
  
  const firebaseApp = firebase.initializeApp(firebaseConfig)

  export const db = firebaseApp.firestore()
  export const auth = firebaseApp.auth()