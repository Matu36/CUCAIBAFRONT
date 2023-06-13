/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable jsx-a11y/label-has-associated-control */
import '../../assets/styles/style.css';
import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { FaAmbulance } from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';
import { SiWebmoney } from 'react-icons/si';

function SideBar({ isOpen }) {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <div className={`sidebar-nav navbar-collapse offcanvas-collapse ${isOpen ? 'open' : 'null'}`}>
      <label
        style={{
          padding: '.85rem 0',
          marginBottom: '1px',
          color: 'var(--bs-secondary-color)',
          letterSpacing: '1px',
          fontWeight: '600',
        }}
      >
        Menú de navegación
      </label>
      <ul className="metismenu side-menu" id="side-menu">
        <li>
          <Link to="/" onClick={() => isOpen(false)}>
            <AiFillHome className="sidebarIcons" />
            {' '}
            Inicio
          </Link>
        </li>
        <li>
          <a
            aria-controls="collapseExample"
            aria-expanded="false"
            className="nav-link dropdown-toggle"
            data-bs-toggle="collapse"
            href="#collapseAgentes"
            role="button"
          >
            <BsFillPersonFill className="sidebarIcons" />
            {' '}
            Agentes
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
            <FaAmbulance className="sidebarIcons" />
            {' '}
            Operativos
          </a>
          <ul className="collapse sub-menu" id="collapseOperativos">
            <li>
              <Link to="/operativos/nuevo-operativo" onClick={() => isOpen(false)}>
                Cargar operativos
              </Link>
            </li>
            <li>
              <Link to="/operativos/ver-operativos" onClick={() => isOpen(false)}>
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
            <SiWebmoney className="sidebarIcons" />
            {' '}
            Honorarios
          </a>
          <ul className="collapse sub-menu" id="collapseHonorarios">
            <li>
              <a href="/algo">Variables</a>
            </li>
            <li>
              <a className="btn btn-link disabled " href="/algo">
                Guardia
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
