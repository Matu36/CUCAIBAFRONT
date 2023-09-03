import React from "react";
import BackButton from "../UI/BackButton";

const Layout = ({ Titulo, Subtitulo, children }) => {
  return (
    <div className="container-fluid container-lg py-5 mb-3">
      <div className="header ">
        <h1 className="section-title">{Titulo}</h1>
        <h2 className="section-subtitle">{Subtitulo}</h2>
      </div>
      <div className="p-4 my-4 card">
        <div className="content">{children}</div>
        <br />
        <div className="footer">
          <BackButton />
        </div>
      </div>
    </div>
  );
};

export default Layout;
