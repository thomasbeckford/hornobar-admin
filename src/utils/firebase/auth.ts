import { auth } from './firebase' //importing the previously instatiated object from the firebase.js config file
//## below the authentication functions ##

//sign up
export const doCreateUserWithEmailAndPassword = (email: string, password: string) =>
    auth.createUserWithEmailAndPassword(email, password)

//sign in
export const doSignInWithEmailAndPassword = (email: string, password: string) =>
    auth.signInWithEmailAndPassword(email, password)

//sign out
export const doSignOut = () => auth.signOut()

//## below are two more functions, for resetting or changing passwords ##

// get current user
export const currentUser = () => auth.currentUser

//password reset
export const doPasswordReset = (email: string) => auth.sendPasswordResetEmail(email)

//password change
export const doPasswordChange = (password: string) => {
    if (auth.currentUser) auth.currentUser.updatePassword(password)
}

//#### for
//     facebook #####
// export const doFacebookSignIn = () => auth.signInWithPopup(facebookProvider)
