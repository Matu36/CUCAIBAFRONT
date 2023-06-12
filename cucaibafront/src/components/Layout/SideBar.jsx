import "../../assets/styles/style.css";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaAmbulance } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { SiWebmoney } from "react-icons/si";

const SideBar = ({ isOpen }) => {
  return (
    <div
      className={`sidebar-nav navbar-collapse offcanvas-collapse ${
        isOpen ? "open" : "null"
      }`}
    >
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
          <Link to="/" onClick={() => isOpen(false)}>
            <AiFillHome className="sidebarIcons" /> Inicio
          </Link>
        </li>
        <li>
          <a
            className="nav-link dropdown-toggle"
            data-bs-toggle="collapse"
            href="#collapseAgentes"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <BsFillPersonFill className="sidebarIcons" /> Agentes
          </a>
          <ul className="collapse sub-menu" id="collapseAgentes">
            <li>
              <Link to="/agentes/ver-agentes" onClick={() => isOpen(false)}>
                Ver Agentes
              </Link>
            </li>
            <li>
              <Link to="/agentes/crear-agente" onClick={() => isOpen(false)}>
                Nuevo Agente
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <a
            className="nav-link dropdown-toggle"
            data-bs-toggle="collapse"
            href="#collapseOperativos"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <FaAmbulance className="sidebarIcons" /> Operativos
          </a>
          <ul className="collapse sub-menu" id="collapseOperativos">
            <li>
              <Link
                to="/operativos/nuevo-operativo"
                onClick={() => isOpen(false)}
              >
                <a>Cargar operativos</a>
              </Link>
            </li>
            <li>
              <Link
                to="/operativos/ver-operativos"
                onClick={() => isOpen(false)}
              >
                <a>Ver operativos</a>
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <a
            className="nav-link dropdown-toggle"
            data-bs-toggle="collapse"
            href="#collapseHonorarios"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <SiWebmoney className="sidebarIcons" /> Honorarios
          </a>
          <ul className="collapse sub-menu" id="collapseHonorarios">
            <li>
              <a href="#">Variables</a>
            </li>
            <li>
              <a className="btn btn-link disabled " href="#">
                Guardia
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
