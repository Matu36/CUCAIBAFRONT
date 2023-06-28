import React from "react";
import "./styles/tablaHonorarios.css";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import "../lib/tooltip";

const arrayAgentes = [
  {
    id: 1,
    nombre: "Agente 1",
    cuil: "20345678901",
    cbu: "1234567890123456789012",
  },
  {
    id: 2,
    nombre: "Agente 2",
    cuil: "30345678901",
    cbu: "2345678901234567890123",
  },
  {
    id: 3,
    nombre: "Agente 3",
    cuil: "40345678901",
    cbu: "3456789012345678901234",
  },
  {
    id: 4,
    nombre: "Agente 4",
    cuil: "50345678901",
    cbu: "4567890123456789012345",
  },
];

const arrayObjetos = [
  {
    id: 1,
    referencia: "ref1",
    descripcion: "Descripción del objeto 1",
    fecha: "2023-06-27",
    agentes: arrayAgentes,
  },
  {
    id: 2,
    referencia: "ref2",
    descripcion: "Descripción del objeto 2",
    fecha: "2023-06-27",
    agentes: arrayAgentes,
  },
  {
    id: 3,
    referencia: "ref3",
    descripcion: "Descripción del objeto 3",
    fecha: "2023-06-27",
    agentes: arrayAgentes,
  },
  {
    id: 4,
    referencia: "ref4",
    descripcion: "Descripción del objeto 4",
    fecha: "2023-06-27",
    agentes: arrayAgentes,
  },
  {
    id: 5,
    referencia: "ref5",
    descripcion: "Descripción del objeto 5",
    fecha: "2023-06-27",
    agentes: arrayAgentes,
  },
];

const RowHonorario = ({ data }) => {
  return (
    <>
      <tr
        href={`#rowCollapse${data.id}`}
        aria-expanded="false"
        aria-controls={`#rowCollapse${data.id}`}
        className="row-header"
        data-bs-toggle="collapse"
      >
        <td>{data.referencia}</td>
        <td>{data.descripcion}</td>
        <td>{data.fecha}</td>
      </tr>
      <tr className="collapse table-active" id={`rowCollapse${data.id}`}>
        <td className="info-operativo" colSpan={3}>
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h5>Agentes asociados al Operativo</h5>
              <hr />
            </div>

            <button type="button" className="btn btn-primary">
              Agregar Agente <BsFillPersonFill />
            </button>
          </div>
          <table className="table table-responsive">
            <thead>
              <tr>
                <th scope="col">CUIL</th>
                <th scope="col">DNI</th>
                <th scope="col">Nombre</th>
                <th scope="col">CBU</th>
                <th scope="col">Acción</th>
              </tr>
            </thead>
            <tbody>
              {data.agentes.map((a, i) => (
                <tr key={i}>
                  <td>{a.cuil}</td>
                  <td>{a.id}</td>
                  <td>{a.nombre}</td>
                  <td>{a.cbu}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-success"
                      data-bs-toggle="tooltip"
                      data-bs-placement="right"
                      data-bs-title="Añadir modulo al Agente"
                    >
                      <AiOutlinePlus />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </td>
      </tr>
    </>
  );
};

const TablaHonorarios = () => {
  return (
    <div>
      <table className="table table-responsive table-hover">
        <thead>
          <tr>
            <th scope="col">N° Sintra</th>
            <th scope="col">Descripción</th>
            <th scope="col">Fecha</th>
          </tr>
        </thead>
        <tbody id="accordion">
          {arrayObjetos.map((e, i) => (
            <RowHonorario data={e} key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaHonorarios;
