import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = (e) => {
    e.preventDefault();

    // Firebase signup
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Successfully signed up
        console.log(userCredential);
        toast.success('Account created successfully!');
      })
      .catch((error) => {
        // Error signing up
        console.error(error);
        toast.error('Error creating account. Please try again.');
      });
  };

  return (
    <div className="body-login">
      <div className="sign-in-container">
        <form onSubmit={signUp}>
          <h1>Sign Up </h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button type="submit">Sign Up</button>
          <h5>Already have an account? <a href="/" style={{color:"white" , fontStyle:"italic"}}>Log In</a></h5>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
