import { getAuth, signInWithEmailAndPassword, fetchSignInMethodsForEmail, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from "react-icons/fc";
import './style.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      const auth = getAuth();

      // Check if the email exists in Firebase
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);

      if (signInMethods.length === 0) {
        // Email does not exist
        toast.error('User not found. Please enter a valid email address.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      // Email exists, send password reset email
      await sendPasswordResetEmail(auth, email);

      // Show success toast
      toast.success('Password reset link sent to your email. Check your inbox.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      // Show error toast
      toast.error('Error sending password reset link. Please try again.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

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
        navigate('/home');
      }, 3000);
      // setTimeout(() => {
      //   // Redirect to Home page
      //   window.location.href = 'https://portfolio-maharaaj.netlify.app';
      // }, 2200);
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

  const signInWithGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const userCredential = await signInWithPopup(auth, provider);

      // Successfully signed in with Google
      console.log(userCredential);

      // Show success toast
      toast.success('Logged in with Google successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setTimeout(() => {
        // Redirect to Home page
        navigate('/home');
      }, 3000);
      // setTimeout(() => {
      //   // Redirect to Home page or perform any additional actions
      //   window.location.href = 'https://portfolio-maharaaj.netlify.app';
      // }, 2200);
    } catch (error) {
      // Error signing in with Google
      console.error(error);

      // Show error toast
      toast.error('Error signing in with Google. Please try again.', {
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
          <button className="button-login" type="submit">Log In</button>
        <div className="Social" >
            <button className="Google-button" type="button" onClick={signInWithGoogle}>
              <FcGoogle /> Google
            </button>
            <button className="Facebook-button" type="button">
            <FontAwesomeIcon icon= {faFacebookF} />   Facebook
            </button>

            </div>
          <h5>
            <a href="/signup" style={{ color: "yellow" }}>Create an account</a>
            <br />
            <span onClick={handleForgotPassword} style={{ cursor: "pointer", color: "lightgreen" }}>
              Forgot Password?
            </span>
          </h5>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
