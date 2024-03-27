import React from 'react'
import TweetComposer from './TweetComposer'
// import { useAuth0 } from "@auth0/auth0-react";


const Home = () => {
  return (
    <div>
      <nav classname="w3-bar w3-black">
        <a href="#home" classname="w3-button w3-bar-item">Home</a>
        <a href="#band" classname="w3-button w3-bar-item">Band</a>
        <a href="#tour" classname="w3-button w3-bar-item">Tour</a>
        <a href="#contact" classname="w3-button w3-bar-item">Contact</a>
      <button><a href="/public" classname="w3-button w3-bar-item">Logout</a></button>
       
        
     </nav>
        <h1>
NEWS and Feeds
        </h1>
        <button><a href='/tweet'>Create Tweet</a></button>
        <><TweetComposer/></>
    </div>
  )
}

export default Home