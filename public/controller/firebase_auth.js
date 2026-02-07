import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js"

import { app } from "./firebase_core.js"
import { routers } from "./app.js"
import { glHomeModel } from "./HomeController.js";
const auth = getAuth(app);
export let currentUser = null
export async function loginFirebase(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
}

export async function logoutFirebase() {
    await signOut(auth)
}

onAuthStateChanged(auth, user => {
    currentUser = user;
    if (user) {
        console.log('AuthStateChanged: User logged in', user.email);
        const loginDiv = document.getElementById('loginDiv');
        loginDiv.classList.replace('d-block', 'd-none');
        const navMenu = document.getElementById('navMenuContainer');
        navMenu.classList.replace('d-none', 'd-block');
        const spaRoot = document.getElementById('spaRoot');
        spaRoot.classList.replace('d-none', 'd-block');
        routers.navigate(window.location.pathname)
    } else {
        console.log('AuthStateChanged: User logged out');
        const loginDiv = document.getElementById('loginDiv');
        loginDiv.classList.replace('d-none', 'd-block');
        const navMenu = document.getElementById('navMenuContainer');
        navMenu.classList.replace('d-block', 'd-none');
        const spaRoot = document.getElementById('spaRoot');
        spaRoot.classList.replace('d-block', 'd-none');
        routers.currentView = null
        spaRoot.innerHTML = '' // clear the view
        glHomeModel.reset()
    }
});

export async function createAccount(email,password){
    await createUserWithEmailAndPassword(auth,email,password)
}