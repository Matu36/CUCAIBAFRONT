import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";


function App() {

  return (
  <Routes>
  <Route path={"/"} element={<SideBar />} />


  </Routes>
  )
}

export default App;
