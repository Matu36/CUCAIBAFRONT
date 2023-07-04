import React, { useState, useEffect } from 'react';

import { GiHamburgerMenu } from 'react-icons/gi';
import { BiUserCircle } from 'react-icons/bi';
import './styles/header.css';

import SideBar from './Sidebar';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // ----------------------- CADA VEZ QUE SE HACE CLICK SE CIERRA LA SIDEBAR -------- //

  const handleOutsideClick = (event) => {
    if (isOpen) {
      if (!event.target.closest('.navbar-ms')) {
        setIsOpen(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <header className="">
      <nav className="navbar  position-relative top-0 navbar-offcanvas navbar-ms">
        <div className="row w-100 mx-auto flex-nowrap align-items-center justify-content-center">
          <button
            className="navbar-toggler mr-1 border-0"
            type="button"
            id="navToggle"
            onClick={() => setIsOpen(!isOpen)}
          >
            <GiHamburgerMenu size="3rem" />
          </button>
          <div className="col-7 pl-0 pl-md-2 intranet-logo">
            <span className="fst-line">INTRANET - Liquidación Honorarios C.U.C.A.I.B.A</span>
            <span className="snd-line">MINISTERIO DE SALUD</span>
          </div>
          <div className="col-3 d-flex justify-content-end align-items-center">
            <div className="dropdown">
              <button
                className="btn btn-user font-weight-medium dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <BiUserCircle size="2rem" />
                <span className="username"> Alejandro Oslovski </span>
              </button>
              <div
                className="dropdown-user dropdown-menu pt-4"
                aria-labelledby="dropdownMenu"
              >
                <div
                  className="dropdown-item text-center text-secondary mb-2 pt-2"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10vh"
                    height="10vh"
                    fill="currentColor"
                    className="bi bi-person-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path
                      fillRule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                    />
                  </svg>
                  <div className="font-weight-bold text-no-wrap mt-2">
                    Alejandro Oslovski
                  </div>
                  <div className="text-muted">@wilson</div>
                  <div className="text-muted text-center mt-3">
                    <span className="badge badge-pill rounded-5 text-dark-emphasis badge-light border border-dark px-5 py-2">
                      Perfil Hospital
                    </span>
                  </div>
                </div>
                <div className="dropdown-divider mt-4" />
                <div
                  className="dropdown-item text-secondary text-center py-3"
                  type="button"
                >
                  Centro De Alta Complejidad Cardiovascular Presidente Juan
                  Domingo Peron
                </div>
                <div className="dropdown-divider mb-2" />
                <div className="dropdown-item text-center" type="button">
                  <a
                    id="closeSession"
                    className="btn btn-danger close-session w-50"
                    href="/cucaibabonif/trunk/public/index.php/logout"
                    data-url="/cucaibabonif/trunk/public/index.php/logout"
                  >
                    Salir
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SideBar isOpen={isOpen} />
      </nav>
    </header>
  );
}

export default Header;
