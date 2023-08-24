import React from 'react';
import BackButton from '../UI/BackButton';

const Layout = ({ Titulo, Subtitulo, children }) => {
  return (
    <div className="layout">
      <div className="header">
        <span>{Titulo}</span>
        <span>{Subtitulo}</span>
      </div>
      <div className="content">{children}</div>
      <div className="footer">
        <BackButton />
      </div>
    </div>
  );
};

export default Layout;