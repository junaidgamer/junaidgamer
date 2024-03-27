import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import axios from 'axios';
import cancel from '../components/images/cancel.jpg';
import black_x from '../components/images/black_x.jpg';
import apple from '../components/images/apple.png';
import google from '../components/images/google.png';

const Signin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "" });
  const [errorMessage, setErrorMessage] = useState(null); // State for error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null); // Clear any previous error message

    try {
      // Fetch all registered users
      const response = await axios.get(`http://127.0.0.1:8000/users/`);
      const registeredUsers = response.data;
      
      // Check if the entered username exists in the registered users list
      const isUserRegistered = registeredUsers.some(userData => userData.username === user.username);
      
      if (isUserRegistered) {
        sessionStorage.setItem("username", user.username);
        navigate("/signflow");
      } else {
        setErrorMessage("Invalid username. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="logo-box">
      <div className="cross">
        <a href="/public"> 
          <img height="10px" width="10px" src={cancel} alt="cancel" />
        </a>
      </div>
      <img src={black_x} alt="black" className="logo" />
      <h2>Sign In to Twitter</h2>
      <button className="bla">
        <img src={apple} alt="apple" />
        Sign in with Google
      </button>
      <button className="bla">
        <img src={google} alt="google" />
        Sign in with Google
      </button>
      <hr />
      <span className="or">Or</span>  
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          placeholder="Enter your username"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message below input */}
        <button className="Nex" type="submit">Sign In</button>
      </form>
      <button className="bla">Forget Password</button>
      <p>
        Don't Have an account<a href="/create">Sign up</a>
      </p>
    </div>
  );
};

export default Signin;
