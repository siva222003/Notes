import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/NoteState";
import "./App.css";
import SignUp from "./components/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import MainHome from "./components/MainHome";
import LoadingBar from 'react-top-loading-bar'
import { useState } from "react";
function App() {
  const [progress,setProgress] = useState(0);
  const prog =(val)=>
  {
    setProgress(val);
  }
  return (
    <>
      <NoteState>
        <BrowserRouter>
        
          <LoadingBar
        color='#f11946'
        progress={progress}
      />
      <Navbar/>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <MainHome/>
              }
            />  
            <Route exact path="/home"  element={<Home prog={prog}/>} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/signUp" element={<SignUp />} />
            <Route exact path="/login" element={<Login/>} />
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
