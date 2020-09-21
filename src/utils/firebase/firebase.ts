import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'

require('dotenv').config()
//this config is being used for both development and production environment. Though, it is a best practice creating a second project and have two configs: one for production (prodConfig) and another for development (devConfig), so you choose the config based on the environment.

const firebaseConfig = {
    apiKey: 'AIzaSyD4vhfQHFPP8Xp05n83Wciu7bY37c3kJe4',
    authDomain: 'hornoapp.firebaseapp.com',
    databaseURL: 'https://hornoapp.firebaseio.com',
    projectId: 'hornoapp',
    storageBucket: 'hornoapp.appspot.com',
    messagingSenderId: '860763548265',
    appId: '1:860763548265:web:d1e0adcbd3e080f4f010f8',
    measurementId: 'G-F6741WMWKH',
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

//separting database API and authentication
export const db = firebase.database()
export const auth = firebase.auth()
export const firestore = firebase.firestore()

export default firebase
