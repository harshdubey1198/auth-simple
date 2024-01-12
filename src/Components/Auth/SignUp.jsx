import { auth, firestore } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import React, { useState } from "react";
import GoogleButton from 'react-google-button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');

  const signUp = async (e) => {
    e.preventDefault();

    try {
      // Firebase signup
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Successfully signed up
      console.log(userCredential);
      toast.success('Account created successfully!');

      // Save additional user data to Firestore
      const userId = userCredential.user.uid;
      const userData = { fullName, mobileNumber, address };

      const userRef = collection(firestore, "users");
      await addDoc(userRef, { userId, ...userData });

    } catch (error) {
      // Error signing up
      console.error(error);
      toast.error('Error creating account. Please try again.');
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);

      // Successfully signed in with Google
      console.log(userCredential);
      toast.success('Signed in with Google successfully!');
      
      // Save additional user data to Firestore
      const userId = userCredential.user.uid;
      const userData = { fullName, mobileNumber, address };

      const userRef = collection(firestore, "users");
      await addDoc(userRef, { userId, ...userData });

    } catch (error) {
      // Error signing in with Google
      console.error(error);
      toast.error('Error signing in with Google. Please try again.');
    }
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
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></input>
          <button type="submit">Sign Up</button>

          {/* Google Sign Up Button */}
          <GoogleButton onClick={signInWithGoogle} />

          <h5>Already have an account? <a href="/" style={{color:"white" , fontStyle:"italic"}}>Log In</a></h5>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
