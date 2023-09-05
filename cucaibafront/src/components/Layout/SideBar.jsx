import "../../assets/styles/style.css";
import { Link } from "react-router-dom";
import {
  FaAmbulance,
  FaHospitalSymbol,
  FaUsers,
  FaBraille,
} from "react-icons/fa";
import { SiWebmoney } from "react-icons/si";
import { BiMoneyWithdraw } from "react-icons/bi";
import { HiOutlineDocumentText } from "react-icons/hi";

import "../styles/sidebar.css";

function SideBar({ isOpen, setIsOpen }) {
  return (
    <div
      className={`sidebar-nav navbar-collapse offcanvas-collapse ${
        isOpen ? "open" : "null"
      }`}
      style={{
        zIndex: 10,
      }}
    >
      <label
        style={{
          padding: ".85rem 0",
          marginBottom: "1px",
          color: "var(--bs-secondary-color)",
          letterSpacing: "1px",
          fontWeight: "600",
        }}
      >
        Menú de navegación
      </label>
      <ul className="metismenu side-menu" id="side-menu">
        <li>
          <Link to="/" onClick={() => setIsOpen(false)}>
            <FaHospitalSymbol
              className="sidebarIcons text-muted"
              size="1.25rem"
            />{" "}
            Inicio
          </Link>
        </li>
        <li>
          <a
            aria-controls="collapseAgentes"
            aria-expanded="false"
            className="nav-link dropdown-toggle"
            data-bs-toggle="collapse"
            href="#collapseAgentes"
            role="button"
          >
            <FaUsers className="sidebarIcons text-muted" size="1.50rem" />{" "}
            Agentes
          </a>
          <ul className="collapse sub-menu" id="collapseAgentes">
            <li>
              <Link to="/agentes/crear-agente" onClick={() => setIsOpen(false)}>
                Cargar Agente
              </Link>
            </li>
            <li>
              <Link to="/agentes/ver-agentes" onClick={() => setIsOpen(false)}>
                Ver Agentes
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <a
            aria-controls="collapseExample"
            aria-expanded="false"
            className="nav-link dropdown-toggle"
            data-bs-toggle="collapse"
            href="#collapseOperativos"
            role="button"
          >
            <FaAmbulance className="sidebarIcons text-muted" size="1.50rem" />{" "}
            Operativos
          </a>
          <ul className="collapse sub-menu" id="collapseOperativos">
            <li>
              <Link
                to="/operativos/nuevo-operativo"
                onClick={() => setIsOpen(false)}
              >
                Cargar operativos
              </Link>
            </li>
            <li>
              <Link
                to="/operativos/ver-operativos"
                onClick={() => setIsOpen(false)}
              >
                Ver operativos
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <a
            aria-controls="collapseExample"
            aria-expanded="false"
            className="nav-link dropdown-toggle"
            data-bs-toggle="collapse"
            href="#collapseHonorarios"
            role="button"
          >
            <SiWebmoney className="sidebarIcons text-muted" size="1.50rem" />{" "}
            Honorarios
          </a>

          <ul className="collapse sub-menu" id="collapseHonorarios">
            <li>
              <Link to="/honorarios/variables" onClick={() => setIsOpen(false)}>
                Variables
              </Link>
            </li>
          </ul>
        </li>
        <ul className="metismenu side-menu" id="side-menu">
          <li>
            <Link to="/modulos" onClick={() => setIsOpen(false)}>
              <FaBraille className="sidebarIcons text-muted" size="1.50rem" />{" "}
              Módulos
            </Link>
          </li>
        </ul>
        <li>
          <a
            aria-controls="collapseExample"
            aria-expanded="false"
            className="nav-link dropdown-toggle"
            data-bs-toggle="collapse"
            href="#collapseOrdenes"
            role="button"
          >
            <BiMoneyWithdraw
              className="sidebarIcons text-muted"
              size="1.50rem"
            />{" "}
            Órdenes de Pago
          </a>

          <ul className="collapse sub-menu" id="collapseOrdenes">
            <li>
              <Link to="/ordenes/pendientes" onClick={() => setIsOpen(false)}>
                Generar Órdenes de Pago
              </Link>
            </li>
            <li>
              <Link to="/ordenes/ver-ordenes" onClick={() => setIsOpen(false)}>
                Ver Órdenes de Pago
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/archivos" onClick={() => setIsOpen(false)}>
            <HiOutlineDocumentText
              className="sidebarIcons text-muted"
              size="1.50rem"
            />{" "}
            Archivos de Transferencia
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
