import React from "react";
import BackButton from "../UI/BackButton";

const Layout = ({ Titulo, Subtitulo, children }) => {
  return (
    <div className="container p-4 card mt-5">
      <div className="header">
        <h1 className="section-title">{Titulo}</h1>
        <h2 className="section-subtitle">{Subtitulo}</h2>
        <hr />
      </div>
      <div className="content">{children}</div>
      <br />
      <div className="footer">
        <BackButton />
      </div>
    </div>
  );
};

export default Layout;
