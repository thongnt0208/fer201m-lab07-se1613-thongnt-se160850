import React from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import firebaseConfig from './firebaseConfig';
import '../App.css';
import { useDispatch } from 'react-redux';
import { login, logout } from '../features/StoreAccount';
import GoogleButton from 'react-google-button';
import { Button } from '@mui/material';


const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();

const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider(),
};




function LoginByGoogle(props) {
    const dispatch = useDispatch();

    const {
        user,
        signOut,
        signInWithGoogle,
    } = props;


    const sigInFunction = () => {
        let currentUser = {
            displayName: '',
            photoURL: '',
        }
        signInWithGoogle().then(value => { //signInWithGoogle is a promise function
            console.log("signInWithGoogle: ", value);
            currentUser = {
                displayName: value.user.displayName,
                photoURL: value.user.photoURL,
            }
            dispatch(login(currentUser));
            console.log(currentUser);
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
        });
    }

    const sigOutFunction = () => {
        signOut().then(() => {
            localStorage.removeItem("currentUser");
            dispatch(logout());
        });
    }

    return (
        <div className="login-by-google">
            <header className="login-header">
                {
                    user
                        ? <p>Hello, {user.displayName}</p>
                        : <p></p>
                }

                {
                    user
                        ? <Button onClick={sigOutFunction}>Sign out</Button>
                        : <GoogleButton id='google-login-btn' onClick={sigInFunction}>Sign in with Google</GoogleButton>
                }
                
            </header>
        </div>
    );
}




export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
})(LoginByGoogle);