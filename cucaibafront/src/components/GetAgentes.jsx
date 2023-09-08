import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAgentes } from "../Redux/Actions";
import DataTable from "react-data-table-component";
import EmptyTable from "./UI/EmptyTable";
import { usePagination } from "../hooks/usePagination";
import { Link } from "react-router-dom";
import "../assets/styles/detalle.css";
import Spinner from "./UI/Spinner";
import { MaskCuil } from "../utils/Mask";
import "../components/styles/GetAgente.css";

//Componente que muestra los AGENTES

const GetAgentes = ({ ...props }) => {
  const dispatch = useDispatch();
  const agentes = useSelector((state) => state.agentes);
  const [search, setSearch] = useState("");
  const [agente, setAgente] = useState(agentes);

  const { paginationOptions, customStyles } = usePagination(agentes);

  useEffect(() => {
    dispatch(getAgentes());
  }, []);

  useEffect(() => {
    setAgente(agentes);
  }, [agentes]);

  //-------------------------------- SEARCHBAR --------------------------- //

  useEffect(() => {
    filterByApellido(search);
  }, [search]);

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const filterByApellido = (value) => {
    if (!value) {
      setAgente(agentes);
    } else {
      const arrayCache = agentes.filter(
        (oper) =>
          oper.apellido.toLowerCase().includes(value.toLowerCase()) ||
          oper.cuil.toLowerCase().includes(value.toLowerCase())
      );
      setAgente(arrayCache);
    }
  };

  //-------------------------------- FIN SEARCHBAR --------------------------- //

  const columns = [
    { name: "Apellido", selector: (row) => row.apellido, sortable: true },
    { name: "Nombre", selector: (row) => row.nombre, sortable: true },
    { name: "CBU", selector: (row) => row.cbu, sortable: true },
    {
      name: "CUIL",
      selector: (row) => row.cuil,
      sortable: true,
      format: (row) => MaskCuil(row.cuil),
    },
    {
      name: "Ver",
      cell: (row) => (
        <Link to={`/agentes/agente/${row.id}`} className="custom-link">
          <button className="detalle"> + Información</button>
        </Link>
      ),
    },
  ];

  //---------------------------------SPINNER ------------------------------------//

  const [showSpinner, setShowSpinner] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowSpinner(false);
    });
  }, []);
  if (agentes.length === 0) {
    return <Spinner />;
  }

  //---------------------------------FIN SPINNER ------------------------------------//

  return (
    <>
      <div>
        <div
          className="input-group mb-3 inputSearch"
          style={{ maxWidth: "40%" }}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por APELLIDO o CUIL"
            onChange={handleOnChange}
            value={search}
            autoComplete="off"
          />
        </div>

        <DataTable
          columns={columns}
          data={agente}
          pagination
          striped
          paginationComponentOptions={paginationOptions}
          noDataComponent={
            <EmptyTable msg="No se encontro el Agente con los datos ingresados" />
          }
          {...props}
          customStyles={customStyles}
        />
      </div>
    </>
  );
};

export default GetAgentes;
