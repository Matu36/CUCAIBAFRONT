import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateModulo } from "../Redux/Actions";
import DataTable from "react-data-table-component";
import EmptyTable from "./UI/EmptyTable";
import { usePagination } from "../hooks/usePagination";
import Moment from "moment";
import CrearModulo from "./CrearModulo";
import Spinner from "./UI/Spinner";
import "../assets/styles/detalle.css";
import BackButton from "../components/UI/BackButton";
import Swal from "sweetalert2";
import { useModulos } from "../hooks/useModulos";
import NumberFormatter from "../utils/NumberFormatter";

//Componente que muestra los MODULOS y que permite la edición de los mismos.

const Modulos = ({ ...props }) => {
  let dispatch = useDispatch();
  const { data, isFetched, refetch } = useModulos().modulosQuery;
  const { mutate } = useModulos().modulosMutation;

  const orderData = (data) => {
    if (data && data.length > 0) {
      return data
        .slice()
        .sort((a, b) => a.descripcion.localeCompare(b.descripcion));
    }
    return [];
  };

  const [showSpinner, setShowSpinner] = useState(true);
  useEffect(() => {
    if (isFetched) {
      const orderedData = orderData(data);
      setModulo(orderedData);
      setShowSpinner(false);
    }
  }, [isFetched, data]);

  const { paginationOptions } = usePagination(orderData);

  const [modulo, setModulo] = useState(orderData);

  useEffect(() => {
    if (isFetched) {
      setModulo(orderData);
    }
  }, []);

  // SEARCHBAR
  const [search, setSearch] = useState("");

  useEffect(() => {
    filterByDescripcion(search);
  }, [search]);

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const filterByDescripcion = (value) => {
    if (!value) {
      setModulo(orderData);
    } else {
      const arrayCache = data.filter((mod) =>
        mod.descripcion.toLowerCase().includes(value.toLowerCase())
      );
      setModulo(arrayCache);
    }
  };

  //MOSTRANDO EL FORMULARIO DE CREACION //

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  function handleMostrarFormulario() {
    setMostrarFormulario(true);
  }

  function handleCerrarFormulario() {
    setMostrarFormulario(false);
  }

  //-------------------------------- FIN SEARCHBAR --------------------------- //

  //EDITAR PRECIO

  const [editIndex, setEditIndex] = useState(null);
  const [editPrice, setEditPrice] = useState(null);

  const handleEdit = (id, valor) => {
    setEditIndex(id);
    setEditPrice(valor);
  };

  const handlePriceChange = (valor) => {
    setEditPrice(valor);
  };

  const handleSave = (id) => {
    if (editPrice !== null) {
      const updatedModulo = {
        id: id,
        valor: editPrice,
      };

      dispatch(updateModulo(updatedModulo));
      refetch();
      setEditIndex(null);
      setEditPrice(null);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "El valor del módulo ha sido modificado",
        showConfirmButton: false,
        timer: 4000,
      });
    }
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditPrice(null);
  };

  const handleBaja = (id) => {
    mutate(id);
  };

  //FIN EDITAR PRECIO

  //----------------------------------COLUMNAS ------------------------------//

  Moment.locale("es-mx");
  const columns = [
    { name: "Descripción", selector: (row) => row.descripcion, sortable: true },
    {
      name: "Valor",
      selector: (row) => `$ ${NumberFormatter(row.valor)}`,
      sortable: true,
    },
    {
      name: "Fecha Desde",
      selector: (row) => row.fechaDesde,
      sortable: true,
      format: (row) => Moment(row.fechaDesde).add(1, "days").format("L"),
    },
    {
      name: "Fecha hasta",
      selector: (row) => row.fechaHasta,
      format: (row) =>
        row.fechaHasta ? (
          Moment(row.fechaHasta).add(1, "days").format("L")
        ) : (
          <i>En Vigencia</i>
        ),

      sortable: true,
    },
    {
      name: "Acción",
      cell: (row) =>
        editIndex === row.id ? (
          <>
            <input
              className="input"
              style={{ maxWidth: "40%" }}
              type="number"
              value={editPrice}
              onChange={(e) => handlePriceChange(+e.target.value)}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                maxWidth: "50%",
                marginLeft: "1rem",
              }}
            >
              <button
                className="btn btn-outline-secondary btn-sm mt-1"
                onClick={() => handleSave(row.id)}
              >
                Guardar
              </button>
              <button
                className="btn btn-secondary btn-sm mb-1"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </div>
          </>
        ) : (
          <div
            className={`d-flex gap-3 ${
              window.innerWidth < 1000
                ? " p-2 flex-column justify-content-around"
                : "flex-row"
            }`}
          >
            <button
              className={`btn btn-guardar btn-sm ${
                row.fechaHasta ? "d-none" : "d-block"
              }`}
              onClick={() => handleEdit(row.id, row.valor)}
            >
              {" "}
              Editar Valor
            </button>
            <button
              className={`btn btn-danger btn-sm ${
                row.fechaHasta ? "d-none" : "d-block"
              }`}
              onClick={() => handleBaja(row.id)}
            >
              {" "}
              Dar de Baja
            </button>
          </div>
        ),
    },
  ];

  return (
    <div>
      <div
        className="d-flex gap-2 w-100 justify-content-between align-items-center"
        style={{ flexDirection: window.innerWidth < 1000 ? "column" : "row" }}
      >
        <div
          className="input-group mb-3"
          style={{
            zIndex: 1,
            width: window.innerWidth < 1000 ? "100%" : "45%",
          }}
        >
          <input
            type="text"
            className={`form-control ${
              window.innerWidth < 1000 ? "" : "inputSearch"
            }`}
            placeholder="Buscar por Descripción"
            onChange={handleOnChange}
            value={search}
            disabled={showSpinner}
            autoComplete="off"
          />
        </div>
        <button
          className={`btn btn-dark ${
            window.innerWidth < 1000 ? "btn-sm" : "btn-md"
          }`}
          onClick={handleMostrarFormulario}
          disabled={showSpinner}
        >
          + Crear Módulo
        </button>

        {mostrarFormulario && (
          <div
            style={{
              position: "fixed",
              top: "45%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              zIndex: "999",
              boxShadow: "0px 0px 48px 100vw rgba(0,0,0,0.29)",
              borderRadius: "15px",
            }}
          >
            <CrearModulo handleCerrarFormulario={handleCerrarFormulario} />
          </div>
        )}
      </div>
      {showSpinner && <Spinner />}
      {!showSpinner && (
        <DataTable
          columns={columns}
          data={modulo}
          pagination
          striped
          paginationComponentOptions={paginationOptions}
          noDataComponent={
            <EmptyTable msg="No se encontro el tipo de Módulo" />
          }
          {...props}
        />
      )}
    </div>
  );
};

export default Modulos;
