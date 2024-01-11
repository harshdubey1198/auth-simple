import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
//   const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      // Firebase login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Successfully logged in
      console.log(userCredential);

      // Show success toast
      toast.success('Logged in successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setTimeout(() => {
        // Redirect to Home page
        window.location.href = 'https://portfolio-maharaaj.netlify.app';
        // navigate('/home');
      }, 2200); 
    } catch (error) {
      // Error logging in
      console.error(error);

      // Show error toast
      toast.error('Error logging in. Please try again.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="body-login">
      <div className="sign-in-container">
        <form onSubmit={signIn}>
          <h1>Log In</h1>
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
          <button type="submit">Log In</button>
          <h5> <a href="/signup" style={{color:"yellow"}}>Create an account</a></h5>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
