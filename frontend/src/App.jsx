import { useState,useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// import React, {  useEffect } from 'react';

import { Outlet } from "react-router-dom";
import Footer from "./components/Others/Footer";
import Navbar from "./components/Others/Navbar";
// import moduleName from 'useAuth'
import { useAuthstore } from './store/useAuthstore';

function App() {
  const [count, setCount] = useState(0);
  const { authuser, loadAuthuser} = useAuthstore();
    const storedUser = localStorage.getItem('authuser');
    useEffect(() => {
    if (!authuser && localStorage.getItem("authuser")) {
      loadAuthuser();
    }
  }, [authuser]);
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
