import React, { } from 'react';
import './App.css';
import Create from "./components/Create.js";
import Public from "./components/Public.js";
import Signin from "./components/Signin.js";
import NoPage from "./components/NoPage.js";
import Home from './components/Home.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signflow from './components/Signflow.js';
import TweetComposer from './components/TweetComposer.js';
import ToggleDiv from './components/Togglediv.js';

function App() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
          <Route index element={<Public/>} />
            <Route path='/togglediv' element={<ToggleDiv/>}/>
            <Route path='/public' element={<Public />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/create' element={<Create />} />
            <Route path='/home' element={<Home />} />
            <Route path='/signflow' element={<Signflow/>} />
            <Route path='/tweet' element={<TweetComposer/>} />
            <Route path='*' element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

export default App;
