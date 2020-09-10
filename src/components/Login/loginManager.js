import firebaseConfig from './firebase.config';
import * as firebase from "firebase/app";
import "firebase/auth";

export const initializeLoginFramework = () => {
    firebase.initializeApp(firebaseConfig);
}

export const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(res => {
            const { displayName, photoURL, email } = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL
            }
            setUser(signedInUser);
        })
        .catch(err => console.log(err.message));
}

export const handleFbLogin = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(fbProvider).then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
        console.log('fb user after sign in', user)
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(error.message);
    });
}

export const handleSignOut = () => {
    firebase.auth().signOut()
        .then(res => {
            const signedOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                password: '',
                photo: ''
            }
            setUser(signedOutUser);
        })
        .catch(err => console.log(err.message))
}

export const createUserWithEmailAndPassword = () => {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
            const newUserInfo = { ...user }
            newUserInfo.error = '';
            newUserInfo.success = true;
            setUser(newUserInfo);
            updateUserInfo(user.name, user.email, user.photoURL);
        })
        .catch(error => {
            const newUserInfo = { ...user }
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            setUser(newUserInfo);
        });
}

export const signInWithEmailAndPassword = () => {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
            const newUserInfo = { ...user }
            newUserInfo.error = '';
            newUserInfo.success = true;
            setUser(newUserInfo);
            setLoggedInUser(newUserInfo);
            history.replace(from);
            console.log('user info', res.user);
        })
        .catch(error => {
            const newUserInfo = { ...user }
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            setUser(newUserInfo);
        });
}

const updateUserInfo = (name, photoURL, email) => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name,
        email: email,
        photo: photoURL
    }).then(function () {
        console.log('username updated successfully');
    }).catch(function (error) {
        console.log(error)
    });
}