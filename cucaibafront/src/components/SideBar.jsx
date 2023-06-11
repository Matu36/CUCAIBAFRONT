import React from "react";
import "../assets/styles/style.css";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="sidebar-nav navbar-collapse offcanvas-collapse">
      <label
        style={{
          padding: ".85rem 0",
          marginBottom: "1px",
          color: "#606060",
          letterSpacing: "1px",
          opacity: ".3",
        }}
      >
        Menú de navegación
      </label>
      <ul className="metismenu side-menu" id="side-menu">
        <li>
          <Link to="/">
            <i className="fas fa-hospital-symbol fa-lg fa-fw mr-2"></i> Inicio
            </Link>
         
        </li>
        <li>
          <a className="has-arrow" href="#" aria-expanded="false">
            <i className="fas fa-braille fa-lg fa-fw"></i> Agentes
          </a>
          <ul className="sub-menu">
            <li>
              <Link to="/agentes">
               Ver Agentes
              </Link>
            </li>
            <li>
              <a>Crear Agente</a>
            </li>
          </ul>
        </li>
        <li>
          <a className="has-arrow" href="#" aria-expanded="false">
            <i className="fas fa-braille fa-lg fa-fw"></i> Operativos
          </a>
          <ul className="sub-menu">
            <li>
              <a href="#">Cargar operativos</a>
            </li>
            <li>
              <a href="#">Ver operativos</a>
            </li>
          </ul>
        </li>
        <li>
          <a className="has-arrow" href="#" aria-expanded="false">
            <i className="fas fa-braille fa-lg fa-fw"></i> Honorarios
          </a>
          <ul className="sub-menu">
            <li>
              <a href="#">Variables</a>
            </li>
            <li>
              <a className="btn disabled" href="#">
                Guardias
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
