import React, { useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './Firebase.config';



firebase.initializeApp(firebaseConfig);
const Login = () => {
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignedIn: false,
        newUser: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',

    })

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const googleSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then(res => {
                const { displayName, email } = res.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email
                }
                setUser(signedInUser)
            })
            .catch(err => {
                console.log(err);
                console.log(err.messege);
            })
    }

    const fbSignIn = () => {
        firebase.auth().signInWithPopup(fbProvider)
        .then(function(result) {
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log("fb user" , user);
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }

    const googleSigOut = () => {
        firebase.auth().signOut()
            .then(res => {
                const signedOutUser = {
                    isSignedIn: false,
                    name: '',
                    email: '',
                    error: '',
                    success: false

                }
                setUser(signedOutUser)
            })
            .catch(err => console.log(err))
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
        }
        if (e.target.name === 'password') {
            isFieldValid = e.target.value.length > 6 && /\d{1}/.test(e.target.value);
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo)
        }
    }

    const handleSubmit = (e) => {

        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name)
                    console.log(res);
                })
                .catch(error => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    newUserInfo.success = true;
                    setUser(newUserInfo)
                    console.log(error.code, error.message);
                    // ...
                });
        }

        if(!newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = { ...user }
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo);
                console.log("sign in userInfo" , res.user);
                console.log(res);
            })
            .catch(function(error) {
                const newUserInfo = { ...user }
                newUserInfo.error = error.message;
                newUserInfo.success = true;
                setUser(newUserInfo)
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error.code, error.message);
                // ...
              });
        }
        e.preventDefault();
    }

    const updateUserName = name => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
          displayName: name
        })
        .then(function() {
          console.log('user update');
        }).catch(function(error) {
          console.log(error);
        });
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <form onSubmit={handleSubmit} action="">
                        <h1>Login</h1>
                        {newUser && <input type="text" onBlur={handleBlur}  required placeholder="write your First name" name="name" />}
                        <br />
                        {newUser && <input type="text" onBlur={handleBlur}  placeholder="write your Last Name" name="name" />}
                        <br />
                        <input type="email" onBlur={handleBlur} name="email" placeholder="write your email" required />
                        <br />
                        <input type="password" onBlur={handleBlur} name="password" placeholder="password" id="" required />
                        <br/>
                        {newUser && <input type="password" onBlur={handleBlur} name="password" placeholder="confirm password" id="" required />}
                        <br />
                        <input type="submit" value={newUser ? "Sign Up" : "Sign In"}/>
                    </form>
                    <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser"/>
                    <label htmlFor="newUser">Create an account</label>
                    <p style={{ color: 'red' }}>{user.error}</p>
                    {
                        user.success && <p style={{ color: 'green' }}>User  {newUser ?'Created' : 'Logged In'} Successfully</p>
                    }
                    <button onClick={fbSignIn}>Continue With Facebook</button>
                    <br />
                    {user.isSignedIn ? <button onClick={googleSigOut}>Sign Out from Google</button> : <button onClick={googleSignIn}>Continue with Google</button>

                    }
                    {
                        user.isSignedIn && <p>welcome , {user.name}</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default Login;