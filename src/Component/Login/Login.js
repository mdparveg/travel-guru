import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './Firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import './Login.css'



const Login = () => {
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }

    let history = useHistory();
    let location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

   
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
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
                setUser(signedInUser);
                setLoggedInUser(signedInUser);
                history.replace(from);
            })
            .catch(err => (err))
    }

    const fbSignIn = () => {
        firebase.auth().signInWithPopup(fbProvider)
        .then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;
          }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
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
            .catch(err => (err))
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
                })
                .catch(error => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    newUserInfo.success = true;
                    setUser(newUserInfo)
                });
        }

        if(!newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = { ...user }
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo);
                setLoggedInUser(newUserInfo);
                history.replace(from);
            })
            .catch(function(error) {
                const newUserInfo = { ...user }
                newUserInfo.error = error.message;
                newUserInfo.success = true;
                setUser(newUserInfo)
                var errorCode = error.code;
                var errorMessage = error.message;
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
        }).catch(function(error) {
        });
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6 login_form">
                    <form className="login" onSubmit={handleSubmit} action="">
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
                         user.success && <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'logged in'} Successfully</p>
                    }
                    <button className="btn btn-warning sign" onClick={fbSignIn}>Continue With Facebook</button>
                    <br />
                    {user.isSignedIn ? <button className="btn btn-warning sign" onClick={googleSigOut}>Sign Out from Google</button> : <button className="btn btn-warning sign" onClick={googleSignIn}>Continue with Google</button>

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