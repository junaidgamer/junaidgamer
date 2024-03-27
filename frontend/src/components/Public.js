import React from "react";
import black_x from "../components/images/black_x.jpg";
import Google from "../components/images/google.png";
import Apple from "../components/images/apple.png";


function Public() {
  return (
    <div className="all">
      <div className="main">
        <div className="left">
          <div className="image">
            <img className="log" src={black_x} alt="logo2" />
          </div>
        </div>
        <div className="right">
          <img className="sec_logo" src={black_x} alt="logo2" />
          <div className="heading">Happening Now</div>
          <div className=" box">
            <div>
              <h1>Join today</h1>
            </div>
            <div>
              {<button className="round _no1">
                <img className="img1" src={Google} alt="google" /><a href="/login">
                Sign Up With Google</a>
              </button> }
            </div>
            <div>
              <button className="round" >
                <img className="img1" src={Apple} alt="apple" />
                Sign Up With Apple
              </button>
            </div>
            <div className="line">
              <div className="lin"></div>
              <div>or</div>
              <div className="lin"></div>
            </div>
            <div
              className="button round"
            ><a className="cre" href="/create">
              Create Account</a>
            </div>
            <div className="agreement">
              By signing up, you agree to the Terms of Service and Privacy
              Policy, including Cookie Use.
            </div>
            <div className="already">
              <h4>Already have an account?</h4>
            </div>
            <div className="round sig" ><a className="sign_" href="/signin">
              Sign in</a>
            </div>
          </div>
        </div>
      </div>
      <nav>
        <span className="links">About</span>
        <span className="links">Download the X app</span>
        <span className="links">Help Center</span>
        <span className="links">Terms of Services</span>
        <span className="links">Privacy Policy</span>
        <span className="links">Cookie Policy</span>
        <span className="links">Accessibility</span>
        <span className="links">Ads info</span>
        <span className="links">Blog</span>
        <span className="links">Status</span>
        <span className="links">Careers</span>
        <span className="links">Brand Resources</span>
        <span className="links">Advertising</span>
        <span className="links">Marketing</span>
        <span className="links">X for Business</span>
        <span className="links">Developers</span>
        <span className="links">Directory</span>
        <span className="links">Settings</span>
        <span className="links">@2024 X Corp</span>
      </nav>
    </div>
  );
}

export default Public;
