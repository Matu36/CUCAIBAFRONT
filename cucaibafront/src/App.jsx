import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import GetAgentes from "./components/GetAgentes";

function App() {
  

  return (
    <div>
    <SideBar />
    <Routes>
      <Route path={"/agentes"} element={<GetAgentes />} />
    </Routes>
    </div>
  );
}

export default App;
