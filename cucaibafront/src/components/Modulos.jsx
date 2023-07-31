import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getModulos, updateModulo } from "../Redux/Actions";
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

const Modulos = ({ ...props }) => {
  let dispatch = useDispatch();
  const { data, isFetched } = useModulos().modulosQuery;

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
      dispatch(getModulos());
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

  //FIN EDITAR PRECIO

  //----------------------------------COLUMNAS ------------------------------//
  Moment.locale("es-mx");
  const columns = [
    { name: "Descripción", selector: (row) => row.descripcion, sortable: true },
    { name: "Valor", selector: (row) => row.valor, sortable: true },
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
        row.fechaHasta ? Moment(row.fechaHasta).add(1, "days").format("L") : "",

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
          <button
            className="btn btn-success btn-sm"
            onClick={() => handleEdit(row.id, row.valor)}
          >
            {" "}
            Editar Valor
          </button>
        ),
    },
  ];

  return (
    <div className="card">
      <h1>Módulos</h1>
      <h5 className="subtitulo" style={{ color: "#5DADE2" }}>
        Listado de todos los módulos
      </h5>
      <br />
      {showSpinner && <Spinner />}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="input-group mb-3" style={{ maxWidth: "40%" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por Descripción"
            onChange={handleOnChange}
            value={search}
            autoComplete="off"
          />
        </div>
        <button
          className="btn btn-dark btn-md"
          style={{ marginRight: "4rem", marginBottom: "2rem" }}
          onClick={handleMostrarFormulario}
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
            }}
          >
            <CrearModulo handleCerrarFormulario={handleCerrarFormulario} />
          </div>
        )}
      </div>

      <DataTable
        columns={columns}
        data={modulo}
        pagination
        striped
        paginationComponentOptions={paginationOptions}
        noDataComponent={<EmptyTable msg="No se encontro el tipo de Módulo" />}
        {...props}
      />
      <div>
        <BackButton />
      </div>
    </div>
  );
};

export default Modulos;
