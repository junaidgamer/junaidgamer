import React, { useState } from "react";
import cancel from '../components/images/cancel.jpg';
import black_x from '../components/images/black_x.jpg';
import { useNavigate } from "react-router-dom";

const Signflow = () => {
  const [user, setUser] = useState({ password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate


  const handleChange = (e) => {
    const { value } = e.target;
    setUser({ password: value });
    setError(""); // Clear error state when user starts typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const previousUsername = sessionStorage.getItem("username");
    if (user.password === previousUsername) {
      console.log("sucessfully login")
      navigate("/home"); // Redirect to home page on successful login
    } else {
      setError("Invalid password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="logo-box mainouter">
      <div className="sign-in">
        <a href="/public">
          <img className="cross" height="20px" width="20px" src={cancel} alt="img" />
        </a>
        <div className="nav_1">
          <div className="for-x">
            <div>
              <img
                height="60px"
                width="60px"
                className="x-mark"
                src={black_x}
                alt="x-mark"
              />
            </div>
          </div>
        </div>
        <div className="down-box">
          <div className="content">
            <h2>Enter Your Password</h2>
            <input
              className="input"
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <button type="submit" className="box_ nex">Next</button>
            {error && <div className="error">{error}</div>}
            <div className="box_">Forgot password?</div>
          </div>
          <div />
        </div>
      </div>
    </form>
  );
}

export default Signflow;