import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateModulo } from "../Redux/Actions";
import DataTable from "react-data-table-component";
import EmptyTable from "./UI/EmptyTable";
import { usePagination } from "../hooks/usePagination";
import Moment from "moment";
import CrearValor from "./CrearValor";
import Spinner from "./UI/Spinner";
import "../assets/styles/detalle.css";
import Swal from "sweetalert2";
import { useModulos } from "../hooks/useModulos";
import NumberFormatter from "../utils/NumberFormatter";
import "../components/styles/Modulos.css";
import Dropdown from "./UI/Dropdown";
import { FaCalendar, FaEdit, FaRedo, FaTimes } from "react-icons/fa";
import "./styles/ordenes.css";
import Modal from "./UI/Modal";
import { validateFecha } from "../utils/Validaciones";

const formatDate = (fecha) => {
  let date = new Date(fecha);
  date.setDate(date.getDate() + 2);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

//Componente que muestra los MODULOS y que permite la edición de los mismos.

const Modulos = ({ ...props }) => {
  let dispatch = useDispatch();
  const {
    modulosQuery,
    modulosValorQuery,
    modulosMutation,
    editarModulo,
    cerrarModuloValor,
  } = useModulos(0, true);
  const { data, isFetched, refetch } = modulosValorQuery;
  const { data: modulos, isFetched: fetchedModulos } = modulosQuery;
  const { mutate } = modulosMutation;
  const { mutate: editMutate } = editarModulo;
  const { mutate: cerrarMutate } = cerrarModuloValor;

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

  const [editValue, setEditValue] = useState({
    valor: "",
    fechaDesde: "",
  });
  const [newValue, setNewValue] = useState({ valor: "", fechaHasta: "" });
  const [fechaAnterior, setFechaAnterior] = useState("");
  const [prevValor, setPrevValor] = useState(0);
  const [disabledButton, setDisabledButton] = useState(false);
  const [indexModulo, setIndexModulo] = useState(0);

  const handleEdit = (valor) => {
    setEditPrice(valor);
    setPrevValor(valor);
  };

  const handleSave = (option) => {
    let moduloData = { id: indexModulo };
    if (option == "editar") {
      moduloData = {
        ...moduloData,
        valor: editValue.valor,
        fechaDesde: editValue.fechaDesde,
      };

      editMutate(moduloData);
      refetch();
      setEditValue({ valor: 0, fechaDesde: "" });
    } else if (option == "cerrar") {
      moduloData = {
        ...moduloData,
        valor: newValue.valor,
        fechaHasta: newValue.fechaHasta,
      };
      cerrarMutate(moduloData);
      refetch();
      setEditValue({ valor: 0, fechaDesde: "" });
    }

    setIndexModulo(0);
  };

  const handleBaja = (id, descripcion) => {
    Swal.fire({
      title: "Dar de baja al módulo",
      text: `¿Usted esta seguro de que desea eliminar el módulo: ${descripcion}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate(id);
      }
    });
  };

  //FIN EDITAR PRECIO

  //----------------------------------COLUMNAS ------------------------------//

  Moment.locale("es-mx");
  const columns = [
    {
      name: "Descripción",
      selector: (row) => row.descripcion,
      sortable: true,
      grow: 2,
      wrap: true,
      sortFunction: (a, b) =>
        a.descripcion.toUpperCase() > b.descripcion.toUpperCase()
          ? 1
          : a.descripcion.toUpperCase() < b.descripcion.toUpperCase()
          ? -1
          : 0,
    },
    {
      name: "Valor",
      selector: (row) => `$ ${NumberFormatter(row.valor)}`,
      sortable: true,
    },
    {
      name: "Fecha Desde",
      selector: (row) => row.fecha_desde,
      sortable: true,
      format: (row) => Moment(row.fecha_desde).format("L"),
    },
    {
      name: "Fecha hasta",
      selector: (row) => row.fecha_hasta,
      format: (row) =>
        row.fecha_hasta ? (
          Moment(row.fecha_hasta).format("L")
        ) : (
          <i>En Vigencia</i>
        ),
      sortFunction: (a, b) => (a.fecha_hasta ? 1 : b.fecha_hasta ? -1 : 0),
      sortable: true,
    },
    {
      name: "Acción",
      cell: (row) =>
        !row.fechaHasta && (
          <Dropdown>
            {row.unico && (
              <button
                className={`dropdown-item dropdown-item-custom d-flex align-items-center gap-2
              }`}
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#editModuloModal"
                onClick={() => setIndexModulo(row.id)}
              >
                <FaEdit />
                Editar M&oacute;dulo
              </button>
            )}
            {!row.fecha_hasta && (
              <button
                className={`dropdown-item dropdown-item-custom d-flex align-items-center gap-2
              }`}
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#periodoModal"
                onClick={() => {
                  setIndexModulo(row.id);
                  setFechaAnterior(row.fecha_desde);
                }}
              >
                <FaCalendar />
                Cerrar Período
              </button>
            )}
            <button
              className={`dropdown-item dropdown-item-custom d-flex align-items-center gap-2`}
              type="button"
              // data-bs-toggle="modal"
              // data-bs-target="#opDefinitiva"
              onClick={() => handleBaja(row.id, row.descripcion)}
            >
              <FaTimes />
              Dar de Baja
            </button>
          </Dropdown>
        ),
    },
  ];

  return (
    <>
      <Modal
        title="Editar Módulo"
        referenceID="editModuloModal"
        customFooter={true}
        handleClose={() => {
          setEditValue({ valor: "", fechaDesde: "" });
          setIndexModulo(0);
        }}
        isStatic={true}
      >
        <div>
          <div className="d-flex align-items-center justify-content-center gap-4 flex-md-row flex-sm-column">
            <div className="d-flex flex-column gap-2 justify-content-center align-items-center w-50">
              <h6 className="text-muted">Editar Fecha</h6>
              <div>
                <input
                  type="date"
                  className="form-control"
                  name="fechaDesde"
                  min="2022-01-01"
                  value={editValue.fechaDesde}
                  autoComplete="off"
                  placeholder="Fecha Desde"
                  onChange={(e) => {
                    setEditValue({ ...editValue, fechaDesde: e.target.value });
                    setDisabledButton(validateFecha(e.target.value));
                  }}
                />
              </div>
            </div>
            <div className="d-flex justify-content-center gap-2 flex-column align-items-center w-50">
              <h6 className="text-muted">Editar Valor</h6>
              <div>
                <input
                  className="form-control"
                  type="number"
                  value={editValue.valor}
                  onChange={(e) =>
                    setEditValue({ ...editValue, valor: e.target.value })
                  }
                  min={0}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer mt-4">
            <button
              type="button"
              onClick={() => {
                setEditValue({ valor: 0, fechaDesde: "" });
                setDisabledButton(false);
              }}
              className="btn btn-limpiar d-flex align-items-center justify-content-center gap-2"
            >
              <FaRedo />
              <span>Limpiar campos</span>
            </button>
            <button
              type="button"
              className="btn btn-guardar"
              onClick={() => handleSave("editar")}
              disabled={
                (!editValue.valor && !editValue.fechaDesde) || disabledButton
              }
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        title="Cerrar Período"
        referenceID="periodoModal"
        customFooter={true}
        isStatic={true}
        handleClose={() => {
          setNewValue({ valor: "", fechaHasta: "" });
          setIndexModulo(0);
        }}
      >
        <div>
          <div className="d-flex align-items-center justify-content-center gap-4 flex-md-row flex-sm-column">
            <div className="d-flex flex-column gap-2 justify-content-center align-items-center w-50">
              <h6 className="text-muted">Fecha de Cierre</h6>
              <div>
                <input
                  type="date"
                  className="form-control"
                  name="fechaHasta"
                  min={formatDate(fechaAnterior)}
                  value={newValue.fechaHasta}
                  autoComplete="off"
                  placeholder="Fecha Hasta"
                  onChange={(e) => {
                    setNewValue({ ...newValue, fechaHasta: e.target.value });
                    setDisabledButton(validateFecha(e.target.value));
                  }}
                />
              </div>
            </div>
            <div className="d-flex justify-content-center gap-2 flex-column align-items-center w-50">
              <h6 className="text-muted">Valor del nuevo período</h6>
              <div>
                <input
                  className="form-control"
                  type="number"
                  value={newValue.valor}
                  onChange={(e) =>
                    setNewValue({ ...newValue, valor: e.target.value })
                  }
                  min={0}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer mt-4">
            <button
              type="button"
              onClick={() => {
                setNewValue({ valor: 0, fechaHasta: "" });
                setDisabledButton(false);
              }}
              className="btn btn-limpiar d-flex align-items-center justify-content-center gap-2"
            >
              <FaRedo />
              <span>Limpiar campos</span>
            </button>
            <button
              type="button"
              className="btn btn-guardar"
              onClick={() => handleSave("cerrar")}
              disabled={
                !newValue.valor || !newValue.fechaHasta || disabledButton
              }
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </Modal>
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
              disabled={showSpinner || !data}
              autoComplete="off"
            />
          </div>
          <button
            className={`btn btn-dark ${
              window.innerWidth < 1000 ? "btn-sm" : "btn-md"
            }`}
            onClick={handleMostrarFormulario}
            disabled={showSpinner || !fetchedModulos}
          >
            + Asignar Valor
          </button>

          {mostrarFormulario && (
            <div className="form-modulo">
              <CrearValor
                handleCerrarFormulario={handleCerrarFormulario}
                data={modulos}
              />
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
            noDataComponent={<EmptyTable msg="No se encontro ningún Módulo" />}
            className="del-overflow"
            {...props}
          />
        )}
      </div>
    </>
  );
};

export default Modulos;
