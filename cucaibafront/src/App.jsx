import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import GetAgentes from "./components/GetAgentes";


function App() {

  return (
  <Routes>
  <Route path={"/"} element={<SideBar />} />
  <Route path={"/agentes"} element={<GetAgentes />} />


  </Routes>
  )
}

export default App;
