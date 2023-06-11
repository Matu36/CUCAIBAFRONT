import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
  <Routes>
  <Route path={"/"} element={<SideBar />} />


  </Routes>
  )
}

export default App;
