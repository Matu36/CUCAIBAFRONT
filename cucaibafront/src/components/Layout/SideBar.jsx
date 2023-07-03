import "../../assets/styles/style.css";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaAmbulance } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { SiWebmoney } from "react-icons/si";
import { TbNurse } from "react-icons/tb";

function SideBar({ isOpen }) {
  return (
    <div
      className={`sidebar-nav navbar-collapse offcanvas-collapse ${
        isOpen ? "open" : "null"
      }`}
      style={{ zIndex: 1000 }}
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
          <Link to="/" onClick={() => isOpen(false)}>
            <AiFillHome className="sidebarIcons" /> Inicio
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
            <BsFillPersonFill className="sidebarIcons" /> Agentes
          </a>
          <ul className="collapse sub-menu" id="collapseAgentes">
            <li>
              <Link to="/agentes/crear-agente" onClick={() => isOpen(false)}>
                Cargar Agente
              </Link>
            </li>
            <li>
              <Link to="/agentes/ver-agentes" onClick={() => isOpen(false)}>
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
            <FaAmbulance className="sidebarIcons" /> Operativos
          </a>
          <ul className="collapse sub-menu" id="collapseOperativos">
            <li>
              <Link
                to="/operativos/nuevo-operativo"
                onClick={() => isOpen(false)}
              >
                Cargar operativos
              </Link>
            </li>
            <li>
              <Link
                to="/operativos/ver-operativos"
                onClick={() => isOpen(false)}
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
            <SiWebmoney className="sidebarIcons" /> Honorarios
          </a>

          <ul className="collapse sub-menu" id="collapseHonorarios">
            <li>
              <Link to="/honorarios/variables" onClick={() => isOpen(false)}>
                Variables
              </Link>
            </li>
            <li>
              <a className="btn btn-link disabled " href="/algo">
                Guardia
              </a>
            </li>
          </ul>

        </li>
        <ul className="metismenu side-menu" id="side-menu">
        <li>
          <Link to="/modulos" onClick={() => isOpen(false)}>
            <TbNurse className="sidebarIcons"/> Módulos
          </Link>
        </li>
      </ul>

      </ul>
    </div>
  );
}

export default SideBar;
