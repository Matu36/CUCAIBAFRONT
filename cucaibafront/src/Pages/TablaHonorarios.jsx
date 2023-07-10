import React, { useState, useEffect } from "react";
import "./styles/tablaHonorarios.css";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import "../lib/tooltip";
import { usePagination } from "../hooks/usePagination";
import EmptyTable from "../components/UI/EmptyTable";
import DataTable from "react-data-table-component";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOperativos } from "../Redux/Actions";

/* const arrayAgentes = [
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
]; */

const ExpandedComponent = ({ data }) => {
  const navigate = useNavigate();

  const handleAdd = (id) => {
    navigate("/honorarios/variables/crear-honorario/" + id + "/agregar", {
      replace: true,
    });
  };

  const handleCreate = (id) => {
    navigate("/honorarios/variables/crear-honorario/", {
      replace: true,
    });
  };

  return (
    <div className="p-3">
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5>Agentes asociados al Operativo</h5>
          <hr />
        </div>

        <button
          type="button"
          className="btn btn-success"
          onClick={() => handleCreate(data.id)}
        >
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
        {/* <tbody>
          {/* {data.agentes.map((a, i) => (
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
                  onClick={() => handleAdd(a.id)}
                >
                  <AiOutlinePlus />
                </button> */}
        {/*   </td>
            </tr>
          ))}
        </tbody> */}
      </table>
    </div>
  );
};

const columns = [
  { name: "Referencia", selector: (row) => row.referencia, sortable: true },
  {
    name: "Fecha",
    selector: (row) => row.fecha,
    sortable: true,
    format: (row) => moment(row.fecha).format("L"),
  },
  { name: "Descripción", selector: (row) => row.descripcion, sortable: true },
];

const TablaHonorarios = ({ ...props }) => {
  const dispatch = useDispatch();
  const operativos = useSelector((state) => state.operativos);
  const primerArreglo = operativos.slice(0, 1)[0];
  const [search, setSearch] = useState("");
  const [honorario, setHonorario] = useState(primerArreglo);
  const { paginationOptions } = usePagination(primerArreglo);

  useEffect(() => {
    dispatch(getOperativos());
  }, []);

  useEffect(() => {
    setHonorario(primerArreglo);
  }, [primerArreglo]);

  const [showSpinner, setShowSpinner] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowSpinner(false);
    }, 2000);
  }, []);

  //-------------------------------- SEARCHBAR --------------------------- //

  useEffect(() => {
    filterByReferencia(search);
  }, [search]);

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const filterByReferencia = (value) => {
    if (!value) {
      setHonorario(primerArreglo);
    } else {
      const arrayCache = primerArreglo.filter((oper) =>
        oper.referencia.toLowerCase().includes(value.toLowerCase())
      );
      setHonorario(arrayCache);
    }
  };

  //-------------------------------- FIN SEARCHBAR --------------------------- //

  if (operativos.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        {showSpinner ? (
          <div
            className="spinner-border spinner-border-lg text-primary"
            style={{ width: "5rem", height: "5rem" }}
            role="status"
          ></div>
        ) : (
          "null"
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5">
        <h1>Honorarios</h1>
        <h5 className="subtitulo" style={{ color: "#5DADE2" }}>
          Carga de Honorarios Variables
        </h5>
        <hr />
        <div className="input-group mb-3" style={{ maxWidth: "40%" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por Referencia"
            onChange={handleOnChange}
            value={search}
            autoComplete="off"
          />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={honorario}
        pagination
        striped
        paginationComponentOptions={paginationOptions}
        noDataComponent={
          <EmptyTable msg="No se encontro el Agente con ese CUIL" />
        }
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        {...props}
      />
    </div>
  );
};

export default TablaHonorarios;
